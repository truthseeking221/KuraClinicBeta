import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { OnboardingWizard } from "./onboarding-wizard";
import { DEMO_OTP } from "./demo-data";
import { READINESS } from "../../components/foundations/readiness-data";

const VERIFIED_PHONE = "+85598111222";

const meta = {
  title: "Clinic/Auth/Onboarding Wizard",
  component: OnboardingWizard,
  tags: ["autodocs", "adapted-kura"],
  parameters: {
    layout: "fullscreen",
    kura: {
      readiness: READINESS.auth,
      intake: {
        decision: "COMPOSE",
        owner: "src/features/auth",
        evidence:
          "Implements auth-onboarding-product-spec.md §6.2 and locked decisions AD-2, AD-3, AD-7, AD-8, and AD-9. Composed only from indexed Kura Stepper, Input, PhoneInput, Select, RadioGroup, Radio, OtpInput, FileUpload, Alert, Card, and Button components.",
      },
      journeys: [
        "clinic-onboarding-self-serve",
        "clinic-onboarding-invitee",
        "clinic-onboarding-phone-hard-gate",
        "clinic-onboarding-licence-declaration",
      ],
    },
    docs: {
      description: {
        component:
          "Spec-complete post-door onboarding. Every completed account has a verified phone. Self-serve doctors complete Name → Phone-if-needed → Clinic → Licence; Clinic and Licence can be skipped. Invitees supply only missing name/phone facts. Cross-account phone reuse is blocked with support copy and never self-merged. Demo SMS code: 123456; +855 99 000 001/002 are in use; +855 99 000 009 belongs to an unavailable account.",
      },
    },
  },
  args: {
    entry: { isInvitee: false, phoneVerified: false },
    onDone: fn(),
  },
} satisfies Meta<typeof OnboardingWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The profession Select is a popup listbox — open it, then pick from the portal. */
async function pickProfession(canvasElement: HTMLElement, optionLabel: string) {
  const canvas = within(canvasElement);
  await userEvent.click(
    await canvas.findByLabelText(/Profession/, {}, { timeout: 3000 }),
  );
  const body = within(canvasElement.ownerDocument.body);
  await userEvent.click(await body.findByRole("option", { name: optionLabel }));
}

async function submitName(canvasElement: HTMLElement, value = "Bopha Kim") {
  const canvas = within(canvasElement);
  const input = canvas.getByLabelText(/Full name/);
  if (!input.getAttribute("value")) await userEvent.type(input, value);
  await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
}

async function openPhoneVerification(
  canvasElement: HTMLElement,
  phone = "98111222",
  name = "Bopha Kim",
) {
  const canvas = within(canvasElement);
  if (canvas.queryByLabelText(/Full name/))
    await submitName(canvasElement, name);
  await userEvent.type(canvas.getByLabelText(/Phone number/), phone);
  await userEvent.click(canvas.getByRole("button", { name: "Send code" }));
  await expect(canvas.getByRole("textbox", { name: "SMS code" })).toBeVisible();
}

async function enterOtp(canvasElement: HTMLElement, code = DEMO_OTP) {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByRole("textbox", { name: "SMS code" }), code);
  await userEvent.click(canvas.getByRole("button", { name: "Verify" }));
}

async function reachLicence(
  canvasElement: HTMLElement,
  clinicAction: "create" | "skip" = "create",
) {
  const canvas = within(canvasElement);
  await submitName(canvasElement);
  await expect(await canvas.findByLabelText(/Clinic name/)).toHaveValue(
    "Bopha Kim's cabinet",
  );
  await userEvent.click(
    canvas.getByRole("button", {
      name: clinicAction === "create" ? "Create clinic" : "Skip for now",
    }),
  );
  await expect(
    await canvas.findByRole("heading", {
      name: "Do you hold a medical licence?",
    }),
  ).toBeVisible();
}

/** Full self-serve path requires a document for a medical-licence declaration. */
export const SelfServe: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Kura" })).toBeVisible();
    await reachLicence(canvasElement);
    const licenceYes = canvas.getByRole("radio", { name: /Yes, I hold/ });
    await userEvent.click(licenceYes);
    await expect(licenceYes).toBeChecked();
    await pickProfession(canvasElement, "Doctor");
    await userEvent.upload(
      canvas.getByLabelText("Medical licence document"),
      new File(["licence"], "medical-licence.pdf", {
        type: "application/pdf",
      }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Finish setup" }));

    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith({
        clinicName: "Bopha Kim's cabinet",
        mlDeclaration: {
          answer: "yes",
          licenceFiles: [
            expect.objectContaining({ name: "medical-licence.pdf" }),
          ],
          profession: "doctor",
        },
        name: "Bopha Kim",
        phone: VERIFIED_PHONE,
        phoneVerified: true,
      }),
    );
  },
};

