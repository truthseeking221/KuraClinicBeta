"use client";

import Image from "next/image";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CheckIcon,
  ChevronRightIcon,
  MoneyText,
  RefreshIcon,
} from "../../components/ui";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from "../../components/shared";
import { useT } from "../../components/foundations/i18n";

import { HomeSignalRow } from "./home-signal-row";
import { HomeResultReviewPreview } from "./home-result-review-preview";
import { HomeWorkQueuePreview } from "./home-work-queue-preview";
import {
  greetingForHour,
  isAllClear,
  licenceBanner,
  orderSignals,
} from "./logic";
import type { HomeData, HomeSignal, NextAction } from "./types";
import styles from "./home-workspace.module.css";

export type HomeWorkspaceProps = {
  data: HomeData;
  /** Deep link into the surface that owns the work. */
  onNavigate?: (targetKey: string) => void;
  /** Starts the documented PSC-booking intent. */
  onStartBooking?: () => void;
  onOpenLicence?: () => void;
  /** Opens the seeded demo patient's record. */
  onOpenDemoPatient?: () => void;
  onChooseWorkspace?: () => void;
  onRetrySignal?: (signalKey: string) => void;
  onRefresh?: () => void;
};

type SignalHandlers = Pick<HomeWorkspaceProps, "onNavigate" | "onRetrySignal">;

type FirstUseLicenceContent = {
  actionLabel?: string;
  description: string;
  status: string;
  tone: "danger" | "info" | "success" | "warning";
};

function firstUseLicenceContent(
  state: HomeData["licence"]["state"],
): FirstUseLicenceContent {
  switch (state) {
    case "none":
      return {
        actionLabel: "Start verification",
        description:
          "You’ll need a verified licence to collect payments, issue legal documents, submit claims and appear in the doctor directory.",
        status: "Not started",
        tone: "warning",
      };
    case "pending_review":
      return {
        actionLabel: "View submission",
        description:
          "Your documents are being reviewed. We will notify you when a decision is ready.",
        status: "Under review",
        tone: "info",
      };
    case "rejected":
      return {
        actionLabel: "Update verification",
        description:
          "Review the decision and replace the document that could not be verified.",
        status: "Needs update",
        tone: "danger",
      };
    case "verified":
      return {
        description:
          "Your licence is active for clinical attribution and verified capabilities.",
        status: "Verified",
        tone: "success",
      };
    case "expiring":
      return {
        actionLabel: "Renew licence",
        description:
          "Renew your licence before it expires to keep verified capabilities available.",
        status: "Expiring",
        tone: "warning",
      };
    case "in_grace":
      return {
        actionLabel: "Renew licence",
        description:
          "Renew your licence during the grace period to avoid losing verified capabilities.",
        status: "Renewal due",
        tone: "danger",
      };
    case "lapsed":
      return {
        actionLabel: "Renew licence",
        description:
          "Your licence is inactive. Renew it to restore verified capabilities.",
        status: "Inactive",
        tone: "danger",
      };
  }
}

