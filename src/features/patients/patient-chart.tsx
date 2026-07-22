"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  ChevronLeftIcon,
  IconButton,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizablePanelImperativeHandle,
  SegmentedToggle,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from "../../components/shared";
import { useT } from "../../components/foundations/i18n";

import { OrdersPanel } from "./orders-panel";
import { displayNameOf, formatAgeSex, initialsOf, statusViewOf } from "./logic";
import { groupPatientOrders } from "./patient-order-logic";
import { PatientSwitcher } from "./patient-switcher";
import type {
  IdentityDocumentType,
  PatientChartState,
  PatientChartTab,
  PatientOrder,
  PatientSummary,
} from "./types";
import styles from "./patient-chart.module.css";

const DOC_TYPE_OPTIONS = [
  { value: "KH_NID", label: "KH National ID" },
  { value: "PASSPORT", label: "Passport" },
  { value: "OTHER", label: "Other" },
] as const;

function Fact({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className={styles.fact}>
      <dt className={styles.factLabel}>{label}</dt>
      <dd className={styles.factValue}>{value}</dd>
    </div>
  );
}

/**
 * Staff sights a physical document and attests to it; the document number is
 * deliberately not captured (mirrors POST /clinic/patients/:id/verify-identity).
 */
function VerifyIdentity({
  onVerifyIdentity,
}: {
  onVerifyIdentity: (docType: IdentityDocumentType) => void;
}) {
  const t = useT();
  const [docType, setDocType] = useState<IdentityDocumentType>("KH_NID");
  return (
    <div className={styles.verify}>
      <p className={styles.verifyHint}>
        {t(
          "Sight the patient's document to verify their identity. The document number is not recorded.",
        )}
      </p>
      <div className={styles.verifyControls}>
        <SegmentedToggle
          label={t("Document type")}
          onValueChange={(value) => setDocType(value as IdentityDocumentType)}
          options={DOC_TYPE_OPTIONS.map((option) => ({
            value: option.value,
            label: t(option.label),
          }))}
          value={docType}
        />
        <Button
          onClick={() => onVerifyIdentity(docType)}
          size="sm"
          variant="primary"
        >
          {t("Verify identity")}
        </Button>
      </div>
    </div>
  );
}

export type PatientChartActionRailMode = "launcher" | "workspace";

type ChartWorkspaceProps = {
  actionRail?: ReactNode;
  actionRailMode: PatientChartActionRailMode;
  children: ReactNode;
  contentOwnsInset: boolean;
  fullWidth: boolean;
};

