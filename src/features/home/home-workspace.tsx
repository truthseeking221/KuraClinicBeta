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
  WorkspacePage,
  WorkspacePageHeader,
  WorkspaceSectionHeader,
} from "../../components/shared";
import { useT } from "../../components/foundations/i18n";

import { HomeResultReviewPreview } from "./home-result-review-preview";
import { HomeSignalRow, SignalValue } from "./home-signal-row";
import {
  greetingForHour,
  isAllClear,
  licenceBanner,
  orderSignals,
} from "./logic";
import type { HomeData, HomeSignal, NextAction, SignalTone } from "./types";
import styles from "./home-workspace.module.css";

const TONE_BADGE: Record<Exclude<SignalTone, "neutral">, "warning" | "danger"> =
  {
    attention: "warning",
    critical: "danger",
  };

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

/**
 * The review axis, stated once. Label, loud count, evidence, then the queue
 * itself and the single primary action on the page. Nothing here repeats in
 * the rail: what waits on the doctor's judgement lives only in this column.
 */
function ReviewLead({
  onNavigate,
  onRetry,
  signal,
}: {
  signal: HomeSignal;
  onNavigate?: (targetKey: string) => void;
  onRetry?: (signalKey: string) => void;
}) {
  const t = useT();
  const ready = signal.state === "ready";
  const count = signal.count ?? 0;
  const hasQueue = ready ? count > 0 : true;
  const action = signal.action;

  return (
    <section aria-labelledby="home-review-title" className={styles.lead}>
      <header className={styles.leadHeader} data-tone={signal.tone}>
        <div className={styles.leadHeading}>
          <h2 className={styles.leadTitle} id="home-review-title">
            {t("Results to review")}
          </h2>
          {/* Severity is a loaded fact. While the axis is still loading or has
              failed, claiming one would state something we do not know. */}
          {ready && signal.tone !== "neutral" && signal.toneLabel ? (
            <Badge appearance="soft" size="sm" variant={TONE_BADGE[signal.tone]}>
              {t(signal.toneLabel)}
            </Badge>
          ) : null}
        </div>
        {ready ? (
          <>
            {/* The loudest value on the page. Severity carries the word too:
                the tone Badge above never leaves colour alone. */}
            <p className={styles.leadValue} data-tone={signal.tone}>
              <SignalValue signal={signal} />
            </p>
            <p className={styles.leadDetail}>{t(signal.detail)}</p>
          </>
        ) : null}
      </header>

      {hasQueue ? (
        <HomeResultReviewPreview
          onNavigate={onNavigate}
          onRetry={onRetry}
          showFooter={false}
          showHeader={false}
          signal={signal}
        />
      ) : null}

      {ready && hasQueue && action ? (
        <Button
          className={styles.leadAction}
          onClick={() => onNavigate?.(action.targetKey)}
          variant="primary"
        >
          {t(action.label)}
        </Button>
      ) : null}
    </section>
  );
}

/** Nothing waits on the doctor. The counts below stay visible as the evidence. */
function AllClearLead() {
  const t = useT();

  return (
    <section aria-labelledby="home-review-title" className={styles.lead}>
      <header className={styles.leadHeader}>
        <h2 className={styles.leadTitle} id="home-review-title">
          {t("All caught up")}
        </h2>
        <p className={styles.leadDetail}>{t("No work needs attention.")}</p>
      </header>
    </section>
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

/**
 * The clock-bound day: appointments and hand-offs, in time order. Review work
 * has no appointment, so it never appears here — that boundary is what keeps
 * the two columns from restating each other.
 */
function ComingUp({
  actions,
  onNavigate,
}: {
  actions: NextAction[];
  onNavigate?: (key: string) => void;
}) {
  const t = useT();

  return (
    <section aria-labelledby="home-coming-up-title" className={styles.railSection}>
      <WorkspaceSectionHeader
        headingId="home-coming-up-title"
        title={t("Coming up")}
      />
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

/** Every other lifecycle axis as one quiet row: value, evidence, route. */
function ClinicOverview({
  onNavigate,
  onRetry,
  signals,
}: {
  signals: HomeSignal[];
  onNavigate?: (targetKey: string) => void;
  onRetry?: (signalKey: string) => void;
}) {
  const t = useT();

  return (
    <section aria-labelledby="home-overview-title" className={styles.railSection}>
      <WorkspaceSectionHeader
        headingId="home-overview-title"
        title={t("Clinic overview")}
      />
      <ul
        aria-labelledby="home-overview-title"
        className={styles.signalList}
        role="list"
      >
        {orderSignals(signals).map((signal) => (
          <li key={signal.key}>
            <HomeSignalRow
              onNavigate={onNavigate}
              onRetry={onRetry}
              signal={signal}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ClosedToday({
  closed,
}: {
  closed: NonNullable<HomeData["closedToday"]>;
}) {
  const t = useT();

  return (
    <section aria-labelledby="home-closed-title" className={styles.railSection}>
      <WorkspaceSectionHeader
        headingId="home-closed-title"
        title={t("Closed today")}
      />
      <dl className={styles.closedList}>
        <div className={styles.closedRow}>
          <dt className={styles.closedLabel}>{t("Results")}</dt>
          <dd className={styles.closedValue}>{closed.resultLoops}</dd>
        </div>
        <div className={styles.closedRow}>
          <dt className={styles.closedLabel}>{t("Bookings")}</dt>
          <dd className={styles.closedValue}>{closed.bookings}</dd>
        </div>
        <div className={styles.closedRow}>
          <dt className={styles.closedLabel}>{t("Earned")}</dt>
          <dd className={styles.closedValue}>
            <MoneyText currency="USD" minor={closed.earnedMinor} />
          </dd>
        </div>
      </dl>
    </section>
  );
}

/**
 * Clinical Home (WQ-01): a start-of-shift briefing, not a second worklist.
 *
 * One twelve-field grid carries the whole page. The review queue spans eight
 * fields because it is the work that hurts if it waits; the day and the other
 * axes span four. Every item appears exactly once and deep-links to the
 * surface that owns it.
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
  // The review axis leads the page. When nothing waits it drops back into the
  // overview rows, so the zero stays visible as the evidence for "all caught up".
  const reviewSignal = data.signals.find(
    (signal) => signal.reviewItems !== undefined,
  );
  const leadSignal = allClear ? undefined : reviewSignal;
  const railSignals = data.signals.filter((signal) => signal !== leadSignal);
  const viewState = data.viewState ?? "ready";
  const mayShowLicence =
    viewState !== "permission" && viewState !== "no-workspace";
  const hasDay = data.nextActions.length > 0;
  const showBriefing =
    (viewState === "ready" || viewState === "loading") &&
    !data.firstUse &&
    data.signals.length > 0;

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

      {showBriefing ? (
        <div
          className={styles.grid}
          data-lead={allClear ? "clear" : leadSignal ? "true" : "false"}
        >
          {allClear ? <AllClearLead /> : null}

          {leadSignal ? (
            <ReviewLead
              onNavigate={onNavigate}
              onRetry={onRetrySignal}
              signal={leadSignal}
            />
          ) : null}

          <div className={styles.rail}>
            {hasDay ? (
              <ComingUp actions={data.nextActions} onNavigate={onNavigate} />
            ) : null}

            {railSignals.length > 0 ? (
              <ClinicOverview
                onNavigate={onNavigate}
                onRetry={onRetrySignal}
                signals={railSignals}
              />
            ) : null}

            {data.closedToday ? (
              <ClosedToday closed={data.closedToday} />
            ) : null}
          </div>
        </div>
      ) : null}
    </WorkspacePage>
  );
}
