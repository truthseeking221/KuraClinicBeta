'use client';

import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  SegmentedToggle,
  Textarea,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';
import { VitalsForm } from '../collection/vitals-form';
import type { VitalsValues } from '../collection/types';

import styles from './assessment.module.css';
import { ICD10_SHORTLIST } from './demo-data';
import {
  assessmentBlockers,
  canGroundOrder,
  certaintyLabel,
  diagnosisLine,
  orderableDiagnoses,
} from './logic';
import type { ClinicalAssessment, DiagnosisCertainty, WorkingDiagnosis } from './types';

export type AssessmentWorkspaceProps = {
  patientName: string;
  patientDemographics: string;
  assessment: ClinicalAssessment;
  onChange: (assessment: ClinicalAssessment) => void;
  /** Hands the grounded assessment to test ordering. */
  onOrderTests?: (assessment: ClinicalAssessment) => void;
  orderActionLabel?: string;
};

const CERTAINTY_OPTIONS: readonly { value: DiagnosisCertainty; label: string }[] = [
  { value: 'working', label: 'Working' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'ruled-out', label: 'Ruled out' },
];

function vitalsLine(vitals: VitalsValues): string {
  const parts = [
    vitals.bpSys && vitals.bpDia ? `BP ${vitals.bpSys}/${vitals.bpDia}` : '',
    vitals.hr ? `HR ${vitals.hr}` : '',
    vitals.tempC ? `Temp ${vitals.tempC} °${vitals.tempUnit}` : '',
    vitals.spo2 ? `SpO₂ ${vitals.spo2}%` : '',
  ].filter(Boolean);
  return parts.join(' · ');
}

/**
 * The doctor's encounter surface. The assessment section is the loudest part
 * of the card because it is the only part the rest of the journey reads: an
 * order, a care plan, and a later review all trace back to a diagnosis
 * recorded here.
 */
