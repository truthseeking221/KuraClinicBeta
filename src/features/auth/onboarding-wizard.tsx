"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useT } from "../../components/foundations/i18n";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  FileUpload,
  Input,
  OtpInput,
  PhoneInput,
  Radio,
  RadioGroup,
  Select,
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
  type Country,
  type FileUploadItem,
  type PhoneValue,
} from "../../components/ui";

import { AuthShell } from "./auth-shell";
import {
  DOOR_COUNTRIES,
  isValidLocalPhone,
  joinPersonName,
  nextLandingIndex,
  splitPersonName,
  validateMl,
  verifyWizardPhone,
  WIZARD_COPY,
  WIZARD_PROFESSIONS,
  wizardStepsFor,
  wizardStepViews,
} from "./logic";
import type {
  MlAnswer,
  PhoneRegistry,
  PhoneSubStep,
  Profession,
  WizardEntryState,
  WizardStepKey,
} from "./logic";
import {
  DEMO_OTP,
  DEMO_PHONE_REGISTRY,
  DEMO_RESEND_COOLDOWN_SECS,
} from "./demo-data";
import styles from "./onboarding-wizard.module.css";

const WIZARD_PHONE_COUNTRIES = DOOR_COUNTRIES.map(
  (country) => country.iso,
) as Country[];

export type WizardMlDeclaration =
  | {
      answer: "yes";
      profession: Profession;
      licenceFiles: readonly FileUploadItem[];
    }
  | {
      answer: "no";
      profession: null;
      licenceFiles: readonly [];
    }
  | null;

export type WizardResult = {
  /** Workspace created during self-serve onboarding; null for invitees. */
  clinicName: string | null;
  mlDeclaration: WizardMlDeclaration;
  name: string;
  /** Every completed wizard result carries the verified primary phone. */
  phone: string;
  phoneVerified: true;
};

export type OnboardingWizardProps = {
  entry: WizardEntryState;
  onDone: (result: WizardResult) => void;
  expectedCode?: string;
  phoneRegistry?: PhoneRegistry;
  resendCooldownSecs?: number;
};

/**
 * Product-spec onboarding: self-serve Name → Phone-if-needed → Clinic →
 * Licence; invitees only supply missing name/phone facts. A verified phone is
 * the hard gate, Clinic and Licence can be skipped, and cross-account phone
 * reuse is support-only — never self-merged.
 */