function ChartWorkspace({
  actionRail,
  actionRailMode,
  children,
  contentOwnsInset,
  fullWidth,
}: ChartWorkspaceProps) {
  const t = useT();
  const regionRef = useRef<HTMLDivElement>(null);
  const actionPanelRef = useRef<ResizablePanelImperativeHandle>(null);
  const [mobile, setMobile] = useState(false);
  const [stacked, setStacked] = useState(false);
  const isWorkspace = Boolean(actionRail) && actionRailMode === "workspace";

  useEffect(() => {
    const region = regionRef.current;
    if (!region || !actionRail || typeof ResizeObserver === "undefined") return;

    const update = () => {
      setMobile(region.clientWidth <= 768);
      setStacked(region.clientWidth < (isWorkspace ? 960 : 800));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(region);
    return () => observer.disconnect();
  }, [actionRail, isWorkspace]);

  useEffect(() => {
    if (!actionPanelRef.current) return;
    actionPanelRef.current.resize(
      stacked ? (isWorkspace ? "44%" : "35%") : isWorkspace ? 520 : 320,
    );
  }, [isWorkspace, stacked]);

  const regionClassName = fullWidth
    ? `${styles.workspaceRegion} ${styles.workspaceRegionFull}`
    : styles.workspaceRegion;

  if (!actionRail) {
    return (
      <div className={regionClassName} ref={regionRef}>
        <div
          className={styles.work}
          data-content-owns-inset={contentOwnsInset || undefined}
          data-slot="patient-chart-record-scroll"
        >
          {children}
        </div>
      </div>
    );
  }

  /*
   * A resizable split owns a bounded desktop canvas. On a phone it would keep
   * that bound and clip the transformed rail, so render the same two owned
   * surfaces in reading order instead. The action remains reachable below the
   * record rather than existing only in the accessibility tree.
   */
  if (mobile) {
    return (
      <div
        className={regionClassName}
        data-mobile-layout
        data-workspace-rail={isWorkspace || undefined}
        ref={regionRef}
      >
        <div
          className={styles.work}
          data-content-owns-inset={contentOwnsInset || undefined}
          data-slot="patient-chart-record-scroll"
        >
          {children}
        </div>
        <aside
          aria-label={
            isWorkspace ? t("Clinical action workspace") : t("Patient actions")
          }
          className={styles.actionRail}
          data-slot="patient-chart-action-scroll"
        >
          {actionRail}
        </aside>
      </div>
    );
  }

  const orientation = stacked ? "vertical" : "horizontal";
  return (
    <div
      className={regionClassName}
      data-stacked={stacked || undefined}
      data-workspace-rail={isWorkspace || undefined}
      ref={regionRef}
    >
      <ResizablePanelGroup
        className={styles.resizableWorkspace}
        orientation={orientation}
      >
        <ResizablePanel
          defaultSize={stacked ? "56%" : undefined}
          id="patient-chart-evidence"
          minSize={stacked ? (isWorkspace ? "35%" : "50%") : 480}
        >
          <div
            className={styles.work}
            data-content-owns-inset={contentOwnsInset || undefined}
            data-slot="patient-chart-record-scroll"
          >
            {children}
          </div>
        </ResizablePanel>
        <ResizableHandle
          aria-label={
            isWorkspace
              ? t("Resize patient chart and action workspace")
              : t("Patient chart and action rail boundary")
          }
          className={isWorkspace ? undefined : styles.launcherHandle}
          disabled={!isWorkspace}
        />
        <ResizablePanel
          defaultSize={
            stacked ? (isWorkspace ? "44%" : "35%") : isWorkspace ? 520 : 320
          }
          groupResizeBehavior={
            stacked ? "preserve-relative-size" : "preserve-pixel-size"
          }
          id="patient-chart-action-workspace"
          maxSize={
            stacked ? (isWorkspace ? "65%" : "50%") : isWorkspace ? 560 : 320
          }
          minSize={
            stacked ? (isWorkspace ? "35%" : "25%") : isWorkspace ? 400 : 320
          }
          panelRef={actionPanelRef}
        >
          <aside
            aria-label={
              isWorkspace ? t("Clinical action workspace") : t("Patient actions")
            }
            className={styles.actionRail}
            data-slot="patient-chart-action-scroll"
          >
            {actionRail}
          </aside>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export type PatientChartProps = {
  patient: PatientSummary;
  /** Patient-scoped utilities pinned to the identity bar. */
  headerActions?: ReactNode;
  /** Registry rows for the in-place switcher; id-resolved, never by name. */
  patients?: readonly PatientSummary[];
  orders?: readonly PatientOrder[];
  /** Canonical PatientContextRail composition, supplied by the caller. */
  rail?: ReactNode;
  /** Governed clinical work rendered in the center column instead of chart tabs. */
  workflow?: ReactNode;
  /**
   * Situational right rail. Workspace mode keeps decision evidence visible
   * beside bounded clinical drafting work.
   */
  actionRail?: ReactNode;
  actionRailMode?: PatientChartActionRailMode;
  /** Canonical results composition (results feature), supplied by the caller. */
  results?: ReactNode;
  state?: PatientChartState;
  defaultTab?: PatientChartTab;
  /** Controlled selected record view for completion and deep-link handoffs. */
  selectedTab?: PatientChartTab;
  onTabChange?: (tab: PatientChartTab) => void;
  ordersState?: "ready" | "loading" | "error" | "permission-restricted";
  onRetryOrders?: () => void;
  focusedOrderId?: string;
  /** Return from the patient detail to the patients registry. */
  onBack?: () => void;
  onOpenMergedRecord?: () => void;
  onRetry?: () => void;
  onSwitchPatient?: (userId: string) => void;
  onVerifyIdentity?: (docType: IdentityDocumentType) => void;
};

/**
 * The patient chart shell: a pinned identity bar over a persistent context
 * rail and a tabbed work area. Deceased and merged records block clinical
 * work before any tab renders.
 */
export function PatientChart({
  actionRail,
  actionRailMode = "launcher",
  defaultTab = "overview",
  headerActions,
  onBack,
  onOpenMergedRecord,
  onRetry,
  onRetryOrders,
  onSwitchPatient,
  onTabChange,
  onVerifyIdentity,
  orders = [],
  ordersState = "ready",
  patient,
  patients,
  rail,
  results,
  selectedTab,
  state = "ready",
  workflow,
  focusedOrderId,
}: PatientChartProps) {
  const t = useT();
  const [uncontrolledTab, setUncontrolledTab] =
    useState<PatientChartTab>(defaultTab);
  const activeTab = selectedTab ?? uncontrolledTab;
  const activeOrderCount = groupPatientOrders(orders).active.length;

  const selectTab = (tab: string) => {
    const nextTab = tab as PatientChartTab;
    if (selectedTab === undefined) setUncontrolledTab(nextTab);
    onTabChange?.(nextTab);
  };

  if (state === "loading") {
    return (
      <div
        aria-busy="true"
        aria-label={t("Loading patient")}
        className={styles.stateFrame}
        role="status"
      >
        <Skeleton
          shape="rectangle"
          style={{ blockSize: 72, inlineSize: "100%" }}
        />
        <Skeleton
          shape="rectangle"
          style={{ blockSize: 240, inlineSize: "100%" }}
        />
      </div>
    );
  }

  if (state === "not-found") {
    return (
      <div className={styles.stateFrame}>
        <EmptyState align="center" surface="plain">
          <EmptyStateHeader>
            <EmptyStateTitle>{t("Patient not found")}</EmptyStateTitle>
            <EmptyStateDescription>
              {t("This record does not exist or is not part of this workspace.")}
            </EmptyStateDescription>
          </EmptyStateHeader>
          {onBack ? (
            <Button onClick={onBack} size="sm" variant="secondary">
              {t("Back to patients")}
            </Button>
          ) : null}
        </EmptyState>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={styles.stateFrame}>
        <Alert tone="danger">
          <AlertTitle>{t("Couldn't load this patient")}</AlertTitle>
          <AlertDescription>
            {t("Check your connection and try again.")}
          </AlertDescription>
        </Alert>
        {onRetry ? (
          <Button onClick={onRetry} size="sm" variant="secondary">
            {t("Try again")}
          </Button>
        ) : null}
      </div>
    );
  }

  const status = statusViewOf(patient);
  const terminal = status.kind === "terminal";
  const meta = [
    formatAgeSex(patient),
    patient.mrnMasked ? `MRN ${patient.mrnMasked}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const showActionRail = Boolean(actionRail) && !terminal && !workflow;

  return (
    <div
      className={styles.chart}
      data-action-rail={showActionRail ? actionRailMode : undefined}
      data-slot="patient-chart"
    >
      <header className={styles.workbar} data-slot="patient-chart-header">
        <div className={styles.headerLeading}>
          {onBack ? (
            <IconButton aria-label={t("Back to patients")} onClick={onBack} size="micro">
              <ChevronLeftIcon aria-hidden="true" size={16} />
            </IconButton>
          ) : null}
          <div className={styles.identity}>
            <Avatar shape="circle" size="md">
              <AvatarFallback>{initialsOf(patient)}</AvatarFallback>
            </Avatar>
            <div className={styles.identityCopy}>
              <div className={styles.nameRow}>
                <h1 className={styles.name}>{displayNameOf(patient, t)}</h1>
                {status.kind === "terminal" ? (
                  <Badge variant="neutral">{t(status.label)}</Badge>
                ) : status.assurance === "unverified" ? (
                  <Badge variant="warning">{t("Unverified")}</Badge>
                ) : null}
                {onSwitchPatient && patients ? (
                  <PatientSwitcher
                    onSwitchPatient={onSwitchPatient}
                    patient={patient}
                    patients={patients}
                  />
                ) : null}
              </div>
              {meta ? <p className={styles.meta}>{meta}</p> : null}
            </div>
          </div>
        </div>
        {!terminal && headerActions ? (
          <div className={styles.headerActions}>{headerActions}</div>
        ) : null}
      </header>

      {terminal ? (
        <div className={styles.terminal}>
          <Alert tone={status.status === "deceased" ? "neutral" : "info"}>
            <AlertTitle>
              {status.status === "deceased"
                ? t("This patient is deceased")
                : t("This record was merged")}
            </AlertTitle>
            <AlertDescription>
              {status.status === "deceased"
                ? t("The record is closed to new clinical work.")
                : t("All information now lives on the current record.")}
            </AlertDescription>
          </Alert>
          {status.status === "merged" && onOpenMergedRecord ? (
            <Button onClick={onOpenMergedRecord} size="sm" variant="primary">
              {t("Open current record")}
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          {rail ? (
            <div
              className={styles.rail}
              data-slot="patient-chart-context-scroll"
            >
              {rail}
            </div>
          ) : null}
          <ChartWorkspace
            actionRail={showActionRail ? actionRail : undefined}
            actionRailMode={actionRailMode}
            contentOwnsInset={
              !workflow && activeTab === "results" && Boolean(results)
            }
            fullWidth={!rail}
          >
            {workflow ? (
              <div className={styles.workflow}>{workflow}</div>
            ) : (
              <Tabs onValueChange={selectTab} value={activeTab}>
                <TabsList aria-label={t("Patient chart sections")}>
                  <TabsTrigger value="overview">{t("Overview")}</TabsTrigger>
                  <TabsTrigger
                    aria-label={
                      activeOrderCount > 0
                        ? `${t("Orders")}, ${activeOrderCount} ${t("active")}`
                        : t("Orders")
                    }
                    count={activeOrderCount > 0 ? activeOrderCount : undefined}
                    value="orders"
                  >
                    {t("Orders")}
                  </TabsTrigger>
                  <TabsTrigger value="results">{t("Results")}</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  {/* MRN lives in the workbar; repeating it here would say nothing new. */}
                  <dl className={styles.facts}>
                    <Fact
                      label={t("Phone")}
                      value={
                        patient.phoneMasked || <span aria-hidden="true">—</span>
                      }
                    />
                    <Fact
                      label={t("Identity")}
                      value={
                        status.kind === "assurance" &&
                        status.assurance === "unverified" ? (
                          <Badge variant="warning">{t("Unverified")}</Badge>
                        ) : (
                          t("Verified")
                        )
                      }
                    />
                  </dl>
                  {status.kind === "assurance" &&
                  status.assurance === "unverified" &&
                  onVerifyIdentity ? (
                    <VerifyIdentity onVerifyIdentity={onVerifyIdentity} />
                  ) : null}
                </TabsContent>
                <TabsContent value="orders">
                  <OrdersPanel
                    focusedOrderId={focusedOrderId}
                    onRetry={onRetryOrders}
                    orders={orders}
                    state={ordersState}
                  />
                </TabsContent>
                <TabsContent value="results">
                  {results ?? (
                    <EmptyState align="center" surface="plain">
                      <EmptyStateHeader>
                        <EmptyStateTitle>
                          {t("No reportable results yet")}
                        </EmptyStateTitle>
                        <EmptyStateDescription>
                          {t(
                            "Released results appear here as soon as the lab makes them available.",
                          )}
                        </EmptyStateDescription>
                      </EmptyStateHeader>
                    </EmptyState>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </ChartWorkspace>
        </>
      )}
    </div>
  );
}
