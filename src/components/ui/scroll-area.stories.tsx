import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import {
  ScrollArea,
  ScrollBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './index';
import storyStyles from './scroll-area.stories.module.css';

const releaseItems = Array.from({ length: 24 }, (_, index) => `Release 1.8.${24 - index}`);
const resultItems = [
  ['Complete blood count', 'Verified · today 09:42'],
  ['HbA1c', 'Verified · today 09:38'],
  ['Lipid panel', 'Final · yesterday 16:15'],
  ['Liver function', 'Final · yesterday 15:50'],
  ['Renal profile', 'Amended · 14 Jul 2026'],
];

function ReleaseList() {
  return (
    <ul className={storyStyles.list}>
      {releaseItems.map((item) => <li className={storyStyles.listItem} key={item}>{item}</li>)}
    </ul>
  );
}

const meta = {
  title: 'Design System/Primitives/Scroll Area',
  component: ScrollArea,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Fresh Storybook and source search found native overflow in DataGrid and Sheet but no reusable bounded scroll viewport with tokenized vertical and horizontal scrollbar parts.',
        exclusions: [
          {
            upstreamClaim: 'Virtualization and automatic chat scroll behavior',
            reason: 'These are data lifecycle and feature behaviors, not scroll-area responsibilities.',
            replacement: 'Compose the primitive with the feature-owned virtualizer or message lifecycle.',
          },
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-scroll-area-1 through c-scroll-area-5',
        sourceUrl: 'https://reui.io/components/scroll-area',
        behaviorDependency: '@base-ui/react/scroll-area (existing workspace dependency)',
      },
      binding: {
        colors: 'kura-semantic',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'none',
        icons: 'none',
        density: 'consumer-content-owned',
        responsive: 'fluid-container-with-explicit-bounds',
        motion: 'kura-color-feedback-reduced-motion-safe',
      },
      useCase: {
        role: 'Any Kura user reviewing bounded lists, wide operational data, or long secondary content',
        primaryTask: 'Inspect overflow content without transferring scroll ownership to the whole page.',
        safety: 'The consuming feature must not hide patient identity, blockers, or primary actions inside an undiscoverable nested scroll region.',
        outOfScope: 'Virtualization, infinite loading, auto-scroll, pagination, and sticky clinical context.',
      },
    },
    docs: {
      description: {
        component:
          'A bounded, styled scroll viewport using the existing Base UI behavior layer. The consumer owns width and height; avoid nested scroll areas unless each region has an independent task.',
      },
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea aria-label="Release history" className={storyStyles.verticalFrame} role="region">
      <ReleaseList />
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('region', { name: 'Release history' })).toBeVisible();
    await expect(canvas.getByText('Release 1.8.24')).toBeVisible();
  },
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea
      aria-label="Recent result summaries"
      className={storyStyles.horizontalFrame}
      role="region"
      scrollbars="horizontal"
    >
      <div className={storyStyles.horizontalContent}>
        {resultItems.map(([name, metaText]) => (
          <article className={storyStyles.resultCard} key={name}>
            <p className={storyStyles.resultName}>{name}</p>
            <p className={storyStyles.resultMeta}>{metaText}</p>
          </article>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothAxes: Story = {
  render: () => (
    <ScrollArea aria-label="Wide result history" className={storyStyles.bothFrame} role="region" scrollbars="both">
      <Table className={storyStyles.wideTable}>
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
            <TableHead>17 Jul</TableHead>
            <TableHead>16 Jul</TableHead>
            <TableHead>15 Jul</TableHead>
            <TableHead>14 Jul</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {['Haemoglobin', 'Platelets', 'White cells', 'Neutrophils', 'Lymphocytes', 'MCV', 'MCH'].map((name, index) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{128 + index}</TableCell>
              <TableCell>{126 + index}</TableCell>
              <TableCell>{127 + index}</TableCell>
              <TableCell>{125 + index}</TableCell>
              <TableCell>120–160</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  ),
};

export const FadeEdges: Story = {
  render: () => (
    <ScrollArea aria-label="Faded release history" className={storyStyles.verticalFrame} fadeEdges role="region">
      <ReleaseList />
    </ScrollArea>
  ),
};

export const ScrollbarGutter: Story = {
  render: () => (
    <ScrollArea aria-label="Release history with scrollbar gutter" className={storyStyles.gutterFrame} role="region" scrollbarGutter>
      <ReleaseList />
    </ScrollArea>
  ),
};

export const ExplicitScrollBar: Story = {
  render: () => (
    <ScrollArea aria-label="Explicit horizontal scrollbar" className={storyStyles.horizontalFrame} role="region">
      <div className={storyStyles.horizontalContent}>
        {resultItems.map(([name, metaText]) => (
          <article className={storyStyles.resultCard} key={name}>
            <p className={storyStyles.resultName}>{name}</p>
            <p className={storyStyles.resultMeta}>{metaText}</p>
          </article>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <ScrollArea aria-label="Mobile result history" className={storyStyles.mobileFrame} fadeEdges role="region" scrollbarGutter>
      <ReleaseList />
    </ScrollArea>
  ),
};
