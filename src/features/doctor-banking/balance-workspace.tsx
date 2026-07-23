'use client';

import {
  DoctorBalancePage,
  DoctorPaymentsPage,
  DoctorSettlePage,
  DoctorStatementsPage,
} from './doctor-banking';
import type { ActivityQuery } from './logic';
import type {
  DoctorBankingFixture,
  DoctorBankingViewState,
  KhqrIntent,
  MandateLinkSession,
} from './types';

export type BalanceRoute = 'overview' | 'activity' | 'settle' | 'auto-pay';

export type DoctorBalanceWorkspaceProps = {
  data: DoctorBankingFixture;
  route: BalanceRoute;
  state?: DoctorBankingViewState;
  intent?: KhqrIntent | null;
  linkSession?: MandateLinkSession | null;
  downloadState?: 'idle' | 'loading' | 'success' | 'error';
  onNavigate: (route: BalanceRoute) => void;
  onBeginLink?: () => void;
  onCreateKhqr?: () => void;
  onDownload?: (format: 'pdf' | 'xlsx', query: ActivityQuery) => void;
  onOpenLicence?: () => void;
  onRegenerate?: () => void;
  onRegenerateLink?: () => void;
  onRefresh?: () => void;
  onRenew?: () => void;
  onRetry?: () => void;
  onUnlink?: () => void;
};

/** Canonical doctor-owned Balance composition shared by Storybook and the app. */
export function DoctorBalanceWorkspace({
  data,
  downloadState,
  intent,
  linkSession,
  onBeginLink,
  onCreateKhqr,
  onDownload,
  onNavigate,
  onOpenLicence,
  onRefresh,
  onRegenerate,
  onRegenerateLink,
  onRenew,
  onRetry,
  onUnlink,
  route,
  state,
}: DoctorBalanceWorkspaceProps) {
  const returnToOverview = () => onNavigate('overview');

  if (route === 'activity') {
    return (
      <DoctorStatementsPage
        data={data}
        downloadState={downloadState}
        onBack={returnToOverview}
        onDownload={onDownload}
        onOpenLicence={onOpenLicence}
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
        onOpenLicence={onOpenLicence}
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
        licence={data.overview.licence}
        linkSession={linkSession}
        mandate={data.overview.mandate}
        onBack={returnToOverview}
        onBeginLink={onBeginLink}
        onOpenLicence={onOpenLicence}
        onRegenerateLink={onRegenerateLink}
        onRenew={onRenew}
        onRetry={onRetry}
        onUnlink={onUnlink}
        remainingBalance={data.overview.settledBalance}
        state={state}
      />
    );
  }

  return (
    <DoctorBalancePage
      data={data}
      onManageAutoPay={() => onNavigate('auto-pay')}
      onOpenLicence={onOpenLicence}
      onOpenStatements={() => onNavigate('activity')}
      onRetry={onRetry}
      onSettle={() => onNavigate('settle')}
      state={state}
    />
  );
}
