'use client';

import { useMemo, useState } from 'react';

import {
  AddIcon,
  AiBrainIcon,
  Badge,
  Button,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  CloseButton,
  IconButton,
  Input,
  SearchIcon,
  SegmentedToggle,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import type {
  DiagnosisContext,
  MedicationOption,
  MedicationSuggestion,
  PrescribeDecision,
  PrescribeDraft,
  PrescribeDraftAddition,
  PrescribeDraftDecision,
  PrescribeMedication,
  SettledMedication,
} from './types';
import styles from './prescribe-rail.module.css';

const DECISION_LABEL: Record<PrescribeDecision, string> = {
  keep: 'Draft · keep current',
  adjust: 'Draft · adjust',
  pause: 'Draft · pause',
  stop: 'Draft · stop',
};

export type PrescribeRailProps = {
  /** Display name as the registry provides it; never split or reordered. */
  patientName: string;
  diagnoses: readonly DiagnosisContext[];
  needsReview: readonly PrescribeMedication[];
  suggestions?: readonly MedicationSuggestion[];
  settled?: readonly SettledMedication[];
  /** Formulary shown in the add-medication search. */
  searchPool?: readonly MedicationOption[];
  /** Rehydrates a local prototype draft when the workflow is reopened. */
  initialDraft?: PrescribeDraft;
  onAddDiagnosis?: () => void;
  /** Returns to the diagnosis step while preserving the current medication draft. */
  onEditDiagnoses?: (draft: PrescribeDraft) => void;
  /** Leaves the workflow while preserving the local draft in the caller. */
  onBack?: (draft: PrescribeDraft) => void;
  /** Returns a reviewed local draft. It does not sign or persist a prescription. */
  onComplete: (draft: PrescribeDraft) => void;
};

/**
 * Target-contract medication review workspace. The current regimen stays in
 * one stable list, additions share one draft, and AI proposals remain visibly
 * separate from clinician-authored work. Nothing is signed or persisted here.
 */
export function PrescribeRail({
  diagnoses,
  initialDraft,
  needsReview,
  onAddDiagnosis,
  onBack,
  onComplete,
  onEditDiagnoses,
  patientName,
  searchPool = [],
  settled = [],
  suggestions = [],
}: PrescribeRailProps) {
  const t = useT();
  const [view, setView] = useState<'review' | 'search'>('review');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<
    Record<string, PrescribeDraftDecision>
  >(() => ({
    ...(initialDraft?.decisions ?? {}),
  }));
  const [adjustingId, setAdjustingId] = useState<string | null>(null);
  const [draftDose, setDraftDose] = useState('');
  const [draftFrequency, setDraftFrequency] = useState('');
  const [draftAdditions, setDraftAdditions] = useState<
    readonly PrescribeDraftAddition[]
  >(() => [...(initialDraft?.additions ?? [])]);
  const [query, setQuery] = useState('');

  const pending = needsReview.filter((med) => !decisions[med.id]);
  const hasDiagnosis = diagnoses.length > 0;
  const canAddMedication = hasDiagnosis && pending.length === 0;
  const currentDraft = useMemo<PrescribeDraft>(
    () => ({ decisions, additions: draftAdditions }),
    [decisions, draftAdditions],
  );

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed === '') return searchPool;
    return searchPool.filter((med) => med.drug.toLowerCase().includes(trimmed));
  }, [query, searchPool]);

  const showNewMedicationWork =
    draftAdditions.length > 0 ||
    (canAddMedication && (searchPool.length > 0 || suggestions.length > 0));

  function decide(med: PrescribeMedication, decision: PrescribeDecision) {
    if (decision === 'adjust') {
      setAdjustingId(med.id);
      setDraftDose(decisions[med.id]?.dose ?? med.dose);
      setDraftFrequency(decisions[med.id]?.frequency ?? med.frequency);
      return;
    }
    setDecisions((current) => ({
      ...current,
      [med.id]: { decision, dose: med.dose, frequency: med.frequency },
    }));
    setExpandedId(null);
  }

  function saveAdjustment(med: PrescribeMedication) {
    setDecisions((current) => ({
      ...current,
      [med.id]: {
        decision: 'adjust',
        dose: draftDose,
        frequency: draftFrequency,
      },
    }));
    setAdjustingId(null);
    setExpandedId(null);
  }

  function addFormularyMedication(med: MedicationOption) {
    setDraftAdditions((current) =>
      current.some((item) => item.id === med.id)
        ? current
        : [...current, { ...med, source: 'formulary' }],
    );
  }

  function addAiSuggestion(suggestion: MedicationSuggestion) {
    setDraftAdditions((current) =>
      current.some((item) => item.id === suggestion.id)
        ? current
        : [...current, { ...suggestion, source: 'ai' }],
    );
  }

  function removeAddition(id: string) {
    setDraftAdditions((current) => current.filter((item) => item.id !== id));
  }

  if (view === 'search') {
    return (
      <section
        aria-label={`${t('Prescribe for')} ${patientName}`}
        className={styles.rail}
      >
        <header className={styles.header}>
          <div className={styles.headerLead}>
            <IconButton
              aria-label={t('Back to medication draft')}
              onClick={() => setView('review')}
              size="micro"
            >
              <ChevronLeftIcon aria-hidden="true" size={16} />
            </IconButton>
            <h2 className={styles.title} id="prescribe-search-title">
              {t('Add medication')}
            </h2>
          </div>
          {onBack ? (
            <CloseButton
              aria-label={t('Close medication draft')}
              onClick={() => onBack(currentDraft)}
              size="xs"
            />
          ) : null}
        </header>
        <div className={styles.content}>
          <Input
            aria-label={t('Search medications')}
            autoFocus
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder={t('Search medications')}
            prefix={<SearchIcon aria-hidden="true" size={16} />}
            size="sm"
            type="search"
            value={query}
          />
          {searchResults.length === 0 ? (
            <p className={styles.searchEmpty}>
              {t('No medication matches')} &ldquo;{query.trim()}&rdquo;.{' '}
              {t('Try another search.')}
            </p>
          ) : (
            <ul className={styles.rows}>
              {searchResults.map((med) => {
                const added = draftAdditions.some((item) => item.id === med.id);
                return (
                  <li className={styles.row} key={med.id}>
                    <span className={styles.rowCopy}>
                      <span className={styles.rowDrug}>{med.drug}</span>
                      <span className={styles.rowMeta}>{med.dose}</span>
                    </span>
                    {added ? (
                      <span className={styles.addedMark}>
                        <CheckIcon aria-hidden="true" size={14} />
                        {t('In draft')}
                      </span>
                    ) : (
                      <Button
                        onClick={() => addFormularyMedication(med)}
                        size="sm"
                        variant="ghost"
                      >
                        {t('Add to draft')}
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={`${t('Prescribe for')} ${patientName}`}
      className={styles.rail}
    >
      <header className={styles.header}>
        <h2 className={styles.title} id="prescribe-rail-title">
          {t('Prescribe')}
        </h2>
        {onBack ? (
          <CloseButton
            aria-label={t('Close medication draft')}
            onClick={() => onBack(currentDraft)}
            size="xs"
          />
        ) : null}
      </header>

      <div className={styles.content}>
        <section
          aria-labelledby="prescribe-diagnoses-title"
          className={styles.section}
        >
          <div className={styles.sectionHead}>
            <h3 className={styles.sectionLabel} id="prescribe-diagnoses-title">
              {t('Diagnoses')}
            </h3>
            {diagnoses.length > 0 && onEditDiagnoses ? (
              <Button
                onClick={() => onEditDiagnoses(currentDraft)}
                size="sm"
                variant="ghost"
              >
                {t('Change diagnoses')}
              </Button>
            ) : null}
          </div>
          {diagnoses.length === 0 ? (
            <div
              className={styles.diagnosisWarning}
              id="prescribe-diagnosis-gate"
            >
              <p>
                {onAddDiagnosis
                  ? t('Add a diagnosis before reviewing this medication draft.')
                  : t(
                      'A linked diagnosis is required before this medication draft can continue.',
                    )}
              </p>
              {onAddDiagnosis ? (
                <Button onClick={onAddDiagnosis} size="sm" variant="secondary">
                  {t('Add diagnosis')}
                </Button>
              ) : null}
            </div>
          ) : (
            <ul className={styles.rows}>
              {diagnoses.map((diagnosis) => (
                <li className={styles.diagnosis} key={diagnosis.code}>
                  <span className={styles.diagnosisCode}>{diagnosis.code}</span>
                  <span className={styles.rowCopy}>
                    <span className={styles.rowDrug}>{diagnosis.label}</span>
                    {diagnosis.evidence ? (
                      <span className={styles.rowMeta}>
                        {diagnosis.evidence}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          aria-labelledby="current-medications-title"
          className={styles.section}
        >
          <div className={styles.sectionHead}>
            <h3 className={styles.sectionLabel} id="current-medications-title">
              {t('Medication review')}
            </h3>
            {pending.length > 0 ? (
              <Badge aria-live="polite" size="sm" variant="warning">
                {pending.length} {t('to review')}
              </Badge>
            ) : null}
          </div>

          {needsReview.length === 0 && settled.length === 0 ? (
            <p className={styles.emptyMessage}>
              {t('No current medications are available in this draft.')}
            </p>
          ) : (
            <ul className={styles.medicationList}>
              {needsReview.map((med) => {
                const record = decisions[med.id];
                const expanded = expandedId === med.id;
                const adjusting = adjustingId === med.id;
                const dose = record?.dose ?? med.dose;
                const frequency = record?.frequency ?? med.frequency;
                const bodyId = `prescribe-decision-${med.id}`;
                return (
                  <li className={styles.reviewItem} key={med.id}>
                    <button
                      aria-controls={bodyId}
                      aria-expanded={expanded}
                      className={styles.reviewTrigger}
                      onClick={() => {
                        setExpandedId(expanded ? null : med.id);
                        setAdjustingId(null);
                      }}
                      type="button"
                    >
                      <span className={styles.rowCopy}>
                        <span className={styles.rowDrug}>{med.drug}</span>
                        <span className={styles.rowMeta}>
                          {dose} · {frequency}
                        </span>
                        <span className={styles.rowRisk}>{med.risk}</span>
                      </span>
                      <Badge
                        className={styles.reviewState}
                        size="sm"
                        variant={record ? 'info' : 'warning'}
                      >
                        {record
                          ? t(DECISION_LABEL[record.decision])
                          : t('Needs review')}
                      </Badge>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={
                          expanded ? styles.chevronOpen : styles.chevron
                        }
                        size={16}
                      />
                    </button>
                    {expanded ? (
                      <div className={styles.reviewBody} id={bodyId}>
                        {adjusting ? (
                          <div className={styles.adjust}>
                            <SegmentedToggle
                              label={t('Dose')}
                              labelVisible
                              onValueChange={setDraftDose}
                              options={med.doseOptions.map((option) => ({
                                value: option,
                                label: option,
                              }))}
                              value={draftDose}
                            />
                            <SegmentedToggle
                              label={t('How often')}
                              labelVisible
                              onValueChange={setDraftFrequency}
                              options={med.frequencyOptions.map((option) => ({
                                value: option,
                                label: option,
                              }))}
                              value={draftFrequency}
                            />
                            <div className={styles.adjustActions}>
                              <Button
                                onClick={() => setAdjustingId(null)}
                                size="sm"
                                variant="ghost"
                              >
                                {t('Cancel')}
                              </Button>
                              <Button
                                onClick={() => saveAdjustment(med)}
                                size="sm"
                                variant="primary"
                              >
                                {t('Save adjustment')}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            aria-label={`${t('Draft decision for')} ${med.drug}`}
                            className={styles.decisions}
                          >
                            <Button
                              onClick={() => decide(med, 'keep')}
                              size="sm"
                              variant="secondary"
                            >
                              {t('Keep')}
                            </Button>
                            <Button
                              onClick={() => decide(med, 'adjust')}
                              size="sm"
                              variant="secondary"
                            >
                              {t('Adjust')}
                            </Button>
                            <Button
                              onClick={() => decide(med, 'pause')}
                              size="sm"
                              variant="secondary"
                            >
                              {t('Pause')}
                            </Button>
                            <Button
                              onClick={() => decide(med, 'stop')}
                              size="sm"
                              variant="destructive"
                            >
                              {t('Stop')}
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </li>
                );
              })}

              {settled.map((med) => (
                <li className={styles.row} key={med.id}>
                  <span className={styles.rowCopy}>
                    <span className={styles.rowDrug}>{med.drug}</span>
                    <span className={styles.rowMeta}>
                      {med.dose} · {med.frequency}
                    </span>
                  </span>
                  <Badge
                    size="sm"
                    variant={med.status === 'paused' ? 'neutral' : 'success'}
                  >
                    {med.status === 'paused' ? t('Paused') : t('Active')}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </section>

        {showNewMedicationWork ? (
          <section
            aria-labelledby="new-medications-title"
            className={styles.section}
          >
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionLabel} id="new-medications-title">
                {t('New medications')}
              </h3>
              {canAddMedication && searchPool.length > 0 ? (
                <Button
                  className={styles.addAction}
                  leadingIcon={<AddIcon aria-hidden="true" size={16} />}
                  onClick={() => setView('search')}
                  size="sm"
                  variant="ghost"
                >
                  {t('Add medication')}
                </Button>
              ) : null}
            </div>

            {draftAdditions.length > 0 ? (
              <div className={styles.draftGroup}>
                <p className={styles.groupLabel}>{t('Draft additions')}</p>
                <ul className={styles.rows}>
                  {draftAdditions.map((med) => (
                    <li className={styles.row} key={med.id}>
                      <span className={styles.rowCopy}>
                        <span className={styles.rowDrug}>{med.drug}</span>
                        <span className={styles.rowMeta}>{med.dose}</span>
                        {med.source === 'ai' ? (
                          <Badge variant="ai">{t('AI suggestion')}</Badge>
                        ) : null}
                      </span>
                      <Button
                        onClick={() => removeAddition(med.id)}
                        size="sm"
                        variant="ghost"
                      >
                        {t('Remove')}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {canAddMedication && suggestions.length > 0 ? (
              <section
                aria-labelledby="ai-suggestions-title"
                className={styles.aiPanel}
              >
                <div className={styles.aiHeader}>
                  <AiBrainIcon aria-hidden="true" size={16} />
                  <div>
                    <h4 className={styles.aiTitle} id="ai-suggestions-title">
                      {t('AI suggestions')}
                    </h4>
                    <p className={styles.aiDescription}>
                      {t(
                        'Review the evidence and missing checks before adding anything.',
                      )}
                    </p>
                  </div>
                </div>
                <ul className={styles.aiRows}>
                  {suggestions.map((suggestion) => {
                    const added = draftAdditions.some(
                      (item) => item.id === suggestion.id,
                    );
                    return (
                      <li className={styles.aiRow} key={suggestion.id}>
                        <span className={styles.rowCopy}>
                          <span className={styles.rowDrug}>
                            {suggestion.drug}
                          </span>
                          <span className={styles.rowMeta}>
                            {suggestion.dose} · {suggestion.reason}
                          </span>
                          <span className={styles.aiEvidence}>
                            {t('Evidence:')} {suggestion.evidence}
                          </span>
                          <span className={styles.aiMissing}>
                            {t('Not checked:')} {suggestion.missingData}
                          </span>
                        </span>
                        {added ? (
                          <span className={styles.addedMark}>
                            <CheckIcon aria-hidden="true" size={14} />
                            {t('In draft')}
                          </span>
                        ) : (
                          <Button
                            onClick={() => addAiSuggestion(suggestion)}
                            size="sm"
                            variant="ghost"
                          >
                            {t('Add to draft')}
                          </Button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}
          </section>
        ) : null}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerCopy}>
          <p className={styles.draftNotice}>{t('Draft only — not saved.')}</p>
          {pending.length > 0 ? (
            <p aria-live="polite" className={styles.footerGate}>
              {t('Review')} {pending.length}{' '}
              {pending.length === 1
                ? t('current medication')
                : t('current medications')}{' '}
              {t('to continue.')}
            </p>
          ) : null}
        </div>
        {canAddMedication ? (
          <Button
            onClick={() => onComplete(currentDraft)}
            size="sm"
            variant="primary"
          >
            {t('Finish review')}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
