import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "./index";

const meta = {
  title: "Design System/Components/Field",
  component: Field,
  tags: ["autodocs", "source-reui", "adapted-kura"],
  parameters: {
    layout: "centered",
    kura: {
      source: { vendor: "ReUI", registryItem: "field", familySize: 11 },
      intake: {
        decision: "CREATE",
        owner: "src/components/ui",
        evidence:
          "Input, Select, Textarea, CheckboxGroup and Radio already own controls, but Kura lacked one semantic composition for arbitrary controls, responsive label alignment, grouped fields and deduplicated validation messages.",
      },
      binding: {
        colors: "kura-semantic",
        typography: "kura",
        spacing: "kura",
        radius: "composed-control-owner",
        elevation: "none",
        icons: "composed-control-owner",
        responsive: "stacking-horizontal-to-vertical",
      },
      exclusions: [
        {
          capability: "OTP, slider and switch controls",
          reason:
            "Field composes these controls when their canonical Kura owners exist; it does not create substitute primitives.",
        },
        {
          capability: "Settings, permissions and notification forms",
          reason:
            "These are domain or feature compositions. Stories prove the field structure without inventing permission or notification business logic.",
        },
      ],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextControl: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-phone" required>
        Patient phone
      </FieldLabel>
      <FieldContent>
        <Input
          id="field-phone"
          inputMode="tel"
          placeholder="012 345 678"
          required
        />
        <FieldDescription>
          Use the number the patient can receive booking updates on.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/Patient phone/), "012777088");
    await expect(canvas.getByLabelText(/Patient phone/)).toHaveValue(
      "012777088",
    );
  },
};

export const InputAndTextarea: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="field-name">Preferred name</FieldLabel>
        <Input id="field-name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="field-note">Reception note</FieldLabel>
        <Textarea
          id="field-note"
          placeholder="Only operational context needed for this visit"
        />
      </Field>
    </FieldGroup>
  ),
};

export const SelectControl: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-language">Preferred language</FieldLabel>
      <FieldContent>
        <Select
          id="field-language"
          defaultValue=""
          options={[
            { value: "km", label: "ខ្មែរ" },
            { value: "en", label: "English" },
            { value: "vi", label: "Tiếng Việt" },
          ]}
          placeholder="Choose a language"
        />
        <FieldDescription>
          This changes communication language, not clinical terminology.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const ChoiceControls: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Contact preferences</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox>SMS appointment reminders</Checkbox>
          <FieldDescription>
            Sent only to the verified patient phone.
          </FieldDescription>
        </Field>
        <RadioGroup
          defaultValue="morning"
          description="Preferred callback window, not a guaranteed appointment time."
          legend="Preferred callback window"
          name="contact-time"
          orientation="horizontal"
        >
          <Radio value="morning">Morning</Radio>
          <Radio value="afternoon">Afternoon</Radio>
        </RadioGroup>
      </FieldGroup>
    </FieldSet>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <FieldGroup style={{ width: "min(42rem, 90vw)" }}>
      <Field orientation="responsive">
        <FieldLabel htmlFor="field-clinic">Clinic workspace</FieldLabel>
        <FieldContent>
          <Select
            id="field-clinic"
            options={[
              { value: "pp", label: "Kura Phnom Penh Central Clinic" },
              { value: "sr", label: "Kura Siem Reap Riverside Clinic" },
            ]}
          />
          <FieldDescription>
            Records and queues remain scoped to this workspace.
          </FieldDescription>
        </FieldContent>
      </Field>
      <FieldSeparator>Patient details</FieldSeparator>
      <Field orientation="responsive">
        <FieldLabel htmlFor="field-address">Address</FieldLabel>
        <Input id="field-address" />
      </Field>
    </FieldGroup>
  ),
};

export const ValidationErrors: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel htmlFor="field-code">Booking code</FieldLabel>
      <FieldContent>
        <Input id="field-code" aria-invalid="true" defaultValue="FZ" />
        <FieldError
          errors={[
            { message: "Enter the complete booking code." },
            { message: "Enter the complete booking code." },
            { message: "Use letters and numbers only." },
          ]}
        />
      </FieldContent>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Enter the complete booking code.",
    );
    await expect(canvas.getAllByRole("listitem")).toHaveLength(2);
  },
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel htmlFor="field-locked">Verified patient ID</FieldLabel>
      <FieldContent>
        <Input id="field-locked" defaultValue="HN-004821" disabled />
        <FieldDescription>
          Identity is locked after check-in verification.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const MobileNarrow: Story = {
  ...ResponsiveLayout,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
