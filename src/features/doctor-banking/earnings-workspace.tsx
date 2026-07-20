'use client';

import {
  DoctorBalancePage,
  DoctorPaymentsPage,
  DoctorSettlePage,
  DoctorStatementsPage,
} from './doctor-banking';
import type {
  DoctorBankingFixture,
  DoctorBankingViewState,
  KhqrIntent,
  MandateLinkSession,
} from './types';

export type EarningsRoute = 'overview' | 'activity' | 'settle' | 'auto-pay';

export type DoctorEarningsWorkspaceProps = {
  data: DoctorBankingFixture;
  route: EarningsRoute;
  state?: DoctorBankingViewState;
  intent?: KhqrIntent | null;
  linkSession?: MandateLinkSession | null;
  downloadState?: 'idle' | 'loading' | 'success' | 'error';
  onNavigate: (route: EarningsRoute) => void;
  onBeginLink?: () => void;
  onCreateKhqr?: () => void;
  onDownload?: (format: 'pdf' | 'xlsx') => void;
  onRegenerate?: () => void;
  onRegenerateLink?: () => void;
  onRefresh?: () => void;
  onRenew?: () => void;
  onRetry?: () => void;
  onUnlink?: () => void;
};

/** Canonical person-owned Earnings composition shared by Storybook and the app. */
export function DoctorEarningsWorkspace({
  data,
  downloadState,
  intent,
  linkSession,
  onBeginLink,
  onCreateKhqr,
  onDownload,
  onNavigate,
  onRefresh,
  onRegenerate,
  onRegenerateLink,
  onRenew,
  onRetry,
  onUnlink,
  route,
  state,
}: DoctorEarningsWorkspaceProps) {
  const returnToOverview = () => onNavigate('overview');

  if (route === 'activity') {
    return (
      <DoctorStatementsPage
        data={data}
        downloadState={downloadState}
        onBack={returnToOverview}
        onDownload={onDownload}
        onRetry={onRetry}
        state={state}
      />
    );
  }

  if (route === 'settle') {
    return (
      <DoctorSettlePage
        intent={intent}
        onBack={returnToOverview}
        onCreateKhqr={onCreateKhqr}
        onRefresh={onRefresh}
        onRegenerate={onRegenerate}
        onRetry={onRetry}
        overview={data.overview}
        state={state}
      />
    );
  }

  if (route === 'auto-pay') {
    return (
      <DoctorPaymentsPage
        linkSession={linkSession}
        mandate={data.overview.mandate}
        onBack={returnToOverview}
        onBeginLink={onBeginLink}
        onRegenerateLink={onRegenerateLink}
        onRenew={onRenew}
        onRetry={onRetry}
        onUnlink={onUnlink}
        state={state}
      />
    );
  }

  return (
    <DoctorBalancePage
      data={data}
      onManageAutoPay={() => onNavigate('auto-pay')}
      onOpenStatements={() => onNavigate('activity')}
      onRetry={onRetry}
      onSettle={() => onNavigate('settle')}
      state={state}
    />
  );
}