export function OnboardingWizard({
  entry,
  expectedCode = DEMO_OTP,
  onDone,
  phoneRegistry = DEMO_PHONE_REGISTRY,
  resendCooldownSecs = DEMO_RESEND_COOLDOWN_SECS,
}: OnboardingWizardProps) {
  const t = useT();
  const steps = useMemo(() => wizardStepsFor(entry), [entry]);
  const completedRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const landing = nextLandingIndex(steps, 0, entry.phoneVerified);
    return landing === "done" ? 0 : landing;
  });
  const [skippedSteps, setSkippedSteps] = useState<WizardStepKey[]>([]);

  // Name — two fields, one stored display name.
  const prefilledName = splitPersonName(
    entry.existingName ?? entry.initialName ?? "",
  );
  const [firstName, setFirstName] = useState(prefilledName.firstName);
  const [lastName, setLastName] = useState(prefilledName.lastName);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);

  // Phone
  const [phoneSub, setPhoneSub] = useState<PhoneSubStep>("entry");
  const [countryIso, setCountryIso] = useState<Country>(
    DOOR_COUNTRIES[0].iso as Country,
  );
  const [phone, setPhone] = useState<PhoneValue>();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendLeft, setResendLeft] = useState(0);

  // Clinic
  const [clinicName, setClinicName] = useState("");
  const [clinicError, setClinicError] = useState<string | null>(null);

  // Licence declaration
  const [mlAnswer, setMlAnswer] = useState<MlAnswer | null>(null);
  const [profession, setProfession] = useState<Profession | null>(null);
  const [licenceFiles, setLicenceFiles] = useState<FileUploadItem[]>([]);
  const [mlError, setMlError] = useState<string | null>(null);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const timer = setInterval(
      () => setResendLeft((seconds) => seconds - 1),
      1000,
    );
    return () => clearInterval(timer);
  }, [resendLeft]);

  useEffect(() => {
    if (steps.length !== 0 || !entry.phoneVerified || completedRef.current)
      return;
    completedRef.current = true;
    onDone({
      clinicName: null,
      mlDeclaration: null,
      name: entry.existingName?.trim() ?? "",
      phone: entry.verifiedPhone,
      phoneVerified: true,
    });
  }, [
    entry.existingName,
    entry.phoneVerified,
    entry.verifiedPhone,
    onDone,
    steps.length,
  ]);

  const views = wizardStepViews(steps, currentIndex, skippedSteps);
  const currentStep = steps[currentIndex];
  const dialCode =
    DOOR_COUNTRIES.find((country) => country.iso === countryIso)?.dialCode ??
    DOOR_COUNTRIES[0].dialCode;
  const localPhone = phone?.startsWith(dialCode)
    ? phone.slice(dialCode.length)
    : (phone ?? "");
  // `mlError` holds the English source so the branch comparisons below stay
  // stable; the language switch happens here, at the render site.
  const mlAnswerError =
    mlError === WIZARD_COPY.mlAnswerRequired ? t(mlError) : null;
  const professionError =
    mlError === WIZARD_COPY.mlProfessionRequired ? t(mlError) : null;
  const licenceFileError =
    mlError === WIZARD_COPY.mlFileRequired ? t(mlError) : null;

  function mlDeclaration(): WizardMlDeclaration {
    if (mlAnswer === "yes" && profession) {
      return {
        answer: "yes",
        licenceFiles,
        profession,
      };
    }
    if (mlAnswer === "no") {
      return {
        answer: "no",
        licenceFiles: [],
        profession: null,
      };
    }
    return null;
  }

  function finish() {
    if (completedRef.current) return;
    const verifiedPhone = entry.phoneVerified ? entry.verifiedPhone : phone;
    const trimmedName = joinPersonName(firstName, lastName);
    if (!verifiedPhone || !trimmedName) return;

    completedRef.current = true;
    onDone({
      clinicName: entry.isInvitee
        ? null
        : clinicName.trim() || `${trimmedName}'s cabinet`,
      mlDeclaration: mlDeclaration(),
      name: trimmedName,
      phone: verifiedPhone,
      phoneVerified: true,
    });
  }

  function landOn(target: number) {
    const landing = nextLandingIndex(steps, target, entry.phoneVerified);
    if (landing === "done") finish();
    else setCurrentIndex(landing);
  }

  function markSkipped(step: WizardStepKey) {
    setSkippedSteps((current) =>
      current.includes(step) ? current : [...current, step],
    );
  }

  function submitName() {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    // Report both gaps at once: fixing one field only to be stopped by the
    // other is the slower path through the same two errors.
    setFirstNameError(trimmedFirst ? null : t(WIZARD_COPY.firstNameRequired));
    setLastNameError(trimmedLast ? null : t(WIZARD_COPY.lastNameRequired));
    if (!trimmedFirst || !trimmedLast) return;

    setFirstName(trimmedFirst);
    setLastName(trimmedLast);
    const fullName = joinPersonName(trimmedFirst, trimmedLast);
    if (!clinicName) setClinicName(`${fullName}'s cabinet`);
    landOn(currentIndex + 1);
  }

  function requestPhoneCode() {
    if (!isValidLocalPhone(localPhone)) {
      setPhoneError(t(WIZARD_COPY.invalidPhone));
      return;
    }
    setPhoneError(null);
    setCode("");
    setCodeError(null);
    setResendLeft(resendCooldownSecs);
    setPhoneSub("verify");
  }

  function verifyPhone() {
    const outcome = verifyWizardPhone(
      phone ?? "",
      code,
      expectedCode,
      phoneRegistry,
    );
    if (outcome === "INVALID_CODE") {
      setCodeError(t(WIZARD_COPY.invalidCode));
      return;
    }
    if (outcome === "ATTACHED") {
      landOn(currentIndex + 1);
      return;
    }
    setPhoneSub("blocked");
  }

  function changePhone() {
    setPhoneSub("entry");
    setCode("");
    setCodeError(null);
    setPhoneError(null);
  }

  function submitClinic() {
    if (!clinicName.trim()) {
      setClinicError(t(WIZARD_COPY.clinicNameRequired));
      return;
    }
    setClinicError(null);
    landOn(currentIndex + 1);
  }

  function skipClinic() {
    setClinicError(null);
    setClinicName(
      (current) =>
        current.trim() || `${joinPersonName(firstName, lastName)}'s cabinet`,
    );
    markSkipped("clinic");
    landOn(currentIndex + 1);
  }

  function finishMl() {
    const error = validateMl(mlAnswer, profession, licenceFiles.length);
    if (error) {
      setMlError(error);
      return;
    }
    setMlError(null);
    finish();
  }

  function skipMl() {
    setMlError(null);
    markSkipped("ml");
    finish();
  }

  return (
    <AuthShell width={entry.isInvitee ? "sm" : "md"}>
      <Card as="section" aria-label={t("Set up your account")}>
        <CardContent className={styles.body}>
          {views.length > 0 ? (
            <Stepper
              onValueChange={(value) => {
                if (value - 1 < currentIndex) landOn(value - 1);
              }}
              value={currentIndex + 1}
            >
              <StepperNav>
                {views.map((view, index) => (
                  <StepperItem
                    completed={
                      view.status === "done" || view.status === "skipped"
                    }
                    disabled={view.status === "locked"}
                    key={view.key}
                    step={index + 1}
                  >
                    <StepperTrigger>
                      <StepperIndicator>{index + 1}</StepperIndicator>
                      <StepperTitle>{t(view.label)}</StepperTitle>
                    </StepperTrigger>
                    {index < views.length - 1 ? <StepperSeparator /> : null}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          ) : (
            <p aria-live="polite" className={styles.pending} role="status">
              {t("Your account is ready. Opening your workspace…")}
            </p>
          )}

          {currentStep === "name" ? (
            <section aria-label={t("Your name")} className={styles.step}>
              <header className={styles.header}>
                <h1 className={styles.title}>{t("Your name")}</h1>
                <p className={styles.subtitle}>
                  {t("Shown to your team and on order documents.")}
                </p>
              </header>
              <div className={styles.nameRow}>
                <Input
                  autoComplete="given-name"
                  error={firstNameError}
                  label={t("First name")}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                    setFirstNameError(null);
                  }}
                  placeholder="Bopha"
                  required
                  value={firstName}
                />
                <Input
                  autoComplete="family-name"
                  error={lastNameError}
                  label={t("Last name")}
                  onChange={(event) => {
                    setLastName(event.target.value);
                    setLastNameError(null);
                  }}
                  placeholder="Kim"
                  required
                  value={lastName}
                />
              </div>
              <Button
                className={styles.inlineEnd}
                onClick={submitName}
                variant="primary"
              >
                {t("Continue")}
              </Button>
            </section>
          ) : null}

          {currentStep === "phone" ? (
            <section aria-label={t("Verified phone")} className={styles.step}>
              {phoneSub === "entry" ? (
                <>
                  <header className={styles.header}>
                    <h1 className={styles.title}>{t("Add a phone number")}</h1>
                    <p className={styles.subtitle}>
                      {t(
                        "Couriers use this number, and it appears on order documents.",
                      )}
                    </p>
                  </header>
                  <PhoneInput
                    countries={WIZARD_PHONE_COUNTRIES}
                    defaultCountry="KH"
                    error={phoneError}
                    label={t("Phone number")}
                    onChange={(nextPhone) => {
                      setPhone(nextPhone);
                      setPhoneError(null);
                    }}
                    onCountryChange={(country) => {
                      if (country) setCountryIso(country);
                    }}
                    placeholder="12 345 678"
                    required
                    size="lg"
                    value={phone}
                  />
                  <Button
                    className={styles.inlineEnd}
                    onClick={requestPhoneCode}
                    variant="primary"
                  >
                    {t("Send code")}
                  </Button>
                </>
              ) : null}

              {phoneSub === "verify" ? (
                <>
                  <header className={styles.header}>
                    <h1 className={styles.title}>{t("Enter your code")}</h1>
                    <p className={styles.subtitle}>
                      {t("Sent to")}{" "}
                      <strong className={styles.identifier}>{phone}</strong>
                    </p>
                    <div className={styles.verificationMeta}>
                      <Button
                        className={styles.changePhone}
                        onClick={changePhone}
                        size="sm"
                        variant="link"
                      >
                        {t("Change number")}
                      </Button>
                      <span className={styles.expiry}>
                        {t("Expires in 10 minutes")}
                      </span>
                    </div>
                  </header>
                  <div className={styles.otpSection}>
                    <OtpInput
                      accessibleLabel={t("SMS code")}
                      autoFocus
                      error={codeError}
                      fullWidth
                      onValueChange={(next) => {
                        setCode(next);
                        setCodeError(null);
                      }}
                      value={code}
                    />
                    {resendLeft > 0 ? (
                      <p className={styles.resendStatus} role="status">
                        {t("Resend in")} {resendLeft}s
                      </p>
                    ) : (
                      <Button
                        onClick={() => {
                          setCode("");
                          setResendLeft(resendCooldownSecs);
                        }}
                        className={styles.resendAction}
                        size="compact"
                        variant="link"
                      >
                        {t("Resend code")}
                      </Button>
                    )}
                  </div>
                  <Button
                    className={styles.inlineEnd}
                    disabled={code.length !== 6}
                    onClick={verifyPhone}
                    variant="primary"
                  >
                    {t("Verify")}
                  </Button>
                </>
              ) : null}

              {phoneSub === "blocked" ? (
                <Alert tone="danger">
                  <AlertTitle>{t("This phone is unavailable")}</AlertTitle>
                  <AlertDescription>
                    {t(
                      "Use a different phone or contact support@kura.med. We cannot share details about another account.",
                    )}
                  </AlertDescription>
                  <AlertAction>
                    <Button onClick={changePhone} size="sm" variant="outline">
                      {t("Use a different phone")}
                    </Button>
                  </AlertAction>
                </Alert>
              ) : null}
            </section>
          ) : null}

          {currentStep === "clinic" ? (
            <section aria-label={t("Your clinic")} className={styles.step}>
              <header className={styles.header}>
                <h1 className={styles.title}>{t("Name your clinic")}</h1>
                <p className={styles.subtitle}>
                  {t(
                    "Your patients, orders, and team access are kept here. You can rename it later.",
                  )}
                </p>
              </header>
              <Input
                error={clinicError}
                label={t("Clinic name")}
                onChange={(event) => {
                  setClinicName(event.target.value);
                  setClinicError(null);
                }}
                required
                value={clinicName}
              />
              <div className={styles.actionRow}>
                <Button onClick={skipClinic} variant="ghost">
                  {t("Skip for now")}
                </Button>
                <Button onClick={submitClinic} variant="primary">
                  {t("Create clinic")}
                </Button>
              </div>
            </section>
          ) : null}

          {currentStep === "ml" ? (
            <section aria-label={t("Medical licence")} className={styles.step}>
              <header className={styles.header}>
                <h1 className={styles.title}>
                  {t("Do you hold a medical licence?")}
                </h1>
                <p className={styles.subtitle}>
                  {t(
                    "This affects licence verification. It does not set your role or access.",
                  )}
                </p>
              </header>

              <RadioGroup
                error={mlAnswerError}
                legend={t("Medical licence status")}
                name="medical-licence-status"
                onValueChange={(value) => {
                  if (value === "yes") {
                    setMlAnswer("yes");
                  } else if (value === "no") {
                    setMlAnswer("no");
                    setProfession(null);
                    setLicenceFiles([]);
                  }
                  setMlError(null);
                }}
                value={mlAnswer ?? ""}
              >
                <Radio
                  appearance="card"
                  density="comfortable"
                  helpText={t(
                    "Choose your profession, then upload your licence.",
                  )}
                  value="yes"
                >
                  {t("Yes, I hold a medical licence")}
                </Radio>
                <Radio
                  appearance="card"
                  density="comfortable"
                  helpText={t(
                    "No credential is created or requested. You can change this later.",
                  )}
                  value="no"
                >
                  {t("No, I do not hold one")}
                </Radio>
              </RadioGroup>

              {mlAnswer === "yes" ? (
                <>
                  <Select
                    error={professionError}
                    label={t("Profession")}
                    onChange={(event) => {
                      setProfession(event.target.value as Profession);
                      setMlError(null);
                    }}
                    options={WIZARD_PROFESSIONS.map((entryOption) => ({
                      value: entryOption.value,
                      label: t(entryOption.label),
                    }))}
                    placeholder={t("Select profession…")}
                    required
                    value={profession ?? ""}
                  />

                  <div className={styles.fieldGroup}>
                    <FileUpload
                      accept="application/pdf,image/*"
                      description={t("PDF or clear image, up to 10 MB each.")}
                      label={t("Medical licence document")}
                      maxFiles={3}
                      maxSize={10 * 1024 * 1024}
                      multiple
                      onValueChange={(files) => {
                        setLicenceFiles(files);
                        setMlError(null);
                      }}
                      value={licenceFiles}
                    />
                    {licenceFileError ? (
                      <p className={styles.fieldError} role="alert">
                        {licenceFileError}
                      </p>
                    ) : null}
                  </div>
                </>
              ) : null}

              <div className={`${styles.actionRow} ${styles.licenceActionRow}`}>
                <Button onClick={skipMl} variant="ghost">
                  {t("Skip for now")}
                </Button>
                <Button onClick={finishMl} variant="primary">
                  {t("Finish setup")}
                </Button>
              </div>
            </section>
          ) : null}
        </CardContent>
      </Card>
    </AuthShell>
  );
}