/** Email path: phone verification is a hard gate before Clinic. */
export const EmailPhoneGate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement);
    await expect(
      canvas.queryByRole("button", { name: /Skip/ }),
    ).not.toBeInTheDocument();
    await userEvent.type(
      canvas.getByRole("textbox", { name: "SMS code" }),
      DEMO_OTP,
    );
    await userEvent.click(canvas.getByRole("button", { name: "Verify" }));
    await expect(await canvas.findByLabelText(/Clinic name/)).toBeVisible();
  },
};

/** A provider name is prefilled but remains editable before the cabinet default is formed. */
export const NamePrefill: Story = {
  args: {
    entry: {
      initialName: "Bopha Kim",
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByLabelText(/Full name/);
    await expect(name).toHaveValue("Bopha Kim");
    await userEvent.clear(name);
    await userEvent.type(name, "Dr. Bopha Kim");
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(await canvas.findByLabelText(/Clinic name/)).toHaveValue(
      "Dr. Bopha Kim's cabinet",
    );
  },
};

/** Required name validation is announced without advancing the stepper. */
export const NameValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      "Enter your name",
    );
    await expect(canvas.getByLabelText(/Full name/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  },
};

/** A short phone is rejected before any OTP state is entered. */
export const PhoneValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Phone number/), "1234");
    await userEvent.click(canvas.getByRole("button", { name: "Send code" }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      "valid phone number",
    );
    await expect(
      canvas.queryByRole("textbox", { name: "SMS code" }),
    ).not.toBeInTheDocument();
  },
};

/** OTP keeps the resend state with the code and number recovery with the destination. */
export const PhoneVerification: Story = {
  args: { entry: { isInvitee: true, phoneVerified: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "98111333", "Linh Nguyen");
    await userEvent.type(
      canvas.getByRole("textbox", { name: "SMS code" }),
      DEMO_OTP,
    );
    await expect(canvas.getByRole("status")).toHaveTextContent("Resend in 30s");
    await expect(canvas.getByText("Expires in 10 minutes")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Change number" }),
    ).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Verify" })).toBeEnabled();
  },
};

/** Resend clears the previous code and requires six fresh digits. */
export const ResendCode: Story = {
  args: {
    entry: { isInvitee: true, phoneVerified: false },
    resendCooldownSecs: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement);
    const code = canvas.getByRole("textbox", { name: "SMS code" });
    await userEvent.type(code, DEMO_OTP);
    await userEvent.click(canvas.getByRole("button", { name: "Resend code" }));
    await expect(code).toHaveValue("");
    await expect(canvas.getByRole("button", { name: "Verify" })).toBeDisabled();
  },
};

/** Incorrect OTP recovers in place and preserves the verified-phone task. */
export const InvalidOtpRecovery: Story = {
  args: { entry: { isInvitee: true, phoneVerified: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement);
    await enterOtp(canvasElement, "000000");
    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      /incorrect or expired/i,
    );
    await userEvent.clear(canvas.getByRole("textbox", { name: "SMS code" }));
    await enterOtp(canvasElement);
    await waitFor(() => expect(args.onDone).toHaveBeenCalled());
  },
};

/** The supported +84 path stores a normalized Vietnam E.164 phone. */
export const VietnamPhone: Story = {
  args: { entry: { isInvitee: true, phoneVerified: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement, "Linh Nguyen");
    const country = canvas.getByRole("combobox", {
      name: /change country or region/i,
    });
    await userEvent.click(country);
    const body = within(canvasElement.ownerDocument.body);
    const search = await body.findByRole("combobox", {
      name: "Search country or region",
    });
    await userEvent.type(search, "Vietnam");
    await userEvent.click(body.getByRole("option", { name: /Vietnam.*\+84/i }));
    await userEvent.type(canvas.getByLabelText(/Phone number/), "98111222");
    await userEvent.click(canvas.getByRole("button", { name: "Send code" }));
    await enterOtp(canvasElement);
    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith(
        expect.objectContaining({ phone: "+8498111222", phoneVerified: true }),
      ),
    );
  },
};

/** Cross-account identifier reuse is blocked with support copy and no merge action. */
export const PhoneAlreadyInUse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "99000001");
    await enterOtp(canvasElement);
    await expect(
      await canvas.findByText("This phone is unavailable"),
    ).toBeVisible();
    await expect(canvas.getByText(/support@kura.med/)).toBeVisible();
    await expect(
      canvas.queryByRole("button", { name: /merge|link my account/i }),
    ).not.toBeInTheDocument();
  },
};

