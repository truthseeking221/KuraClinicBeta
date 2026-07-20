'use client';

import { Alert, AlertAction, AlertDescription, AlertTitle, Badge, Button } from '../ui';

type GrammarRule = Readonly<{
  rule: string;
  detail: string;
}>;

type CopyPair = Readonly<{
  bad: string;
  good: string;
  why: string;
}>;

const VOICE_RULES: readonly GrammarRule[] = [
  {
    rule: 'Sentence case everywhere',
    detail: 'Headings, labels, buttons, badges — "Team access", never "Team Access". No exclamation marks anywhere.',
  },
  {
    rule: 'Interface copy is English',
    detail:
      'Product and Storybook copy stays English. Khmer appears only in designed patient-facing content; clinical terms, drug names, and lab codes stay in English even there.',
  },
  {
    rule: 'Facts, not enthusiasm',
    detail: 'Kura states what happened and what happens next. No "Great!", no "Oops", no marketing adjectives.',
  },
  {
    rule: 'Labels are nouns, actions are verbs',
    detail: '"Courier pickup" (row label) · "Change route" (action). A button never reads as a noun.',
  },
];

const HELPER_RULES: readonly GrammarRule[] = [
  {
    rule: 'Helper text states the consequence',
    detail:
      '"Covers PHI exports, bank details, and role changes." — what the setting changes, not a restatement of its name.',
  },
  {
    rule: 'Locked fields explain their authority',
    detail: '"Verified by Kura. Not editable" · "From the CMC register" — a lock always names why.',
  },
  {
    rule: 'Scope is explicit',
    detail:
      '"Saved on this device." · "They never change the medical record." Copy tells the user where an action reaches, especially when it does not reach the record.',
  },
];

const VALIDATION_PAIRS: readonly CopyPair[] = [
  {
    bad: 'Invalid input.',
    good: 'Member name is required.',
    why: 'Name the field and the requirement; the pattern is "{Label} is required."',
  },
  {
    bad: 'Error: constraint violation.',
    good: 'Closing time must be after opening time.',
    why: 'State the rule the value must satisfy — the fix is inside the sentence.',
  },
  {
    bad: 'Duplicate detected.',
    good: 'Sophea Lim is already in this workspace.',
    why: 'Echo the value so the user sees exactly what collided.',
  },
];

const BANNER_RULES: readonly GrammarRule[] = [
  {
    rule: 'Banner = fact, consequence, one action',
    detail:
      'Title states the fact ("Country is locked after registration"); body states the consequence; at most one recovery action.',
  },
  {
    rule: 'Tone matches urgency, not drama',
    detail:
      'Warning for deadlines ("Medical license expires in 28 days"), info for constraints, danger only when something is blocked or failed.',
  },
  {
    rule: 'Alerts persist, toasts pass',
    detail:
      'Anything a clinician must still see in five minutes is an Alert. A toast only confirms a completed action and auto-dismisses.',
  },
];

const CONFIRM_RULES: readonly GrammarRule[] = [
  {
    rule: 'Title is the decision as a question',
    detail: '"Sign out this session?" · "Revoke invite?" — one decision per dialog, phrased so Yes/No is unambiguous.',
  },
  {
    rule: 'Body states the concrete consequence',
    detail: '"iPhone 15 · Telegram linked loses access immediately and must sign in again." No abstractions.',
  },
  {
    rule: 'Buttons are verbs, never OK/Cancel',
    detail:
      'The confirming button repeats the action verb ("Sign out", "Revoke", "Approve"); the escape is "Back" or "Cancel". Destructive confirms use the destructive variant.',
  },
];

const TOAST_RULES: readonly GrammarRule[] = [
  {
    rule: 'Past tense, subject first',
    detail: '"Courier pickup updated" · "Invite sent to Chan Dara" · "Signing log exported" — the thing, then what happened.',
  },
  {
    rule: 'Undo lives next to the destruction',
    detail: '"English removed. Undo is available." — a reversible removal names its undo in the same breath.',
  },
  {
    rule: 'A toast never carries a decision',
    detail: 'Toasts confirm; they never ask. Anything needing input is a dialog or an inline form.',
  },
];

const SAFETY_RULES: readonly GrammarRule[] = [
  {
    rule: 'Never overclaim verification',
    detail:
      '"Phone checked" never becomes "Identity verified" — the phone gate verifies a channel; PSC confirms identity. Copy states exactly what was proven.',
  },
  {
    rule: 'Abnormal is never softened',
    detail: 'Out-of-range results say so plainly and stay expanded. No euphemisms, no collapsing abnormal data.',
  },
  {
    rule: 'Demo scaffolding never leaks into copy',
    detail:
      'Magic OTP codes and fixture phone numbers live in demo-data.ts and story docs — never in helpText, placeholders, or labels.',
  },
  {
    rule: 'Blocked states name the gate and the way through',
    detail:
      '"Kura needs to verify your licence before you can place real lab orders." — the blocker, its reason, and the recovery CTA travel together.',
  },
];

function SectionHeader({
  id,
  title,
  meta,
  children,
}: {
  id: string;
  title: string;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5 border-b border-border pb-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={id} className="k-h3 text-balance">{title}</h2>
        {meta ? <span className="k-caption font-mono text-[var(--color-text-secondary)]">{meta}</span> : null}
      </div>
      {children ? <p className="k-body-sm mt-1 max-w-3xl text-[var(--color-text-secondary)]">{children}</p> : null}
    </div>
  );
}