function FirstUseHome({
  data,
  onNavigate,
  onOpenDemoPatient,
  onOpenLicence,
  onStartBooking,
}: Pick<
  HomeWorkspaceProps,
  | "data"
  | "onNavigate"
  | "onOpenDemoPatient"
  | "onOpenLicence"
  | "onStartBooking"
>) {
  const t = useT();
  const licence = firstUseLicenceContent(data.licence.state);

  return (
    <div className={styles.firstUse} data-slot="first-use-home">
      <header className={styles.welcomeHeader}>
        <div className={styles.welcomeCopy}>
          <h1 className={styles.welcomeTitle}>
            {t("You’re in. Your cabinet is ready.")}
          </h1>
          <p className={styles.bookingDescription}>
            {t("Start with a booking for your first patient.")}
          </p>
        </div>
        <div className={styles.bookingActions}>
          <Button
            onClick={() =>
              onStartBooking ? onStartBooking() : onNavigate?.("catalog")
            }
            variant="primary"
          >
            {t("Create booking")}
          </Button>
        </div>
        {data.licence.state === "verified" ? null : (
          <p className={styles.bookingNote}>
            {t("You can start booking patients before your licence is verified.")}
          </p>
        )}
      </header>

      <Card as="section" className={styles.setupTray}>
        {data.demoPatient ? (
          <Card
            as="section"
            aria-labelledby="first-use-demo-title"
            className={styles.demoPatient}
            variant="tile"
          >
            <Image
              alt=""
              aria-hidden="true"
              className={styles.firstUseIllustration}
              height={96}
              sizes="64px"
              src="/generated/kura-demo-patient-card-v1.png"
              width={96}
            />
            <div className={styles.demoCopy}>
              <h2 className={styles.demoTitle} id="first-use-demo-title">
                {t("Take a quick tour")}
              </h2>
              <p className={styles.demoDescription}>
                {t(
                  "Follow a sample patient from booking to results. Your records will not change.",
                )}
              </p>
            </div>
            <Button onClick={() => onOpenDemoPatient?.()} variant="outline">
              {t("Open sample patient")}
            </Button>
          </Card>
        ) : null}

        <Card
          as="section"
          aria-labelledby="first-use-licence-title"
          className={styles.licenceSetup}
          variant="tile"
        >
          <Image
            alt=""
            aria-hidden="true"
            className={styles.firstUseIllustration}
            height={96}
            sizes="64px"
            src="/generated/kura-medical-licence-clean-v1.png"
            width={96}
          />
          <div className={styles.licenceCopy}>
            <div className={styles.licenceHeading}>
              <h2 className={styles.licenceTitle} id="first-use-licence-title">
                {t("Medical licence")}
              </h2>
              <Badge size="sm" variant={licence.tone}>
                {t(licence.status)}
              </Badge>
            </div>
            <p className={styles.licenceDescription}>{t(licence.description)}</p>
          </div>
          {licence.actionLabel ? (
            <Button onClick={() => onOpenLicence?.()} variant="outline">
              {t(licence.actionLabel)}
            </Button>
          ) : null}
        </Card>
      </Card>
    </div>
  );
}

/**
 * Home spends its one tray on the safety-specific Results preview. Other work
 * queues stay flat but preserve patient identity; passive context remains a row.
 */
function PriorityWork({
  onNavigate,
  onRetrySignal,
  signals,
}: SignalHandlers & { signals: HomeSignal[] }) {
  const results = signals.find((signal) => signal.key === "results");
  const queues = orderSignals(
    signals.filter((signal) => signal.key !== "results"),
  ).filter((signal) => signal.state !== "ready" || (signal.count ?? 0) > 0);

  return (
    <div className={styles.priority}>
      {results ? (
        <HomeResultReviewPreview
          onNavigate={onNavigate}
          onRetry={onRetrySignal}
          signal={results}
        />
      ) : null}

      {queues.map((signal) => (
        <HomeWorkQueuePreview
          key={signal.key}
          onNavigate={onNavigate}
          onRetry={onRetrySignal}
          signal={signal}
        />
      ))}
    </div>
  );
}

function DayRow({
  action,
  onNavigate,
}: {
  action: NextAction;
  onNavigate?: (key: string) => void;
}) {
  const content = (
    <>
      <time className={styles.dayTime}>{action.time}</time>
      <span className={styles.dayText}>
        <span className={styles.dayLabel}>{action.label}</span>
        {action.meta ? (
          <span className={styles.dayMeta}>{action.meta}</span>
        ) : null}
      </span>
      {action.targetKey ? (
        <ChevronRightIcon
          aria-hidden="true"
          className={styles.dayChevron}
          size={14}
        />
      ) : null}
    </>
  );

  if (!action.targetKey) {
    return <div className={styles.dayRow}>{content}</div>;
  }

  const targetKey = action.targetKey;

  return (
    <a
      className={styles.dayRow}
      href={`#${targetKey}`}
      onClick={(event) => {
        if (!onNavigate) return;
        event.preventDefault();
        onNavigate(targetKey);
      }}
    >
      {content}
    </a>
  );
}

