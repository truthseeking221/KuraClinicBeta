import type { ReactNode } from 'react';

import {
  Badge,
  Button,
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '../../components/ui';

import styles from './care-loop.module.css';

export type CareLoopStage = {
  label: string;
  actor: string;
};

export type CareLoopPatientSummary = {
  name: string;
  pid: string;
  detail: string;
};

export function CareLoopFrame({
  actor,
  children,
  currentStep,
  onRestart,
  patient,
  stages,
  title,
}: {
  actor: string;
  children: ReactNode;
  currentStep: number;
  onRestart: () => void;
  patient?: CareLoopPatientSummary;
  stages: CareLoopStage[];
  title: string;
}) {
  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>First patient care loop</p>
            <h1 className={styles.pageTitle}>{title}</h1>
          </div>
          <div className={styles.headerActions}>
            <Badge appearance="outline" size="sm">
              {actor}
            </Badge>
            <Button onClick={onRestart} size="sm" variant="ghost">
              Restart
            </Button>
          </div>
        </div>

        {patient ? (
          <div aria-label="Current patient" className={styles.patientBar}>
            <strong>{patient.name}</strong>
            <span>{patient.pid}</span>
            <span>{patient.detail}</span>
          </div>
        ) : null}

        <Timeline aria-label="Journey progress" orientation="horizontal" value={currentStep}>
          {stages.map((stage, index) => (
            <TimelineItem key={stage.label} step={index + 1}>
              <TimelineIndicator />
              <TimelineHeader>
                <TimelineTitle>{stage.label}</TimelineTitle>
              </TimelineHeader>
              <TimelineContent>{stage.actor}</TimelineContent>
              <TimelineSeparator />
            </TimelineItem>
          ))}
        </Timeline>
      </header>

      <div className={styles.content}>{children}</div>
    </main>
  );
}
