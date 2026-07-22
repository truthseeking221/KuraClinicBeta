'use client';

import { useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  ChartAnalysisIcon,
  ChevronRightIcon,
  HeartCheckIcon,
  HomeIcon,
  MicroscopeIcon,
  RouteIcon,
  SettingsIcon,
  ShieldIcon,
  StethoscopeIcon,
  TestTubesIcon,
  UserMultipleIcon,
  WalletIcon,
} from '../../components/ui';
import type { BadgeVariant } from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import {
  CLINIC_FLOW_STAGES,
  FLOW_COVERAGE_ORDER,
  FLOW_COVERAGE_TOTALS,
  FLOW_JOURNEY_TOTAL,
  INDEPENDENT_TRUTHS,
} from './clinic-flow-landscape-data';
import type {
  ClinicFlowStage,
  ClinicFlowStageId,
  FlowCoverageStatus,
} from './clinic-flow-landscape-data';
import styles from './clinic-flow-landscape.module.css';

export type ClinicFlowLandscapeProps = {
  initialStageId?: ClinicFlowStageId;
  onOpenSurface?: (stageId: ClinicFlowStageId) => void;
};

const ICON_SIZE = 18;

const STAGE_ICONS: Record<ClinicFlowStageId, React.ReactNode> = {
  access: <ShieldIcon aria-hidden="true" size={ICON_SIZE} />,
  work: <HomeIcon aria-hidden="true" size={ICON_SIZE} />,
  patient: <UserMultipleIcon aria-hidden="true" size={ICON_SIZE} />,
  encounter: <StethoscopeIcon aria-hidden="true" size={ICON_SIZE} />,
  ordering: <MicroscopeIcon aria-hidden="true" size={ICON_SIZE} />,
  fulfillment: <TestTubesIcon aria-hidden="true" size={ICON_SIZE} />,
  results: <ChartAnalysisIcon aria-hidden="true" size={ICON_SIZE} />,
  continuity: <HeartCheckIcon aria-hidden="true" size={ICON_SIZE} />,
  finance: <WalletIcon aria-hidden="true" size={ICON_SIZE} />,
  settings: <SettingsIcon aria-hidden="true" size={ICON_SIZE} />,
};

const COVERAGE_VARIANTS: Record<FlowCoverageStatus, BadgeVariant> = {
  IMPLEMENTED: 'success',
  PARTIAL: 'warning',
  DECIDED: 'info',
  OPEN: 'danger',
  DEFERRED: 'neutral',
  'DESIGN-GAP': 'danger',
};

function openCount(stage: ClinicFlowStage) {
  return stage.coverage.OPEN + stage.coverage['DESIGN-GAP'];
}

