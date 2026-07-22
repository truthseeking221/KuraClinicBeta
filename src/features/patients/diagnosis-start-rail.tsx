'use client';

import type { ComponentType } from 'react';

import {
  AiBrainIcon,
  Button,
  LinkIcon,
  PillIcon,
  SearchIcon,
  StethoscopeIcon,
  type KuraIconProps,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import styles from './diagnosis-start-rail.module.css';

type GuidanceItem = {
  description: string;
  icon: ComponentType<KuraIconProps>;
  id: 'suggestions' | 'search' | 'evidence' | 'prescribe';
  title: string;
};

const GUIDANCE_ITEMS: readonly GuidanceItem[] = [
  {
    description: 'Codes based on abnormal labs.',
    icon: AiBrainIcon,
    id: 'suggestions',
    title: 'Review AI ICD-10 suggestions',
  },
  {
    description: 'Add a code when needed.',
    icon: SearchIcon,
    id: 'search',
    title: 'Add or search a diagnosis',
  },
  {
    description: 'Keep supporting values linked.',
    icon: LinkIcon,
    id: 'evidence',
    title: 'Attach labs as evidence',
  },
  {
    description: 'Move into treatment once diagnoses are confirmed.',
    icon: PillIcon,
    id: 'prescribe',
    title: 'Continue to prescribing',
  },
];

export type DiagnosisStartRailProps = {
  /** Opens the caller-owned diagnosis review. This rail never writes a diagnosis. */
  onStart: () => void;
  /** Caller-owned prerequisite or permission reason that prevents starting. */
  blockedReason?: string;
};

/**
 * Entry rail for the evidence-to-diagnosis workflow. The four rows orient the
 * clinician; the single button is the only action on this surface.
 */
export function DiagnosisStartRail({ blockedReason, onStart }: DiagnosisStartRailProps) {
  const t = useT();
  const blocked = Boolean(blockedReason);

  return (
    <aside aria-labelledby="diagnosis-start-title" className={styles.rail}>
      <div className={styles.guide}>
        <span aria-hidden="true" className={styles.heroIcon}>
          <StethoscopeIcon iconStyle="duotone-rounded" size={22} />
        </span>
        <h2 className={styles.title} id="diagnosis-start-title">
          {t('Ready to diagnose?')}
        </h2>
        <p className={styles.description}>{t('Confirm diagnoses before treatment.')}</p>

        <ol className={styles.steps}>
          {GUIDANCE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li className={styles.step} key={item.id}>
                <span
                  aria-hidden="true"
                  className={styles.stepIcon}
                  data-ai={item.id === 'suggestions' || undefined}
                >
                  <Icon iconStyle="duotone-rounded" size={24} />
                </span>
                <span className={styles.stepCopy}>
                  <strong>{t(item.title)}</strong>
                  <span>{t(item.description)}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className={styles.action}>
          <Button
            aria-describedby={blocked ? 'diagnosis-start-blocked-reason' : undefined}
            disabled={blocked}
            fullWidth
            leadingIcon={<StethoscopeIcon aria-hidden="true" />}
            onClick={onStart}
            variant="primary"
          >
            {t('Diagnose this patient')}
          </Button>
          {blockedReason ? (
            <p className={styles.blockedReason} id="diagnosis-start-blocked-reason">
              {t(blockedReason)}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
