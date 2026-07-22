import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button, ScrollArea, Scrollspy } from './index';
import storyStyles from './scrollspy.stories.module.css';

const sections = [
  ['identity', 'Identity', 'Confirm the patient identity and encounter before reviewing result data.'],
  ['results', 'Results', 'Review verified values, flags, reference ranges, and amendments.'],
  ['interpretation', 'Interpretation', 'Keep supporting clinical context close to the decision it informs.'],
  ['acknowledgement', 'Acknowledgement', 'Record the responsible reviewer and the completion outcome.'],
] as const;

function SectionContent() {
  return (
    <div className={storyStyles.sections}>
      {sections.map(([id, title, body]) => (
        <section className={storyStyles.section} id={id} key={id}>
          <h3 className={storyStyles.sectionTitle}>{title}</h3>
          <p className={storyStyles.sectionBody}>{body}</p>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: 'Design System/Components/Scrollspy',
  component: Scrollspy,
  args: { targetRef: { current: null } },
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Fresh Storybook and source search found navigation and scroll primitives but no owner that synchronizes local section navigation with a bounded viewport.',
        exclusions: [
          {
            upstreamBehavior: 'Global document scroll observation by default',
            reason: 'Kura workspaces need explicit scroll ownership to avoid activating links from unrelated page regions.',
            replacement: 'A required targetRef scopes observation and navigation to one viewport.',
          },
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-scrollspy-1 and c-scrollspy-2',
        sourceUrl: 'https://reui.io/components/scrollspy',
      },
      binding: {
        colors: 'kura-selected-navigation',
        spacing: 'kura',
        radius: 'consumer-control-owned',
        elevation: 'consumer-control-owned',
        icons: 'none',
        responsive: 'vertical-to-horizontal-navigation-reflow',
        motion: 'native-smooth-scroll-unless-reduced-motion',
      },
      useCase: {
        role: 'Kura users navigating a long, locally scrollable review surface',
        primaryTask: 'Move between meaningful sections and retain orientation while reading.',
        safety: 'Safety-critical facts and blockers must not depend on scrollspy navigation for discovery.',
        outOfScope: 'Primary application navigation, route changes, virtualized sections, and hidden safety state.',
      },
    },
    docs: {
      description: {
        component:
          'Synchronizes elements carrying data-scrollspy-anchor with matching section ids inside one explicit scroll viewport. Active links receive aria-current="location".',
      },
    },
  },
} satisfies Meta<typeof Scrollspy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    return (
      <div className={storyStyles.layout}>
        <Scrollspy aria-label="Result review sections" className={storyStyles.verticalNav} targetRef={viewportRef}>
          {sections.map(([id, title]) => (
            <Button data-scrollspy-anchor={id} key={id} variant="outline">{title}</Button>
          ))}
        </Scrollspy>
        <ScrollArea aria-label="Result review content" className={storyStyles.viewport} role="region" viewportRef={viewportRef}>
          <SectionContent />
        </ScrollArea>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resultsLink = canvas.getByRole('button', { name: 'Results' });
    await userEvent.click(resultsLink);
    await waitFor(() => expect(resultsLink).toHaveAttribute('aria-current', 'location'));
  },
};

export const Horizontal: Story = {
  render: () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    return (
      <div className={storyStyles.horizontalLayout}>
        <Scrollspy aria-label="Horizontal result review sections" className={storyStyles.horizontalNav} targetRef={viewportRef}>
          {sections.map(([id, title]) => (
            <Button data-scrollspy-anchor={id} key={id} variant="outline">{title}</Button>
          ))}
        </Scrollspy>
        <ScrollArea aria-label="Horizontal navigation content" className={storyStyles.viewport} role="region" viewportRef={viewportRef}>
          <SectionContent />
        </ScrollArea>
      </div>
    );
  },
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => {
    const viewportRef = useRef<HTMLDivElement>(null);
    return (
      <div className={storyStyles.layout}>
        <Scrollspy aria-label="Mobile result review sections" className={storyStyles.verticalNav} targetRef={viewportRef}>
          {sections.map(([id, title]) => (
            <Button data-scrollspy-anchor={id} key={id} size="sm" variant="outline">{title}</Button>
          ))}
        </Scrollspy>
        <ScrollArea aria-label="Mobile result review content" className={storyStyles.viewport} fadeEdges role="region" viewportRef={viewportRef}>
          <SectionContent />
        </ScrollArea>
      </div>
    );
  },
};
