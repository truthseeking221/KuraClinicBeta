"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

import { useT } from "../../components/foundations/i18n";
import type { Translate } from "../../components/foundations/i18n";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconButton,
  MoneyText,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SegmentedToggle,
  Spinner,
} from "../../components/ui";
import {
  ArrowLeftIcon,
  CashIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  DeleteIcon,
  HelpIcon,
  InjectionIcon,
  QrCodeIcon,
  ShoppingCartIcon,
  WarningIcon,
} from "../../components/ui/icons";

import {
  canEditOrderCart,
  decisionsComplete,
  doctorDecisionSummary,
  getOrderCartPrimaryAction,
  groupOrderCartItems,
  itemCount,
  tubeProgress,
} from "./logic";
import type {
  CollectionDecisions,
  DoctorOrderCartWorkflow,
  DecisionPanelState,
  OrderCartData,
  OrderCartEarnings,
  OrderCartItem,
  OrderCartPricing,
  OrderCartWorkflow,
  ReceptionPaymentMethod,
  ReceptionistOrderCartWorkflow,
  TubePrepMethod,
  CartSuggestion,
} from "./types";
import { SuggestionStack } from "./suggestion-stack";
import styles from "./order-cart.module.css";

export type OrderCartProps = {
  cart: OrderCartData;
  workflow: OrderCartWorkflow;
  /** Engine verdicts, rendered in engine order below the items. */
  suggestions?: CartSuggestion[];
  onSuggestionAccept?: (suggestion: CartSuggestion) => void;
  onSuggestionDismiss?: (suggestion: CartSuggestion) => void;
  onRemoveItem?: (itemId: string) => void;
  onClear?: () => void;
  onAddFirst?: () => void;
  onRetryPricing?: () => void;
  onAcceptReprice?: () => void;
  onBlockerAction?: (blockerId: string) => void;
  onPrimaryAction?: () => void;
  /** Decision card interactions. */
  onDecisionsChange?: (next: CollectionDecisions) => void;
  onPanelChange?: (state: "unset" | "expanded" | "summary") => void;
  onAttestChange?: (attested: boolean) => void;
  /** Receptionist tender choice. */
  onMethodChange?: (method: ReceptionPaymentMethod) => void;
  /** Tube preparation (doctor self-draw). */
  onTubeScan?: (tubeId: string, scanned: boolean) => void;
  onTubeMethodChange?: (method: TubePrepMethod) => void;
  onBackToCart?: () => void;
  className?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Decision summaries arrive already composed ("Kura collection · Patient Home").
 * Each side of the separator is its own dictionary key, so the summary reads in
 * one language without the pure rule module having to know about locale.
 */
function translateParts(t: Translate, value: string): string {
  return value
    .split(" · ")
    .map((part) => t(part))
    .join(" · ");
}

function formatCommissionRate(
  earnings: OrderCartEarnings,
  t: Translate,
): string {
  const rates = new Set(earnings.lines.map((line) => line.commissionBp));
  if (rates.size === 0) return t("Not available");
  if (rates.size > 1) return t("Varies by test");

  const [basisPoints] = rates;
  return `${(basisPoints / 100)
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1")}%`;
}

function EarningsDetails({
  earnings,
  payment,
  titleId,
}: {
  earnings: OrderCartEarnings;
  payment: CollectionDecisions["payment"];
  titleId: string;
}) {
  const t = useT();
  const settlementCopy =
    payment === "pay-now"
      ? t(
          "This is the amount your practice keeps. Kura’s share is settled after completion.",
        )
      : payment === "pay-later-kura"
        ? t("Added to your Kura balance when the tests are completed.")
        : t("Final earnings are settled after the tests are completed.");

  return (
    <div className={styles.earningsDetails}>
      <strong className={styles.earningsTitle} id={titleId}>
        {t("Estimated earnings")}
      </strong>
      <p className={styles.earningsDescription}>
        {t("Calculated per test from eligible net prices after discounts.")}
      </p>
      <dl className={styles.earningsBreakdown}>
        <div>
          <dt>{t("Earnings basis")}</dt>
          <dd>
            <MoneyText
              currency={earnings.currencyCode}
              minor={earnings.eligibleSubtotalMinor}
            />
          </dd>
        </div>
        <div>
          <dt>{t("Commission")}</dt>
          <dd>{formatCommissionRate(earnings, t)}</dd>
        </div>
        <div className={styles.earningsTotal}>
          <dt>{t("Estimated total")}</dt>
          <dd>
            <MoneyText
              currency={earnings.currencyCode}
              minor={earnings.earnMinor}
            />
          </dd>
        </div>
      </dl>
      <p className={styles.earningsSettlement}>{settlementCopy}</p>
    </div>
  );
}

function EarningsDisclosure({
  earnings,
  payment,
}: {
  earnings: OrderCartEarnings;
  payment: CollectionDecisions["payment"];
}) {
  const t = useT();
  const titleId = useId();
  const triggerLabel = t("How earnings are calculated");

  return (
    <span className={styles.earningsDisclosure}>
      <span className={styles.earningsHoverDisclosure}>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              aria-label={triggerLabel}
              className={styles.earningsTrigger}
              size="icon-xs"
              variant="ghost"
            >
              <HelpIcon aria-hidden="true" size={16} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            align="end"
            aria-labelledby={titleId}
            role="tooltip"
            side="top"
            size="md"
          >
            <EarningsDetails
              earnings={earnings}
              payment={payment}
              titleId={titleId}
            />
          </HoverCardContent>
        </HoverCard>
      </span>

      <span className={styles.earningsPressDisclosure}>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                aria-label={triggerLabel}
                className={styles.earningsTrigger}
                size="icon-xs"
                variant="ghost"
              >
                <HelpIcon aria-hidden="true" size={16} />
              </Button>
            }
          />
          <PopoverContent
            align="end"
            aria-labelledby={titleId}
            initialFocus={false}
            role="dialog"
            side="top"
          >
            <EarningsDetails
              earnings={earnings}
              payment={payment}
              titleId={titleId}
            />
          </PopoverContent>
        </Popover>
      </span>
    </span>
  );
}

