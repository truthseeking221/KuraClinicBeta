/**
 * Auth flow machines ported from the kura-platform reference implementation
 * (apps/shared/auth-mf: door-flow.ts, wizard-flow.ts; clinic-workspace-mf:
 * select-workspace/select-branch). Pure rules only — screens own React state,
 * stories own demo wiring.
 *
 * Load-bearing behaviors preserved:
 * - Sign-in IS sign-up: one door, account created on first successful verify.
 * - Anti-enumeration: requesting a code always reports "sent"; verify never
 *   reveals whether the identifier pre-existed.
 * - Revoked accounts are blocked on every method.
 * - Wizard: self-serve = Name → Phone → Clinic → Licence; invitees get
 *   Name → Phone only; a verified phone is never re-asked.
 * - Phone conflicts stop onboarding and route to support; no self-service merge.
 * - Workspace entry: 0 workspaces → create; 1 → auto-enter; ≥2 → list with
 *   last-active preselected; branches only when the workspace enables them.
 */

// ── Shared ──────────────────────────────────────────────────

export type CountryOption = {
  iso: string;
  dialCode: string;
  name: string;
  flag: string;
};

/** KH default (home market) + VN, per the door spec. */
export const DOOR_COUNTRIES: readonly CountryOption[] = [
  { iso: 'KH', dialCode: '+855', name: 'Cambodia', flag: '🇰🇭' },
  { iso: 'VN', dialCode: '+84', name: 'Vietnam', flag: '🇻🇳' },
];

/** Strip formatting + one leading zero (intl-dialing convention). */
export function toE164(dialCode: string, localNumber: string): string {
  const digits = localNumber.replace(/\D/g, '').replace(/^0+/, '');
  return `${dialCode}${digits}`;
}

export function isValidLocalPhone(localNumber: string): boolean {
  return localNumber.replace(/\D/g, '').replace(/^0+/, '').length >= 8;
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

// ── Door ────────────────────────────────────────────────────

export type DoorMethod = 'phone' | 'email';
export type DoorStep = 'form' | 'verify' | 'revoked';
export type DoorRoute = 'wizard' | 'workspace';

export const DOOR_COPY = {
  invalidPhone: 'Enter a valid phone number.',
  invalidEmail: 'Enter a valid email address.',
  throttled: 'Too many attempts. Try again in a few minutes.',
  connection: 'We could not send a code. Try again.',
  invalidCode: 'That code is incorrect or expired. Try again.',
} as const;

export type AccountRecord = {
  /** E.164 phone or lowercase email. */
  identifier: string;
  status: 'active' | 'revoked';
  /** Post-verify destination: existing members land in workspace entry. */
  route: DoorRoute;
};

export type DoorVerifyOutcome =
  | { kind: 'success'; route: DoorRoute }
  | { kind: 'invalid-code' }
  | { kind: 'revoked' };

/**
 * Verify decision table. Unknown identifiers succeed into the wizard —
 * the account is created by the verify itself (sign-in = sign-up), and no
 * outcome discloses prior existence beyond the routing every caller gets.
 */
export function verifyDoorCode(
  identifier: string,
  code: string,
  expectedCode: string,
  accounts: readonly AccountRecord[],
): DoorVerifyOutcome {
  if (code !== expectedCode) return { kind: 'invalid-code' };
  const account = accounts.find((entry) => entry.identifier === identifier);
  if (account?.status === 'revoked') return { kind: 'revoked' };
  return { kind: 'success', route: account?.route ?? 'wizard' };
}

// ── Onboarding wizard ───────────────────────────────────────

export type WizardStepKey = 'name' | 'phone' | 'clinic' | 'ml';
export type WizardStepStatus = 'active' | 'done' | 'locked' | 'skipped';
export type PhoneSubStep = 'entry' | 'verify' | 'blocked';
export type MlAnswer = 'yes' | 'no';
export type Profession = 'doctor' | 'dentist' | 'nurse' | 'midwife' | 'other';

export const WIZARD_PROFESSIONS: ReadonlyArray<{
  value: Profession;
  label: string;
}> = [
  { value: 'doctor', label: 'Doctor' },
  { value: 'dentist', label: 'Dentist' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'midwife', label: 'Midwife' },
  { value: 'other', label: 'Other' },
];

export const WIZARD_STEP_LABELS: Record<WizardStepKey, string> = {
  name: 'Name',
  phone: 'Phone',
  clinic: 'Clinic',
  ml: 'Licence',
};

export const WIZARD_COPY = {
  firstNameRequired: 'Enter your first name to continue.',
  lastNameRequired: 'Enter your last name to continue.',
  invalidPhone: 'Enter a valid phone number.',
  invalidCode: 'That code is incorrect or expired. Try again.',
  clinicNameRequired: 'Clinic name is required.',
  mlAnswerRequired: 'Answer the licence question or choose Skip for now.',
  mlProfessionRequired: 'Select your profession to continue.',
  mlFileRequired: 'Upload a licence document to continue.',
} as const;

type WizardEntryBase = {
  /** Server-derived: joined through an invitation. */
  isInvitee: boolean;
  /** Existing account name. Invitees skip Name when this is present. */
  existingName?: string;
  /** Editable account-provider prefill. */
  initialName?: string;
};

/**
 * The account carries one display name; the Name step collects it as two
 * fields. A prefill arrives as one string, so the last whitespace-separated
 * token becomes the last name and everything before it the first name. A
 * single-token prefill fills the first name only — never guess a family name
 * the person did not give.
 */
export function splitPersonName(full: string): { firstName: string; lastName: string } {
  const trimmed = full.trim().replace(/\s+/g, ' ');
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace === -1) return { firstName: trimmed, lastName: '' };
  return {
    firstName: trimmed.slice(0, lastSpace),
    lastName: trimmed.slice(lastSpace + 1),
  };
}

