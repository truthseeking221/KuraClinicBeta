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
  ChevronRightIcon,
  MoneyText,
  RefreshIcon,
} from "../../components/ui";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
  WorkspaceMetricGrid,
  WorkspacePage,
  WorkspacePageHeader,
  WorkspaceSectionHeader,
  WorkspaceSplit,
} from "../../components/shared";
import { useT } from "../../components/foundations/i18n";

import { HomeResultReviewPreview } from "./home-result-review-preview";
import { HomeSignalTile } from "./home-signal-tile";
import {
  greetingForHour,
  isAllClear,
  licenceBanner,
} from "./logic";
import type { HomeData, NextAction } from "./types";
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
          "You can book patients now. A verified licence is required to place orders under your own attribution, collect payments, issue legal documents, submit claims and appear in the doctor directory.",
        status: "Not started",
        tone: "warning",
      };
    case "pending_review":
      return {
        actionLabel: "View submission",
        description:
          "You can book patients now. Your documents are being reviewed and we will notify you when a decision is ready.",
        status: "Under review",
        tone: "info",
      };
    case "rejected":
      return {
        actionLabel: "Update verification",
        description:
          "You can book patients now. Review the decision and replace the document that could not be verified.",
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
  const demoPatient = data.demoPatient;

  return (
    <div className={styles.firstUse} data-slot="first-use-home">
      <header className={styles.welcomeHeader}>
        <div className={styles.welcomeCopy}>
          <h1 className={styles.welcomeTitle}>
            {t("You’re in. Your cabinet is ready.")}
          </h1>
          <p className={styles.bookingDescription}>
            {t(
              "Pick the tests, choose how the sample is collected, and the results come back here.",
            )}
          </p>
        </div>
        {/* One primary action. The demo record is an alternative way to start,
            not a second setup task, so it sits beside the booking as a
            secondary action instead of competing from its own tile. */}
        <div className={styles.bookingActions}>
          <Button
            onClick={() =>
              onStartBooking ? onStartBooking() : onNavigate?.("catalog")
            }
            variant="primary"
          >
            {t("Create booking")}
          </Button>
          {demoPatient ? (
            <Button onClick={() => onOpenDemoPatient?.()} variant="outline">
              {t("Open demo patient")}
            </Button>
          ) : null}
        </div>
        {/* What the demo record already holds, so opening it is a known offer
            rather than a blind tour, and that opening it is safe. */}
        {demoPatient ? (
          <p className={styles.bookingNote}>
            {`${demoPatient.name} — ${t(demoPatient.summary)}. `}
            {t("Your records will not change.")}
          </p>
        ) : null}
      </header>

      {/* Setup work the doctor can finish later reads as its own region. It
          carries the whole permission truth — what works now and what does
          not — so the two halves can never contradict each other. */}
      <Card
        as="section"
        aria-labelledby="first-use-licence-title"
        className={styles.licenceSetup}
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

/** The day in reading order. The imminent stop leads by weight, not by colour. */
function NextToday({
  actions,
  onNavigate,
}: {
  actions: NextAction[];
  onNavigate?: (key: string) => void;
}) {
  const t = useT();

  return (
    <section aria-labelledby="home-next-title" className={styles.nextSection}>
      <WorkspaceSectionHeader
        headingId="home-next-title"
        title={t("Next actions")}
      />
      <Card className={styles.nextTray}>
        <ol className={styles.dayList}>
          {actions.map((action) => (
            <li key={`${action.time}-${action.label}`}>
              <DayRow action={action} onNavigate={onNavigate} />
            </li>
          ))}
        </ol>
      </Card>
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
  const resultsSignal = data.signals.find((signal) => signal.key === "results");
  const viewState = data.viewState ?? "ready";
  const mayShowLicence =
    viewState !== "permission" && viewState !== "no-workspace";
  const hasDay = data.nextActions.length > 0;

  return (
    <WorkspacePage data-slot="home-workspace">
      {!data.firstUse ? (
        <WorkspacePageHeader
          actions={
            data.freshness.kind === "stale" ? (
              <div className={styles.staleRow}>
                <span>
                  {t("Last updated")} {data.freshness.asOf}
                </span>
                <Button onClick={() => onRefresh?.()} size="sm" variant="ghost">
                  <RefreshIcon aria-hidden="true" size={14} />
                  {t("Refresh")}
                </Button>
              </div>
            ) : undefined
          }
          description={`${data.dateLabel} · ${data.scopeLabel}`}
          title={`${t(greetingForHour(data.hour))}, ${data.doctorName}`}
        />
      ) : null}

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

      {viewState === "loading" ? (
        <section aria-labelledby="home-loading-title" className={styles.section}>
          <WorkspaceSectionHeader
            headingId="home-loading-title"
            title={t("Loading")}
          />
          <WorkspaceMetricGrid
            aria-label={t("Loading clinic overview")}
            className={styles.metrics}
            role="list"
          >
            {data.signals.map((signal) => (
              <div key={signal.key} role="listitem">
                <HomeSignalTile
                  onNavigate={onNavigate}
                  onRetry={onRetrySignal}
                  signal={signal}
                />
              </div>
            ))}
          </WorkspaceMetricGrid>
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
        <>
          <WorkspaceMetricGrid
            aria-label={t("Clinic overview")}
            className={styles.metrics}
            role="list"
          >
            {data.signals.map((signal) => (
              <div key={signal.key} role="listitem">
                <HomeSignalTile
                  onNavigate={onNavigate}
                  onRetry={onRetrySignal}
                  signal={signal}
                />
              </div>
            ))}
          </WorkspaceMetricGrid>

          {allClear ? (
            <Alert tone="success">
              <AlertTitle>{t("All caught up")}</AlertTitle>
              <AlertDescription>{t("No work needs attention.")}</AlertDescription>
            </Alert>
          ) : null}

          {resultsSignal || hasDay ? (
            <WorkspaceSplit>
              {resultsSignal ? (
                <section
                  aria-labelledby="home-results-title"
                  className={styles.resultsSection}
                >
                  <WorkspaceSectionHeader
                    actions={
                      resultsSignal.action ? (
                        <Button
                          onClick={() => {
                            const targetKey = resultsSignal.action?.targetKey;
                            if (targetKey) onNavigate?.(targetKey);
                          }}
                          size="sm"
                          variant="ghost"
                        >
                          {t("View all")}
                        </Button>
                      ) : undefined
                    }
                    headingId="home-results-title"
                    title={t("Results needing review")}
                  />
                  <HomeResultReviewPreview
                    onNavigate={onNavigate}
                    onRetry={onRetrySignal}
                    showFooter={false}
                    showHeader={false}
                    signal={resultsSignal}
                  />
                </section>
              ) : null}

              {hasDay ? (
                <NextToday actions={data.nextActions} onNavigate={onNavigate} />
              ) : null}
            </WorkspaceSplit>
          ) : null}

          {data.closedToday ? (
            <section aria-labelledby="home-closed-title" className={styles.section}>
              <WorkspaceSectionHeader
                headingId="home-closed-title"
                title={t("Closed today")}
              />
              <Card className={styles.closedTray}>
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
              </Card>
            </section>
          ) : null}
        </>
      ) : null}
    </WorkspacePage>
  );
}