/** A phone held by an unavailable account uses the same privacy-safe support path. */
export const PhoneOnUnavailableAccount: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "99000009");
    await enterOtp(canvasElement);
    await expect(
      await canvas.findByText("This phone is unavailable"),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole("button", { name: "Use a different phone" }),
    );
    await expect(await canvas.findByLabelText(/Phone number/)).toBeVisible();
  },
};

/** New invitee: Name → mandatory Phone only; Clinic and Licence stay deferred. */
export const NewInvitee: Story = {
  args: { entry: { isInvitee: true, phoneVerified: false } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText("Clinic")).not.toBeInTheDocument();
    await expect(canvas.queryByText("Licence")).not.toBeInTheDocument();
    await openPhoneVerification(canvasElement, "98111333", "Linh Nguyen");
    await enterOtp(canvasElement);
    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith({
        clinicName: null,
        mlDeclaration: null,
        name: "Linh Nguyen",
        phone: "+85598111333",
        phoneVerified: true,
      }),
    );
  },
};

/** Existing invitee name is preserved; only the missing phone is requested. */
export const ExistingInviteeNeedsPhone: Story = {
  args: {
    entry: {
      existingName: "Dr. Dara Phan",
      isInvitee: true,
      phoneVerified: false,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByLabelText(/Full name/)).not.toBeInTheDocument();
    await openPhoneVerification(canvasElement, "98111444");
    await enterOtp(canvasElement);
    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Dr. Dara Phan",
          phone: "+85598111444",
        }),
      ),
    );
  },
};

/** Existing invitee with name and phone bypasses the wizard entirely. */
export const ExistingInviteeReady: Story = {
  args: {
    entry: {
      existingName: "Dr. Dara Phan",
      isInvitee: true,
      phoneVerified: true,
      verifiedPhone: "+85512777088",
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "Opening your workspace",
    );
    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith({
        clinicName: null,
        mlDeclaration: null,
        name: "Dr. Dara Phan",
        phone: "+85512777088",
        phoneVerified: true,
      }),
    );
  },
};

/** Phone-path signup never re-asks the verified phone and marks that step complete. */
export const PhoneAlreadyVerified: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement, "Dara Phan");
    await expect(await canvas.findByLabelText(/Clinic name/)).toBeVisible();
    await expect(
      canvas.queryByLabelText(/Phone number/),
    ).not.toBeInTheDocument();
    const phoneStep = canvas.getByRole("tab", { name: /Phone/ });
    await expect(
      phoneStep.closest('[data-slot="stepper-item"]'),
    ).toHaveAttribute("data-state", "completed");
  },
};

/** Skipping Clinic still creates the default cabinet and advances to Licence. */
export const ClinicSkipCreatesCabinet: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement, "skip");
    await userEvent.click(canvas.getByRole("button", { name: "Skip for now" }));
    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith(
        expect.objectContaining({
          clinicName: "Bopha Kim's cabinet",
          mlDeclaration: null,
        }),
      ),
    );
  },
};

/** Explicit Create rejects an empty clinic name; Skip remains a safe alternative. */
export const ClinicValidation: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await submitName(canvasElement);
    await userEvent.clear(await canvas.findByLabelText(/Clinic name/));
    await userEvent.click(
      canvas.getByRole("button", { name: "Create clinic" }),
    );
    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      "Clinic name is required.",
    );
    await expect(args.onDone).not.toHaveBeenCalled();
  },
};

/** NO records no credential and completes without a licence nag. */
export const LicenceNo: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(
      canvas.getByRole("radio", { name: /No, I do not hold one/ }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "Finish setup" }));
    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith(
        expect.objectContaining({
          mlDeclaration: {
            answer: "no",
            licenceFiles: [],
            profession: null,
          },
        }),
      ),
    );
  },
};

/** Finish requires an explicit YES/NO answer unless the user deliberately skips. */
export const LicenceAnswerRequired: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Finish setup" }));

    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      "Answer the licence question",
    );
    await expect(
      canvas.getByRole("group", { name: "Medical licence status" }),
    ).toHaveAttribute("aria-invalid", "true");
    await expect(args.onDone).not.toHaveBeenCalled();
  },
};

/** The entire licence question can be deferred without fabricating an answer. */
export const LicenceSkip: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Skip for now" }));
    await waitFor(() =>
      expect(args.onDone).toHaveBeenCalledWith(
        expect.objectContaining({ mlDeclaration: null }),
      ),
    );
  },
};

