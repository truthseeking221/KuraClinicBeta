'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Radio,
  RadioGroup,
} from '../../components/ui';

import { MANUAL_LABEL_REASONS, tubeByKey } from './catalog';
import { resolveLabelScan } from './logic';
import type { ActualSample, CollectionPatient, LabelPrintResult, LabelScanResult } from './types';
import styles from './tube-labeling.module.css';

export type TubeLabelingProps = {
  /** The tube being labelled; null closes the dialog. */
  sample: ActualSample | null;
  /** Every registered sample, so a scan of the wrong tube can be named. */
  samples: readonly ActualSample[];
  patient: CollectionPatient;
  now: number;
  onPrint: () => LabelPrintResult;
  onPrinted: () => void;
  onVerified: () => void;
  onManualFallback: (reason: string) => void;
  onClose: () => void;
};

/**
 * Labelling one tube, at the chair, immediately after it was drawn.
 *
 * The label is printed for a specific sample identity and then scanned back:
 * scanning is what proves the right label went on the right tube, and it is
 * the same barcode custody will scan later. A label that is printed but never
 * verified is not evidence of anything, so it does not close this step.
 *
 * Handwriting stays available because a clinic whose printer is down still has
 * to send blood — but it is recorded as a fallback with a reason, because
 * nothing downstream can machine-read a pen stroke and accession has to
 * relabel the tube.
 */
export function TubeLabeling(props: TubeLabelingProps) {
  return (
    <Dialog
      onOpenChange={(open) => (!open ? props.onClose() : undefined)}
      open={props.sample !== null}
    >
      {props.sample ? <TubeLabelingBody {...props} sample={props.sample} /> : null}
    </Dialog>
  );
}

function TubeLabelingBody({
  onManualFallback,
  onPrint,
  onPrinted,
  onVerified,
  patient,
  sample,
  samples,
}: TubeLabelingProps & { sample: ActualSample }) {
  const t = useT();
  const [printError, setPrintError] = useState(false);
  const [scanValue, setScanValue] = useState('');
  const [scanResult, setScanResult] = useState<LabelScanResult | null>(null);
  const [manualReason, setManualReason] = useState('');
  const [manualOpen, setManualOpen] = useState(false);
  const scanRef = useRef<HTMLInputElement>(null);
  const tube = tubeByKey(sample.tube);
  const printed = sample.label.state === 'printed';

  useEffect(() => {
    if (printed) scanRef.current?.focus();
  }, [printed]);

  function handlePrint() {
    const result = onPrint();
    if (result.kind === 'printer_offline') {
      setPrintError(true);
      setManualOpen(true);
      return;
    }
    setPrintError(false);
    onPrinted();
  }

  function handleScan(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const result = resolveLabelScan(samples, sample.sampleId, scanValue);
    setScanResult(result);
    setScanValue('');
    if (result.kind === 'verified') onVerified();
  }

  return (
    <DialogContent size="sm">
      <DialogHeader>
        <DialogTitle>{t('Label this tube')}</DialogTitle>
        <DialogDescription>
          {t('Print, attach at the chair, then scan the label back to confirm it.')}
        </DialogDescription>
      </DialogHeader>

      <DialogBody className={styles.body}>
        {/* What the label must carry: the full patient name and the sample
            identity the lab and the courier both read. */}
        <div className={styles.preview}>
          <span className={styles.previewName}>{patient.name}</span>
          <span className={styles.previewMeta}>
            {patient.dob} · {patient.sex} · {patient.pid}
          </span>
          <span className={styles.previewSample}>{sample.sampleId}</span>
          <span className={styles.previewTube}>
            {tube?.stopperLabel} · {sample.tests.join(', ')}
          </span>
        </div>

        {printError ? (
          <Alert tone="warning">
            <AlertTitle>{t('Printer did not respond')}</AlertTitle>
            <AlertDescription>
              {t('Try again, or write the label by hand and record why.')}
            </AlertDescription>
          </Alert>
        ) : null}

        {scanResult?.kind === 'wrong_sample' ? (
          <Alert tone="danger">
            <AlertTitle>{t('That label belongs to another tube')}</AlertTitle>
            <AlertDescription>
              {t('Remove it. A label on the wrong tube sends a result to the wrong patient.')}
            </AlertDescription>
          </Alert>
        ) : null}

        {scanResult?.kind === 'unknown' ? (
          <Alert tone="warning">
            <AlertTitle>{t('Label not recognised')}</AlertTitle>
            <AlertDescription>
              {t('Scan the label on this tube, or reprint it.')}
            </AlertDescription>
          </Alert>
        ) : null}

        <ol className={styles.steps}>
          <li className={styles.step} data-done={printed || undefined}>
            <span className={styles.stepCopy}>
              <strong>{t('Print the label')}</strong>
              <span>{t('Printed at the draw point, for this sample only.')}</span>
            </span>
            <Button onClick={handlePrint} size="sm" variant={printed ? 'outline' : 'primary'}>
              {printed ? t('Reprint') : t('Print label')}
            </Button>
          </li>

          <li className={styles.step} data-disabled={!printed || undefined}>
            <span className={styles.stepCopy}>
              <strong>{t('Attach it, then scan it back')}</strong>
              <span>{t('The scan is the proof, not the print.')}</span>
            </span>
            <Input
              aria-label={t('Scan the attached label')}
              disabled={!printed}
              onChange={(event) => setScanValue(event.target.value)}
              onKeyDown={handleScan}
              placeholder={t('Scan label barcode')}
              ref={scanRef}
              value={scanValue}
            />
          </li>
        </ol>

        {/* Radios, not a dropdown: three fixed reasons, and a listbox portal
            inside a modal dialog is unreachable behind the dialog's pointer
            lock. */}
        {manualOpen ? (
          <div className={styles.manual}>
            <RadioGroup
              legend={t('Why is this label handwritten?')}
              onValueChange={setManualReason}
              required
              value={manualReason || undefined}
            >
              {MANUAL_LABEL_REASONS.map((reason) => (
                <Radio key={reason} value={reason}>
                  {t(reason)}
                </Radio>
              ))}
            </RadioGroup>
            <p className={styles.manualNote}>
              {t('Recorded on the sample. Accession relabels it on arrival.')}
            </p>
          </div>
        ) : null}
      </DialogBody>

      <DialogFooter>
        {manualOpen ? (
          <>
            <Button onClick={() => setManualOpen(false)} variant="ghost">
              {t('Back')}
            </Button>
            <Button
              disabled={!manualReason}
              onClick={() => onManualFallback(manualReason)}
              variant="primary"
            >
              {t('Record handwritten label')}
            </Button>
          </>
        ) : (
          <Button onClick={() => setManualOpen(true)} variant="ghost">
            {t('No printer — write by hand')}
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