export function ClinicFlowLandscape({
  initialStageId = 'access',
  onOpenSurface,
}: ClinicFlowLandscapeProps) {
  const t = useT();
  const [selectedId, setSelectedId] = useState<ClinicFlowStageId>(initialStageId);
  const selected =
    CLINIC_FLOW_STAGES.find((stage) => stage.id === selectedId) ?? CLINIC_FLOW_STAGES[0];

  return (
    <main className={styles.workspace}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('Clinic flow landscape')}</h1>
          <p className={styles.subtitle}>
            {FLOW_JOURNEY_TOTAL} {t('journeys from access to documented continuity.')}
          </p>
        </div>

        <dl aria-label={t('Journey evidence coverage')} className={styles.coverageSummary}>
          {FLOW_COVERAGE_ORDER.map((status) => (
            <div className={styles.coverageItem} key={status}>
              <dt>{status}</dt>
              <dd>{FLOW_COVERAGE_TOTALS[status]}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Alert tone="info">
        <AlertTitle>{t('Evidence map')}</AlertTitle>
        <AlertDescription>
          {t(
            'Journey status comes from the clinic catalog. Current backend behavior comes from kura-platform; legacy screens are evidence only, not release truth.',
          )}
        </AlertDescription>
      </Alert>

      <section aria-labelledby="stage-map-title" className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2 id="stage-map-title">{t('Care journey')}</h2>
          <p>
            {t('Select a stage to inspect its owner, closure, handoffs, and unresolved work.')}
          </p>
        </div>

        <Card as="div" className={styles.mapTray}>
          <CardContent>
            <ol className={styles.stageGrid}>
              {CLINIC_FLOW_STAGES.map((stage) => {
                const unresolved = openCount(stage);
                const selectedStage = stage.id === selected.id;

                return (
                  <li key={stage.id}>
                    <Card as="div" className={styles.stageCard} variant="tile">
                      <button
                        aria-label={`${stage.order}. ${stage.title}`}
                        aria-pressed={selectedStage}
                        className={styles.stageButton}
                        data-selected={selectedStage ? 'true' : undefined}
                        onClick={() => setSelectedId(stage.id)}
                        type="button"
                      >
                        <span className={styles.stageTopline}>
                          <span className={styles.stageIcon}>{STAGE_ICONS[stage.id]}</span>
                          <span className={styles.stageNumber}>{stage.order}</span>
                        </span>
                        <span className={styles.stageTitle}>{stage.title}</span>
                        <span className={styles.stageMeta}>
                          {stage.journeyCount} {t('journeys')} · {stage.journeyIds}
                        </span>
                        <span className={styles.stageState}>
                          {unresolved > 0
                            ? `${unresolved} ${t('unresolved')}`
                            : t('No open journey status')}
                        </span>
                      </button>
                    </Card>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>
      </section>

      <div className={styles.detailGrid}>
        <section aria-labelledby="selected-stage-title" className={styles.stageDetail}>
          <div className={styles.selectedHeading}>
            <span className={styles.selectedIcon}>{STAGE_ICONS[selected.id]}</span>
            <div>
              <p className={styles.eyebrow}>
                {t('Stage')} {selected.order} · {selected.journeyIds}
              </p>
              <h2 id="selected-stage-title">{selected.title}</h2>
            </div>
          </div>

          <p className={styles.outcome}>{selected.outcome}</p>

          <dl className={styles.stageFacts}>
            <div>
              <dt>{t('Primary actors')}</dt>
              <dd>{selected.primaryActors}</dd>
            </div>
            <div>
              <dt>{t('Entry')}</dt>
              <dd>{selected.entry}</dd>
            </div>
            <div>
              <dt>{t('Closure')}</dt>
              <dd>{selected.closure}</dd>
            </div>
          </dl>

          <div className={styles.handoffBlock}>
            <h3>{t('Required handoffs')}</h3>
            <ul>
              {selected.handoffs.map((handoff) => (
                <li key={handoff}>{handoff}</li>
              ))}
            </ul>
          </div>

          {selected.surfaceLabel && onOpenSurface ? (
            <Button
              onClick={() => onOpenSurface(selected.id)}
              trailingIcon={<ChevronRightIcon aria-hidden="true" />}
            >
              {selected.surfaceLabel}
            </Button>
          ) : null}
        </section>

        <Card
          as="div"
          aria-labelledby="evidence-title"
          className={styles.evidenceTray}
          role="complementary"
        >
          <CardContent>
            <div className={styles.evidenceHeader}>
              <h2 id="evidence-title">{t('Evidence and gaps')}</h2>
              <span>
                {selected.journeyCount} {t('journeys')}
              </span>
            </div>

            <div
              aria-label={`${selected.title} ${t('coverage')}`}
              className={styles.badgeRow}
            >
              {FLOW_COVERAGE_ORDER.filter((status) => selected.coverage[status] > 0).map(
                (status) => (
                  <Badge key={status} variant={COVERAGE_VARIANTS[status]}>
                    {selected.coverage[status]} {status}
                  </Badge>
                ),
              )}
            </div>

            <ul className={styles.gapList}>
              {selected.gaps.map((gap) => (
                <li className={styles.gapRow} key={gap.id}>
                  <div>
                    <span className={styles.gapId}>{gap.id}</span>
                    <span className={styles.gapLabel}>{gap.label}</span>
                  </div>
                  <Badge variant={COVERAGE_VARIANTS[gap.status]}>{gap.status}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="independent-truth-title" className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2 id="independent-truth-title">{t('Independent truths')}</h2>
          <p>{t('Never infer one lifecycle from another.')}</p>
        </div>

        <dl className={styles.truthGrid}>
          {INDEPENDENT_TRUTHS.map(([term, description]) => (
            <div key={term}>
              <dt>{t(term)}</dt>
              <dd>{t(description)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className={styles.sourceNote}>
        <RouteIcon aria-hidden="true" size={16} />
        <span>
          {t(
            'Sources: doctor care-loop map, journey catalog, journey case matrix, and pinned kura-platform evidence.',
          )}
        </span>
      </footer>
    </main>
  );
}