/** YES validates profession and the required licence document. */
export const LicenceValidation: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("radio", { name: /Yes, I hold/ }));
    await canvas.findByLabelText(/Profession/, {}, { timeout: 3000 });
    await userEvent.click(canvas.getByRole("button", { name: "Finish setup" }));
    const professionError = await canvas.findByRole("alert");
    await expect(professionError).toHaveTextContent("Select your profession");

    const profession = canvas.getByLabelText(/Profession/);
    await expect(profession).toHaveAttribute("aria-invalid", "true");
    await expect(profession).toHaveAccessibleDescription(
      "Select your profession to continue.",
    );
    await userEvent.click(profession);
    const listbox = within(canvasElement.ownerDocument.body);
    for (const label of ["Doctor", "Dentist", "Nurse", "Midwife", "Other"]) {
      await expect(
        await listbox.findByRole("option", { name: label }),
      ).toBeInTheDocument();
    }
    await userEvent.click(listbox.getByRole("option", { name: "Doctor" }));
    await userEvent.click(canvas.getByRole("button", { name: "Finish setup" }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      "Upload a licence document",
    );
    await expect(args.onDone).not.toHaveBeenCalled();
  },
};

/** The profession error stays attached to its field and the action remains reachable at 320px. */
export const LicenceValidationMobile320: Story = {
  args: LicenceValidation.args,
  parameters: { viewport: { defaultViewport: "kura320" } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("radio", { name: /Yes, I hold/ }));
    await canvas.findByLabelText(/Profession/, {}, { timeout: 3000 });
    await userEvent.click(canvas.getByRole("button", { name: "Finish setup" }));

    const profession = canvas.getByLabelText(/Profession/);
    await expect(profession).toHaveAttribute("aria-invalid", "true");
    await expect(profession).toHaveAccessibleDescription(
      "Select your profession to continue.",
    );
    await expect(
      canvas.getByRole("button", { name: "Finish setup" }),
    ).toBeVisible();
    await expect(args.onDone).not.toHaveBeenCalled();
  },
};

/** A licence declaration returns the canonical FileUpload attachment in the result. */
export const LicenceUpload: Story = {
  args: {
    entry: {
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await reachLicence(canvasElement);
    await userEvent.click(canvas.getByRole("radio", { name: /Yes, I hold/ }));
    await pickProfession(canvasElement, "Dentist");
    await userEvent.upload(
      canvas.getByLabelText("Medical licence document"),
      new File(["licence"], "dental-licence.pdf", { type: "application/pdf" }),
    );
    await expect(canvas.getByText("dental-licence.pdf")).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Finish setup" }));
    await waitFor(() => {
      const result = args.onDone.mock.calls[0]?.[0];
      expect(result?.mlDeclaration?.answer).toBe("yes");
      if (result?.mlDeclaration?.answer === "yes") {
        expect(result.mlDeclaration.profession).toBe("dentist");
        expect(result.mlDeclaration.licenceFiles[0]?.name).toBe(
          "dental-licence.pdf",
        );
      }
    });
  },
};

/** Narrow viewport keeps the densest licence-upload state operable at 320px. */
export const Mobile320: Story = {
  args: {
    entry: {
      initialName: "Dr. Chanthou Sok-Sereyvorlak",
      isInvitee: false,
      phoneVerified: true,
      verifiedPhone: VERIFIED_PHONE,
    },
  },
  parameters: { viewport: { defaultViewport: "kura320" } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await userEvent.click(canvas.getByRole("button", { name: "Skip for now" }));
    await userEvent.click(canvas.getByRole("radio", { name: /Yes, I hold/ }));
    await pickProfession(canvasElement, "Other");
    await expect(
      canvas.getByLabelText("Medical licence document"),
    ).toBeVisible();
  },
};

/** At 320px, the OTP status and primary verification action retain their hierarchy. */
export const PhoneVerificationMobile320: Story = {
  args: { entry: { isInvitee: true, phoneVerified: false } },
  parameters: { viewport: { defaultViewport: "kura320" } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openPhoneVerification(canvasElement, "98111333", "Linh Nguyen");
    await userEvent.type(
      canvas.getByRole("textbox", { name: "SMS code" }),
      DEMO_OTP,
    );
    await expect(
      canvas.getByRole("button", { name: "Change number" }),
    ).toBeVisible();
    await expect(canvas.getByText("Expires in 10 minutes")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Verify" })).toBeEnabled();
  },
};
