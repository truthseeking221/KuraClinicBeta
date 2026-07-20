import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Alert, AlertDescription, AlertTitle } from '../../ui';

import {
  IdentityProviderButton,
  IdentityProviderButtonGroup,
} from './identity-provider-button';

const meta = {
  title: 'Design System/Patterns/Authentication/Identity Provider Button',
  component: IdentityProviderButton,
  tags: ['autodocs', 'source-external', 'adapted-kura'],
  args: {
    providerName: 'Configured staff identity provider',
  },
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/shared/identity-provider',
        hierarchy: 'Pattern',
        evidence:
          'Button deliberately excludes social login because provider availability, redirect handoff, and recovery belong to authentication. No existing auth pattern owned a configured identity-provider entry point.',
      },
      source: {
        vendor: 'Untitled UI',
        component: 'Social buttons',
        sourceUrl: 'https://www.untitledui.com/react/components/social-buttons',
        implementationUrl:
          'https://github.com/untitleduico/react/blob/main/components/base/buttons/social-button.tsx',
      },
      binding: {
        colors:
          'kura-semantic control surface; the approved Google mark retains its official standard colours',
        typography: 'kura-button',
        spacing: 'kura-button-and-stack-tokens',
        radius: 'kura-control',
        elevation: 'kura-focus-only',
        icons:
          'Kura LoginIcon by default; Google uses the official standard-colour gradient Super G asset, while Telegram uses its canonical Kura provider-mark wrapper.',
        density: 'Kura Button root attribute',
        responsive: 'FLUID + STACKING vertical group from 320px',
      },
      useCase: {
        journeyId: 'ACC-01',
        role: 'Any staff member',
        primaryTask:
          'Identify a configured external identity provider without mistaking it for Kura’s primary work-email magic-link path.',
        primaryAction: 'Start the selected configured provider handoff.',
        dataModel:
          'The auth owner supplies provider id, display name, optional approved providerBrand, availability, unavailable reason, and redirect callback. This pattern owns no OAuth configuration or session state; a brand mark never proves that a provider is enabled.',
        safety:
          'Every unavailable provider explains the magic-link fallback. The auth owner validates redirect state, session recovery, and workspace access after the provider returns.',
      },
      mobile: {
        minimumUsableWidth: '320px',
        strategy: ['FLUID', 'STACKING'],
        touchTargets: 'Button size lg retains a minimum 44px target.',
        longContent: 'Provider label and unavailable reason wrap; options remain vertically ordered and keyboard reachable.',
      },
      exclusions: [
        {
          upstreamCapability: 'Facebook, Apple, X, Figma, and Dribbble providers',
          reason:
            'They are not configured Kura staff authentication methods in the product source of truth.',
          replacement: 'An auth owner may supply a new configured provider only after its identity, legal, and session contract is approved.',
        },
        {
          upstreamCapability: 'Invented provider-colour themes and copied provider logo SVGs',
          reason:
            'Provider branding cannot be recoloured through Kura semantic tokens, and upstream SVG assets cannot become local interface icons.',
          replacement:
            'Use the neutral Kura Button surface and a separately approved canonical provider-mark wrapper backed by an official brand asset when required.',
        },
        {
          upstreamCapability: 'Icon-only sign-in choices',
          reason:
            'A provider name is essential identity and cannot depend on logo recognition alone.',
          replacement: 'Always use the explicit “Continue with {provider}” label.',
        },
        {
          upstreamCapability: 'Link-mode provider actions',
          reason:
            'Authentication redirect construction and callback validation belong to the auth flow, not to a presentational anchor.',
          replacement: 'The auth owner supplies a guarded button callback.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'A Kura authentication pattern for a provider that the owning auth flow has already configured. It composes the canonical Button, keeps the provider name explicit, and makes the work-email fallback visible whenever the provider is unavailable.',
      },
    },
  },
} satisfies Meta<typeof IdentityProviderButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConfiguredProvider: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <IdentityProviderButton providerName="Configured staff identity provider" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const providerButton = canvas.getByRole('button', {
      name: 'Continue with Configured staff identity provider',
    });

    await userEvent.tab();
    await expect(providerButton).toHaveFocus();
  },
};

export const ConfiguredProviderOptions: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <IdentityProviderButtonGroup label="Configured sign-in methods">
        <IdentityProviderButton providerName="Clinic identity provider" />
        <IdentityProviderButton providerName="Regional staff identity provider" />
      </IdentityProviderButtonGroup>
    </div>
  ),
};

export const UnavailableWithWorkEmailFallback: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <IdentityProviderButton
        availability="unavailable"
        providerBrand="google"
        providerName="Google"
        unavailableReason="Google sign-in is not enabled for this clinic. Use your work email to receive a secure sign-in link."
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Continue with Google' })).toBeDisabled();
    await expect(canvas.getByRole('status')).toHaveTextContent('Use your work email');
  },
};

export const ProviderFailureAndRecovery: Story = {
  render: () => (
    <div className="grid w-full max-w-md gap-4">
      <Alert tone="warning">
        <AlertTitle>Google sign-in is temporarily unavailable</AlertTitle>
        <AlertDescription>
          Your clinic access has not changed. Enter your work email to receive a magic link, then retry after the provider recovers.
        </AlertDescription>
      </Alert>
      <IdentityProviderButton
        availability="unavailable"
        providerBrand="google"
        providerName="Google"
        unavailableReason="The provider has not started a session. Use your work email instead."
      />
    </div>
  ),
};

export const ApprovedProviderMarks: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <IdentityProviderButtonGroup label="Canonical provider marks">
        <IdentityProviderButton
          availability="unavailable"
          providerBrand="google"
          providerName="Google"
          unavailableReason="Google sign-in is not enabled for this workspace. Use your work email to receive a secure sign-in link."
        />
        <IdentityProviderButton
          availability="unavailable"
          providerBrand="telegram"
          providerName="Telegram"
          unavailableReason="Telegram sign-in is not enabled for this workspace. Use your work email to receive a secure sign-in link."
        />
      </IdentityProviderButtonGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const googleButton = canvas.getByRole('button', { name: 'Continue with Google' });
    const googleMark = googleButton.querySelector('[data-kura-provider-mark="google"]');
    const telegramMark = canvas
      .getByRole('button', { name: 'Continue with Telegram' })
      .querySelector('[data-kura-provider-mark="telegram"]');

    await expect(googleMark).toHaveAttribute('aria-hidden', 'true');
    await expect(getComputedStyle(googleButton).justifyContent).toBe('center');
    await expect(
      googleMark?.querySelector('[data-provider-mark-treatment="official-standard-color"]'),
    ).toBeInTheDocument();
    await expect(googleMark?.querySelector('svg')).toBeNull();
    await expect(telegramMark).toHaveAttribute('aria-hidden', 'true');
  },
};

export const MobileNarrowAndLongContent: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <IdentityProviderButtonGroup label="Alternative sign-in methods for Mekong Clinic staff">
        <IdentityProviderButton
          providerBrand="google"
          providerName="Google Workspace for Mekong Clinic’s clinical operations team"
        />
        <IdentityProviderButton
          availability="unavailable"
          providerName="Regional health network staff identity"
          unavailableReason="This provider is not enabled for the current clinic workspace. Use your work email to receive a magic link."
        />
      </IdentityProviderButtonGroup>
    </div>
  ),
  parameters: {
    kura: {
      viewport: '320–480px',
      scenario: 'Narrow mobile with long provider and recovery content',
    },
  },
};