function RuleList({ rules }: { rules: readonly GrammarRule[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
      {rules.map((entry) => (
        <div
          className="grid gap-x-6 gap-y-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
          key={entry.rule}
        >
          <p className="k-body-sm font-medium text-[var(--color-text-primary)]">{entry.rule}</p>
          <p className="k-body-sm min-w-0 text-[var(--color-text-secondary)]">{entry.detail}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * How Kura writes: voice, labels, validation, banners, confirmations, toasts,
 * and the clinical-safety copy rules. Examples quote shipped surfaces.
 */
export function ContentGrammarReference() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-background px-4 py-8 text-foreground sm:px-8" data-density="compact">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-12">
        <header className="border-b border-border pb-8" data-content-grammar-section="principles">
          <p className="k-label">Kura content grammar</p>
          <h1 className="k-h1 mt-2 text-balance">Content</h1>
          <p className="k-body mt-3 max-w-3xl text-[var(--color-text-secondary)]">
            Kura speaks like a careful colleague: plain facts, named consequences, one action at a
            time. This page is the writing contract for every label, banner, dialog, and toast in
            the product. Every example below is quoted from a shipped surface.
          </p>
        </header>

        <section aria-labelledby="cg-voice-heading" data-content-grammar-section="voice">
          <SectionHeader id="cg-voice-heading" meta={`${VOICE_RULES.length} rules`} title="Voice & casing">
            The baseline register for every string in the product.
          </SectionHeader>
          <RuleList rules={VOICE_RULES} />
        </section>

        <section aria-labelledby="cg-helper-heading" data-content-grammar-section="labels">
          <SectionHeader id="cg-helper-heading" meta={`${HELPER_RULES.length} rules`} title="Labels & helper text">
            A label names the thing; helper text earns its row by adding consequence or scope.
          </SectionHeader>
          <RuleList rules={HELPER_RULES} />
        </section>

        <section aria-labelledby="cg-validation-heading" data-content-grammar-section="validation">
          <SectionHeader id="cg-validation-heading" meta={`${VALIDATION_PAIRS.length} patterns`} title="Validation">
            An error message contains its own fix. Generic errors are a review-blocking finding.
          </SectionHeader>
          <div className="overflow-hidden rounded-lg border border-border bg-[var(--color-surface)]">
            <div className="grid gap-x-6 border-b border-border px-4 py-2 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <p className="k-caption text-[var(--color-text-tertiary)]">Reject</p>
              <p className="k-caption text-[var(--color-text-tertiary)]">Ship</p>
              <p className="k-caption text-[var(--color-text-tertiary)]">Why</p>
            </div>
            {VALIDATION_PAIRS.map((pair) => (
              <div
                className="grid gap-x-6 gap-y-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1.1fr)]"
                key={pair.good}
              >
                <p className="k-body-sm text-[var(--color-text-tertiary)] line-through">{pair.bad}</p>
                <p className="k-body-sm font-medium text-[var(--color-status-danger-fg)]">{pair.good}</p>
                <p className="k-caption min-w-0 text-[var(--color-text-secondary)]">{pair.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="cg-banner-heading" data-content-grammar-section="banners">
          <SectionHeader id="cg-banner-heading" meta={`${BANNER_RULES.length} rules`} title="Banners & alerts">
            Persistent information a clinician must keep seeing.
          </SectionHeader>
          <div className="mb-4 max-w-2xl">
            <Alert role="status" tone="warning">
              <AlertTitle>Medical license expires in 28 days</AlertTitle>
              <AlertDescription>
                CMC 048-2019 expires Jul 20, 2026. Upload the renewed license before expiry to keep
                prescribing active.
              </AlertDescription>
              <AlertAction>
                <Button size="sm" variant="secondary">Upload renewed license</Button>
              </AlertAction>
            </Alert>
          </div>
          <RuleList rules={BANNER_RULES} />
        </section>

        <section aria-labelledby="cg-confirm-heading" data-content-grammar-section="confirmations">
          <SectionHeader id="cg-confirm-heading" meta={`${CONFIRM_RULES.length} rules`} title="Confirmations">
            A dialog is a decision. Everything in it serves that one decision.
          </SectionHeader>
          <RuleList rules={CONFIRM_RULES} />
        </section>

        <section aria-labelledby="cg-toast-heading" data-content-grammar-section="toasts">
          <SectionHeader id="cg-toast-heading" meta={`${TOAST_RULES.length} rules`} title="Toasts">
            Transient confirmation of a completed action — nothing more.
          </SectionHeader>
          <RuleList rules={TOAST_RULES} />
        </section>

        <section aria-labelledby="cg-safety-heading" data-content-grammar-section="safety">
          <SectionHeader id="cg-safety-heading" meta={`${SAFETY_RULES.length} rules`} title="Clinical safety copy">
            Words carry clinical liability. These rules outrank style — a violation blocks the change.
          </SectionHeader>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge size="sm" variant="success">Phone checked</Badge>
            <span className="k-caption text-[var(--color-text-secondary)]">
              — never “Identity verified”. The gate proved a channel, not a person.
            </span>
          </div>
          <RuleList rules={SAFETY_RULES} />
        </section>
      </div>
    </main>
  );
}
