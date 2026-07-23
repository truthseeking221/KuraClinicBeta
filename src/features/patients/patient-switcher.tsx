"use client";

import { useMemo, useState } from "react";

import { useT } from "../../components/foundations/i18n";
import {
  Avatar,
  AvatarFallback,
  Badge,
  ChevronDownIcon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui";

import { displayNameOf, formatAgeSex, initialsOf, statusViewOf } from "./logic";
import type { PatientSummary } from "./types";
import styles from "./patient-switcher.module.css";

export type PatientSwitcherProps = {
  /** The record already open in the chart; it never appears as its own alternative. */
  patient: PatientSummary;
  /** Workspace records supplied by the canonical patient-list contract. */
  patients: readonly PatientSummary[];
  /** The chart owner performs navigation after a deliberate identity choice. */
  onSwitchPatient: (patientId: string) => void;
};

/**
 * Exceptions only. A verified identity is the routine case here, and a badge
 * on every row marks nothing — worse, a green "Verified" beside a name reads
 * as the whole record being confirmed when it states one axis.
 */
function badgeFor(patient: PatientSummary) {
  const status = statusViewOf(patient);
  if (status.kind === "terminal") return { label: status.label, variant: "neutral" as const };
  if (status.assurance === "verified") return undefined;
  return { label: status.label, variant: "warning" as const };
}

/**
 * An identity-safe chart switcher. It deliberately does not add a name search:
 * the workspace patient contract has no searchable patient-name index.
 */
export function PatientSwitcher({ patient, patients, onSwitchPatient }: PatientSwitcherProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const alternatives = useMemo(
    () => patients.filter((candidate) => candidate.userId !== patient.userId),
    [patient.userId, patients],
  );

  if (alternatives.length === 0) return null;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <IconButton
            aria-label={t("Switch patient")}
            className={styles.trigger}
            size="micro"
            variant="tertiary"
          >
            <ChevronDownIcon aria-hidden="true" size={16} />
          </IconButton>
        }
      />
      <PopoverContent
        align="start"
        aria-label={t("Switch patient")}
        className={styles.content}
        initialFocus={false}
        role="dialog"
        side="bottom"
        sideOffset={8}
      >
        <ul className={styles.list}>
          {alternatives.map((candidate) => {
            const badge = badgeFor(candidate);
            const meta = [
              formatAgeSex(candidate),
              candidate.mrnMasked
                ? `MRN ${candidate.mrnMasked}`
                : candidate.phoneMasked
                  ? `${t("Phone")} ${candidate.phoneMasked}`
                  : "",
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <li key={candidate.userId}>
                <button
                  className={styles.row}
                  data-terminal={statusViewOf(candidate).kind === "terminal" || undefined}
                  onClick={() => {
                    setOpen(false);
                    onSwitchPatient(candidate.userId);
                  }}
                  type="button"
                >
                  <Avatar aria-hidden="true" shape="circle" size="sm">
                    <AvatarFallback>{initialsOf(candidate)}</AvatarFallback>
                  </Avatar>
                  <span className={styles.copy}>
                    <span className={styles.name}>{displayNameOf(candidate, t)}</span>
                    {meta ? <span className={styles.meta}>{meta}</span> : null}
                  </span>
                  {badge ? (
                    <Badge size="sm" variant={badge.variant}>
                      {t(badge.label)}
                    </Badge>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
