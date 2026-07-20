import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  Avatar,
  AvatarFallback,
  Badge,
  CalendarIcon,
  Card,
  CardContent,
  HomeIcon,
  InformationIcon,
  Radio,
  RadioGroup,
  Separator,
  TestTubeIcon,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index";
import styles from "./radio-group.stories.module.css";

const meta = {
  title: "Design System/Patterns/Radio Group",
  component: RadioGroup,
  tags: ["autodocs", "source-reui", "adapted-kura"],
  args: {
    legend: "Choice",
    name: "radio-group-example",
  },
  parameters: {
    layout: "centered",
    chromatic: {
      viewports: [320, 360, 390, 412, 480, 768, 1024, 1440],
    },
    kura: {
      source: {
        vendor: "ReUI",
        registryItem: "c-radio-group-1 through c-radio-group-17",
        sourceUrl: "https://reui.io/components/radio-group",
      },
      intake: {
        decision: "EXTEND",
        owner: "src/components/ui",
        evidence:
          "Kura already owns the native Radio primitive, Field, Card, Badge, Avatar, Tooltip, and Separator. It lacked the reusable one-of-many fieldset contract: shared name/value state, group validation, disabled/read-only behavior, and responsive inline reflow.",
      },
      binding: {
        colors: "kura-semantic-and-delegated-to-kura-children",
        typography: "kura",
        spacing: "kura",
        radius: "composed-control-owner",
        elevation: "none-on-group",
        icons: "none-required-native-indicator",
        density: "kura-root-attribute-through-radio",
        responsive: "horizontal-wraps-then-stacks-under-480px",
      },
      retainedCapabilities: [
        "One-of-many native radio selection with controlled or uncontrolled group value",
        "Vertical and inline layouts with mobile reflow",
        "Visible legend, description, validation, disabled, read-only, and individual disabled states",
        "Card, separator, badge, avatar, icon, tooltip, and grid compositions through canonical Kura owners",
      ],
      exclusions: [
        {
          capability: "Per-option arbitrary colour variants",
          reason:
            "Selection remains Kura primary; arbitrary colours are not a semantic radio state.",
          replacement:
            "Use status text and canonical Badge where semantic context is required.",
        },
        {
          capability: "ReUI Frame styling baked into the group",
          reason:
            "A radio group is form structure, not a surface or page shell.",
          replacement:
            "Compose the group inside the canonical Card or feature-owned section when containment has meaning.",
        },
        {
          capability: "Payment-brand and pricing-plan examples",
          reason:
            "They carry domain data and branded assets outside a generic primitive.",
          replacement:
            "Compose the group with canonical Kura components in the owning payment or billing workflow.",
        },
      ],
    },
    docs: {
      description: {
        component:
          "Groups mutually exclusive Kura Radio choices in a native fieldset. It owns the single selection contract, group label, visible context, validation, responsive layout, and review restrictions; Radio remains the only individual control owner.",
      },
    },
  },
  argTypes: {
    layout: { control: "radio", options: ["list", "grid"] },
    orientation: { control: "radio", options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledRadioGroupStory() {
  const [value, setValue] = useState("clinic");

  return (
    <div className={styles.frame}>
      <RadioGroup
        legend="Collection route"
        name="controlled-collection-route"
        onValueChange={setValue}
        value={value}
      >
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </RadioGroup>
      <output aria-live="polite">Selected: {value}</output>
    </div>
  );
}

export const Default: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    description:
      "Choose where the ordered tests will be collected before preparing the next step.",
    legend: "Collection route",
    name: "collection-route",
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clinic = canvas.getByRole("radio", { name: "Clinic draw" });
    const psc = canvas.getByRole("radio", { name: "Patient service centre" });

    await expect(clinic).toBeChecked();
    await userEvent.click(psc);
    await expect(psc).toBeChecked();
    await expect(clinic).not.toBeChecked();
  },
};

export const Inline: Story = {
  args: {
    className: styles.frame,
    defaultValue: "routine",
    legend: "Order urgency",
    name: "order-urgency",
    orientation: "horizontal",
    children: (
      <>
        <Radio value="routine">Routine</Radio>
        <Radio value="urgent">Urgent</Radio>
        <Radio value="stat">Stat</Radio>
      </>
    ),
  },
};

export const Controlled: Story = {
  render: () => <ControlledRadioGroupStory />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("radio", { name: "Patient service centre" }),
    );
    await expect(canvas.getByText("Selected: psc")).toBeVisible();
  },
};

