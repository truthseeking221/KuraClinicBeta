"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  nextLandingIndex,
  validateMl,
  verifyWizardPhone,
  WIZARD_COPY,
  WIZARD_PROFESSIONS,
  wizardStepsFor,
  wizardStepViews,
} from "./logic";
import type {
  LicenceUploadChoice,
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
      uploadChoice: LicenceUploadChoice;
      licenceFiles: readonly FileUploadItem[];
    }
  | {
      answer: "no";
      profession: null;
      uploadChoice: null;
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
  const steps = useMemo(() => wizardStepsFor(entry), [entry]);
  const completedRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(() => {
    const landing = nextLandingIndex(steps, 0, entry.phoneVerified);
    return landing === "done" ? 0 : landing;
  });
  const [skippedSteps, setSkippedSteps] = useState<WizardStepKey[]>([]);

  // Name
  const [name, setName] = useState(
    entry.existingName ?? entry.initialName ?? "",
  );
  const [nameError, setNameError] = useState<string | null>(null);

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
  const [uploadChoice, setUploadChoice] = useState<LicenceUploadChoice | null>(
    null,
  );
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
  const mlAnswerError =
    mlError === WIZARD_COPY.mlAnswerRequired ? mlError : null;
  const professionError =
    mlError === WIZARD_COPY.mlProfessionRequired ? mlError : null;
  const uploadChoiceError =
    mlError === WIZARD_COPY.mlUploadChoiceRequired ? mlError : null;
  const licenceFileError =
    mlError === WIZARD_COPY.mlFileRequired ? mlError : null;

  function mlDeclaration(): WizardMlDeclaration {
    if (mlAnswer === "yes" && profession && uploadChoice) {
      return {
        answer: "yes",
        licenceFiles: uploadChoice === "now" ? licenceFiles : [],
        profession,
        uploadChoice,
      };
    }
    if (mlAnswer === "no") {
      return {
        answer: "no",
        licenceFiles: [],
        profession: null,
        uploadChoice: null,
      };
    }
    return null;
  }

  function finish() {
    if (completedRef.current) return;
    const verifiedPhone = entry.phoneVerified ? entry.verifiedPhone : phone;
    const trimmedName = name.trim();
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
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError(WIZARD_COPY.nameRequired);
      return;
    }
    setNameError(null);
    setName(trimmed);
    if (!clinicName) setClinicName(`${trimmed}'s cabinet`);
    landOn(currentIndex + 1);
  }

  function requestPhoneCode() {
    if (!isValidLocalPhone(localPhone)) {
      setPhoneError(WIZARD_COPY.invalidPhone);
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
      setCodeError(WIZARD_COPY.invalidCode);
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
      setClinicError(WIZARD_COPY.clinicNameRequired);
      return;
    }
    setClinicError(null);
    landOn(currentIndex + 1);
  }

  function skipClinic() {
    setClinicError(null);
    setClinicName((current) => current.trim() || `${name.trim()}'s cabinet`);
    markSkipped("clinic");
    landOn(currentIndex + 1);
  }

  function finishMl() {
    const error = validateMl(
      mlAnswer,
      profession,
      uploadChoice,
      licenceFiles.length,
    );
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
      <Card as="section" aria-label="Set up your account">
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
                      <StepperTitle>{view.label}</StepperTitle>
                    </StepperTrigger>
                    {index < views.length - 1 ? <StepperSeparator /> : null}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          ) : (
            <p aria-live="polite" className={styles.pending} role="status">
              Your account is ready. Opening the workspace…
            </p>
          )}

          {currentStep === "name" ? (
            <section aria-label="Your name" className={styles.step}>
              <header className={styles.header}>
                <h1 className={styles.title}>What should we call you?</h1>
                <p className={styles.subtitle}>
                  Shown to your team and on order documents.
                </p>
              </header>
              <Input
                error={nameError}
                label="Full name"
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError(null);
                }}
                placeholder="Dr. Bopha Kim"
                required
                value={name}
              />
              <Button
                className={styles.inlineEnd}
                onClick={submitName}
                variant="primary"
              >
                Continue
              </Button>
            </section>
          ) : null}

          {currentStep === "phone" ? (
            <section aria-label="Verified phone" className={styles.step}>
              {phoneSub === "entry" ? (
                <>
                  <header className={styles.header}>
                    <h1 className={styles.title}>Add a verified phone</h1>
                    <p className={styles.subtitle}>
                      The number couriers call and order documents show. Every
                      account needs one.
                    </p>
                  </header>
                  <PhoneInput
                    countries={WIZARD_PHONE_COUNTRIES}
                    defaultCountry="KH"
                    error={phoneError}
                    label="Phone number"
                    onChange={(nextPhone) => {
                      setPhone(nextPhone);
                      setPhoneError(null);
                    }}
                    onCountryChange={(country) => {
                      if (country) setCountryIso(country);
                    }}
                    placeholder="12 345 678"
                    required
                    value={phone}
                  />
                  <Button
                    className={styles.inlineEnd}
                    onClick={requestPhoneCode}
                    variant="primary"
                  >
                    Send code
                  </Button>
                </>
              ) : null}

              {phoneSub === "verify" ? (
                <>
                  <header className={styles.header}>
                    <h1 className={styles.title}>Enter the code</h1>
                    <p className={styles.subtitle}>
                      Sent to{" "}
                      <strong className={styles.identifier}>{phone}</strong>.
                    </p>
                  </header>
                  <OtpInput
                    autoFocus
                    error={codeError}
                    fullWidth
                    label="SMS code"
                    onValueChange={(next) => {
                      setCode(next);
                      setCodeError(null);
                    }}
                    value={code}
                  />
                  <div className={styles.actionRow}>
                    <div className={styles.actionCluster}>
                      <Button
                        disabled={resendLeft > 0}
                        onClick={() => {
                          setCode("");
                          setResendLeft(resendCooldownSecs);
                        }}
                        size="compact"
                        variant="ghost"
                      >
                        {resendLeft > 0
                          ? `Resend in ${resendLeft}s`
                          : "Resend code"}
                      </Button>
                      <Button
                        onClick={changePhone}
                        size="compact"
                        variant="ghost"
                      >
                        Change number
                      </Button>
                    </div>
                    <Button
                      disabled={code.length !== 6}
                      onClick={verifyPhone}
                      variant="primary"
                    >
                      Verify
                    </Button>
                  </div>
                </>
              ) : null}

              {phoneSub === "blocked" ? (
                <Alert tone="danger">
                  <AlertTitle>This phone cannot be used</AlertTitle>
                  <AlertDescription>
                    Use a different phone or contact support@kura.med. For
                    privacy, we cannot disclose details about another account.
                  </AlertDescription>
                  <AlertAction>
                    <Button onClick={changePhone} size="sm" variant="outline">
                      Use a different phone
                    </Button>
                  </AlertAction>
                </Alert>
              ) : null}
            </section>
          ) : null}

          {currentStep === "clinic" ? (
            <section aria-label="Your clinic" className={styles.step}>
              <header className={styles.header}>
                <h1 className={styles.title}>Name your clinic</h1>
                <p className={styles.subtitle}>
                  Your workspace — patients, orders, and team live here. You can
                  rename it any time.
                </p>
              </header>
              <Input
                error={clinicError}
                label="Clinic name"
                onChange={(event) => {
                  setClinicName(event.target.value);
                  setClinicError(null);
                }}
                required
                value={clinicName}
              />
              <div className={styles.actionRow}>
                <Button onClick={skipClinic} variant="ghost">
                  Skip for now
                </Button>
                <Button onClick={submitClinic} variant="primary">
                  Create clinic
                </Button>
              </div>
            </section>
          ) : null}

          {currentStep === "ml" ? (
            <section aria-label="Medical licence" className={styles.step}>
              <header className={styles.header}>
                <h1 className={styles.title}>Do you have a medical licence?</h1>
                <p className={styles.subtitle}>
                  Doctor, dentist, nurse, midwife, or another licensed
                  profession.
                </p>
              </header>

              <RadioGroup
                error={mlAnswerError}
                legend="Medical licence status"
                name="medical-licence-status"
                onValueChange={(value) => {
                  if (value === "yes") {
                    setMlAnswer("yes");
                  } else if (value === "no") {
                    setMlAnswer("no");
                    setProfession(null);
                    setUploadChoice(null);
                    setLicenceFiles([]);
                  }
                  setMlError(null);
                }}
                value={mlAnswer ?? ""}
              >
                <Radio
                  appearance="card"
                  density="comfortable"
                  helpText="Choose your profession, then upload now or later."
                  value="yes"
                >
                  Yes — I have a medical licence
                </Radio>
                <Radio
                  appearance="card"
                  density="comfortable"
                  helpText="No credential is created or requested. You can change this later."
                  value="no"
                >
                  No — not at this time
                </Radio>
              </RadioGroup>

              {mlAnswer === "yes" ? (
                <>
                  <Select
                    error={professionError}
                    label="Profession"
                    onChange={(event) => {
                      setProfession(event.target.value as Profession);
                      setMlError(null);
                    }}
                    options={WIZARD_PROFESSIONS.map((entryOption) => ({
                      value: entryOption.value,
                      label: entryOption.label,
                    }))}
                    placeholder="Select profession…"
                    required
                    value={profession ?? ""}
                  />

                  <RadioGroup
                    error={uploadChoiceError}
                    layout="grid"
                    legend="Licence upload timing"
                    name="medical-licence-upload-timing"
                    onValueChange={(value) => {
                      if (value === "now") {
                        setUploadChoice("now");
                      } else if (value === "later") {
                        setUploadChoice("later");
                        setLicenceFiles([]);
                      }
                      setMlError(null);
                    }}
                    value={uploadChoice ?? ""}
                  >
                    <Radio
                      appearance="card"
                      helpText="Attach a PDF or clear image before finishing setup."
                      value="now"
                    >
                      Upload now
                    </Radio>
                    <Radio
                      appearance="card"
                      helpText="A verify-licence card stays visible until a valid licence is added."
                      value="later"
                    >
                      Upload later
                    </Radio>
                  </RadioGroup>

                  {uploadChoice === "now" ? (
                    <div className={styles.fieldGroup}>
                      <FileUpload
                        accept="application/pdf,image/*"
                        description="PDF or clear image, up to 10 MB each."
                        label="Medical licence document"
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
                  ) : null}
                </>
              ) : null}

              <div
                className={`${styles.actionRow} ${styles.licenceActionRow}`}
              >
                <Button onClick={skipMl} variant="ghost">
                  Skip for now
                </Button>
                <Button onClick={finishMl} variant="primary">
                  Finish setup
                </Button>
              </div>
            </section>
          ) : null}
        </CardContent>
      </Card>
    </AuthShell>
  );
}
