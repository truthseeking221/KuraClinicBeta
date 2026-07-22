'use client';

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

      <div className={styles.actions}>
        {selectedCount > 0 ? (
          <Badge size="sm" variant="primary">
            {t('{count} selected').replace('{count}', String(selectedCount))}
          </Badge>
        ) : null}
        <Button
          disabled={selectedCount === 0 || !canPlaceOrder}
          onClick={onChoosePatient}
          size="sm"
          variant="primary"
        >
          {t('Choose patient')}
        </Button>
      </div>
    </div>
  );
}