export const Validation: Story = {
  args: {
    className: styles.frame,
    error: "Choose a collection route before continuing.",
    legend: "Collection route",
    name: "collection-route-validation",
    required: true,
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("group", { name: "Collection route" }),
    ).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Choose a collection route before continuing.",
    );
  },
};

export const Disabled: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    description:
      "The collection route is locked while a booking confirmation is pending.",
    disabled: true,
    legend: "Collection route",
    name: "collection-route-disabled",
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("radio", { name: "Clinic draw" }),
    ).toBeDisabled();
  },
};

export const ReadOnly: Story = {
  args: {
    className: styles.frame,
    defaultValue: "psc",
    description:
      "The route is fixed after the collection appointment has been confirmed.",
    legend: "Collection route",
    name: "collection-route-read-only",
    readOnly: true,
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clinic = canvas.getByRole("radio", { name: "Clinic draw" });
    const psc = canvas.getByRole("radio", { name: "Patient service centre" });

    await userEvent.click(clinic);
    await expect(psc).toBeChecked();
    await expect(clinic).not.toBeChecked();
  },
};

export const CardComposition: Story = {
  render: () => (
    <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup
            defaultValue="secure-message"
            legend="Result delivery"
            name="result-delivery"
          >
            <Radio value="secure-message">
              <span className={styles.optionContent}>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Secure workspace message
                  </span>
                  <span className={styles.optionDescription}>
                    Send a notification when the result is released for
                    clinician review.
                  </span>
                </span>
                <Badge variant="primary">Recommended</Badge>
              </span>
            </Radio>
            <Radio value="patient-portal">
              <span className={styles.optionContent}>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>Patient portal</span>
                  <span className={styles.optionDescription}>
                    Make the result available only after its configured release
                    gate has passed.
                  </span>
                </span>
              </span>
            </Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    description:
      "The selected route is shown in the order review before collection is scheduled.",
    legend: "Collection route",
    name: "description-collection-route",
    children: (
      <>
        <Radio
          value="clinic"
          helpText="Identity and preparation checks happen at the clinic."
        >
          Clinic draw
        </Radio>
        <Radio
          value="psc"
          helpText="The patient receives the same preparation summary for a service centre visit."
        >
          Patient service centre
        </Radio>
      </>
    ),
  },
};

export const CardWithSeparators: Story = {
  render: () => (
    <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup
            defaultValue="secure-message"
            description="Choose the channel used when the result is ready for review."
            legend="Result delivery"
            name="result-delivery-separated"
          >
            <Radio value="secure-message">Secure workspace message</Radio>
            <Separator className={styles.separator} />
            <Radio value="patient-portal">Patient portal</Radio>
            <Separator className={styles.separator} />
            <Radio value="print">Printed report at the front desk</Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  ),
};

export const CardWithIcons: Story = {
  render: () => (
    <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup
            defaultValue="clinic"
            legend="Collection route"
            name="icon-collection-route"
          >
            <Radio value="clinic">
              <span className={styles.optionContent}>
                <TestTubeIcon aria-hidden size={18} />
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>Clinic draw</span>
                  <span className={styles.optionDescription}>
                    Pre-analytical checks are available on site.
                  </span>
                </span>
              </span>
            </Radio>
            <Radio value="home">
              <span className={styles.optionContent}>
                <HomeIcon aria-hidden size={18} />
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>Home collection</span>
                  <span className={styles.optionDescription}>
                    Use an approved mobile phlebotomy route.
                  </span>
                </span>
              </span>
            </Radio>
            <Radio value="calendar">
              <span className={styles.optionContent}>
                <CalendarIcon aria-hidden size={18} />
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Book another appointment
                  </span>
                  <span className={styles.optionDescription}>
                    Keep the order open until a slot is confirmed.
                  </span>
                </span>
              </span>
            </Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <div className={styles.frame}>
      <RadioGroup
        defaultValue="routine"
        layout="grid"
        legend="Order urgency"
        name="grid-order-urgency"
      >
        <Radio
          appearance="card"
          helpText="Use standard turnaround targets."
          value="routine"
        >
          Routine
        </Radio>
        <Radio
          appearance="card"
          helpText="Prioritise this order in the active queue."
          value="urgent"
        >
          Urgent
        </Radio>
        <Radio
          appearance="card"
          helpText="Immediate processing for a time-critical decision."
          value="stat"
        >
          Stat
        </Radio>
        <Radio
          appearance="card"
          helpText="Follow the approved study handling protocol."
          value="research"
        >
          Research protocol
        </Radio>
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const routine = canvas.getByRole("radio", { name: "Routine" });
    const urgent = canvas.getByRole("radio", { name: "Urgent" });
    await expect(routine).toBeChecked();
    await userEvent.click(urgent);
    await expect(urgent).toBeChecked();
    await expect(routine).not.toBeChecked();
  },
};

