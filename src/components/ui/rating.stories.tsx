import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Rating } from './rating';
import storyStyles from './rating.stories.module.css';

const meta = {
  title: 'Design System/Primitives/Rating',
  component: Rating,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Fresh Storybook and source search found RadioGroup but no compact score display/input with decimal star fill and a rating-specific native form contract.',
        exclusions: [
          {
            reuiExample: 'c-rating-6 review distribution summary',
            reason: 'Aggregate counts and progress rows are an analytics composition, not a rating primitive variant.',
            replacement: 'Compose Rating, Progress, Separator, and real review data in the owning feature.',
          },
          {
            reuiExample: 'c-rating-8 emoji reaction picker',
            reason: 'Emoji and Unicode symbols are prohibited icon workarounds and reaction scales have different labelled semantics.',
            replacement: 'Use RadioGroup with approved text-labelled choices until canonical reaction icons are approved.',
          },
          {
            reuiExample: 'c-rating-9 review form',
            reason: 'Textarea validation, submission, and recovery belong to the feedback feature.',
            replacement: 'Compose Rating with Field, Textarea, and Button in that feature.',
          },
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-rating-1 through c-rating-9',
        sourceUrl: 'https://reui.io/components/rating',
      },
      binding: {
        colors: 'kura-primary-data',
        spacing: 'kura',
        radius: 'kura-focus-only',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical-StarIcon',
        density: 'size-prop-and-root-density-compatible',
        responsive: 'inline-wrap',
        motion: 'kura-indicator-reduced-motion-safe',
      },
      useCase: {
        role: 'A Kura user viewing or providing a bounded qualitative score',
        primaryTask: 'Understand or select a score with an explicit scale and native keyboard behavior.',
        safety: 'Rating must not represent clinical severity, triage priority, certainty, or medication risk.',
        outOfScope: 'Clinical scales, NPS logic, review submission, aggregate distributions, and reaction emoji.',
      },
    },
    docs: {
      description: {
        component:
          'A canonical star score display and native radio input. Supports decimal read-only values and 0.5/1 editable steps. Never use it for clinical severity or safety decisions.',
      },
    },
  },
  argTypes: {
    editable: { control: 'boolean' },
    rating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    step: { control: 'inline-radio', options: [0.5, 1] },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Service experience', rating: 4, showValue: true },
};

export const DecimalReadOnly: Story = {
  args: { label: 'Service experience', rating: 3.7, showValue: true, step: 0.5 },
};

export const Sizes: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Rating label="Compact service score" rating={4} size="sm" showValue />
      <Rating label="Standard service score" rating={4} size="md" showValue />
      <Rating label="Prominent service score" rating={4} size="lg" showValue />
    </div>
  ),
};

export const Editable: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    return (
      <div className={storyStyles.stack}>
        <Rating editable label="Rate your booking experience" onRatingChange={setRating} rating={rating} showValue />
        <p className={storyStyles.status} aria-live="polite">Selected score: {rating || 'none'}.</p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fourthStar = canvas.getByRole('radio', { name: '4 out of 5' });
    await userEvent.click(fourthStar);
    await expect(fourthStar).toBeChecked();
    await expect(canvas.getByText('Selected score: 4.')).toBeVisible();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: '5 out of 5' })).toBeChecked();
  },
};

export const HalfStep: Story = {
  render: () => {
    const [rating, setRating] = useState(3.5);
    return (
      <Rating editable label="Rate the support experience" onRatingChange={setRating} rating={rating} showValue step={0.5} />
    );
  },
};

export const DisabledWithReason: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Rating disabled editable label="Rate the completed visit" rating={0} />
      <p className={storyStyles.hint}>Rating becomes available after the visit is completed.</p>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <Rating editable label="Submitted service rating" rating={4.5} readOnly showValue step={0.5} />
      <p className={storyStyles.hint}>The submitted response is retained for review and cannot be changed.</p>
    </div>
  ),
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <div className={storyStyles.mobileFrame}>
      <Rating editable label="Rate the booking experience" rating={4.5} showValue step={0.5} />
    </div>
  ),
};
