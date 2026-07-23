"use client";

import { useMemo, useState } from "react";

import {
  AiBrainIcon,
  ArrowRightIcon,
  Button,
  Checkbox,
  CloseButton,
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  IconButton,
  InformationIcon,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  SearchIcon,
} from "../../components/ui";
import { useT } from "../../components/foundations/i18n";
import type { Translate } from "../../components/foundations/i18n";

import type { Icd10DiagnosisCandidate, Icd10DiagnosisEvidence } from "./types";
import styles from "./icd10-diagnosis-rail.module.css";

export type Icd10DiagnosisRailProps = {
  /** Legacy DCM's first four AI-proposed diagnoses. */
  suggestions: readonly Icd10DiagnosisCandidate[];
  /** Caller-owned terminology results. This prototype does not imply a live WHO lookup. */
  searchCandidates: readonly Icd10DiagnosisCandidate[];
  /** Fallback findings when a proposal has no own evidence. */
  flaggedLabs: readonly Icd10DiagnosisEvidence[];
  /** Caller-owned local draft selection; selected does not mean verified or signed. */
  selectedIds: readonly string[];
  onAdd: (candidate: Icd10DiagnosisCandidate) => void;
  onRemove: (candidate: Icd10DiagnosisCandidate) => void;
  onContinue?: () => void;
  /** Leaves the diagnosis step without changing caller-owned draft state. */
  onClose?: () => void;
};

function evidenceValue(evidence: Icd10DiagnosisEvidence) {
  return evidence.value.split(" · ")[0]?.trim() ?? evidence.value;
}

function tooltipCopy(candidate: Icd10DiagnosisCandidate, t: Translate) {
  const evidence =
    candidate.evidence?.map((item) => `${item.label} ${evidenceValue(item)}`) ??
    [];
  const basis =
    evidence.length > 0 ? evidence.join(", ") : candidate.reviewMeta;

  return basis
    ? `${t("Suggested from")} ${basis}. ${t("Review before adding to this draft.")}`
    : t(
        "Suggested from the latest clinical context. Review before adding to this draft.",
      );
}

/**
 * Faithful Kura-owned port of FINAL DCM's DiagnosisReview rail. The anatomy,
 * selection model, on-demand evidence, search, and primary action mirror the
 * source; terminology lookup and clinical verification stay caller-owned.
 */
