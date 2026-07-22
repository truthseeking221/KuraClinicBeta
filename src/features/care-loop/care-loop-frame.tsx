"use client";

import type { ReactNode } from "react";

import { Badge, Button, Progress } from "../../components/ui";
import { useT } from "../../components/foundations/i18n";

import styles from "./care-loop.module.css";

export type CareLoopStage = {
  label: string;
  actor: string;
  description?: string;
};

export type CareLoopPatientSummary = {
  name: string;
  pid: string;
  detail: string;
};

type CareLoopProgress =
  | {
      currentStep: number;
      stages: CareLoopStage[];
    }
  | {
      currentStep?: never;
      stages?: never;
    };

type CareLoopFrameProps = {
  actor?: string;
  children: ReactNode;
  onRestart: () => void;
  patient?: CareLoopPatientSummary;
  title: string;
} & CareLoopProgress;

export function CareLoopFrame({
  actor,
  children,
  currentStep,
  onRestart,
  patient,
  stages,
  title,
}: CareLoopFrameProps) {
  const t = useT();
  const activeStage = stages?.[Math.max(0, (currentStep ?? 1) - 1)];
  const nextStage = stages?.[currentStep ?? 0];

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.headingRow}>
          <div>
            <h1 className={styles.pageTitle}>{t(title)}</h1>
          </div>
          <div className={styles.headerActions}>
            {actor ? (
              <Badge appearance="outline" size="sm">
                {t(actor)}
              </Badge>
            ) : null}
            <Button onClick={onRestart} size="sm" variant="ghost">
              {t("Restart")}
            </Button>
          </div>
        </div>

        {patient ? (
          <div aria-label={t("Current patient")} className={styles.patientBar}>
            <strong>{patient.name}</strong>
            <span>{t(patient.pid)}</span>
            <span>{patient.detail}</span>
          </div>
        ) : null}

        {stages && activeStage ? (
          <div
            aria-label={t("Journey progress")}
            className={styles.journeyProgress}
            role="group"
          >
            <div className={styles.journeyProgressHeading}>
              <strong>{t(activeStage.label)}</strong>
              <span>
                {t("Step")} {currentStep} {t("of")} {stages.length}
              </span>
            </div>
            <Progress
              aria-label={`${t("Step")} ${currentStep} ${t("of")} ${stages.length}: ${t(activeStage.label)}`}
              max={stages.length}
              size="sm"
              value={currentStep}
            />
            <p>
              {t(activeStage.description ?? activeStage.actor)}
              {nextStage ? ` · ${t("Next")}: ${t(nextStage.label)}` : ""}
            </p>
          </div>
        ) : null}
      </header>

      <div className={styles.content}>{children}</div>
    </main>
  );
}
