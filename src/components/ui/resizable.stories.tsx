import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';
import type { ResizableLayout } from './resizable';
import storyStyles from './resizable.stories.module.css';

function PanelContent({ children, muted = false, title }: { children: string; muted?: boolean; title: string }) {
  return (
    <section className={`${storyStyles.panelContent} ${muted ? storyStyles.panelContentMuted : ''}`}>
      <h3 className={storyStyles.panelTitle}>{title}</h3>
      <p className={storyStyles.panelText}>{children}</p>
    </section>
  );
}

const meta = {
  title: 'Design System/Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'A fresh Storybook, export, source, and usage search found only DataGrid column resizing and no canonical split-panel layout primitive. DataGrid owns table-column sizing; Resizable owns user-adjustable adjacent regions.',
        exclusions: [
          {
            reuiExamples: 'c-resizable-5 through c-resizable-9 animated handle treatments',
            reason:
              'Multiple expanding and spring handles are decorative variants of the same separator contract and introduce louder chrome without a distinct Kura task.',
            replacement:
              'One optional tokenized pill indicator with restrained hover, focus, and active feedback.',
          },
          {
            reuiFeature: 'Automatic localStorage persistence',
            reason:
              'Storage ownership, keys, privacy scope, and reset behavior belong to the consuming workspace.',
            replacement:
              'Use stable panel ids with the upstream defaultLayout/onLayoutChanged contract or its useDefaultLayout hook in the owning feature.',
          },
          {
            reuiFeature: 'Mobile sidebar collapse composition',
            reason:
              'A generic primitive cannot decide which clinical context may disappear or become an overlay.',
            replacement:
              'Feature-owned responsive composition; the mobile primitive story demonstrates a deliberate vertical reflow.',
          },
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-resizable-1 through c-resizable-10',
        sourceUrl: 'https://reui.io/components/resizable',
        behaviorDependency: 'react-resizable-panels',
      },
      binding: {
        colors: 'kura-semantic',
        spacing: 'kura',
        radius: 'consumer-owned',
        elevation: 'kura-focus-only',
        icons: 'none',
        density: 'consumer-owned-panel-content',
        responsive: 'feature-owned-orientation-and-constraints',
        motion: 'kura-indicator-token-reduced-motion-safe',
      },
      useCase: {
        role: 'Kura users working across adjacent views in a sustained review workspace',
        primaryTask: 'Allocate more space to the region needed for the current decision without leaving context.',
        dataModel: 'Direct Panel and Handle children with stable ids and optional size constraints.',
        safety:
          'The primitive never decides which clinical content may collapse; consuming features own minimum sizes, persistence, mobile composition, and visible recovery controls.',
        outOfScope:
          'DataGrid column resizing, drag-and-drop ordering, overlay drawers, fixed page shells, and domain-specific collapse rules.',
      },
    },
    docs: {
      description: {
        component:
          'A Kura-owned split-panel primitive for user-adjustable adjacent regions. Panels and handles must be direct children of their group. Current numeric size props are pixels; use explicit percentage strings such as "35%" for proportional layouts.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className={storyStyles.frame}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel id="result-list" defaultSize="36%" minSize="24%">
          <PanelContent title="Result list" muted>
            Scan recent laboratory results and select one for detailed review.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize result list and result detail" showIndicator />
        <ResizablePanel id="result-detail" defaultSize="64%" minSize="40%">
          <PanelContent title="Result detail">
            Review the selected value, reference range, trend, and verification context.
          </PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByRole('separator', { name: /resize result list and result detail/i });

    await expect(handle).toHaveAttribute('aria-orientation', 'vertical');
    await expect(handle).toHaveAttribute('aria-valuenow');
    handle.focus();
    await expect(handle).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(handle).toHaveAttribute('aria-valuenow');
  },
};

export const Vertical: Story = {
  render: () => (
    <div className={`${storyStyles.frame} ${storyStyles.frameCompact}`}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel id="visit-context" defaultSize="38%" minSize="25%">
          <PanelContent title="Visit context" muted>
            Keep patient identity and current encounter context visible.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize visit context and working notes" />
        <ResizablePanel id="working-notes" defaultSize="62%" minSize="35%">
          <PanelContent title="Working notes">
            Continue the assessment while preserving the context above.
          </PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Nested: Story = {
  render: () => (
    <div className={`${storyStyles.frame} ${storyStyles.frameTall}`}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel id="queue" defaultSize="30%" minSize="22%">
          <PanelContent title="Review queue" muted>
            Prioritized results awaiting acknowledgement.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize review queue and result workspace" showIndicator />
        <ResizablePanel id="workspace" defaultSize="70%" minSize="45%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel id="summary" defaultSize="42%" minSize="28%">
              <PanelContent title="Result summary">
                Selected values, flags, and verification status.
              </PanelContent>
            </ResizablePanel>
            <ResizableHandle aria-label="Resize result summary and clinical notes" showIndicator />
            <ResizablePanel id="notes" defaultSize="58%" minSize="30%">
              <PanelContent title="Clinical notes" muted>
                Supporting interpretation and acknowledgement context.
              </PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const StateTracked: Story = {
  render: () => {
    const [layout, setLayout] = useState<ResizableLayout>({ evidence: 40, decision: 60 });

    return (
      <div className={storyStyles.stack}>
        <div className={`${storyStyles.frame} ${storyStyles.frameCompact}`}>
          <ResizablePanelGroup orientation="horizontal" onLayoutChange={setLayout}>
            <ResizablePanel id="evidence" defaultSize="40%" minSize="25%">
              <PanelContent title="Evidence">
                Supporting observations remain available beside the decision area.
              </PanelContent>
            </ResizablePanel>
            <ResizableHandle aria-label="Resize evidence and decision panels" showIndicator />
            <ResizablePanel id="decision" defaultSize="60%" minSize="35%">
              <PanelContent title="Decision" muted>
                The owning workspace can respond to layout changes without coupling state to the primitive.
              </PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <p className={storyStyles.statusText} aria-live="polite">
          Evidence {Math.round(layout.evidence ?? 40)}%; decision {Math.round(layout.decision ?? 60)}%.
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <div className={`${storyStyles.frame} ${storyStyles.disabledFrame}`}>
        <ResizablePanelGroup orientation="horizontal" disabled>
          <ResizablePanel id="locked-context" defaultSize="40%">
            <PanelContent title="Required context" muted>
              This region remains fixed while the guided review step is active.
            </PanelContent>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize required context and guided action" disabled showIndicator />
          <ResizablePanel id="guided-action" defaultSize="60%">
            <PanelContent title="Guided action">
              Complete the current review step before changing the workspace layout.
            </PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <p className={storyStyles.disabledReason}>
        Resizing is unavailable until the guided review step is complete.
      </p>
    </div>
  ),
};

export const MobileVertical: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <div className={storyStyles.frame}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel id="mobile-context" defaultSize="42%" minSize="30%">
          <PanelContent title="Patient context" muted>
            Nguyễn Thị Minh Anh · verified identity · today’s result review.
          </PanelContent>
        </ResizablePanel>
        <ResizableHandle aria-label="Resize patient context and result review" showIndicator />
        <ResizablePanel id="mobile-review" defaultSize="58%" minSize="35%">
          <PanelContent title="Result review">
            The mobile composition stacks regions so content remains readable without horizontal scrolling.
          </PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
