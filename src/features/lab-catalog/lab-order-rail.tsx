'use client';

import { useId, useState } from 'react';

import { Button, CloseButton } from '../../components/ui';

import { useT } from '../../components/foundations/i18n';
import { LabTestPicker } from './lab-test-picker';
import type { LabCatalogCategory, LabCatalogTest } from './types';
import styles from './lab-order-rail.module.css';

export type LabOrderRailProps = {
  tests: readonly LabCatalogTest[];
  categories: readonly LabCatalogCategory[];
  selectedTestIds?: readonly string[];
  defaultSelectedTestIds?: readonly string[];
  onSelectedTestIdsChange?: (selectedTestIds: string[]) => void;
  onClose: () => void;
  /** Opens the governed review step; it does not submit an order. */
  onReview?: (selectedTestIds: string[]) => void;
};

/** Compact order drafting workspace for the patient-chart right rail. */
export function LabOrderRail({
  categories,
  defaultSelectedTestIds = [],
  onClose,
  onReview,
  onSelectedTestIdsChange,
  selectedTestIds: controlledSelectedTestIds,
  tests,
}: LabOrderRailProps) {
  const t = useT();
  const titleId = useId();
  const [internalSelectedTestIds, setInternalSelectedTestIds] = useState<string[]>([
    ...defaultSelectedTestIds,
  ]);
  const selectedTestIds = controlledSelectedTestIds
    ? [...controlledSelectedTestIds]
    : internalSelectedTestIds;
  const selectedCount = selectedTestIds.length;

  function updateSelection(nextSelectedTestIds: string[]) {
    if (controlledSelectedTestIds === undefined) {
      setInternalSelectedTestIds(nextSelectedTestIds);
    }
    onSelectedTestIdsChange?.(nextSelectedTestIds);
  }

  return (
    <section aria-labelledby={titleId} className={styles.rail}>
      <header className={styles.header}>
        <h2 className={styles.title} id={titleId}>
          {t('Order lab tests')}
        </h2>
        <CloseButton aria-label={t('Close lab order')} onClick={onClose} size="sm" />
      </header>

      <div className={styles.picker}>
        <LabTestPicker
          categories={categories}
          onSelectedTestIdsChange={(nextSelectedTestIds) => updateSelection(nextSelectedTestIds)}
          scrollMode="contained"
          selectedTestIds={selectedTestIds}
          showResultSummary={false}
          tests={tests}
          totalCount={tests.length}
        />
      </div>

      <footer className={styles.footer}>
        <div className={styles.selectionSummary}>
          <span aria-live="polite" className={styles.selectionCount}>
            {t('{count} selected').replace('{count}', String(selectedCount))}
          </span>
          <span className={styles.draftNote}>
            {t(
              onReview
                ? 'Review does not submit.'
                : 'Review is not connected in this prototype.',
            )}
          </span>
        </div>
        <Button
          disabled={selectedCount === 0 || !onReview}
          onClick={() => onReview?.(selectedTestIds)}
          size="sm"
          variant="primary"
        >
          {t('Review order')}
        </Button>
      </footer>
    </section>
  );
}