/* ── Shared small parts ── */

function OptionCard({
  disabled,
  icon,
  label,
  name,
  onSelect,
  selected,
}: {
  icon: ReactNode;
  label: string;
  name: string;
  selected: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}) {
  return (
    <label
      className={styles.optionCard}
      data-disabled={disabled || undefined}
      data-selected={selected || undefined}
    >
      <input
        checked={selected}
        className={styles.optionInput}
        disabled={disabled}
        name={name}
        onChange={onSelect}
        type="radio"
      />
      <span className={styles.optionTop}>
        <span className={styles.optionIcon}>{icon}</span>
        <span
          aria-hidden="true"
          className={styles.optionRadio}
          data-selected={selected || undefined}
        >
          {selected ? <span className={styles.optionRadioDot} /> : null}
        </span>
      </span>
      <span className={styles.optionLabel}>{label}</span>
    </label>
  );
}

function KuraMark() {
  /* Brand asset, not an icon-system glyph — matches the Figma option card. */
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      alt=""
      aria-hidden="true"
      className={styles.kuraMark}
      src="/brand/kura-full-logo.svg"
    />
  );
}

function PricingNotice({
  onAcceptReprice,
  onRetryPricing,
  pricing,
}: {
  pricing: OrderCartPricing;
  onAcceptReprice?: () => void;
  onRetryPricing?: () => void;
}) {
  const t = useT();

  if (pricing.state === "loading") {
    return (
      <Spinner
        aria-atomic="true"
        className={styles.pricingLoading}
        label={t("Updating prices…")}
        showLabel
        size="sm"
      />
    );
  }

  if (pricing.state === "error") {
    return (
      <Alert tone="danger">
        <AlertTitle>{t("Price unavailable")}</AlertTitle>
        <AlertDescription>
          {pricing.message
            ? t(pricing.message)
            : t("We couldn’t update prices. Your selections are saved.")}
        </AlertDescription>
        {onRetryPricing ? (
          <AlertAction>
            <Button onClick={onRetryPricing} size="sm" variant="outline">
              {t("Retry pricing")}
            </Button>
          </AlertAction>
        ) : null}
      </Alert>
    );
  }

  if (pricing.state === "stale") {
    return (
      <Alert icon={<WarningIcon />} tone="warning">
        <AlertTitle>{t("Prices changed")}</AlertTitle>
        <AlertDescription>
          <ul className={styles.repriceList}>
            {pricing.repricedLines.map((line) => (
              <li key={line.itemId}>
                {line.name}:{" "}
                <s>
                  <MoneyText currency="USD" minor={line.oldPriceMinor} />
                </s>{" "}
                → <MoneyText currency="USD" minor={line.newPriceMinor} />
              </li>
            ))}
          </ul>
          {t("Review and accept the updated quote before continuing.")}
        </AlertDescription>
        {onAcceptReprice ? (
          <AlertAction>
            <Button onClick={onAcceptReprice} size="sm" variant="outline">
              {t("Accept new price")}
            </Button>
          </AlertAction>
        ) : null}
      </Alert>
    );
  }

  return null;
}

