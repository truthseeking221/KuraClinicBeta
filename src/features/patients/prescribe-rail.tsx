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
  IconButton,
  Input,
  SearchIcon,
  SegmentedToggle,
} from '../../components/ui';

import type {
  DiagnosisContext,
  MedicationSuggestion,
  PrescribeDecision,
  PrescribeMedication,
  SettledMedication,
} from './types';
import styles from './prescribe-rail.module.css';

const DECISION_LABEL: Record<PrescribeDecision, string> = {
  keep: 'Kept',
  adjust: 'Adjusted',
  pause: 'Paused',
  stop: 'Stopped',
};

type DecisionRecord = {
  decision: PrescribeDecision;
  dose: string;
  frequency: string;
};

export type PrescribeRailProps = {
  /** Display name as the registry provides it; never split or reordered. */
  patientName: string;
  diagnoses: readonly DiagnosisContext[];
  needsReview: readonly PrescribeMedication[];
  suggestions?: readonly MedicationSuggestion[];
  settled?: readonly SettledMedication[];
  /** Formulary shown in the add-medication search. */
  searchPool?: readonly MedicationSuggestion[];
  onAddDiagnosis?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
};

/**
 * The prescribing moment of the chart action rail: review every current
 * medication against the coded diagnoses before adding anything new. The
 * finish gate stays closed until each flagged medication has a decision.
 * Suggestions are added deliberately; nothing is ever applied automatically.
 */
