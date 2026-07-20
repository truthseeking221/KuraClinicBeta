'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { CheckIcon, WarningIcon } from '../../components/ui/icons';
import { flagFor, formatDate, formatValue } from './logic';
import type { LabAnalyteResult } from './types';

export type CriticalResultNoticeProps = {
  result: LabAnalyteResult;
  acknowledged: boolean;
  onAcknowledge: () => void;
};

export function CriticalResultNotice({
  acknowledged,
  onAcknowledge,
  result,
}: CriticalResultNoticeProps) {
  const flag = flagFor(result);
  if (flag?.severity !== 'critical') return null;

  if (acknowledged) {
    return (
      <Alert tone="neutral" icon={<CheckIcon />}>
        <AlertTitle>Critical result acknowledged</AlertTitle>
        <AlertDescription>
          {result.name} {formatValue(result.value)} {result.unit ?? ''} · released{' '}
          {formatDate(result.releasedAt)}. This acknowledgment is a design-target event pending
          backend audit mapping.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert tone="danger" icon={<WarningIcon />}>
      <AlertTitle>Critical result requires acknowledgment</AlertTitle>
      <AlertDescription>
        {result.name} {formatValue(result.value)} {result.unit ?? ''} is inside the catalog panic
        tier “{flag.label}”. Review the released history before acknowledging.
      </AlertDescription>
      <AlertAction>
        <Button onClick={onAcknowledge}>
          Acknowledge critical result
        </Button>
      </AlertAction>
    </Alert>
  );
}
