'use client';

import { use } from 'react';

import { useRouter } from 'next/navigation';

import { ComingSoonPage } from '../../../../components/shared/coming-soon';

const SURFACES: Record<string, { title: string; description: string }> = {
  'care-plans': {
    title: 'Care plans',
    description: 'Longitudinal treatment plans with follow-up schedules.',
  },
  telehealth: {
    title: 'Telehealth',
    description: 'Remote consultations linked to the patient record.',
  },
  inbox: {
    title: 'Inbox',
    description: 'Patient messages and clinical correspondence in one queue.',
  },
  tasks: {
    title: 'Tasks',
    description: 'Team to-dos attached to patients and bookings.',
  },
  calendar: {
    title: 'Calendar',
    description: 'Clinic-wide scheduling across practitioners and rooms.',
  },
  documents: {
    title: 'Documents',
    description: 'Signed documents, referrals, and uploads for the front desk.',
  },
  reports: {
    title: 'Reports',
    description: 'Operational reporting for desk and settlement activity.',
  },
  exceptions: {
    title: 'Exceptions',
    description: 'Recollection and rejection workflows for the collection station.',
  },
  supplies: {
    title: 'Supplies',
    description: 'Tube and consumable stock tracking for the draw station.',
  },
};

export default function SoonPage({ params }: { params: Promise<{ surface: string }> }) {
  const { surface } = use(params);
  const router = useRouter();
  const entry = SURFACES[surface] ?? {
    title: 'Planned surface',
    description: 'This part of the product is on the roadmap.',
  };
  return (
    <ComingSoonPage
      description={entry.description}
      onBack={() => router.back()}
      title={entry.title}
    />
  );
}