/** Rejoin the two fields into the one display name the account stores. */
export function joinPersonName(firstName: string, lastName: string): string {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
}

export type WizardEntryState = WizardEntryBase &
  (
    | {
        phoneVerified: false;
        verifiedPhone?: never;
      }
    | {
        phoneVerified: true;
        /** E.164 phone verified at the door or already attached to the account. */
        verifiedPhone: string;
      }
  );

/** Invitees only supply facts their existing account does not already have. */
export function wizardStepsFor(entry: WizardEntryState): WizardStepKey[] {
  if (!entry.isInvitee) return ['name', 'phone', 'clinic', 'ml'];

  const steps: WizardStepKey[] = [];
  if (!entry.existingName?.trim()) steps.push('name');
  if (!entry.phoneVerified) steps.push('phone');
  return steps;
}

export type WizardStepView = {
  key: WizardStepKey;
  label: string;
  status: WizardStepStatus;
};

export function wizardStepViews(
  steps: readonly WizardStepKey[],
  currentIndex: number,
  skippedSteps: readonly WizardStepKey[] = [],
): WizardStepView[] {
  return steps.map((key, index) => ({
    key,
    label: WIZARD_STEP_LABELS[key],
    status:
      index === currentIndex
        ? 'active'
        : index < currentIndex
          ? skippedSteps.includes(key)
            ? 'skipped'
            : 'done'
          : 'locked',
  }));
}

/**
 * A phone verified at the door remains visible as completed in the self-serve
 * stepper, but its input is never shown again.
 */
export function nextLandingIndex(
  steps: readonly WizardStepKey[],
  targetIndex: number,
  phoneVerified: boolean,
): number | 'done' {
  if (targetIndex >= steps.length) return 'done';
  if (steps[targetIndex] === 'phone' && phoneVerified) {
    return nextLandingIndex(steps, targetIndex + 1, phoneVerified);
  }
  return targetIndex;
}

export type PhoneVerifyOutcome =
  'ATTACHED' | 'PHONE_IN_USE_CONFLICT' | 'ACCOUNT_BLOCKED';

export type PhoneRegistry = {
  /** Phones already owned by another account. Never self-merged. */
  inUse: readonly string[];
  /** Phones attached to a revoked or otherwise unavailable account. */
  blocked: readonly string[];
};

export function verifyWizardPhone(
  phone: string,
  code: string,
  expectedCode: string,
  registry: PhoneRegistry,
): PhoneVerifyOutcome | 'INVALID_CODE' {
  if (code !== expectedCode) return 'INVALID_CODE';
  if (registry.blocked.includes(phone)) return 'ACCOUNT_BLOCKED';
  if (registry.inUse.includes(phone)) return 'PHONE_IN_USE_CONFLICT';
  return 'ATTACHED';
}

export function validateMl(
  answer: MlAnswer | null,
  profession: Profession | null,
  fileCount: number,
): string | null {
  if (answer === null) return WIZARD_COPY.mlAnswerRequired;
  if (answer === 'no') return null;
  if (!profession) return WIZARD_COPY.mlProfessionRequired;
  if (fileCount === 0) return WIZARD_COPY.mlFileRequired;
  return null;
}

// ── Workspace gate ──────────────────────────────────────────

export type GateWorkspace = {
  workspaceId: string;
  name: string;
  branchesEnabled: boolean;
  memberCount: number;
  role: string;
};

export type GateBranch = {
  branchId: string;
  name: string;
  isDefault: boolean;
};

export type GateEntry =
  | { kind: 'create' }
  | { kind: 'auto'; workspace: GateWorkspace }
  | { kind: 'list'; lastActiveId: string | null };

/** 0 → create, 1 → auto-enter, ≥2 → list with last-active preselected. */
export function resolveGateEntry(
  workspaces: readonly GateWorkspace[],
  lastActiveId: string | null,
): GateEntry {
  if (workspaces.length === 0) return { kind: 'create' };
  if (workspaces.length === 1)
    return { kind: 'auto', workspace: workspaces[0] };
  const known = workspaces.some(
    (workspace) => workspace.workspaceId === lastActiveId,
  );
  return { kind: 'list', lastActiveId: known ? lastActiveId : null };
}

/** Entering a workspace: branch picker only when branches are enabled. */
export function nextAfterWorkspace(
  workspace: GateWorkspace,
): 'branches' | 'enter' {
  return workspace.branchesEnabled ? 'branches' : 'enter';
}

/** Preselect last-active branch, falling back to the default branch. */
export function initialBranchId(
  branches: readonly GateBranch[],
  lastActiveBranchId: string | null,
): string | null {
  if (branches.some((branch) => branch.branchId === lastActiveBranchId)) {
    return lastActiveBranchId;
  }
  return (
    branches.find((branch) => branch.isDefault)?.branchId ??
    branches[0]?.branchId ??
    null
  );
}