/** The day in reading order. The imminent stop leads by weight, not by surface. */
function NextToday({
  actions,
  onNavigate,
}: {
  actions: NextAction[];
  onNavigate?: (key: string) => void;
}) {
  const t = useT();

  return (
    <section aria-labelledby="home-next-title" className={styles.section}>
      <h2 className={styles.sectionTitle} id="home-next-title">
        {t("Next")}
      </h2>
      <ol className={styles.dayList}>
        {actions.map((action) => (
          <li key={`${action.time}-${action.label}`}>
            <DayRow action={action} onNavigate={onNavigate} />
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * Clinical Home (WQ-01): a start-of-shift briefing, not a second worklist.
 * It previews priority and routes each item to its canonical owning surface.
 */
export function HomeWorkspace({
  data,
  onChooseWorkspace,
  onNavigate,
  onOpenDemoPatient,
  onOpenLicence,
  onStartBooking,
  onRefresh,
  onRetrySignal,
}: HomeWorkspaceProps) {
  const t = useT();
  const banner = licenceBanner(data.licence);
  const allClear = isAllClear(data.signals);
  const workSignals = data.signals.filter(
    (signal) => signal.kind === "worklist",
  );
  const infoSignals = data.signals.filter((signal) => signal.kind === "info");
  const viewState = data.viewState ?? "ready";
  const mayShowLicence =
    viewState !== "permission" && viewState !== "no-workspace";
  const hasDay = data.nextActions.length > 0;
  const hasContext = infoSignals.length > 0 || Boolean(data.closedToday);

  return (
    <div className={styles.workspace} data-slot="home-workspace">
      <div className={styles.statusStack}>
        {data.freshness.kind === "offline" ? (
          <Alert tone="warning">
            <AlertTitle>{t("Offline")}</AlertTitle>
            <AlertDescription>
              {t("Last synced")} {data.freshness.asOf}.{" "}
              {t("Reconnect to make clinic changes.")}
            </AlertDescription>
          </Alert>
        ) : null}

        {banner && mayShowLicence && !data.firstUse ? (
          <Alert tone={banner.tone}>
            <AlertTitle>
              {banner.titleParts
                ? `${t(banner.titleParts.text)} ${banner.titleParts.date}`
                : t(banner.title)}
            </AlertTitle>
            <AlertDescription>{t(banner.description)}</AlertDescription>
            {banner.actionLabel ? (
              <AlertAction>
                <Button onClick={() => onOpenLicence?.()} variant="outline">
                  {t(banner.actionLabel)}
                </Button>
              </AlertAction>
            ) : null}
          </Alert>
        ) : null}
      </div>

      {!data.firstUse ? (
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.greeting}>
              {t(greetingForHour(data.hour))}, {data.doctorName}
            </h1>
            <p className={styles.scope}>
              <span>{data.dateLabel}</span>
              <span className={styles.scopeLabel}>{data.scopeLabel}</span>
            </p>
          </div>
          {data.freshness.kind === "stale" ? (
            <div className={styles.staleRow}>
              <span>
                {t("Last updated")} {data.freshness.asOf}
              </span>
              <Button onClick={() => onRefresh?.()} size="sm" variant="ghost">
                <RefreshIcon aria-hidden="true" size={14} />
                {t("Refresh")}
              </Button>
            </div>
          ) : null}
        </header>
      ) : null}

      {viewState === "loading" ? (
        <section
          aria-labelledby="home-loading-title"
          className={styles.section}
        >
          <h2 className={styles.sectionTitle} id="home-loading-title">
            {t("Loading")}
          </h2>
          <PriorityWork
            onNavigate={onNavigate}
            onRetrySignal={onRetrySignal}
            signals={workSignals}
          />
        </section>
      ) : null}

      {viewState === "error" ? (
        <Alert tone="danger">
          <AlertTitle>{t("Home could not load")}</AlertTitle>
          <AlertDescription>
            {t("Counts and actions are hidden because their status is unknown.")}
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => onRefresh?.()} variant="outline">
              {t("Reload")}
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {viewState === "permission" ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>{t("Home unavailable")}</EmptyStateTitle>
            <EmptyStateDescription>
              {t("Your role cannot open Home. No patient data was loaded.")}
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      ) : null}

      {viewState === "no-workspace" ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>{t("Choose a workspace")}</EmptyStateTitle>
            <EmptyStateDescription>
              {t("Select a clinic workspace. No clinic data was loaded.")}
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateContent>
            <Button onClick={() => onChooseWorkspace?.()} variant="primary">
              {t("Choose workspace")}
            </Button>
          </EmptyStateContent>
        </EmptyState>
      ) : null}

      {viewState === "ready" && data.firstUse ? (
        <FirstUseHome
          data={data}
          onNavigate={onNavigate}
          onOpenDemoPatient={onOpenDemoPatient}
          onOpenLicence={onOpenLicence}
          onStartBooking={onStartBooking}
        />
      ) : null}

      {viewState === "ready" && !data.firstUse && data.signals.length === 0 ? (
        <EmptyState align="center" surface="muted">
          <EmptyStateHeader>
            <EmptyStateTitle>{t("No patients")}</EmptyStateTitle>
            <EmptyStateDescription>
              {t(data.emptyDescription ?? "Add a patient to place orders.")}
            </EmptyStateDescription>
          </EmptyStateHeader>
          <EmptyStateContent>
            <Button
              onClick={() =>
                onNavigate?.(data.emptyAction?.targetKey ?? "patients")
              }
              variant="primary"
            >
              {t(data.emptyAction?.label ?? "Add patient")}
            </Button>
          </EmptyStateContent>
        </EmptyState>
      ) : null}

      {viewState === "ready" && !data.firstUse && data.signals.length > 0 ? (
        <div
          className={styles.briefing}
          data-columns={hasContext ? "two" : "one"}
        >
          <div className={styles.rail}>
            <section
              aria-labelledby="home-attention-title"
              className={styles.section}
            >
              <h2 className={styles.sectionTitle} id="home-attention-title">
                {t("Priority work")}
              </h2>

              {allClear ? (
                <EmptyState align="start" surface="muted">
                  <EmptyStateMedia variant="icon">
                    <CheckIcon aria-hidden="true" size={20} />
                  </EmptyStateMedia>
                  <EmptyStateHeader>
                    <EmptyStateTitle>{t("All caught up")}</EmptyStateTitle>
                    <EmptyStateDescription>
                      {t("No work needs attention.")}
                    </EmptyStateDescription>
                  </EmptyStateHeader>
                </EmptyState>
              ) : workSignals.length > 0 ? (
                <PriorityWork
                  onNavigate={onNavigate}
                  onRetrySignal={onRetrySignal}
                  signals={workSignals}
                />
              ) : (
                <p className={styles.quietState}>{t("No work right now.")}</p>
              )}
            </section>

            {hasDay ? (
              <NextToday actions={data.nextActions} onNavigate={onNavigate} />
            ) : null}
          </div>

          {hasContext ? (
            <div className={styles.rail}>
              {infoSignals.length > 0 ? (
                <section
                  aria-labelledby="home-overview-title"
                  className={styles.section}
                >
                  <h2 className={styles.sectionTitle} id="home-overview-title">
                    {t("Today")}
                  </h2>
                  <ul className={styles.rowList} role="list">
                    {infoSignals.map((signal) => (
                      <li key={signal.key}>
                        <HomeSignalRow
                          onNavigate={onNavigate}
                          onRetry={onRetrySignal}
                          signal={signal}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {data.closedToday ? (
                <section
                  aria-labelledby="home-closed-title"
                  className={styles.section}
                >
                  <h2 className={styles.sectionTitle} id="home-closed-title">
                    {t("Closed today")}
                  </h2>
                  <dl className={styles.closedList}>
                    <div className={styles.closedRow}>
                      <dt className={styles.closedLabel}>{t("Results")}</dt>
                      <dd className={styles.closedValue}>
                        {data.closedToday.resultLoops}
                      </dd>
                    </div>
                    <div className={styles.closedRow}>
                      <dt className={styles.closedLabel}>{t("Bookings")}</dt>
                      <dd className={styles.closedValue}>
                        {data.closedToday.bookings}
                      </dd>
                    </div>
                    <div className={styles.closedRow}>
                      <dt className={styles.closedLabel}>{t("Earned")}</dt>
                      <dd className={styles.closedValue}>
                        <MoneyText
                          currency="USD"
                          minor={data.closedToday.earnedMinor}
                        />
                      </dd>
                    </div>
                  </dl>
                </section>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
