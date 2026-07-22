import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';

import {
  Button,
  CheckIcon,
  LoadingIcon,
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from './index';
import storyStyles from './component-family.stories.module.css';

const meta = {
  title: 'Design System/Components/Stepper',
  component: Stepper,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: {
        vendor: 'ReUI',
        registryItem: '@reui/stepper',
      },
      intake: {
        decision: 'CREATE-from-ReUI-architecture',
        owner: 'src/components/ui',
        evidence:
          'No canonical stepper existed. ReUI stepper (free) was intaken to .tmp/reui-intake/clinic-flows/stepper, its context architecture, roving-tabindex keyboard model, and full API were preserved; Tailwind classes were rebound to Kura tokens via CSS modules and two upstream defects were fixed (stepsCount displayName check, indicator ternary).',
      },
      binding: {
        colors: 'kura-semantic (indicator: primary/ink ramps)',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-hugeicons-canonical',
        motion: 'kura-140ms-reduced-motion-safe',
        density: 'inherits-content',
        responsive: 'horizontal fills width; vertical for narrow rails',
      },
    },
    docs: {
      description: {
        component:
          'Multi-step process control with tablist semantics, arrow-key navigation, and per-step completed/disabled/loading states. Drives the front-desk check-in wizard.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const CHECK_IN_STEPS = [
  { step: 1, title: 'Identity' },
  { step: 2, title: 'Review' },
  { step: 3, title: 'Insurance' },
  { step: 4, title: 'Orders' },
  { step: 5, title: 'Payment' },
];

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Stepper defaultValue={2}>
      <StepperNav>
        {CHECK_IN_STEPS.map(({ step, title }, index) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {index < CHECK_IN_STEPS.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperNav>
      <StepperPanel>
        {CHECK_IN_STEPS.map(({ step, title }) => (
          <StepperContent key={step} value={step}>
            Step {step}: {title}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', { name: /2 Review/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(canvas.getByText('Step 2: Review')).toBeVisible();
  },
};

export const KeyboardNavigation: Story = {
  args: { children: null },
  render: () => (
    <Stepper defaultValue={1}>
      <StepperNav>
        {CHECK_IN_STEPS.slice(0, 3).map(({ step, title }, index) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {index < 2 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperNav>
      <StepperPanel>
        {CHECK_IN_STEPS.slice(0, 3).map(({ step, title }) => (
          <StepperContent key={step} value={step}>
            Panel: {title}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('tab', { name: /1 Identity/ });
    first.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: /2 Review/ })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('Panel: Review')).toBeVisible();
    await userEvent.keyboard('{End}');
    await expect(canvas.getByRole('tab', { name: /3 Insurance/ })).toHaveFocus();
  },
};

export const CompletedWithIcons: Story = {
  args: { children: null },
  render: () => (
    <Stepper
      defaultValue={3}
      indicators={{
        completed: <CheckIcon size={14} />,
        loading: <LoadingIcon size={14} />,
      }}
    >
      <StepperNav>
        {CHECK_IN_STEPS.map(({ step, title }, index) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <StepperTitle>{title}</StepperTitle>
            </StepperTrigger>
            {index < CHECK_IN_STEPS.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  ),
};

export const LoadingStep: Story = {
  args: { children: null },
  render: () => (
    <Stepper defaultValue={2} indicators={{ loading: <LoadingIcon size={14} /> }}>
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <StepperTitle>Identity</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem loading step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <StepperTitle>Checking coverage…</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={3}>
          <StepperTrigger>
            <StepperIndicator>3</StepperIndicator>
            <StepperTitle>Payment</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
  ),
};

export const DisabledStep: Story = {
  args: { children: null },
  render: () => (
    <Stepper defaultValue={1}>
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <StepperTitle>Identity</StepperTitle>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem disabled step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <StepperTitle>Insurance</StepperTitle>
            <StepperDescription>Needs identity first</StepperDescription>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('tab', { name: /2 Insurance/ })).toBeDisabled();
  },
};

export const Vertical: Story = {
  args: { children: null },
  render: () => (
    <Stepper defaultValue={2} orientation="vertical">
      <StepperNav>
        {CHECK_IN_STEPS.slice(0, 4).map(({ step, title }, index) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger>
              <StepperIndicator>{step}</StepperIndicator>
              <div>
                <StepperTitle>{title}</StepperTitle>
                <StepperDescription>Step {step} of 4</StepperDescription>
              </div>
            </StepperTrigger>
            {index < 3 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  ),
};

export const Controlled: Story = {
  args: { children: null },
  render: function ControlledStepper() {
    const [step, setStep] = useState(1);

    return (
      <div className={storyStyles.stack}>
        <Stepper onValueChange={setStep} value={step}>
          <StepperNav>
            {CHECK_IN_STEPS.slice(0, 3).map(({ step: s, title }, index) => (
              <StepperItem key={s} step={s}>
                <StepperTrigger>
                  <StepperIndicator>{s}</StepperIndicator>
                  <StepperTitle>{title}</StepperTitle>
                </StepperTrigger>
                {index < 2 ? <StepperSeparator /> : null}
              </StepperItem>
            ))}
          </StepperNav>
          <StepperPanel>
            {CHECK_IN_STEPS.slice(0, 3).map(({ step: s, title }) => (
              <StepperContent key={s} value={s}>
                {title} content
              </StepperContent>
            ))}
          </StepperPanel>
        </Stepper>
        <div className={storyStyles.toolbar}>
          <Button disabled={step <= 1} onClick={() => setStep(step - 1)} variant="outline">
            Back
          </Button>
          <Button disabled={step >= 3} onClick={() => setStep(step + 1)} variant="primary">
            Continue
          </Button>
        </div>
      </div>
    );
  },
};

export const LongContent: Story = {
  args: { children: null },
  render: () => (
    <Stepper defaultValue={2} orientation="vertical">
      <StepperNav>
        <StepperItem step={1}>
          <StepperTrigger>
            <StepperIndicator>1</StepperIndicator>
            <div>
              <StepperTitle>Confirm patient identity and appointment context</StepperTitle>
              <StepperDescription>Name, date of birth, clinic, appointment time, and the person completing check-in.</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem step={2}>
          <StepperTrigger>
            <StepperIndicator>2</StepperIndicator>
            <div>
              <StepperTitle>Review preparation and requested laboratory tests</StepperTitle>
              <StepperDescription>Check fasting instructions, specimen requirements, payment route, and any collection notes.</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperNav>
    </Stepper>
  ),
};

export const MobileNarrow: Story = {
  args: { children: null },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Stepper defaultValue={3}>
      <StepperNav>
        {CHECK_IN_STEPS.map(({ step }, index) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger aria-label={CHECK_IN_STEPS[index].title}>
              <StepperIndicator>{step}</StepperIndicator>
            </StepperTrigger>
            {index < CHECK_IN_STEPS.length - 1 ? <StepperSeparator /> : null}
          </StepperItem>
        ))}
      </StepperNav>
      <StepperPanel>
        {CHECK_IN_STEPS.map(({ step, title }) => (
          <StepperContent key={step} value={step}>
            {title}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  ),
};
