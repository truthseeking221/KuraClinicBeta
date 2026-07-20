import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Kbd,
} from './index';
import styles from './dialog.stories.module.css';

const meta = {
  title: 'Design System/Components/Dialog',
  component: Dialog,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'REUSE-and-EXTEND',
        owner: 'src/components/ui',
        evidence:
          'The canonical Radix-backed Kura owner already matches the complete ReUI dialog family: focus containment, Escape dismissal, scrollable and sticky regions, optional/custom close actions, full-screen presentation, and responsive action stacking. The intake therefore extends stories and evidence instead of installing a duplicate registry owner.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'dialog and c-dialog-1 through c-dialog-10',
        sourceUrl: 'https://reui.io/components/dialog',
        mcpValidation: 'All ten c-dialog items verified free through ReUI MCP on 2026-07-17.',
        provenance:
          'c-dialog-1 e78e386e; 2 643305a0; 3 a26727a0; 4 445c9f61; 5 72ed97c0; 6 866225fb; 7 2a719a86; 8 8f6a01f6; 9 00e9d337; 10 074ce468',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-overlay',
        elevation: 'kura-modal',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'TRANSFORMING: full-screen task surface by default below 480px',
        motion: 'radix-state-with-reduced-motion-safe-static-layout',
      },
      exclusions: [
        {
          reuiExample: 'Destructive confirmation dialog',
          reason:
            'Consequential confirmation requires alertdialog semantics and explicit safe/cancel behavior.',
          replacement: 'AlertDialog',
        },
        {
          reuiExample: 'Cookie consent dialog',
          reason:
            'Consent categories, persistence, decline parity, and policy links are product-domain behavior.',
          replacement: 'Feature-owned consent composition using Dialog and canonical form controls.',
        },
        {
          reuiExample: 'Session expired full-width action',
          reason:
            'Authentication recovery and draft preservation are shell-owned workflow rules.',
          replacement: 'Feature-owned recovery state composed with Dialog.',
        },
      ],
      coverage: {
        retained:
          'c-dialog-1 basic; 2 scrollable; 3 sticky footer; 4 no corner close; 5 custom close action; 6 full-screen; 9 shortcuts; 10 full-width mobile action.',
        composedElsewhere:
          'c-dialog-7 uses AlertDialog for destructive confirmation. c-dialog-8 remains a feature-owned consent composition using Dialog, Switch, and policy behavior.',
      },
    },
    docs: {
      description: {
        component:
          'A modal work surface for short, reversible tasks. It traps and restores focus, closes with Escape, supports scrollable bodies and sticky action areas, and transforms to a full-screen task surface on mobile by default.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function EditContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit contact details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit contact details</DialogTitle>
          <DialogDescription>
            Update how the clinic contacts this patient. Saving does not change identity details.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className={styles.formStack}>
            <Input label="Mobile number" defaultValue="+855 12 345 678" />
            <Input label="Email" type="email" defaultValue="sokha.chan@example.com" />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save contact details</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const Default: Story = {
  render: () => <EditContactDialog />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const opener = canvas.getByRole('button', { name: /edit contact details/i });
    await userEvent.click(opener);

    const dialog = await within(document.body).findByRole('dialog', {
      name: /edit contact details/i,
    });
    await expect(within(dialog).getByLabelText(/mobile number/i)).toHaveFocus();
    await userEvent.click(within(dialog).getByRole('button', { name: /cancel/i }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    await expect(opener).toHaveFocus();
  },
};

export const OpenState: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit contact details</DialogTitle>
          <DialogDescription>
            Update how the clinic contacts this patient. Saving does not change identity details.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className={styles.formStack}>
            <Input label="Mobile number" defaultValue="+855 12 345 678" />
            <Input label="Email" type="email" defaultValue="sokha.chan@example.com" />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
          <DialogClose asChild><Button>Save contact details</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Review imported records</Button>
      </DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Review imported records</DialogTitle>
          <DialogDescription>
            Confirm the source and resolve missing identifiers before adding records.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className={styles.formStack}>
            {Array.from({ length: 12 }, (_, index) => (
              <Checkbox key={index} defaultChecked={index < 8}>
                Record {index + 1} · imported from Toul Kork Branch
              </Checkbox>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Cancel import</Button></DialogClose>
          <Button>Import selected records</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCornerClose: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open review</Button></DialogTrigger>
      <DialogContent showCloseButton={false} size="sm" mobilePresentation="dialog">
        <DialogHeader>
          <DialogTitle>Review complete</DialogTitle>
          <DialogDescription>No unresolved fields remain in this import.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button fullWidth>Return to records</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className={styles.controlled}>
        <Button variant="outline" onClick={() => setOpen(true)}>Open controlled dialog</Button>
        <span aria-live="polite" className={styles.status}>
          Dialog is {open ? 'open' : 'closed'}.
        </span>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="sm" mobilePresentation="dialog">
            <DialogHeader>
              <DialogTitle>Controlled review</DialogTitle>
              <DialogDescription>The owning workflow controls visibility.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild><Button>Finish review</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

export const FullScreen: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open full record review</Button></DialogTrigger>
      <DialogContent size="full">
        <DialogHeader>
          <DialogTitle>Review imported patient records</DialogTitle>
          <DialogDescription>
            Compare identifiers and contact details without losing the import context.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className={styles.supporting}>
            A full-screen dialog is reserved for a bounded task that still needs modal context.
            Long multi-step clinical work belongs on a page or flow.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">Return without changes</Button></DialogClose>
          <Button>Save reviewed records</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Review clinic guidance</Button></DialogTrigger>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Guidance for resolving a duplicate patient record with a long verified name</DialogTitle>
          <DialogDescription>
            Read the complete identity and audit guidance before deciding which record should remain active.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className={styles.supporting}>
            Compare verified identifiers, date of birth, contact history, consent, linked consultations,
            laboratory orders, prescriptions, and audit events. Do not merge records when identity evidence
            conflicts or when the current role lacks the required permission.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Close guidance</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <div className={styles.densityRow}>
      {(['compact', 'cozy', 'comfortable'] as const).map((density) => (
        <div data-density={density} key={density}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open {density}</Button>
            </DialogTrigger>
            <DialogContent size="sm" mobilePresentation="dialog">
              <DialogHeader>
                <DialogTitle>{density} dialog</DialogTitle>
                <DialogDescription>Density changes spacing, not semantics or legibility.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild><Button>Close</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  ),
};

export const MobileFullScreen: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => <EditContactDialog />,
};

export const MobileInset: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">View short notice</Button></DialogTrigger>
      <DialogContent size="sm" mobilePresentation="dialog">
        <DialogHeader>
          <DialogTitle>Draft preserved</DialogTitle>
          <DialogDescription>Your current changes remain available on this device.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button>Continue editing</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent size="sm" mobilePresentation="dialog">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Use these shortcuts while reviewing the current record.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <dl className={styles.shortcutList}>
            <div className={styles.shortcutRow}>
              <dt>Close this dialog</dt>
              <dd><Kbd>Esc</Kbd></dd>
            </div>
            <div className={styles.shortcutRow}>
              <dt>Move to the next field</dt>
              <dd><Kbd>Tab</Kbd></dd>
            </div>
          </dl>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild><Button fullWidth>Return to record</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const KeyboardDismissal: Story = {
  render: () => <EditContactDialog />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const opener = canvas.getByRole('button', { name: /edit contact details/i });
    await userEvent.click(opener);
    await within(document.body).findByRole('dialog', { name: /edit contact details/i });
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        within(document.body).queryByRole('dialog', { name: /edit contact details/i }),
      ).not.toBeInTheDocument(),
    );
    await expect(opener).toHaveFocus();
  },
};