function useDecisionPanelFocus(panel: DecisionPanelState) {
  const actionRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const previousPanelRef = useRef(panel);

  useEffect(() => {
    const previousPanel = previousPanelRef.current;
    previousPanelRef.current = panel;

    if (previousPanel === panel) return;

    if (panel === "expanded") {
      const selectedOption =
        sectionRef.current?.querySelector<HTMLInputElement>(
          'input[type="radio"]:checked:not(:disabled)',
        );
      const firstOption = sectionRef.current?.querySelector<HTMLInputElement>(
        'input[type="radio"]:not(:disabled)',
      );
      (selectedOption ?? firstOption ?? headingRef.current)?.focus({
        preventScroll: true,
      });
      return;
    }

    if (previousPanel === "expanded") actionRef.current?.focus();
  }, [panel]);

  return { actionRef, headingRef, sectionRef };
}

/* ── Decision card (Figma "Collection & payment") ── */

function DoctorDecisionCard({
  onDecisionsChange,
  onPanelChange,
  workflow,
}: {
  workflow: DoctorOrderCartWorkflow;
  onDecisionsChange?: (next: CollectionDecisions) => void;
  onPanelChange?: (state: "unset" | "expanded" | "summary") => void;
}) {
  const t = useT();
  const { decisions, panel } = workflow;
  const collectionGroupName = useId();
  const paymentGroupName = useId();
  const panelId = useId();
  const titleId = useId();
  const { actionRef, headingRef, sectionRef } = useDecisionPanelFocus(panel);
  const summary = doctorDecisionSummary(workflow);
  const locked = workflow.paymentLocked === true;
  const editable = workflow.stage === "draft";
  const expanded = panel === "expanded";
  const isSet = summary !== null;
  const actionLabel = isSet
    ? editable && !locked
      ? "Edit"
      : "View"
    : "Set up";
  const patch = (next: Partial<CollectionDecisions>) =>
    onDecisionsChange?.({ ...decisions, ...next });
  const canChange = editable && !locked;

  return (
    <Collapsible open={expanded}>
      <section
        aria-labelledby={titleId}
        className={styles.decisionCard}
        ref={sectionRef}
      >
        {expanded ? (
          <div className={styles.decisionHeader}>
            <h3
              className={styles.decisionTitle}
              id={titleId}
              ref={headingRef}
              tabIndex={-1}
            >
              {t("Collection & payment")}
            </h3>
            <Button
              aria-controls={panelId}
              aria-expanded
              onClick={() => onPanelChange?.("summary")}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              {t("Done")}
            </Button>
          </div>
        ) : (
          <div className={styles.decisionSummaryRow}>
            <div className={styles.decisionSummaryCopy}>
              <h3 className={styles.decisionSummaryTitle} id={titleId}>
                {isSet
                  ? translateParts(t, summary.title)
                  : t("Collection & payment")}
              </h3>
              <span>{isSet ? t(summary.detail) : t("Not set yet")}</span>
            </div>
            <Button
              aria-controls={panelId}
              aria-expanded={false}
              aria-label={`${t(actionLabel)} ${t("collection and payment")}`}
              onClick={() => onPanelChange?.("expanded")}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              {t(actionLabel)}
            </Button>
          </div>
        )}

        <CollapsibleContent
          className={styles.decisionMotion}
          id={panelId}
        >
          <div className={styles.decisionEditor}>
            <fieldset className={styles.question}>
              <legend className={styles.questionLabel}>
                {t("Who will collect the sample?")}
              </legend>
              <div
                aria-label={t("Who will collect the sample?")}
                className={styles.optionGrid}
                role="radiogroup"
              >
                <OptionCard
                  disabled={!canChange}
                  icon={<InjectionIcon aria-hidden="true" size={20} />}
                  label={t("I will draw the blood now")}
                  name={collectionGroupName}
                  onSelect={() =>
                    patch({ collectBy: "self", drawSite: undefined })
                  }
                  selected={decisions.collectBy === "self"}
                />
                <OptionCard
                  disabled={!canChange}
                  icon={<KuraMark />}
                  label={t("Kura will draw the blood")}
                  name={collectionGroupName}
                  onSelect={() => patch({ collectBy: "kura" })}
                  selected={decisions.collectBy === "kura"}
                />
              </div>
            </fieldset>

            {decisions.collectBy === "kura" ? (
              <div className={styles.question}>
                <p className={styles.questionLabel}>
                  {t("Where is the blood drawn?")}
                </p>
                <SegmentedToggle
                  label={t("Where is the blood drawn?")}
                  disabled={!canChange}
                  onValueChange={(value) =>
                    patch({
                      drawSite: value as CollectionDecisions["drawSite"],
                    })
                  }
                  options={[
                    { value: "kura-psc", label: t("Kura PSC") },
                    { value: "patient-home", label: t("Patient Home") },
                  ]}
                  value={decisions.drawSite ?? ""}
                />
              </div>
            ) : null}

            <fieldset className={styles.question}>
              <legend className={styles.questionLabel}>
                {t("What is the payment method?")}
              </legend>
              <div
                aria-label={t("What is the payment method?")}
                className={styles.optionGrid}
                role="radiogroup"
              >
                <OptionCard
                  disabled={!canChange}
                  icon={<CashIcon aria-hidden="true" size={20} />}
                  label={t("Patient will pay you now")}
                  name={paymentGroupName}
                  onSelect={() => patch({ payment: "pay-now" })}
                  selected={decisions.payment === "pay-now"}
                />
                <OptionCard
                  disabled={!canChange}
                  icon={<ClockIcon aria-hidden="true" size={20} />}
                  label={t("Patient will pay later at Kura")}
                  name={paymentGroupName}
                  onSelect={() => patch({ payment: "pay-later-kura" })}
                  selected={decisions.payment === "pay-later-kura"}
                />
              </div>
            </fieldset>

            {locked ? (
              <div className={styles.lockedNote} role="note">
                <WarningIcon aria-hidden="true" size={14} />
                {t("Locked after payment. You can edit later in Booking.")}
              </div>
            ) : null}
          </div>
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
}

const RECEPTION_METHOD_LABEL: Record<ReceptionPaymentMethod, string> = {
  cash: "Cash",
  khqr: "KHQR",
  "pay-later": "Pay later at Kura",
};

function ReceptionDecisionCard({
  onMethodChange,
  onPanelChange,
  workflow,
}: {
  workflow: ReceptionistOrderCartWorkflow;
  onMethodChange?: (method: ReceptionPaymentMethod) => void;
  onPanelChange?: (state: "unset" | "expanded" | "summary") => void;
}) {
  const t = useT();
  const methodGroupName = useId();
  const panelId = useId();
  const titleId = useId();
  const { actionRef, headingRef, sectionRef } = useDecisionPanelFocus(
    workflow.panel,
  );
  const paid = workflow.payment.status === "paid";
  const locked = paid || workflow.stage === "checked-in";
  const expanded = workflow.panel === "expanded";
  const isSet = workflow.method !== undefined;
  const actionLabel = isSet ? (locked ? "View" : "Edit") : "Set up";

  return (
    <Collapsible open={expanded}>
      <section
        aria-labelledby={titleId}
        className={styles.decisionCard}
        ref={sectionRef}
      >
        {expanded ? (
          <div className={styles.decisionHeader}>
            <h3
              className={styles.decisionTitle}
              id={titleId}
              ref={headingRef}
              tabIndex={-1}
            >
              {t("Payment")}
            </h3>
            <Button
              aria-controls={panelId}
              aria-expanded
              onClick={() => onPanelChange?.("summary")}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              {t("Done")}
            </Button>
          </div>
        ) : (
          <div className={styles.decisionSummaryRow}>
            <div className={styles.decisionSummaryCopy}>
              <h3 className={styles.decisionSummaryTitle} id={titleId}>
                {isSet
                  ? `${t("Payment")} · ${t(RECEPTION_METHOD_LABEL[workflow.method!])}`
                  : t("Payment")}
              </h3>
              <span>
                {paid
                  ? `${t(workflow.payment.label)}${workflow.payment.receiptId ? ` · ${workflow.payment.receiptId}` : ""}`
                  : isSet
                    ? t(workflow.payment.label)
                    : t("Not set yet")}
              </span>
            </div>
            <Button
              aria-controls={panelId}
              aria-expanded={false}
              aria-label={`${t(actionLabel)} ${t("payment")}`}
              onClick={() => onPanelChange?.("expanded")}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              {t(actionLabel)}
            </Button>
          </div>
        )}

        <CollapsibleContent
          className={styles.decisionMotion}
          id={panelId}
        >
          <div className={styles.decisionEditor}>
            <fieldset className={styles.question}>
              <legend className={styles.questionLabel}>
                {t("How does the patient pay?")}
              </legend>
              <div
                aria-label={t("How does the patient pay?")}
                className={styles.optionGrid}
                role="radiogroup"
              >
                <OptionCard
                  disabled={locked}
                  icon={<CashIcon aria-hidden="true" size={20} />}
                  label={t("Cash at the desk")}
                  name={methodGroupName}
                  onSelect={() => onMethodChange?.("cash")}
                  selected={workflow.method === "cash"}
                />
                <OptionCard
                  disabled={locked}
                  icon={<QrCodeIcon aria-hidden="true" size={20} />}
                  label={t("KHQR transfer")}
                  name={methodGroupName}
                  onSelect={() => onMethodChange?.("khqr")}
                  selected={workflow.method === "khqr"}
                />
                <OptionCard
                  disabled={locked}
                  icon={<ClockIcon aria-hidden="true" size={20} />}
                  label={t("Pay later at Kura")}
                  name={methodGroupName}
                  onSelect={() => onMethodChange?.("pay-later")}
                  selected={workflow.method === "pay-later"}
                />
              </div>
            </fieldset>

            {locked ? (
              <div className={styles.lockedNote} role="note">
                <WarningIcon aria-hidden="true" size={14} />
                {t(
                  "Locked after payment. Changes route through void or supplemental.",
                )}
              </div>
            ) : null}
          </div>
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
}

/* ── Tube preparation view (doctor self-draw) ── */

function TubePrepView({
  onBackToCart,
  onPrimaryAction,
  onTubeMethodChange,
  onTubeScan,
  workflow,
}: {
  workflow: DoctorOrderCartWorkflow;
  onBackToCart?: () => void;
  onPrimaryAction?: () => void;
  onTubeMethodChange?: (method: TubePrepMethod) => void;
  onTubeScan?: (tubeId: string, scanned: boolean) => void;
}) {
  const t = useT();
  const tubes = workflow.tubes ?? [];
  const progress = tubeProgress(tubes);
  const tests = Array.from(new Set(tubes.flatMap((tube) => tube.tests)));

  return (
    <div className={styles.tubeView}>
      <button className={styles.backLink} onClick={onBackToCart} type="button">
        <ArrowLeftIcon aria-hidden="true" size={14} />
        {t("Back to cart")}
      </button>

      <div className={styles.tubeIntro}>
        <p className={styles.tubeIntroLabel}>
          {t("You need to prepare tubes for")}
        </p>
        <ol className={styles.tubeTestList}>
          {tests.map((test) => (
            <li key={test}>{test}</li>
          ))}
        </ol>
      </div>

      <div className={styles.question}>
        <p className={styles.questionLabel}>{t("Choose preparation method")}</p>
        <SegmentedToggle
          label={t("Choose preparation method")}
          onValueChange={(value) =>
            onTubeMethodChange?.(value as TubePrepMethod)
          }
          options={[
            { value: "scan", label: t("Scan") },
            { value: "print", label: t("Print") },
          ]}
          value={workflow.tubeMethod ?? "scan"}
        />
      </div>

      <div className={styles.tubeReadyRow}>
        <h3 className={styles.tubeReadyTitle}>{t("Ready")}</h3>
        <Badge size="sm" variant={progress.complete ? "success" : "neutral"}>
          {progress.scanned}/{progress.total} {t("scanned")}
        </Badge>
      </div>

      <ul className={styles.tubeList}>
        {tubes.map((tube) => (
          <li
            className={styles.tubeRow}
            data-scanned={tube.scanned || undefined}
            key={tube.id}
          >
            <span
              aria-hidden="true"
              className={styles.tubeStopper}
              style={{ background: tube.stopperColor }}
            />
            <span className={styles.tubeCopy}>
              <span className={styles.tubeLabel}>{tube.label}</span>
              <span className={styles.tubeTests}>{tube.tests.join(" · ")}</span>
            </span>
            {tube.scanned ? (
              <>
                <Button
                  onClick={() => onTubeScan?.(tube.id, false)}
                  size="xs"
                  variant="link"
                >
                  {t("Undo")}
                </Button>
                <span
                  aria-label={t("Scanned")}
                  className={styles.tubeCheck}
                  role="img"
                >
                  <CheckIcon aria-hidden="true" size={12} />
                </span>
              </>
            ) : (
              <Button
                onClick={() => onTubeScan?.(tube.id, true)}
                size="xs"
                variant="outline"
              >
                {t("Mark scanned")}
              </Button>
            )}
          </li>
        ))}
      </ul>

      <div className={styles.footerCta}>
        <Button
          disabled={!progress.complete}
          fullWidth
          onClick={onPrimaryAction}
          size="lg"
        >
          {t("Confirm collection & scan")}
        </Button>
        {!progress.complete ? (
          <p className={styles.ctaReason}>
            {t("Scan every tube first")} ({progress.scanned}/{progress.total}{" "}
            {t("scanned")}).
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ── Main cart ── */

function stateBadge(item: OrderCartItem, t: Translate) {
  if (item.state === "locked") return <Badge size="sm">{t("Required")}</Badge>;
  if (item.state === "supplemental") {
    return (
      <Badge size="sm" variant="warning">
        {t("Added after payment")}
      </Badge>
    );
  }
  if (item.state === "cancelled") return <Badge size="sm">{t("Voided")}</Badge>;
  return null;
}

/**
 * The one clinic order cart (Figma `OrderCart / HBC workflow`): doctor and
 * receptionist share the shell — selected tests, a collection-and-payment
 * decision card, totals with clinician earnings, a collected-money
 * attestation, and one primary action whose label follows the lifecycle.
 */
export function OrderCart({
  cart,
  className,
  onAcceptReprice,
  onAddFirst,
  onAttestChange,
  onBackToCart,
  onBlockerAction,
  onClear,
  onDecisionsChange,
  onMethodChange,
  onPanelChange,
  onPrimaryAction,
  onRemoveItem,
  onRetryPricing,
  onSuggestionAccept,
  onSuggestionDismiss,
  onTubeMethodChange,
  onTubeScan,
  suggestions,
  workflow,
}: OrderCartProps) {
  const t = useT();
  const itemsHeadingId = useId();
  const count = itemCount(cart.items);
  const groups = groupOrderCartItems(cart.items);
  const canEdit = canEditOrderCart(cart, workflow);
  const primaryAction = getOrderCartPrimaryAction(cart, workflow);
  const canClear =
    canEdit && cart.items.some((item) => item.state !== "locked");
  const summary =
    cart.pricing.state === "error" ? undefined : cart.pricing.summary;

  if (workflow.role === "doctor" && workflow.stage === "tubes") {
    return (
      <aside
        aria-label={t("Order cart — tube preparation")}
        className={joinClasses(styles.cart, className)}
        data-role={workflow.role}
      >
        <TubePrepView
          onBackToCart={onBackToCart}
          onPrimaryAction={onPrimaryAction}
          onTubeMethodChange={onTubeMethodChange}
          onTubeScan={onTubeScan}
          workflow={workflow}
        />
      </aside>
    );
  }

  const isEmpty = cart.items.length === 0;
  const showAttestation =
    workflow.role === "doctor"
      ? workflow.decisions.payment === "pay-now" &&
        decisionsComplete(workflow.decisions) &&
        workflow.stage === "draft"
      : workflow.method !== undefined &&
        workflow.method !== "pay-later" &&
        workflow.payment.status !== "paid" &&
        workflow.stage !== "checked-in";

  const earnings = workflow.role === "doctor" ? workflow.earnings : undefined;
  const isReceptionistOrderSummary =
    workflow.role === "receptionist" && workflow.stage === "order-review";

  return (
    <aside
      aria-label={
        isReceptionistOrderSummary
          ? t("Receptionist order summary")
          : t(
              workflow.role === "doctor"
                ? "Doctor order cart"
                : "Receptionist order cart",
            )
      }
      className={joinClasses(styles.cart, className)}
      data-lifecycle={cart.lifecycle}
      data-role={workflow.role}
    >
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>
            {isEmpty ? t("Order Cart") : t("Selected tests")}
          </h2>
          {!isEmpty ? (
            <Badge aria-label={`${count} ${t("tests selected")}`} size="sm">
              {count}
            </Badge>
          ) : null}
        </div>
        {canClear && onClear ? (
          <IconButton
            aria-label={t("Clear all removable items")}
            onClick={onClear}
            size="micro"
            variant="tertiary"
          >
            <DeleteIcon aria-hidden="true" size={16} />
          </IconButton>
        ) : null}
      </header>

      {workflow.role === "doctor" && workflow.indication && !isEmpty ? (
        <p className={styles.indication}>
          <span className={styles.indicationLabel}>{t("Ordered for")}</span>
          <span className={styles.indicationValue}>
            {workflow.indication.code === ""
              ? workflow.indication.label
              : `${workflow.indication.code} · ${workflow.indication.label}`}
          </span>
        </p>
      ) : null}

      {isEmpty ? (
        <div className={styles.empty}>
          <span aria-hidden="true" className={styles.emptyIcon}>
            <ShoppingCartIcon size={28} />
          </span>
          <strong>{t("Nothing here yet")}</strong>
          <span>
            {t(
              workflow.role === "doctor"
                ? "Add your first lab test."
                : "Add an order item to begin.",
            )}
          </span>
          {onAddFirst && workflow.access === "allowed" ? (
            <Button onClick={onAddFirst} size="sm" variant="outline">
              {t("Add first test")}
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          <div className={styles.body}>
            <section
              aria-labelledby={itemsHeadingId}
              className={styles.itemsSection}
            >
              <h3 className={styles.srOnly} id={itemsHeadingId}>
                {t("Selected items")}
              </h3>
              {groups.map((group) => (
                <div className={styles.group} key={group.kind}>
                  <p className={styles.groupLabel}>{t(group.label)}</p>
                  <ul className={styles.lines}>
                    {group.items.map((item) => (
                      <li
                        className={styles.line}
                        data-state={item.state ?? "default"}
                        key={item.id}
                      >
                        <span className={styles.lineName}>
                          {item.name}
                          {stateBadge(item, t)}
                          {item.meta ? (
                            <span className={styles.lineMeta}>{item.meta}</span>
                          ) : null}
                        </span>
                        <span className={styles.linePrice}>
                          {item.struckPriceMinor ? (
                            <MoneyText
                              className={styles.struckPrice}
                              currency={item.currencyCode}
                              minor={item.struckPriceMinor}
                            />
                          ) : null}
                          <MoneyText
                            currency={item.currencyCode}
                            minor={item.priceMinor}
                          />
                        </span>
                        {canEdit &&
                        item.state !== "locked" &&
                        item.state !== "cancelled" &&
                        onRemoveItem ? (
                          <IconButton
                            aria-label={`${t("Remove")} ${item.name}`}
                            className={styles.lineRemove}
                            onClick={() => onRemoveItem(item.id)}
                            size="micro"
                            variant="tertiary"
                          >
                            <CloseIcon aria-hidden="true" size={12} />
                          </IconButton>
                        ) : null}
                        {item.children?.length ? (
                          <ul
                            aria-label={`${item.name} ${t("members")}`}
                            className={styles.childLines}
                          >
                            {item.children.map((child) => (
                              <li
                                className={styles.childLine}
                                data-relation={child.relation}
                                key={child.id}
                              >
                                <span className={styles.childName}>
                                  {child.name}
                                  {child.relation === "derived_input" ? (
                                    <span className={styles.childRelation}>
                                      {" "}
                                      · {t("input")}
                                    </span>
                                  ) : null}
                                </span>
                                {child.creditMinor ? (
                                  <span className={styles.childCredit}>
                                    −
                                    <MoneyText
                                      currency={item.currencyCode}
                                      minor={child.creditMinor}
                                    />
                                  </span>
                                ) : (
                                  <span
                                    aria-hidden
                                    className={styles.childDash}
                                  >
                                    —
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {suggestions && suggestions.length > 0 ? (
              <SuggestionStack
                onAccept={onSuggestionAccept}
                onDismiss={onSuggestionDismiss}
                suggestions={suggestions}
              />
            ) : null}
          </div>

          <div className={styles.dock}>
            <PricingNotice
              onAcceptReprice={onAcceptReprice}
              onRetryPricing={onRetryPricing}
              pricing={cart.pricing}
            />

            {workflow.role === "doctor" ? (
              <DoctorDecisionCard
                onDecisionsChange={onDecisionsChange}
                onPanelChange={onPanelChange}
                workflow={workflow}
              />
            ) : !isReceptionistOrderSummary ? (
              <ReceptionDecisionCard
                onMethodChange={onMethodChange}
                onPanelChange={onPanelChange}
                workflow={workflow}
              />
            ) : null}

            {workflow.blockers.length > 0 ? (
              <div aria-live="polite" className={styles.blockers} role="status">
                {workflow.blockers.map((blocker) => (
                  <div data-tone={blocker.tone ?? "neutral"} key={blocker.id}>
                    <span>{t(blocker.label)}</span>
                    {blocker.actionLabel && onBlockerAction ? (
                      <Button
                        onClick={() => onBlockerAction(blocker.id)}
                        size="xs"
                        variant="outline"
                      >
                        {t(blocker.actionLabel)}
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {summary ? (
              <dl className={styles.totals}>
                <div className={styles.totalRow}>
                  <dt>{t("Subtotal")}</dt>
                  <dd>
                    <MoneyText
                      animateChanges
                      className={styles.subtotalValue}
                      currency={summary.currencyCode}
                      minor={summary.subtotalMinor}
                    />
                  </dd>
                </div>
                {summary.creditMinor ? (
                  <div className={styles.totalRow} data-credit>
                    <dt>{t(summary.creditLabel ?? "Shared credit")}</dt>
                    <dd className={styles.creditValue}>
                      −
                      <MoneyText
                        currency={summary.currencyCode}
                        minor={summary.creditMinor}
                      />
                    </dd>
                  </div>
                ) : null}
                {summary.previousPaidMinor ? (
                  <div className={styles.totalRow}>
                    <dt>
                      {t("Previously paid")}
                      {summary.previousReceiptId
                        ? ` (${summary.previousReceiptId})`
                        : ""}
                    </dt>
                    <dd>
                      −
                      <MoneyText
                        currency="USD"
                        minor={summary.previousPaidMinor}
                      />
                    </dd>
                  </div>
                ) : null}
                {summary.patientDueKhrMinor ? (
                  <div className={styles.totalRow}>
                    <dt>{t("Patient due")} · KHR</dt>
                    <dd>
                      <MoneyText
                        currency="KHR"
                        minor={summary.patientDueKhrMinor}
                      />
                    </dd>
                  </div>
                ) : null}
                {earnings ? (
                  <div className={joinClasses(styles.totalRow, styles.earnRow)}>
                    <dt>
                      {t("Estimated earnings")}
                      <EarningsDisclosure
                        earnings={earnings}
                        payment={
                          workflow.role === "doctor"
                            ? workflow.decisions.payment
                            : undefined
                        }
                      />
                    </dt>
                    <dd>
                      <MoneyText
                        animateChanges
                        currency={earnings.currencyCode}
                        minor={earnings.earnMinor}
                      />
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            {showAttestation && summary ? (
              <Checkbox
                checked={workflow.attested}
                className={styles.attest}
                onChange={(event) => onAttestChange?.(event.target.checked)}
              >
                {t("I have collected")}{" "}
                <MoneyText currency="USD" minor={summary.patientDueMinor} />{" "}
                {t("via cash or KHQR")}
              </Checkbox>
            ) : null}

            {primaryAction ? (
              <div className={styles.footerCta}>
                <Button
                  disabled={primaryAction.disabled}
                  fullWidth
                  onClick={onPrimaryAction}
                  size="lg"
                >
                  {t(primaryAction.label)}
                </Button>
                {primaryAction.disabledReason ? (
                  <p className={styles.ctaReason}>
                    {t(primaryAction.disabledReason)}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </>
      )}
    </aside>
  );
}
