'use client';

/**
 * Catalog → order start. Picking tests leads into the phone gate — the
 * safety checkpoint before any booking code is sent. Outcome and dismissal
 * semantics come entirely from the canonical PhoneGateModal.
 */

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { toast } from '../../../components/ui';
import { CatalogWorkspace } from '../../../features/lab-catalog';
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from '../../../features/lab-catalog/demo-data';
import { isLiveLicence } from '../../../features/licence/logic';
import { PhoneGateModal } from '../../../features/phone-gate';
import {
  DEMO_OTP,
  DEMO_RESEND_COOLDOWN_SECS,
  demoLookup,
  demoRateLimited,
} from '../../../features/phone-gate/demo-data';
import { useDemoSession } from '../../_demo/demo-session';
import { useSettingsDialog } from '../../_demo/settings-dialog-context';

function CatalogPageContent() {
  const searchParams = useSearchParams();
  const { session } = useDemoSession();
  const { openSettings } = useSettingsDialog();
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [gateOpen, setGateOpen] = useState(false);
  const isPscBooking = searchParams.get('intent') === 'booking';
  const canPlaceOrder = isPscBooking || isLiveLicence(session.licence);

  return (
    <>
      <CatalogWorkspace
        canPlaceOrder={canPlaceOrder}
        categories={LAB_CATALOG_CATEGORIES}
        onChoosePatient={() => setGateOpen(true)}
        onSelectedTestIdsChange={(ids) => setSelectedTestIds([...ids])}
        onVerifyLicence={() => openSettings('account')}
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
    </>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogPageContent />
    </Suspense>
  );
}
