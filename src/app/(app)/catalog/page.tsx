'use client';

/**
 * Catalog → order start. Picking tests leads into the phone gate — the
 * safety checkpoint before any booking code is sent. Outcome and dismissal
 * semantics come entirely from the canonical PhoneGateModal.
 */

import { useState } from 'react';

import { Badge, Button, toast } from '../../../components/ui';
import { LabTestPicker } from '../../../features/lab-catalog';
import {
  FIGMA_DEFAULT_SELECTED_TEST_IDS,
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from '../../../features/lab-catalog/demo-data';
import { PhoneGateModal } from '../../../features/phone-gate';
import {
  DEMO_OTP,
  DEMO_RESEND_COOLDOWN_SECS,
  demoLookup,
  demoRateLimited,
} from '../../../features/phone-gate/demo-data';
import styles from '../../_demo/app-pages.module.css';

export default function CatalogPage() {
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([
    ...FIGMA_DEFAULT_SELECTED_TEST_IDS,
  ]);
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <div className={styles.stack}>
      <div className={styles.toolbar}>
        {selectedTestIds.length > 0 ? (
          <Badge size="sm" variant="primary">
            {selectedTestIds.length} selected
          </Badge>
        ) : null}
        <Button
          disabled={selectedTestIds.length === 0}
          onClick={() => setGateOpen(true)}
          size="sm"
          variant="primary"
        >
          Choose patient
        </Button>
      </div>
      <LabTestPicker
        categories={LAB_CATALOG_CATEGORIES}
        onSelectedTestIdsChange={(ids) => setSelectedTestIds([...ids])}
        selectedTestIds={selectedTestIds}
        tests={LAB_CATALOG_TESTS}
      />
      <PhoneGateModal
        expectedCode={DEMO_OTP}
        lookup={demoLookup}
        onClose={() => setGateOpen(false)}
        onOutcome={(outcome) => {
          toast.success(
            outcome.kind === 'existing'
              ? `Order continues for ${outcome.patient.name}`
              : 'Order continues for the temporary patient',
          );
          setSelectedTestIds([]);
        }}
        open={gateOpen}
        rateLimited={demoRateLimited}
        resendCooldownSecs={DEMO_RESEND_COOLDOWN_SECS}
      />
    </div>
  );
}
