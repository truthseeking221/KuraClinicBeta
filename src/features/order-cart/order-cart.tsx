'use client';

import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';

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
  IconButton,
  MoneyText,
  SegmentedToggle,
  Spinner,
} from '../../components/ui';
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
} from '../../components/ui/icons';

import {
  canEditOrderCart,
  decisionsComplete,
  doctorDecisionSummary,
  getOrderCartPrimaryAction,
  groupOrderCartItems,
  itemCount,
  tubeProgress,
} from './logic';
import type {
  CollectionDecisions,
  DoctorOrderCartWorkflow,
  DecisionPanelState,
  OrderCartData,
  OrderCartItem,
  OrderCartPricing,
  OrderCartWorkflow,
  ReceptionPaymentMethod,
  ReceptionistOrderCartWorkflow,
  TubePrepMethod,
  CartSuggestion,
} from './types';
import { SuggestionStack } from './suggestion-stack';
import styles from './order-cart.module.css';

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
  onPanelChange?: (state: 'unset' | 'expanded' | 'summary') => void;
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
  return classes.filter(Boolean).join(' ');
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
        <span aria-hidden="true" className={styles.optionRadio} data-selected={selected || undefined}>
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
  return <img alt="" aria-hidden="true" className={styles.kuraMark} src="/brand/kura-full-logo.svg" />;
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
  if (pricing.state === 'loading') {
    return (
      <Spinner
        aria-atomic="true"
        className={styles.pricingLoading}
        label="Updating prices…"
        showLabel
        size="sm"
      />
    );
  }

  if (pricing.state === 'error') {
    return (
      <Alert tone="danger">
        <AlertTitle>Price unavailable</AlertTitle>
        <AlertDescription>
          {pricing.message ?? 'We couldn’t update prices. Your selections are saved.'}
        </AlertDescription>
        {onRetryPricing ? (
          <AlertAction>
            <Button onClick={onRetryPricing} size="sm" variant="outline">Retry pricing</Button>
          </AlertAction>
        ) : null}
      </Alert>
    );
  }

  if (pricing.state === 'stale') {
    return (
      <Alert icon={<WarningIcon />} tone="warning">
        <AlertTitle>Prices changed</AlertTitle>
        <AlertDescription>
          <ul className={styles.repriceList}>
            {pricing.repricedLines.map((line) => (
              <li key={line.itemId}>
                {line.name}: <s><MoneyText currency="USD" minor={line.oldPriceMinor} /></s> →{' '}
                <MoneyText currency="USD" minor={line.newPriceMinor} />
              </li>
            ))}
          </ul>
          Review and accept the updated quote before continuing.
        </AlertDescription>
        {onAcceptReprice ? (
          <AlertAction>
            <Button onClick={onAcceptReprice} size="sm" variant="outline">Accept new price</Button>
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

    if (panel === 'expanded') {
      const selectedOption = sectionRef.current?.querySelector<HTMLInputElement>(
        'input[type="radio"]:checked:not(:disabled)',
      );
      const firstOption = sectionRef.current?.querySelector<HTMLInputElement>(
        'input[type="radio"]:not(:disabled)',
      );
      (selectedOption ?? firstOption ?? headingRef.current)?.focus({ preventScroll: true });
      return;
    }

    if (previousPanel === 'expanded') actionRef.current?.focus();
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
  onPanelChange?: (state: 'unset' | 'expanded' | 'summary') => void;
}) {
  const { decisions, panel } = workflow;
  const collectionGroupName = useId();
  const paymentGroupName = useId();
  const panelId = useId();
  const titleId = useId();
  const { actionRef, headingRef, sectionRef } = useDecisionPanelFocus(panel);
  const summary = doctorDecisionSummary(workflow);
  const locked = workflow.paymentLocked === true;
  const editable = workflow.stage === 'draft';
  const expanded = panel === 'expanded';
  const isSet = summary !== null;
  const actionLabel = isSet ? (editable && !locked ? 'Edit' : 'View') : 'Set up';
  const patch = (next: Partial<CollectionDecisions>) =>
    onDecisionsChange?.({ ...decisions, ...next });
  const canChange = editable && !locked;

  return (
    <Collapsible open={expanded}>
      <section aria-labelledby={titleId} className={styles.decisionCard} ref={sectionRef}>
        {expanded ? (
          <div className={styles.decisionHeader}>
            <h3 className={styles.decisionTitle} id={titleId} ref={headingRef} tabIndex={-1}>
              Collection & payment
            </h3>
            <Button
              aria-controls={panelId}
              aria-expanded
              onClick={() => onPanelChange?.('summary')}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className={styles.decisionSummaryRow}>
            <div className={styles.decisionSummaryCopy}>
              <h3 className={styles.decisionSummaryTitle} id={titleId}>
                {isSet ? summary.title : 'Collection & payment'}
              </h3>
              <span>{isSet ? summary.detail : 'Not set yet'}</span>
            </div>
            <Button
              aria-controls={panelId}
              aria-expanded={false}
              aria-label={`${actionLabel} collection and payment`}
              onClick={() => onPanelChange?.('expanded')}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              {actionLabel}
            </Button>
          </div>
        )}

        <CollapsibleContent className={styles.decisionMotion} forceMount id={panelId}>
          <div className={styles.decisionEditor}>
            <fieldset className={styles.question}>
              <legend className={styles.questionLabel}>Who will collect the sample?</legend>
              <div
                aria-label="Who will collect the sample?"
                className={styles.optionGrid}
                role="radiogroup"
              >
                <OptionCard
                  disabled={!canChange}
                  icon={<InjectionIcon aria-hidden="true" size={20} />}
                  label="I will draw the blood now"
                  name={collectionGroupName}
                  onSelect={() => patch({ collectBy: 'self', drawSite: undefined })}
                  selected={decisions.collectBy === 'self'}
                />
                <OptionCard
                  disabled={!canChange}
                  icon={<KuraMark />}
                  label="Kura will draw the blood"
                  name={collectionGroupName}
                  onSelect={() => patch({ collectBy: 'kura' })}
                  selected={decisions.collectBy === 'kura'}
                />
              </div>
            </fieldset>

            {decisions.collectBy === 'kura' ? (
              <div className={styles.question}>
                <p className={styles.questionLabel}>Where is the blood drawn?</p>
                <SegmentedToggle
                  label="Where is the blood drawn?"
                  disabled={!canChange}
                  onValueChange={(value) =>
                    patch({ drawSite: value as CollectionDecisions['drawSite'] })
                  }
                  options={[
                    { value: 'kura-psc', label: 'Kura PSC' },
                    { value: 'patient-home', label: 'Patient Home' },
                  ]}
                  value={decisions.drawSite ?? ''}
                />
              </div>
            ) : null}

            <fieldset className={styles.question}>
              <legend className={styles.questionLabel}>What is the payment method?</legend>
              <div
                aria-label="What is the payment method?"
                className={styles.optionGrid}
                role="radiogroup"
              >
                <OptionCard
                  disabled={!canChange}
                  icon={<CashIcon aria-hidden="true" size={20} />}
                  label="Patient will pay you now"
                  name={paymentGroupName}
                  onSelect={() => patch({ payment: 'pay-now' })}
                  selected={decisions.payment === 'pay-now'}
                />
                <OptionCard
                  disabled={!canChange}
                  icon={<ClockIcon aria-hidden="true" size={20} />}
                  label="Patient will pay later at Kura"
                  name={paymentGroupName}
                  onSelect={() => patch({ payment: 'pay-later-kura' })}
                  selected={decisions.payment === 'pay-later-kura'}
                />
              </div>
            </fieldset>

            {locked ? (
              <div className={styles.lockedNote} role="note">
                <WarningIcon aria-hidden="true" size={14} />
                Locked after payment. You can edit later in Booking.
              </div>
            ) : null}
          </div>
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
}

const RECEPTION_METHOD_LABEL: Record<ReceptionPaymentMethod, string> = {
  cash: 'Cash',
  khqr: 'KHQR',
  'pay-later': 'Pay later at Kura',
};

function ReceptionDecisionCard({
  onMethodChange,
  onPanelChange,
  workflow,
}: {
  workflow: ReceptionistOrderCartWorkflow;
  onMethodChange?: (method: ReceptionPaymentMethod) => void;
  onPanelChange?: (state: 'unset' | 'expanded' | 'summary') => void;
}) {
  const methodGroupName = useId();
  const panelId = useId();
  const titleId = useId();
  const { actionRef, headingRef, sectionRef } = useDecisionPanelFocus(workflow.panel);
  const paid = workflow.payment.status === 'paid';
  const locked = paid || workflow.stage === 'checked-in';
  const expanded = workflow.panel === 'expanded';
  const isSet = workflow.method !== undefined;
  const actionLabel = isSet ? (locked ? 'View' : 'Edit') : 'Set up';

  return (
    <Collapsible open={expanded}>
      <section aria-labelledby={titleId} className={styles.decisionCard} ref={sectionRef}>
        {expanded ? (
          <div className={styles.decisionHeader}>
            <h3 className={styles.decisionTitle} id={titleId} ref={headingRef} tabIndex={-1}>
              Payment
            </h3>
            <Button
              aria-controls={panelId}
              aria-expanded
              onClick={() => onPanelChange?.('summary')}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className={styles.decisionSummaryRow}>
            <div className={styles.decisionSummaryCopy}>
              <h3 className={styles.decisionSummaryTitle} id={titleId}>
                {isSet ? `Payment · ${RECEPTION_METHOD_LABEL[workflow.method!]}` : 'Payment'}
              </h3>
              <span>
                {paid
                  ? `${workflow.payment.label}${workflow.payment.receiptId ? ` · ${workflow.payment.receiptId}` : ''}`
                  : isSet
                    ? workflow.payment.label
                    : 'Not set yet'}
              </span>
            </div>
            <Button
              aria-controls={panelId}
              aria-expanded={false}
              aria-label={`${actionLabel} payment`}
              onClick={() => onPanelChange?.('expanded')}
              ref={actionRef}
              size="sm"
              variant="link"
            >
              {actionLabel}
            </Button>
          </div>
        )}

        <CollapsibleContent className={styles.decisionMotion} forceMount id={panelId}>
          <div className={styles.decisionEditor}>
            <fieldset className={styles.question}>
              <legend className={styles.questionLabel}>How does the patient pay?</legend>
              <div
                aria-label="How does the patient pay?"
                className={styles.optionGrid}
                role="radiogroup"
              >
                <OptionCard
                  disabled={locked}
                  icon={<CashIcon aria-hidden="true" size={20} />}
                  label="Cash at the desk"
                  name={methodGroupName}
                  onSelect={() => onMethodChange?.('cash')}
                  selected={workflow.method === 'cash'}
                />
                <OptionCard
                  disabled={locked}
                  icon={<QrCodeIcon aria-hidden="true" size={20} />}
                  label="KHQR transfer"
                  name={methodGroupName}
                  onSelect={() => onMethodChange?.('khqr')}
                  selected={workflow.method === 'khqr'}
                />
                <OptionCard
                  disabled={locked}
                  icon={<ClockIcon aria-hidden="true" size={20} />}
                  label="Pay later at Kura"
                  name={methodGroupName}
                  onSelect={() => onMethodChange?.('pay-later')}
                  selected={workflow.method === 'pay-later'}
                />
              </div>
            </fieldset>

            {locked ? (
              <div className={styles.lockedNote} role="note">
                <WarningIcon aria-hidden="true" size={14} />
                Locked after payment. Changes route through void or supplemental.
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
  const tubes = workflow.tubes ?? [];
  const progress = tubeProgress(tubes);
  const tests = Array.from(new Set(tubes.flatMap((tube) => tube.tests)));

  return (
    <div className={styles.tubeView}>
      <button className={styles.backLink} onClick={onBackToCart} type="button">
        <ArrowLeftIcon aria-hidden="true" size={14} />
        Back to cart
      </button>

      <div className={styles.tubeIntro}>
        <p className={styles.tubeIntroLabel}>You need to prepare tubes for</p>
        <ol className={styles.tubeTestList}>
          {tests.map((test) => (
            <li key={test}>{test}</li>
          ))}
        </ol>
      </div>

      <div className={styles.question}>
        <p className={styles.questionLabel}>Choose preparation method</p>
        <SegmentedToggle
          label="Choose preparation method"
          onValueChange={(value) => onTubeMethodChange?.(value as TubePrepMethod)}
          options={[
            { value: 'scan', label: 'Scan' },
            { value: 'print', label: 'Print' },
          ]}
          value={workflow.tubeMethod ?? 'scan'}
        />
      </div>

      <div className={styles.tubeReadyRow}>
        <h3 className={styles.tubeReadyTitle}>Ready</h3>
        <Badge size="sm" variant={progress.complete ? 'success' : 'neutral'}>
          {progress.scanned}/{progress.total} scanned
        </Badge>
      </div>

      <ul className={styles.tubeList}>
        {tubes.map((tube) => (
          <li className={styles.tubeRow} data-scanned={tube.scanned || undefined} key={tube.id}>
            <span
              aria-hidden="true"
              className={styles.tubeStopper}
              style={{ background: tube.stopperColor }}
            />
            <span className={styles.tubeCopy}>
              <span className={styles.tubeLabel}>{tube.label}</span>
              <span className={styles.tubeTests}>{tube.tests.join(' · ')}</span>
            </span>
            {tube.scanned ? (
              <>
                <Button onClick={() => onTubeScan?.(tube.id, false)} size="xs" variant="link">
                  Undo
                </Button>
                <span aria-label="Scanned" className={styles.tubeCheck} role="img">
                  <CheckIcon aria-hidden="true" size={12} />
                </span>
              </>
            ) : (
              <Button onClick={() => onTubeScan?.(tube.id, true)} size="xs" variant="outline">
                Mark scanned
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
          Confirm collection & scan
        </Button>
        {!progress.complete ? (
          <p className={styles.ctaReason}>
            Scan every tube first ({progress.scanned}/{progress.total} scanned).
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ── Main cart ── */

function stateBadge(item: OrderCartItem) {
  if (item.state === 'locked') return <Badge size="sm">Required</Badge>;
  if (item.state === 'supplemental') {
    return <Badge size="sm" variant="warning">Added after payment</Badge>;
  }
  if (item.state === 'cancelled') return <Badge size="sm">Voided</Badge>;
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
  const itemsHeadingId = useId();
  const count = itemCount(cart.items);
  const groups = groupOrderCartItems(cart.items);
  const canEdit = canEditOrderCart(cart, workflow);
  const primaryAction = getOrderCartPrimaryAction(cart, workflow);
  const canClear = canEdit && cart.items.some((item) => item.state !== 'locked');
  const summary = cart.pricing.state === 'error' ? undefined : cart.pricing.summary;

  if (workflow.role === 'doctor' && workflow.stage === 'tubes') {
    return (
      <aside
        aria-label="Order cart — tube preparation"
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
    workflow.role === 'doctor'
      ? workflow.decisions.payment === 'pay-now' &&
        decisionsComplete(workflow.decisions) &&
        workflow.stage === 'draft'
      : workflow.method !== undefined &&
        workflow.method !== 'pay-later' &&
        workflow.payment.status !== 'paid' &&
        workflow.stage !== 'checked-in';

  const earnings = workflow.role === 'doctor' ? workflow.earnings : undefined;

  return (
    <aside
      aria-label={`${workflow.role === 'doctor' ? 'Doctor' : 'Receptionist'} order cart`}
      className={joinClasses(styles.cart, className)}
      data-lifecycle={cart.lifecycle}
      data-role={workflow.role}
    >
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{isEmpty ? 'Order Cart' : 'Selected tests'}</h2>
          {!isEmpty ? (
            <Badge aria-label={`${count} tests selected`} size="sm">
              {count}
            </Badge>
          ) : null}
        </div>
        {canClear && onClear ? (
          <IconButton
            aria-label="Clear all removable items"
            onClick={onClear}
            size="micro"
            variant="tertiary"
          >
            <DeleteIcon aria-hidden="true" size={16} />
          </IconButton>
        ) : null}
      </header>

      {isEmpty ? (
        <div className={styles.empty}>
          <span aria-hidden="true" className={styles.emptyIcon}>
            <ShoppingCartIcon size={28} />
          </span>
          <strong>Nothing here yet</strong>
          <span>{workflow.role === 'doctor' ? 'Add your first lab test.' : 'Add an order item to begin.'}</span>
          {onAddFirst && workflow.access === 'allowed' ? (
            <Button onClick={onAddFirst} size="sm" variant="outline">
              Add first test
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          <div className={styles.body}>
            <section aria-labelledby={itemsHeadingId} className={styles.itemsSection}>
              <h3 className={styles.srOnly} id={itemsHeadingId}>Selected items</h3>
              {groups.map((group) => (
                <div className={styles.group} key={group.kind}>
                  <p className={styles.groupLabel}>{group.label}</p>
                  <ul className={styles.lines}>
                    {group.items.map((item) => (
                      <li className={styles.line} data-state={item.state ?? 'default'} key={item.id}>
                        <span className={styles.lineName}>
                          {item.name}
                          {stateBadge(item)}
                          {item.meta ? <span className={styles.lineMeta}>{item.meta}</span> : null}
                        </span>
                        <span className={styles.linePrice}>
                          {item.struckPriceMinor ? (
                            <MoneyText
                              className={styles.struckPrice}
                              currency={item.currencyCode}
                              minor={item.struckPriceMinor}
                            />
                          ) : null}
                          <MoneyText currency={item.currencyCode} minor={item.priceMinor} />
                        </span>
                        {canEdit && item.state !== 'locked' && item.state !== 'cancelled' && onRemoveItem ? (
                          <IconButton
                            aria-label={`Remove ${item.name}`}
                            className={styles.lineRemove}
                            onClick={() => onRemoveItem(item.id)}
                            size="micro"
                            variant="tertiary"
                          >
                            <CloseIcon aria-hidden="true" size={12} />
                          </IconButton>
                        ) : null}
                        {item.children?.length ? (
                          <ul aria-label={`${item.name} members`} className={styles.childLines}>
                            {item.children.map((child) => (
                              <li className={styles.childLine} data-relation={child.relation} key={child.id}>
                                <span className={styles.childName}>
                                  {child.name}
                                  {child.relation === 'derived_input' ? (
                                    <span className={styles.childRelation}> · input</span>
                                  ) : null}
                                </span>
                                {child.creditMinor ? (
                                  <span className={styles.childCredit}>
                                    −<MoneyText currency={item.currencyCode} minor={child.creditMinor} />
                                  </span>
                                ) : (
                                  <span aria-hidden className={styles.childDash}>
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

            {workflow.role === 'doctor' ? (
              <DoctorDecisionCard
                onDecisionsChange={onDecisionsChange}
                onPanelChange={onPanelChange}
                workflow={workflow}
              />
            ) : workflow.stage !== 'order-review' ? (
              <ReceptionDecisionCard
                onMethodChange={onMethodChange}
                onPanelChange={onPanelChange}
                workflow={workflow}
              />
            ) : null}

            {workflow.blockers.length > 0 ? (
              <div aria-live="polite" className={styles.blockers} role="status">
                {workflow.blockers.map((blocker) => (
                  <div data-tone={blocker.tone ?? 'neutral'} key={blocker.id}>
                    <span>{blocker.label}</span>
                    {blocker.actionLabel && onBlockerAction ? (
                      <Button onClick={() => onBlockerAction(blocker.id)} size="xs" variant="outline">
                        {blocker.actionLabel}
                      </Button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {summary ? (
              <dl className={styles.totals}>
                <div className={styles.totalRow}>
                  <dt>Subtotal</dt>
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
                    <dt>{summary.creditLabel ?? 'Shared credit'}</dt>
                    <dd className={styles.creditValue}>
                      −
                      <MoneyText currency={summary.currencyCode} minor={summary.creditMinor} />
                    </dd>
                  </div>
                ) : null}
                {summary.previousPaidMinor ? (
                  <div className={styles.totalRow}>
                    <dt>
                      Previously paid
                      {summary.previousReceiptId ? ` (${summary.previousReceiptId})` : ''}
                    </dt>
                    <dd>−<MoneyText currency="USD" minor={summary.previousPaidMinor} /></dd>
                  </div>
                ) : null}
                {summary.patientDueKhrMinor ? (
                  <div className={styles.totalRow}>
                    <dt>Patient due · KHR</dt>
                    <dd><MoneyText currency="KHR" minor={summary.patientDueKhrMinor} /></dd>
                  </div>
                ) : null}
                {earnings ? (
                  <div className={joinClasses(styles.totalRow, styles.earnRow)}>
                    <dt>
                      You’ll earn
                      <span className={styles.earnHelp} title="Your commission on this order, settled to your Kura balance.">
                        <HelpIcon aria-hidden="true" size={13} />
                      </span>
                    </dt>
                    <dd>
                      <MoneyText animateChanges currency="USD" minor={earnings.earnMinor} />
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
                I have collected{' '}
                <MoneyText currency="USD" minor={summary.patientDueMinor} /> via cash or KHQR
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
                  {primaryAction.label}
                </Button>
                {primaryAction.disabledReason ? (
                  <p className={styles.ctaReason}>{primaryAction.disabledReason}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </>
      )}
    </aside>
  );
}
