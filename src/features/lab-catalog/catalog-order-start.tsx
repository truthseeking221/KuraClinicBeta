'use client';

"use client";

import { useId } from "react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
} from '../../components/ui';

import { useT } from '../../components/foundations/i18n';
import styles from './catalog-order-start.module.css';

export type CatalogOrderStartProps = {
  selectedCount: number;
  canPlaceOrder: boolean;
  onChoosePatient: () => void;
  onVerifyLicence?: () => void;
};

/** Order-start gate above the catalog; browsing remains available independently. */
export function CatalogOrderStart({
  canPlaceOrder,
  onChoosePatient,
  onVerifyLicence,
  selectedCount,
}: CatalogOrderStartProps) {
  const t = useT();
  const selectionHintId = useId();
  const selectionMissing = canPlaceOrder && selectedCount === 0;

  return (
    <div className={styles.start}>
      {!canPlaceOrder ? (
        <Alert tone="warning">
          <AlertTitle>{t('Licence required to place orders')}</AlertTitle>
          <AlertDescription>
            {t(
              'You can browse the catalog and prices now. A live credential is required for self-attribution.',
            )}
          </AlertDescription>
          {onVerifyLicence ? (
            <AlertAction>
              <Button onClick={onVerifyLicence} variant="outline">
                {t('Verify licence')}
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      ) : null}

      {canPlaceOrder || selectedCount > 0 ? (
        <div className={styles.actions}>
          {selectedCount > 0 ? (
            <Badge size="sm" variant="primary">
              {t('{count} selected').replace('{count}', String(selectedCount))}
            </Badge>
          ) : null}
          {selectionMissing ? (
            <span className={styles.selectionHint} id={selectionHintId}>
              {t('Select at least one test')}
            </span>
          ) : null}
          {canPlaceOrder ? (
            <Button
              aria-describedby={selectionMissing ? selectionHintId : undefined}
              disabled={selectionMissing}
              onClick={onChoosePatient}
              size="sm"
              variant="primary"
            >
              {t('Choose patient')}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
