'use client';

import { useT } from '../../components/foundations/i18n';
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui';

import { SAMPLE_ISSUE_REASONS, tubeByKey } from './catalog';
import { formatCountdown, labelResolved, sampleTiming, timingTone } from './logic';
import type { ActualSample } from './types';
import styles from './sample-table.module.css';

export type SampleTableProps = {
  /** Tubes that physically exist. An empty list is the honest pre-draw state. */
  samples: readonly ActualSample[];
  now: number;
  focusedSampleId?: string | null;
  onFocusSample?: (id: string | null) => void;
  onLabel: (sampleId: string) => void;
  onMarkInverted: (sampleId: string) => void;
  onReportIssue: (sampleId: string, trigger: HTMLButtonElement) => void;
  /** Read-only stations see every fact and change none of them. */
  readOnly?: boolean;
};

const LABEL_LABEL: Record<ActualSample['label']['state'], string> = {
  not_printed: 'Not labelled',
  printed: 'Printed, not verified',
  verified: 'Verified',
  manual_fallback: 'Handwritten',
};

/**
 * The tubes that exist. Every row here was created by a backend registration
 * and carries the identity the backend issued — which is why no row has a
 * "reset" or "undo": a drawn tube cannot be un-drawn by a UI action. A tube
 * that turns out to be unusable gets a reason and keeps its history.
 */
export function SampleTable({
  focusedSampleId,
  now,
  onFocusSample,
  onLabel,
  onMarkInverted,
  onReportIssue,
  readOnly = false,
  samples,
}: SampleTableProps) {
  const t = useT();

  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHead>{t('Tube')}</TableHead>
          <TableHead>{t('Sample ID')}</TableHead>
          <TableHead>{t('Drawn')}</TableHead>
          <TableHead>{t('Inversion')}</TableHead>
          <TableHead>{t('Processing')}</TableHead>
          <TableHead>{t('Label')}</TableHead>
          <TableHead aria-label={t('Actions')} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {samples.map((sample) => {
          const tube = tubeByKey(sample.tube);
          const timing = sampleTiming(sample, now);
          const tone = timingTone(timing);

          return (
            <TableRow
              className={styles.row}
              interactive
              key={sample.sampleId}
              onClick={() => onFocusSample?.(sample.sampleId)}
              selected={sample.sampleId === focusedSampleId}
            >
              <TableCell data-label={t('Tube')}>
                <span className={styles.tubeCell}>
                  <span aria-hidden="true" className={styles.tubeDot} data-tube={sample.tube} />
                  {tube?.stopperLabel ?? sample.tube}
                  {sample.stat ? <Badge size="sm" variant="danger">STAT</Badge> : null}
                </span>
              </TableCell>
              <TableCell data-label={t('Sample ID')}>
                <span className={styles.mono}>{sample.sampleId}</span>
                {sample.issue ? (
                  <span className={styles.issue}>
                    {t(
                      SAMPLE_ISSUE_REASONS.find((reason) => reason.id === sample.issue?.reason)
                        ?.label ?? sample.issue.reason,
                    )}
                  </span>
                ) : null}
              </TableCell>
              <TableCell data-label={t('Drawn')}>
                {sample.drawnAtLabel}
                <span className={styles.by}>{sample.drawnBy}</span>
              </TableCell>
              <TableCell data-label={t('Inversion')}>
                {(tube?.inversions ?? 0) === 0 ? (
                  '—'
                ) : sample.inverted ? (
                  <Badge variant="success">✓ ×{tube?.inversions}</Badge>
                ) : (
                  <Button
                    disabled={readOnly}
                    onClick={(event) => {
                      event.stopPropagation();
                      onMarkInverted(sample.sampleId);
                    }}
                    size="xs"
                    variant="outline"
                  >
                    {t('Invert')} ×{tube?.inversions}
                  </Button>
                )}
              </TableCell>
              {/* Resting and overdue are different facts, so they never share a
                  countdown: a tube that has just finished clotting is ready,
                  not late. */}
              <TableCell data-label={t('Processing')}>
                {timing.phase === 'resting' ? (
                  <span className={styles.hint}>
                    {t('Ready in')} {formatCountdown(timing.remainingMs)}
                  </span>
                ) : timing.phase === 'overdue' ? (
                  <Badge variant="danger">{t('Past deadline')}</Badge>
                ) : timing.phase === 'ready' && timing.remainingMs != null ? (
                  <Badge
                    variant={tone === 'danger' ? 'danger' : tone === 'warn' ? 'warning' : 'success'}
                  >
                    {t('Process within')} {formatCountdown(timing.remainingMs)}
                  </Badge>
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell data-label={t('Label')}>
                <Badge
                  variant={
                    sample.label.state === 'verified'
                      ? 'success'
                      : sample.label.state === 'manual_fallback'
                        ? 'warning'
                        : 'neutral'
                  }
                >
                  {t(LABEL_LABEL[sample.label.state])}
                </Badge>
              </TableCell>
              <TableCell
                className={styles.actionCell}
                onClick={(event) => event.stopPropagation()}
              >
                <span className={styles.actions}>
                  {labelResolved(sample) ? null : (
                    <Button
                      disabled={readOnly}
                      onClick={() => onLabel(sample.sampleId)}
                      size="xs"
                      variant="primary"
                    >
                      {t('Label')}
                    </Button>
                  )}
                  {sample.issue ? null : (
                    <Button
                      disabled={readOnly}
                      onClick={(event) => onReportIssue(sample.sampleId, event.currentTarget)}
                      size="xs"
                      variant="ghost"
                    >
                      {t('Report a problem')}
                    </Button>
                  )}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
