'use client';

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

import { tubeByKey } from './catalog';
import { formatCountdown, remainingClotMs, sortByDrawOrder, timerTone } from './logic';
import type { Sample } from './types';
import styles from './sample-table.module.css';

export type SampleTableProps = {
  samples: Sample[];
  now: number;
  focusedSampleId?: string | null;
  onFocusSample?: (id: string | null) => void;
  /** Collect stays disabled until the safety checklist is complete. */
  collectEnabled: boolean;
  onCollect: (id: string) => void;
  onDefer: (id: string, trigger: HTMLButtonElement) => void;
  onReset: (id: string) => void;
  onMarkInverted: (id: string) => void;
};

const STATUS_LABEL: Record<Sample['status'], string> = {
  awaiting_collection: 'Awaiting collection',
  collected: 'Collected',
  deferred: 'Deferred',
};

export function SampleTable({
  collectEnabled,
  focusedSampleId,
  now,
  onCollect,
  onDefer,
  onFocusSample,
  onMarkInverted,
  onReset,
  samples,
}: SampleTableProps) {
  const ordered = sortByDrawOrder(samples);

  return (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHead aria-label="Draw order">#</TableHead>
          <TableHead>Tube</TableHead>
          <TableHead>Sample ID</TableHead>
          <TableHead>Tests</TableHead>
          <TableHead numeric>Vol</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Inversion</TableHead>
          <TableHead>Clot time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead aria-label="Actions" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordered.map((sample) => {
          const tube = tubeByKey(sample.tube);
          const remaining = remainingClotMs(sample, now);

          return (
            <TableRow
              interactive
              key={sample.id}
              onClick={() => onFocusSample?.(sample.id)}
              selected={sample.id === focusedSampleId}
            >
              <TableCell numeric>{tube?.order ?? '—'}</TableCell>
              <TableCell>
                <span className={styles.tubeCell}>
                  <span
                    aria-hidden="true"
                    className={styles.tubeDot}
                    data-tube={sample.tube}
                  />
                  {tube?.stopperLabel ?? sample.tube}
                </span>
              </TableCell>
              <TableCell>
                <span className={styles.mono}>{sample.id}</span>
              </TableCell>
              <TableCell>
                {sample.tests.slice(0, 2).join(', ')}
                {sample.tests.length > 2 ? (
                  <span className={styles.overflow}> +{sample.tests.length - 2}</span>
                ) : null}
              </TableCell>
              <TableCell numeric>{sample.volumeMl} mL</TableCell>
              <TableCell>{sample.stat ? <Badge variant="danger">STAT</Badge> : '—'}</TableCell>
              <TableCell>
                {(tube?.inversions ?? 0) === 0 ? (
                  '—'
                ) : sample.status !== 'collected' ? (
                  <span className={styles.hint}>×{tube?.inversions} after draw</span>
                ) : sample.inverted ? (
                  <Badge variant="success">✓ ×{tube?.inversions}</Badge>
                ) : (
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      onMarkInverted(sample.id);
                    }}
                    size="xs"
                    variant="outline"
                  >
                    Invert ×{tube?.inversions}
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {remaining != null ? (
                  <Badge
                    variant={
                      timerTone(remaining) === 'danger'
                        ? 'danger'
                        : timerTone(remaining) === 'warn'
                          ? 'warning'
                          : 'success'
                    }
                  >
                    {remaining <= 0 ? 'Exceeded' : formatCountdown(remaining)}
                  </Badge>
                ) : tube?.timeLimitMin && sample.status !== 'collected' ? (
                  <span className={styles.hint}>{tube.timeLimitMin}m</span>
                ) : (
                  '—'
                )}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    sample.status === 'collected'
                      ? 'success'
                      : sample.status === 'deferred'
                        ? 'warning'
                        : 'neutral'
                  }
                >
                  {STATUS_LABEL[sample.status]}
                  {sample.status === 'collected' && sample.collectedAt
                    ? ` · ${sample.collectedAt}`
                    : ''}
                </Badge>
                {sample.status === 'deferred' && sample.deferReason ? (
                  <span className={styles.deferReason}>{sample.deferReason}</span>
                ) : null}
              </TableCell>
              <TableCell onClick={(event) => event.stopPropagation()}>
                <span className={styles.actions}>
                  {sample.status === 'awaiting_collection' ? (
                    <>
                      <Button
                        disabled={!collectEnabled}
                        onClick={() => onCollect(sample.id)}
                        size="xs"
                        title={
                          collectEnabled ? undefined : 'Complete the safety checklist first'
                        }
                        variant="primary"
                      >
                        Collect
                      </Button>
                      <Button
                        onClick={(event) => onDefer(sample.id, event.currentTarget)}
                        size="xs"
                        variant="ghost"
                      >
                        Defer
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => onReset(sample.id)} size="xs" variant="ghost">
                      Reset
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
