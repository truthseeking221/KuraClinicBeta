'use client';

import { Checkbox, SegmentedToggle, Select } from '../../components/ui';

import { ARM_SITES, SAFETY_CHECK_ITEMS } from './catalog';
import { checklistComplete } from './logic';
import type { SafetyChecks } from './types';
import styles from './safety-checklist.module.css';

export type SafetyChecklistProps = {
  checks: SafetyChecks;
  onToggle: (id: keyof SafetyChecks) => void;
  arm: 'L' | 'R';
  onArmChange: (arm: 'L' | 'R') => void;
  site: string;
  onSiteChange: (site: string) => void;
};

/**
 * Pre-draw safety confirmation. Unlike the legacy prototype, this checklist
 * GATES collection — collect actions stay disabled until all five items are
 * confirmed. Positive ID stays an open question asked to the patient, never
 * a leading yes/no prompt.
 */
export function SafetyChecklist({
  arm,
  checks,
  onArmChange,
  onSiteChange,
  onToggle,
  site,
}: SafetyChecklistProps) {
  const confirmedCount = Object.values(checks).filter(Boolean).length;
  const complete = checklistComplete(checks);

  return (
    <section aria-label="Pre-draw safety checklist" className={styles.checklist}>
      <header className={styles.header}>
        <h3 className={styles.title}>Before the draw</h3>
        <span className={styles.progress} data-complete={complete ? 'true' : undefined}>
          {confirmedCount}/{SAFETY_CHECK_ITEMS.length} confirmed
        </span>
      </header>

      <ul className={styles.items}>
        {SAFETY_CHECK_ITEMS.map((item) => (
          <li key={item.id}>
            <Checkbox
              checked={checks[item.id as keyof SafetyChecks]}
              onCheckedChange={() => onToggle(item.id as keyof SafetyChecks)}
            >
              {item.label}
            </Checkbox>
          </li>
        ))}
      </ul>

      <div className={styles.site}>
        <SegmentedToggle
          label="Arm"
          onValueChange={(value) => onArmChange(value as 'L' | 'R')}
          options={[
            { value: 'L', label: 'Left arm' },
            { value: 'R', label: 'Right arm' },
          ]}
          value={arm}
        />
        <Select
          label="Site"
          onChange={(event) => onSiteChange(event.target.value)}
          options={ARM_SITES.map((option) => ({ value: option, label: option }))}
          value={site}
        />
      </div>
    </section>
  );
}
