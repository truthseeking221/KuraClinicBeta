'use client';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '../../components/ui/alert';
import { useT } from '../../components/foundations/i18n';
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
  const t = useT();
  const flag = flagFor(result);
  if (flag?.severity !== 'critical') return null;

  if (acknowledged) {
    return (
      <Alert tone="neutral" icon={<CheckIcon />}>
        <AlertTitle>{t('Critical result acknowledged')}</AlertTitle>
        <AlertDescription>
          {result.name} {formatValue(result.value)} {result.unit ?? ''} · {t('released')}{' '}
          {formatDate(result.releasedAt, 'en-US', t)}.{' '}
          {t(
            'This acknowledgment is a design-target event pending backend audit mapping.',
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert tone="danger" icon={<WarningIcon />}>
      <AlertTitle>{t('Critical result requires acknowledgment')}</AlertTitle>
      <AlertDescription>
        {result.name} {formatValue(result.value)} {result.unit ?? ''}{' '}
        {t('is inside the catalog panic tier “{tier}”.').replace('{tier}', flag.label)}{' '}
        {t('Review the released history before acknowledging.')}
      </AlertDescription>
      <AlertAction>
        <Button onClick={onAcknowledge}>{t('Acknowledge critical result')}</Button>
      </AlertAction>
    </Alert>
  );
}
