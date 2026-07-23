'use client';

import { useT } from '../../components/foundations/i18n';
import { Badge, Checkbox, SegmentedToggle, Select } from '../../components/ui';

import { ARM_SITES, PRE_DRAW_CHECK_ITEMS } from './catalog';
import type { CollectionPatient, PreDrawChecks as Checks } from './types';
import styles from './pre-draw-checks.module.css';

export type PreDrawChecksProps = {
  patient: CollectionPatient;
  checks: Checks;
  onToggle: (id: keyof Checks) => void;
  arm: 'L' | 'R';
  onArmChange: (arm: 'L' | 'R') => void;
  site: string;
  onSiteChange: (site: string) => void;
  readOnly?: boolean;
};

/**
 * Prep facts the collector confirms against the order, plus the draw site.
 *
 * Consent is deliberately absent. Phlebotomy consent capture is deferred at
 * the platform level, so a required tick here would record a fact the system
 * does not hold — the checkbox would be the only evidence that consent ever
 * existed. Identity is absent too: it has its own evidence, above this block.
 */
export function PreDrawChecks({
  arm,
  checks,
  onArmChange,
  onSiteChange,
  onToggle,
  patient,
  readOnly = false,
  site,
}: PreDrawChecksProps) {
  const t = useT();
  const confirmed = Object.values(checks).filter(Boolean).length;

  return (
    <section aria-label={t('Before the draw')} className={styles.checks}>
      <header className={styles.header}>
        <h3 className={styles.title}>{t('Before the draw')}</h3>
        <span
          className={styles.progress}
          data-complete={confirmed === PRE_DRAW_CHECK_ITEMS.length ? 'true' : undefined}
        >
          {confirmed}/{PRE_DRAW_CHECK_ITEMS.length} {t('confirmed')}
        </span>
      </header>

      {/* The facts being checked against, so the check is a comparison rather
          than a memory test. */}
      <dl className={styles.facts}>
        <div>
          <dt>{t('Order says')}</dt>
          <dd>{t(patient.fasting)}</dd>
        </div>
        <div>
          <dt>{t('Allergies')}</dt>
          <dd>
            {patient.allergies.length ? (
              <span className={styles.allergies}>
                {patient.allergies.map((allergy) => (
                  <Badge key={allergy} size="sm" variant="warning">
                    {allergy}
                  </Badge>
                ))}
              </span>
            ) : (
              t('None recorded')
            )}
          </dd>
        </div>
      </dl>

      <ul className={styles.items}>
        {PRE_DRAW_CHECK_ITEMS.map((item) => (
          <li key={item.id}>
            <Checkbox
              checked={checks[item.id as keyof Checks]}
              disabled={readOnly}
              onCheckedChange={() => onToggle(item.id as keyof Checks)}
            >
              {t(item.label)}
            </Checkbox>
          </li>
        ))}
      </ul>

      <div className={styles.site}>
        <SegmentedToggle
          disabled={readOnly}
          label={t('Arm')}
          onValueChange={(value) => onArmChange(value as 'L' | 'R')}
          options={[
            { value: 'L', label: t('Left arm') },
            { value: 'R', label: t('Right arm') },
          ]}
          value={arm}
        />
        <Select
          disabled={readOnly}
          label={t('Site')}
          onChange={(event) => onSiteChange(event.target.value)}
          options={ARM_SITES.map((option) => ({ value: option, label: t(option) }))}
          value={site}
        />
      </div>
    </section>
  );
}
