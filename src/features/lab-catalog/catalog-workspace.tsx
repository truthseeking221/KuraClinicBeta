'use client';

import { useState } from 'react';

import { Card } from '../../components/ui';
import {
  WorkspacePage,
  WorkspacePageHeader,
} from '../../components/shared';
import { useT } from '../../components/foundations/i18n';

import { CatalogOrderStart } from './catalog-order-start';
import { LabTestPicker } from './lab-test-picker';
import type {
  LabCatalogCategory,
  LabCatalogPickerState,
  LabCatalogTest,
} from './types';
import styles from './catalog-workspace.module.css';

export type CatalogWorkspaceProps = {
  tests: readonly LabCatalogTest[];
  categories: readonly LabCatalogCategory[];
  totalCount?: number;
  state?: LabCatalogPickerState;
  canPlaceOrder: boolean;
  selectedTestIds?: readonly string[];
  defaultSelectedTestIds?: readonly string[];
  onSelectedTestIdsChange?: (selectedTestIds: string[]) => void;
  onChoosePatient: () => void;
  onVerifyLicence?: () => void;
  onRetry?: () => void;
};

/**
 * Storybook-owned full catalog page. Selection stays with the canonical picker;
 * this owner only supplies page hierarchy and the governed order-start gate.
 */
export function CatalogWorkspace({
  canPlaceOrder,
  categories,
  defaultSelectedTestIds = [],
  onChoosePatient,
  onRetry,
  onSelectedTestIdsChange,
  onVerifyLicence,
  selectedTestIds: controlledSelectedTestIds,
  state = 'ready',
  tests,
  totalCount,
}: CatalogWorkspaceProps) {
  const t = useT();
  const [internalSelectedTestIds, setInternalSelectedTestIds] = useState<string[]>([
    ...defaultSelectedTestIds,
  ]);
  const selectedTestIds = controlledSelectedTestIds
    ? [...controlledSelectedTestIds]
    : internalSelectedTestIds;

  function updateSelection(nextSelectedTestIds: string[]) {
    if (controlledSelectedTestIds === undefined) {
      setInternalSelectedTestIds(nextSelectedTestIds);
    }
    onSelectedTestIdsChange?.(nextSelectedTestIds);
  }

  return (
    <WorkspacePage width="wide">
      <WorkspacePageHeader
        actions={
          canPlaceOrder ? (
            <CatalogOrderStart
              canPlaceOrder
              onChoosePatient={onChoosePatient}
              selectedCount={selectedTestIds.length}
            />
          ) : undefined
        }
        description={t('Browse current tests and build an order.')}
        title={t('Catalog')}
      />

      {!canPlaceOrder ? (
        <Card
          aria-label={t('Order access')}
          as="section"
          className={styles.orderStart}
        >
          <CatalogOrderStart
            canPlaceOrder={false}
            onChoosePatient={onChoosePatient}
            onVerifyLicence={onVerifyLicence}
            selectedCount={selectedTestIds.length}
          />
        </Card>
      ) : null}

      <Card
        as="div"
        className={styles.catalog}
        variant="outline"
      >
        <LabTestPicker
          categories={categories}
          onRetry={onRetry}
          onSelectedTestIdsChange={(ids) => updateSelection([...ids])}
          selectedTestIds={selectedTestIds}
          scrollMode="contained"
          state={state}
          tests={tests}
          totalCount={totalCount ?? tests.length}
        />
      </Card>
    </WorkspacePage>
  );
}
