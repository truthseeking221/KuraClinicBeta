import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { DefinitionOfDoneReference } from '../../components/foundations/definition-of-done-reference';
import { READINESS } from '../../components/foundations/readiness-data';
import { ReadinessReference } from '../../components/foundations/readiness-reference';
import { StoryPlaceholder } from './story-placeholder';

const meta = {
  title: 'Design System/Governance',
  component: StoryPlaceholder,
  parameters: { layout: 'fullscreen' },
  args: { catalog: 'Design System', section: 'Governance' },
} satisfies Meta<typeof StoryPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReleaseReadiness: Story = {
  render: () => <ReadinessReference />,
  parameters: {
    docs: {
      description: {
        story:
          'Per-domain truth: what runs on the real kura-platform contract versus local demo scaffolding. Levels live in readiness-data.ts and are referenced by each domain’s story metadata, so the board and the stories cannot disagree.',
      },
    },
  },
  play: async () => {
    for (const section of ['principles', 'levels', 'domains', 'rules']) {
      await expect(document.querySelector(`[data-readiness-section="${section}"]`)).toBeTruthy();
    }
    const domains = [...document.querySelectorAll<HTMLElement>('[data-readiness-domain]')];
    await expect(domains).toHaveLength(Object.keys(READINESS).length);
    for (const level of ['ready', 'partial', 'gap', 'deprecated']) {
      await expect(document.querySelector(`[data-readiness-level="${level}"]`)).toBeTruthy();
    }
  },
};

export const DefinitionOfDone: Story = {
  render: () => <DefinitionOfDoneReference />,
  parameters: {
    docs: {
      description: {
        story:
          'The ship gate for every Storybook item, rendered from AGENTS.md and the component build guide. Those files remain the source of truth; this page exists so the checklist is visible where the work happens.',
      },
    },
  },
  play: async () => {
    for (const section of ['principles', 'checks', 'scope', 'sources']) {
      await expect(document.querySelector(`[data-dod-section="${section}"]`)).toBeTruthy();
    }
    await expect(document.querySelectorAll('[data-dod-check]')).toHaveLength(10);
  },
};