export function PrescribeRail({
  diagnoses,
  needsReview,
  onAddDiagnosis,
  onBack,
  onComplete,
  patientName,
  searchPool = [],
  settled = [],
  suggestions = [],
}: PrescribeRailProps) {
  const [view, setView] = useState<'review' | 'search'>('review');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, DecisionRecord>>({});
  const [adjustingId, setAdjustingId] = useState<string | null>(null);
  const [draftDose, setDraftDose] = useState('');
  const [draftFrequency, setDraftFrequency] = useState('');
  const [addedIds, setAddedIds] = useState<readonly string[]>([]);
  const [query, setQuery] = useState('');

  const pending = needsReview.filter((med) => !decisions[med.id]);
  const decided = needsReview.filter((med) => decisions[med.id]);

  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed === '') return searchPool;
    return searchPool.filter((med) => med.drug.toLowerCase().includes(trimmed));
  }, [query, searchPool]);

  function decide(med: PrescribeMedication, decision: PrescribeDecision) {
    if (decision === 'adjust') {
      setAdjustingId(med.id);
      setDraftDose(med.dose);
      setDraftFrequency(med.frequency);
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
      [med.id]: { decision: 'adjust', dose: draftDose, frequency: draftFrequency },
    }));
    setAdjustingId(null);
    setExpandedId(null);
  }

  if (view === 'search') {
    return (
      <section aria-labelledby="prescribe-search-title" className={styles.rail}>
        <header className={styles.header}>
          <IconButton
            aria-label="Back to medication review"
            onClick={() => setView('review')}
            size="micro"
          >
            <ChevronLeftIcon aria-hidden="true" size={16} />
          </IconButton>
          <h2 className={styles.title} id="prescribe-search-title">
            Add medication
          </h2>
        </header>
        <Input
          aria-label="Search medications"
          autoFocus
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search medications"
          prefix={<SearchIcon aria-hidden="true" size={16} />}
          size="sm"
          type="search"
          value={query}
        />
        {searchResults.length === 0 ? (
          <p className={styles.searchEmpty}>
            No medication matches &ldquo;{query.trim()}&rdquo;. Try another search.
          </p>
        ) : (
          <ul className={styles.rows}>
            {searchResults.map((med) => {
              const added = addedIds.includes(med.id);
              return (
                <li className={styles.row} key={med.id}>
                  <span className={styles.rowCopy}>
                    <span className={styles.rowDrug}>{med.drug}</span>
                    <span className={styles.rowMeta}>{med.dose}</span>
                  </span>
                  {added ? (
                    <span className={styles.addedMark}>
                      <CheckIcon aria-hidden="true" size={14} />
                      Added
                    </span>
                  ) : (
                    <Button
                      onClick={() => setAddedIds((ids) => [...ids, med.id])}
                      size="sm"
                      variant="ghost"
                    >
                      Add
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <Button onClick={() => setView('review')} size="sm" variant="secondary">
          Done
        </Button>
      </section>
    );
  }

  return (
    <section aria-labelledby="prescribe-rail-title" className={styles.rail}>
      <header className={styles.header}>
        {onBack ? (
          <IconButton aria-label="Back to actions" onClick={onBack} size="micro">
            <ChevronLeftIcon aria-hidden="true" size={16} />
          </IconButton>
        ) : null}
        <div>
          <h2 className={styles.title} id="prescribe-rail-title">
            Prescribe for {patientName}
          </h2>
          <p className={styles.subtitle}>Review current meds before adding new ones.</p>
        </div>
      </header>

      <section aria-label="Diagnoses" className={styles.section}>
        <h3 className={styles.sectionLabel}>Diagnoses</h3>
        {diagnoses.length === 0 ? (
          <div className={styles.diagnosisWarning}>
            <p>No diagnosis linked. Add one before prescribing.</p>
            {onAddDiagnosis ? (
              <Button onClick={onAddDiagnosis} size="sm" variant="secondary">
                Add diagnosis
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
                    <span className={styles.rowMeta}>{diagnosis.evidence}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {pending.length > 0 ? (
        <section aria-label="Needs review" className={styles.section}>
          <h3 className={styles.sectionLabel}>Needs review</h3>
          <ul className={styles.rows}>
            {pending.map((med) => {
              const expanded = expandedId === med.id;
              const adjusting = adjustingId === med.id;
              return (
                <li className={styles.reviewItem} key={med.id}>
                  <button
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
                        {med.dose} · {med.frequency}
                      </span>
                    </span>
                    <Badge variant="warning">Review</Badge>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className={expanded ? styles.chevronOpen : styles.chevron}
                      size={16}
                    />
                  </button>
                  {expanded ? (
                    <div className={styles.reviewBody}>
                      <p className={styles.risk}>{med.risk}</p>
                      {adjusting ? (
                        <div className={styles.adjust}>
                          <SegmentedToggle
                            label="Dose"
                            labelVisible
                            onValueChange={setDraftDose}
                            options={med.doseOptions.map((dose) => ({
                              value: dose,
                              label: dose,
                            }))}
                            value={draftDose}
                          />
                          <SegmentedToggle
                            label="How often"
                            labelVisible
                            onValueChange={setDraftFrequency}
                            options={med.frequencyOptions.map((frequency) => ({
                              value: frequency,
                              label: frequency,
                            }))}
                            value={draftFrequency}
                          />
                          <div className={styles.adjustActions}>
                            <Button
                              onClick={() => setAdjustingId(null)}
                              size="sm"
                              variant="ghost"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => saveAdjustment(med)}
                              size="sm"
                              variant="primary"
                            >
                              Save change
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.decisions}>
                          <Button onClick={() => decide(med, 'keep')} size="sm" variant="secondary">
                            Keep
                          </Button>
                          <Button onClick={() => decide(med, 'adjust')} size="sm" variant="secondary">
                            Adjust
                          </Button>
                          <Button onClick={() => decide(med, 'pause')} size="sm" variant="secondary">
                            Pause
                          </Button>
                          <Button onClick={() => decide(med, 'stop')} size="sm" variant="destructive">
                            Stop
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {suggestions.length > 0 ? (
        <section aria-label="Suggested by Kura" className={styles.section}>
          <h3 className={styles.sectionLabel}>
            <AiBrainIcon aria-hidden="true" size={14} />
            Suggested by Kura
          </h3>
          <ul className={styles.rows}>
            {suggestions.map((suggestion) => {
              const added = addedIds.includes(suggestion.id);
              return (
                <li className={styles.row} key={suggestion.id}>
                  <span className={styles.rowCopy}>
                    <span className={styles.rowDrug}>{suggestion.drug}</span>
                    <span className={styles.rowMeta}>
                      {suggestion.dose} · {suggestion.reason}
                    </span>
                  </span>
                  {added ? (
                    <span className={styles.addedMark}>
                      <CheckIcon aria-hidden="true" size={14} />
                      Added
                    </span>
                  ) : (
                    <Button
                      onClick={() => setAddedIds((ids) => [...ids, suggestion.id])}
                      size="sm"
                      variant="ghost"
                    >
                      Add
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
          <p className={styles.suggestionNote}>
            Suggestions never apply on their own. You decide each one.
          </p>
        </section>
      ) : null}

      {decided.length > 0 || settled.length > 0 ? (
        <section aria-label="Reviewed" className={styles.section}>
          <h3 className={styles.sectionLabel}>Reviewed</h3>
          <ul className={styles.rows}>
            {decided.map((med) => {
              const record = decisions[med.id];
              return (
                <li className={styles.row} key={med.id}>
                  <span className={styles.rowCopy}>
                    <span
                      className={
                        record.decision === 'stop' ? styles.rowDrugStopped : styles.rowDrug
                      }
                    >
                      {med.drug}
                    </span>
                    <span className={styles.rowMeta}>
                      {record.dose} · {record.frequency}
                    </span>
                  </span>
                  <span className={styles.decisionLabel}>{DECISION_LABEL[record.decision]}</span>
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
                <span className={styles.decisionLabel}>
                  {med.status === 'paused' ? 'Paused' : 'Active'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {searchPool.length > 0 ? (
        <Button
          leadingIcon={<AddIcon aria-hidden="true" size={16} />}
          onClick={() => setView('search')}
          size="sm"
          variant="ghost"
        >
          Add medication
        </Button>
      ) : null}

      <div className={styles.footer}>
        <Button
          disabled={pending.length > 0}
          onClick={onComplete}
          size="sm"
          variant="primary"
        >
          {pending.length > 0
            ? `Review ${pending.length} ${pending.length === 1 ? 'med' : 'meds'} first`
            : 'Finish review'}
        </Button>
      </div>
    </section>
  );
}