export function AssessmentWorkspace({
  assessment,
  onChange,
  onOrderTests,
  orderActionLabel = 'Order tests',
  patientDemographics,
  patientName,
}: AssessmentWorkspaceProps) {
  const t = useT();
  const [draftLabel, setDraftLabel] = useState('');
  const [draftCode, setDraftCode] = useState('');
  const [draftEvidence, setDraftEvidence] = useState('');

  const blockers = assessmentBlockers(assessment);
  const grounded = canGroundOrder(assessment);
  const held = orderableDiagnoses(assessment.diagnoses);

  const patch = (next: Partial<ClinicalAssessment>) => onChange({ ...assessment, ...next });

  const addDiagnosis = () => {
    const label = draftLabel.trim();
    if (label === '') return;
    const known = ICD10_SHORTLIST.find(
      (entry) => entry.label.toLowerCase() === label.toLowerCase(),
    );
    const diagnosis: WorkingDiagnosis = {
      id: `dx-${assessment.diagnoses.length + 1}-${label.toLowerCase().replace(/\W+/g, '-')}`,
      code: draftCode.trim() || known?.code || '',
      label: known?.label ?? label,
      certainty: 'working',
      evidence: draftEvidence.trim() || undefined,
    };
    patch({ diagnoses: [...assessment.diagnoses, diagnosis] });
    setDraftLabel('');
    setDraftCode('');
    setDraftEvidence('');
  };

  const setCertainty = (id: string, certainty: DiagnosisCertainty) =>
    patch({
      diagnoses: assessment.diagnoses.map((diagnosis) =>
        diagnosis.id === id ? { ...diagnosis, certainty } : diagnosis,
      ),
    });

  const removeDiagnosis = (id: string) =>
    patch({ diagnoses: assessment.diagnoses.filter((diagnosis) => diagnosis.id !== id) });

  return (
    <Card as="section" aria-label={t('Clinical assessment')} className={styles.card}>
      <CardHeader>
        <CardTitle>{t('Clinical assessment')}</CardTitle>
        <div className={styles.identity}>
          <span className={styles.patientName}>{patientName}</span>
          <span className={styles.demographics}>{patientDemographics}</span>
          {assessment.status === 'signed' ? (
            <Badge variant="success">{t('Signed')}</Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className={styles.content}>
        <Input
          label={t('Reason for visit')}
          required
          helpText={t("In the patient's own words.")}
          onChange={(event) => patch({ reasonForVisit: event.target.value })}
          value={assessment.reasonForVisit}
        />

        <Textarea
          label={t('Symptoms and history')}
          onChange={(event) => patch({ subjective: event.target.value })}
          rows={3}
          value={assessment.subjective}
        />

        <Textarea
          label={t('Examination findings')}
          onChange={(event) => patch({ objective: event.target.value })}
          rows={3}
          value={assessment.objective}
        />

        <Collapsible className={styles.vitals}>
          <CollapsibleTrigger>
            {assessment.vitals
              ? `${t('Vital signs')} · ${vitalsLine(assessment.vitals)}`
              : t('Record vital signs')}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <VitalsForm
              initial={assessment.vitals}
              onSubmit={(vitals) => patch({ vitals })}
              patientId={assessment.patientId}
            />
          </CollapsibleContent>
        </Collapsible>

        <section aria-label={t('Assessment')} className={styles.assessment}>
          <h3 className={styles.sectionTitle}>{t('Assessment')}</h3>
          <p className={styles.sectionHint}>
            {t('Every test ordered from this visit carries one of these as its stated reason.')}
          </p>

          {assessment.diagnoses.length === 0 ? (
            <p className={styles.empty}>{t('No diagnosis recorded yet.')}</p>
          ) : (
            <ul className={styles.diagnosisList}>
              {assessment.diagnoses.map((diagnosis) => (
                <li className={styles.diagnosis} key={diagnosis.id}>
                  <div className={styles.diagnosisMain}>
                    <span className={styles.diagnosisLabel}>{diagnosisLine(diagnosis)}</span>
                    {diagnosis.evidence ? (
                      <span className={styles.diagnosisEvidence}>{diagnosis.evidence}</span>
                    ) : null}
                  </div>
                  <SegmentedToggle
                    label={`${t('Certainty for')} ${diagnosis.label}`}
                    onValueChange={(value) => setCertainty(diagnosis.id, value as DiagnosisCertainty)}
                    options={CERTAINTY_OPTIONS.map((option) => ({
                      ...option,
                      label: t(option.label),
                    }))}
                    value={diagnosis.certainty}
                  />
                  <Button
                    aria-label={`${t('Remove')} ${diagnosis.label}`}
                    onClick={() => removeDiagnosis(diagnosis.id)}
                    size="sm"
                    variant="ghost"
                  >
                    {t('Remove')}
                  </Button>
                </li>
              ))}
            </ul>
          )}

          <div className={styles.addRow}>
            <Input
              label={t('Diagnosis or impression')}
              list="assessment-icd-shortlist"
              onChange={(event) => setDraftLabel(event.target.value)}
              placeholder={t('Type or pick a coded diagnosis')}
              value={draftLabel}
            />
            <datalist id="assessment-icd-shortlist">
              {ICD10_SHORTLIST.map((entry) => (
                <option key={entry.code} value={entry.label}>
                  {entry.code}
                </option>
              ))}
            </datalist>
            <Input
              label="ICD-10"
              helpText={t('Optional while the impression is uncoded.')}
              onChange={(event) => setDraftCode(event.target.value)}
              value={draftCode}
            />
            <Input
              label={t('Evidence')}
              onChange={(event) => setDraftEvidence(event.target.value)}
              value={draftEvidence}
            />
            <Button disabled={draftLabel.trim() === ''} onClick={addDiagnosis} variant="outline">
              {t('Add diagnosis')}
            </Button>
          </div>
        </section>

        <Textarea
          label={t('Plan')}
          onChange={(event) => patch({ plan: event.target.value })}
          rows={2}
          value={assessment.plan}
        />
      </CardContent>

      <footer className={styles.footer}>
        {blockers.length > 0 ? (
          <div className={styles.blockers}>
            <p className={styles.blockersTitle}>{t('Still needed')}</p>
            <ul>
              {blockers.map((blocker) => (
                <li key={blocker.field}>{t(blocker.label)}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={styles.grounded}>
            {held.length === 1
              ? `${t('Orders will carry')} ${diagnosisLine(held[0])} (${t(certaintyLabel(held[0].certainty)).toLowerCase()}).`
              : `${held.length} ${t('diagnoses available as an order reason.')}`}
          </p>
        )}
        <Button disabled={!grounded} onClick={() => onOrderTests?.(assessment)}>
          {t(orderActionLabel)}
        </Button>
      </footer>
    </Card>
  );
}