export function Icd10DiagnosisRail({
  flaggedLabs,
  onAdd,
  onClose,
  onContinue,
  onRemove,
  searchCandidates,
  selectedIds,
  suggestions,
}: Icd10DiagnosisRailProps) {
  const t = useT();
  const [query, setQuery] = useState("");
  const selected = useMemo(() => new Set(selectedIds), [selectedIds]);
  const allCandidates = useMemo(
    () =>
      new Map(
        [...searchCandidates, ...suggestions].map((candidate) => [
          candidate.id,
          candidate,
        ]),
      ),
    [searchCandidates, suggestions],
  );
  const rows = useMemo(() => {
    const visible = new Map(
      suggestions.slice(0, 4).map((candidate) => [candidate.id, candidate]),
    );

    selectedIds.forEach((id) => {
      const candidate = allCandidates.get(id);
      if (candidate) visible.set(id, candidate);
    });

    return [...visible.values()];
  }, [allCandidates, selectedIds, suggestions]);
  /**
   * Provenance is carried once per group instead of once per row: chart and
   * clinician-picked codes need no caveat, AI proposals need review.
   */
  const chartRows = rows.filter((candidate) => candidate.source !== "ai");
  const aiRows = rows.filter((candidate) => candidate.source === "ai");
  const selectedCandidates = useMemo(
    () =>
      selectedIds
        .map((id) => allCandidates.get(id))
        .filter((candidate): candidate is Icd10DiagnosisCandidate =>
          Boolean(candidate),
        ),
    [allCandidates, selectedIds],
  );
  const trimmedQuery = query.trim();
  const searchResults = useMemo(() => {
    if (!trimmedQuery) return [];

    const normalizedQuery = trimmedQuery.toLocaleLowerCase();
    return searchCandidates.filter((candidate) =>
      `${candidate.code} ${candidate.label}`
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    );
  }, [searchCandidates, trimmedQuery]);

  function setDraftSelection(
    candidate: Icd10DiagnosisCandidate,
    isSelected: boolean,
  ) {
    if (candidate.codable === false) return;
    if (isSelected) onAdd(candidate);
    else onRemove(candidate);
  }

  function syncSearchSelection(nextCandidates: Icd10DiagnosisCandidate[]) {
    const nextIds = new Set(nextCandidates.map((candidate) => candidate.id));

    selectedCandidates.forEach((candidate) => {
      if (!nextIds.has(candidate.id)) onRemove(candidate);
    });
    nextCandidates.forEach((candidate) => {
      if (!selected.has(candidate.id)) onAdd(candidate);
    });
    setQuery("");
  }

  function renderRow(candidate: Icd10DiagnosisCandidate) {
    const isSelected = selected.has(candidate.id);
    const isAiSuggested = candidate.source === "ai";
    const isCodable = candidate.codable !== false;
    const relatedFindings = (
      candidate.evidence?.length ? candidate.evidence : flaggedLabs
    ).slice(0, 4);

    return (
      <div
        className={styles.suggestionRow}
        data-codable={isCodable ? undefined : "false"}
        data-selected={isSelected ? "true" : "false"}
        data-slot="diagnosis-proposal"
        key={candidate.id}
      >
        <Checkbox
          aria-label={`${isSelected ? t("Remove") : t("Add")} ${candidate.code}. ${candidate.label}${isAiSuggested ? `. ${t("AI suggested")}.` : ""} ${isSelected ? t("from draft") : t("to draft")}`}
          checked={isSelected}
          className={styles.rowChoice}
          disabled={!isCodable}
          onCheckedChange={(nextSelected) =>
            setDraftSelection(candidate, nextSelected)
          }
        >
          <span className={styles.rowCopy}>
            <code className={styles.code}>{candidate.code}</code>
            <span className={styles.rowLabel}>{candidate.label}</span>
          </span>
        </Checkbox>
        <span className={styles.rowTrailing}>
          {isCodable ? null : (
            <span className={styles.rowNote}>{t("Not codable")}</span>
          )}
          {isAiSuggested ? (
            <Popover>
              <PopoverTrigger
                render={
                  <IconButton
                    aria-label={`${t("View evidence for")} ${candidate.code}`}
                    className={styles.evidenceTrigger}
                    variant="tertiary"
                  >
                    <InformationIcon aria-hidden="true" />
                  </IconButton>
                }
              />
              <PopoverContent
                align="end"
                aria-label={`${t("Evidence for")} ${candidate.code}`}
                className={styles.evidencePopover}
                initialFocus={false}
                role="dialog"
              >
                <PopoverTitle>{candidate.label}</PopoverTitle>
                <PopoverDescription>
                  {tooltipCopy(candidate, t)}
                </PopoverDescription>
                {relatedFindings.length > 0 ? (
                  <div className={styles.findings}>
                    <span className={styles.findingsLabel}>
                      {t("Related findings")}
                    </span>
                    <span className={styles.findingChips}>
                      {relatedFindings.map((finding) => (
                        <span
                          data-tone={finding.tone ?? "neutral"}
                          key={`${candidate.id}-${finding.label}-${finding.value}`}
                        >
                          {finding.label} {evidenceValue(finding)}
                        </span>
                      ))}
                    </span>
                  </div>
                ) : null}
              </PopoverContent>
            </Popover>
          ) : null}
        </span>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="icd10-diagnosis-rail-title"
      className={styles.rail}
    >
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h2 id="icd10-diagnosis-rail-title">{t("Select diagnosis")}</h2>
          {onClose ? (
            <CloseButton
              aria-label={t("Close diagnosis selection")}
              onClick={onClose}
              size="sm"
            />
          ) : null}
        </div>
        <p>{t("Draft — not verified or saved.")}</p>
      </header>

      <div className={styles.groups}>
        {chartRows.length > 0 ? (
          <div className={styles.rows}>{chartRows.map(renderRow)}</div>
        ) : null}

        {aiRows.length > 0 ? (
          <div className={styles.group}>
            <p className={styles.groupLabel} id="icd10-diagnosis-rail-ai">
              <AiBrainIcon aria-hidden="true" />
              {t("AI suggested")}
            </p>
            <div
              aria-labelledby="icd10-diagnosis-rail-ai"
              className={styles.rows}
              role="group"
            >
              {aiRows.map(renderRow)}
            </div>
          </div>
        ) : null}
      </div>

      <Combobox<Icd10DiagnosisCandidate, true>
        autoHighlight
        filteredItems={searchResults}
        inline
        inputValue={query}
        isItemEqualToValue={(item, value) => item.id === value.id}
        itemToStringLabel={(candidate) =>
          `${candidate.code} ${candidate.label}`
        }
        itemToStringValue={(candidate) => candidate.id}
        items={searchCandidates}
        multiple
        onInputValueChange={setQuery}
        onValueChange={syncSearchSelection}
        value={selectedCandidates}
      >
        <ComboboxLabel className="sr-only">
          {t("Search or add diagnosis")}
        </ComboboxLabel>
        <ComboboxInput
          leadingIcon={<SearchIcon aria-hidden="true" />}
          placeholder={t("Search or add diagnosis")}
          showTrigger={false}
        />
        {trimmedQuery ? (
          <div className={styles.searchResults}>
            {searchResults.length > 0 ? (
              <p className={styles.searchStatus} role="status">
                {searchResults.length}{" "}
                {searchResults.length === 1 ? t("match") : t("matches")}
              </p>
            ) : (
              <ComboboxEmpty>
                {t("No matching diagnosis. Try a code or name.")}
              </ComboboxEmpty>
            )}
            <ComboboxList>
              {(candidate: Icd10DiagnosisCandidate) => {
                const isSelected = selected.has(candidate.id);
                return (
                  <ComboboxItem
                    disabled={isSelected || candidate.codable === false}
                    key={candidate.id}
                    value={candidate}
                  >
                    <span className={styles.optionCopy}>
                      <code>{candidate.code}</code>
                      <span>{candidate.label}</span>
                    </span>
                  </ComboboxItem>
                );
              }}
            </ComboboxList>
          </div>
        ) : null}
      </Combobox>

      <footer className={styles.footer}>
        {selectedIds.length === 0 ? (
          <p className={styles.selectionHint}>
            {t("Select a diagnosis to review medicines.")}
          </p>
        ) : null}

        <Button
          aria-label={t("Review medicines")}
          disabled={selectedIds.length === 0}
          fullWidth
          onClick={onContinue}
          size="lg"
          trailingIcon={<ArrowRightIcon aria-hidden="true" size={18} />}
        >
          <span className={styles.continueLabel}>
            {t("Review medicines")}
            {selectedIds.length > 0 ? (
              <span className={styles.count}>{selectedIds.length}</span>
            ) : null}
          </span>
        </Button>
      </footer>
    </section>
  );
}
