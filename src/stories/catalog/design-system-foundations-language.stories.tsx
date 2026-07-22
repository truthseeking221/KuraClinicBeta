import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { LanguageReference } from '../../components/foundations/language-reference';

/**
 * Language is its own foundation node rather than one specimen among the type
 * tokens: it governs every string in the product, it owns a separate readiness
 * claim, and its Khmer retune changes how the type scale itself resolves.
 */
const meta = {
  title: 'Design System/Foundations/Language',
  component: LanguageReference,
  parameters: {
    layout: 'fullscreen',
    kura: {
      owner: 'src/components/foundations/i18n',
      layer: 'Foundation',
      decision: 'CREATE',
      source: 'Kura design system',
      binding:
        'Every user-visible string resolves through useT(); Khmer type metrics resolve through the [lang=km] token overrides in tokens.css, never per component',
      role: 'Define the two interface languages, what never gets translated, and how the type system retunes for Khmer script.',
    },
  },
} satisfies Meta<typeof LanguageReference>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    chromatic: { viewports: [320, 1440] },
    docs: {
      description: {
        story:
          'The Kura language contract: the two supported languages, how an English source string resolves to Khmer, the clinical terms that stay Latin in every language, and the Khmer typography retune. Honest limit: the chosen language persists on the device only — no backend field carries a preferred interface language, so the choice does not follow a user to another device.',
      },
    },
  },
  play: async () => {
    for (const section of ['languages', 'lookup', 'untranslated', 'typography']) {
      await expect(document.querySelector(`[data-language-section="${section}"]`)).toBeTruthy();
    }

    const language = document.querySelector<HTMLElement>('[data-foundation-section="language"]');
    await expect(language).toBeTruthy();

    // Specimens must render through the real dictionary, not placeholder text.
    await expect(language?.textContent).toContain('ភាសាខ្មែរ');
    await expect(language?.textContent).toContain('ស្វែងរក');

    // Clinical identifiers stay Latin inside a Khmer sentence.
    await expect(language?.textContent).toContain('HbA1c');

    // Khmer must carry the taller leading, or coeng subscripts clip.
    const khmerSpecimen = language?.querySelector<HTMLElement>('p[lang="km"]');
    if (!khmerSpecimen) throw new Error('Khmer typography specimen did not render.');
    const { fontSize, lineHeight } = getComputedStyle(khmerSpecimen);
    await expect(parseFloat(lineHeight) / parseFloat(fontSize)).toBeGreaterThan(1.6);
  },
};
