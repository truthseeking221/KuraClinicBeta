import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { ColorsReference } from '../../components/foundations/colors-reference';
import { DCM_COLOR_TOKENS } from '../../components/foundations/color-tokens';
import { ContentGrammarReference } from '../../components/foundations/content-grammar-reference';
import { DataGrammarReference } from '../../components/foundations/data-grammar-reference';
import {
  ElevationReference,
  RadiusReference,
  SpacingReference,
  TypographyReference,
} from '../../components/foundations/foundation-token-reference';
import { MotionReference } from '../../components/foundations/motion-reference';
import { StoryPlaceholder } from './story-placeholder';

const meta = {
  title: 'Design System/Foundations',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Design System', section: 'Foundations' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => <ColorsReference />,
  parameters: {
    chromatic: { viewports: [320, 1440] },
    kura: {
      owner: 'src/styles/tokens.css',
      layer: 'Foundation',
      decision: 'CREATE',
      source: 'Kura design system',
      binding: 'All component colors resolve through Kura semantic or component-role tokens; primitives are foundation-only',
    },
    docs: {
      description: {
        story: 'The complete Kura color contract across core UI, brand actions, status, data visualization, and clinical identity.',
      },
    },
  },
  play: async () => {
    const rows = [...document.querySelectorAll<HTMLElement>('[data-canonical-token]')];
    const names = rows.map((row) => row.dataset.tokenName).filter(Boolean);

    await expect(rows).toHaveLength(DCM_COLOR_TOKENS.length);
    await expect(new Set(names)).toHaveLength(DCM_COLOR_TOKENS.length);
    for (const section of ['provenance', 'primitives', 'semantics', 'theme-comparison', 'compatibility']) {
      await expect(document.querySelector(`[data-color-section="${section}"]`)).toBeTruthy();
    }
  },
};
export const Typography: Story = {
  render: () => <TypographyReference />,
  parameters: {
    chromatic: { viewports: [320, 390, 768, 1440] },
    kura: {
      owner: 'src/components/foundations/foundation-token-reference.tsx',
      layer: 'Foundation',
      decision: 'EXTEND',
      responsive: ['FLUID', 'STACKING', 'WRAPPING'],
      role: 'Help designers and engineers choose the canonical typography role for clinical interfaces.',
    },
    docs: {
      description: {
        story: 'The complete Kura typography contract: family coverage, the full scale, semantic roles, weights, line heights, numeric treatment, long-content behaviour, and clinical reading rules.',
      },
    },
  },
  play: async () => {
    const typography = document.querySelector<HTMLElement>('[data-foundation-section="typography"]');

    await expect(typography).toBeTruthy();
    await expect(typography?.textContent).toContain('--type-5xl');
    await expect(typography?.textContent).toContain('Semantic role map');
    await expect(typography?.textContent).toContain('Clinical composition specimen');
  },
};
export const TypographyNarrow: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-sm">
      <TypographyReference />
    </div>
  ),
  parameters: {
    chromatic: { viewports: [320, 360, 390] },
    docs: {
      description: {
        story: 'A constrained-width specimen proving that the reference stacks, wraps realistic clinical copy, and keeps every typography rule visible without horizontal page overflow.',
      },
    },
  },
};
export const TypographyLongContent: Story = {
  render: () => <TypographyReference contentMode="long" />,
  parameters: {
    chromatic: { viewports: [320, 390, 768, 1440] },
    docs: {
      description: {
        story: 'Long patient identity and clinical-note content for checking Vietnamese diacritics, multi-line guidance, stable label/value relationships, and safe wrapping.',
      },
    },
  },
};
export const Spacing: Story = { render: () => <SpacingReference /> };
export const Radius: Story = { render: () => <RadiusReference /> };
export const Elevation: Story = { render: () => <ElevationReference /> };

export const DataGrammar: Story = {
  render: () => <DataGrammarReference />,
  parameters: {
    docs: {
      description: {
        story:
          'How Kura displays data: minor-unit money, ICT timestamps, identity masking, status-chip semantics, quantitative marks, and honest absence. Specimens quote shipped surfaces.',
      },
    },
  },
  play: async () => {
    for (const section of ['principles', 'money', 'time', 'masking', 'status', 'quantitative', 'absence']) {
      await expect(document.querySelector(`[data-data-grammar-section="${section}"]`)).toBeTruthy();
    }
  },
};

export const ContentGrammar: Story = {
  render: () => <ContentGrammarReference />,
  parameters: {
    docs: {
      description: {
        story:
          'How Kura writes: voice and casing, labels and helper text, validation patterns, banners, confirmations, toasts, and the clinical-safety copy rules that outrank style.',
      },
    },
  },
  play: async () => {
    for (const section of ['principles', 'voice', 'labels', 'validation', 'banners', 'confirmations', 'toasts', 'safety']) {
      await expect(document.querySelector(`[data-content-grammar-section="${section}"]`)).toBeTruthy();
    }
  },
};

export const Motion: Story = {
  render: () => <MotionReference />,
  play: async () => {
    for (const section of ['principles', 'durations', 'easings', 'semantic', 'specimens', 'rules']) {
      await expect(document.querySelector(`[data-motion-section="${section}"]`)).toBeTruthy();
    }

    const tokens = [...document.querySelectorAll<HTMLElement>('[data-motion-token]')].map(
      (element) => element.dataset.motionToken,
    );
    await expect(tokens).toHaveLength(14); // 4 durations + 4 easings + 6 semantic aliases
    await expect(new Set(tokens)).toHaveLength(14);

    // Easing tokens must resolve from the stylesheet (durations zero out under
    // the test browser's forced reduced motion, so assert curves instead).
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue('--ease-standard')
      .trim();
    await expect(resolved).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
  },
};