export const GridLayoutMobile320: Story = {
  ...GridLayout,
  parameters: { viewport: { defaultViewport: "kura320" } },
};

export const AvatarCards: Story = {
  render: () => (
    <div className={styles.frame}>
      <Card className={styles.card} variant="outline">
        <CardContent>
          <RadioGroup
            defaultValue="self"
            legend="Appointment owner"
            name="avatar-appointment-owner"
          >
            <Radio value="self">
              <span className={styles.optionContent}>
                <Avatar aria-hidden fallbackTone="brand" size="sm">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Self-managed appointment
                  </span>
                  <span className={styles.optionDescription}>
                    The patient receives the preparation summary.
                  </span>
                </span>
              </span>
            </Radio>
            <Radio value="caregiver">
              <span className={styles.optionContent}>
                <Avatar aria-hidden fallbackTone="info" size="sm">
                  <AvatarFallback>CG</AvatarFallback>
                </Avatar>
                <span className={styles.optionCopy}>
                  <span className={styles.optionTitle}>
                    Caregiver-assisted appointment
                  </span>
                  <span className={styles.optionDescription}>
                    A nominated caregiver can coordinate reminders.
                  </span>
                </span>
              </span>
            </Radio>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  ),
};

export const TooltipInfo: Story = {
  render: () => (
    <TooltipProvider delay={0}>
      <div className={styles.frame}>
        <RadioGroup
          defaultValue="clinic"
          legend="Collection route"
          name="tooltip-collection-route"
        >
          <Radio value="clinic">
            <span className={styles.optionContent}>
              <span className={styles.optionCopy}>
                <span className={styles.optionTitle}>Clinic draw</span>
                <span className={styles.optionDescription}>
                  Identity checks happen before the sample is collected.
                </span>
              </span>
              <Tooltip>
                <TooltipTrigger
                  aria-label="Why clinic draw is recommended"
                  render={<span className={styles.infoTrigger} tabIndex={0} />}
                >
                  <InformationIcon aria-hidden size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  Use this route when the order needs an in-person preparation
                  review.
                </TooltipContent>
              </Tooltip>
            </span>
          </Radio>
          <Radio value="psc">Patient service centre</Radio>
        </RadioGroup>
      </div>
    </TooltipProvider>
  ),
};

export const LongContent: Story = {
  args: {
    className: styles.frame,
    defaultValue: "standard",
    description:
      "Choose the collection approach that remains safe and practical for the patient, ordered tests, preparation instructions, and current clinic capacity.",
    legend:
      "Collection route for a complex laboratory order with multiple pre-analytical requirements",
    name: "long-collection-route",
    children: (
      <>
        <Radio
          helpText="Collect at the clinic after identity verification, fasting confirmation, and any required timed-collection instructions are reviewed."
          value="standard"
        >
          Clinic draw with pre-collection safeguard review
        </Radio>
        <Radio value="psc">
          Patient service centre with the complete order preparation summary
        </Radio>
      </>
    ),
  },
};

export const KeyboardNavigation: Story = {
  args: {
    className: styles.frame,
    defaultValue: "routine",
    legend: "Order urgency",
    name: "keyboard-order-urgency",
    children: (
      <>
        <Radio value="routine">Routine</Radio>
        <Radio value="urgent">Urgent</Radio>
        <Radio value="stat">Stat</Radio>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const routine = canvas.getByRole("radio", { name: "Routine" });
    const urgent = canvas.getByRole("radio", { name: "Urgent" });

    await userEvent.tab();
    await expect(routine).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(urgent).toHaveFocus();
    await expect(urgent).toBeChecked();
  },
};

export const Hover: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "hover-collection-route",
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
};

export const FocusVisible: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "focus-collection-route",
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: "Clinic draw" });

    await userEvent.tab();
    await expect(radio).toHaveFocus();
    await expect(getComputedStyle(radio.closest("label")!).boxShadow).not.toBe(
      "none",
    );
  },
};

export const Mobile320: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "mobile-collection-route",
    orientation: "horizontal",
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  parameters: { viewport: { defaultViewport: "kura320" } },
};

export const CompactDensity: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "compact-collection-route",
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  globals: { density: "compact" },
};

export const DarkTheme: Story = {
  args: {
    className: styles.frame,
    defaultValue: "clinic",
    legend: "Collection route",
    name: "dark-collection-route",
    children: (
      <>
        <Radio value="clinic">Clinic draw</Radio>
        <Radio value="psc">Patient service centre</Radio>
      </>
    ),
  },
  globals: { theme: "dark" },
};
