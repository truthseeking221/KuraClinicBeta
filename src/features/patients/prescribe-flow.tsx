"use client";

import { useMemo, useState } from "react";

import { Icd10DiagnosisRail } from "./icd10-diagnosis-rail";
import { PrescribeRail } from "./prescribe-rail";
import type {
  DiagnosisContext,
  Icd10DiagnosisCandidate,
  Icd10DiagnosisEvidence,
  MedicationOption,
  MedicationSuggestion,
  PrescribeDraft,
  PrescribeMedication,
  SettledMedication,
} from "./types";

const EMPTY_DRAFT: PrescribeDraft = { decisions: {}, additions: [] };

export type PrescribeFlowProps = {
  patientName: string;
  diagnoses: readonly DiagnosisContext[];
  diagnosisSuggestions: readonly Icd10DiagnosisCandidate[];
  diagnosisSearchCandidates: readonly Icd10DiagnosisCandidate[];
  flaggedLabs: readonly Icd10DiagnosisEvidence[];
  needsReview: readonly PrescribeMedication[];
  suggestions?: readonly MedicationSuggestion[];
  settled?: readonly SettledMedication[];
  searchPool?: readonly MedicationOption[];
  initialDraft?: PrescribeDraft;
  onClose?: (draft: PrescribeDraft) => void;
  onComplete: (draft: PrescribeDraft) => void;
};

function diagnosisCandidate(
  diagnosis: DiagnosisContext,
): Icd10DiagnosisCandidate {
  return {
    id: `chart-${diagnosis.code.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    code: diagnosis.code,
    label: diagnosis.label,
    source: "clinician",
    evidence: diagnosis.evidence
      ? [{ label: "Chart evidence", value: diagnosis.evidence }]
      : undefined,
    reviewMeta: diagnosis.evidence,
  };
}

function diagnosisContext(
  candidate: Icd10DiagnosisCandidate,
): DiagnosisContext {
  return {
    code: candidate.code,
    label: candidate.label,
    evidence: candidate.reviewMeta ?? candidate.evidence?.[0]?.value,
  };
}

/**
 * Storybook-owned prescribing journey. It keeps ICD-10 selection and the
 * medication draft in one patient action workspace without treating a draft
 * selection as a verified or signed diagnosis.
 */
export function PrescribeFlow({
  diagnoses,
  diagnosisSearchCandidates,
  diagnosisSuggestions,
  flaggedLabs,
  initialDraft,
  needsReview,
  onClose,
  onComplete,
  patientName,
  searchPool,
  settled,
  suggestions,
}: PrescribeFlowProps) {
  const chartCandidates = useMemo(
    () => diagnoses.map(diagnosisCandidate),
    [diagnoses],
  );
  const candidates = useMemo(() => {
    const byCode = new Map<string, Icd10DiagnosisCandidate>();
    [
      ...diagnosisSearchCandidates,
      ...diagnosisSuggestions,
      ...chartCandidates,
    ].forEach((candidate) => byCode.set(candidate.code, candidate));
    return [...byCode.values()];
  }, [chartCandidates, diagnosisSearchCandidates, diagnosisSuggestions]);
  const visibleSuggestions = useMemo(() => {
    const chartCodes = new Set(
      chartCandidates.map((candidate) => candidate.code),
    );
    return [
      ...chartCandidates,
      ...diagnosisSuggestions.filter(
        (candidate) => !chartCodes.has(candidate.code),
      ),
    ];
  }, [chartCandidates, diagnosisSuggestions]);
  const candidateById = useMemo(
    () => new Map(candidates.map((candidate) => [candidate.id, candidate])),
    [candidates],
  );
  const chartIds = chartCandidates.map((candidate) => candidate.id);
  const restoredIds = initialDraft?.diagnosisIds?.filter((id) =>
    candidateById.has(id),
  );
  const [step, setStep] = useState<"diagnosis" | "medication">("diagnosis");
  const [selectedIds, setSelectedIds] = useState<readonly string[]>(
    initialDraft?.diagnosisIds ? (restoredIds ?? []) : chartIds,
  );
  const [medicationDraft, setMedicationDraft] = useState<PrescribeDraft>(
    initialDraft ?? EMPTY_DRAFT,
  );
  const selectedDiagnoses = selectedIds
    .map((id) => candidateById.get(id))
    .filter((candidate): candidate is Icd10DiagnosisCandidate =>
      Boolean(candidate),
    )
    .map(diagnosisContext);

  function draftWithDiagnoses(draft: PrescribeDraft): PrescribeDraft {
    return { ...draft, diagnosisIds: selectedIds };
  }

  if (step === "diagnosis") {
    return (
      <Icd10DiagnosisRail
        flaggedLabs={flaggedLabs}
        onAdd={(candidate) =>
          setSelectedIds((current) =>
            current.includes(candidate.id)
              ? current
              : [...current, candidate.id],
          )
        }
        onClose={
          onClose
            ? () => onClose(draftWithDiagnoses(medicationDraft))
            : undefined
        }
        onContinue={() => setStep("medication")}
        onRemove={(candidate) =>
          setSelectedIds((current) =>
            current.filter((id) => id !== candidate.id),
          )
        }
        searchCandidates={candidates}
        selectedIds={selectedIds}
        suggestions={visibleSuggestions}
      />
    );
  }

  return (
    <PrescribeRail
      diagnoses={selectedDiagnoses}
      initialDraft={medicationDraft}
      needsReview={needsReview}
      onBack={
        onClose ? (draft) => onClose(draftWithDiagnoses(draft)) : undefined
      }
      onComplete={(draft) => onComplete(draftWithDiagnoses(draft))}
      onEditDiagnoses={(draft) => {
        setMedicationDraft(draft);
        setStep("diagnosis");
      }}
      patientName={patientName}
      searchPool={searchPool}
      settled={settled}
      suggestions={suggestions}
    />
  );
}
