import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  Badge,
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './index';

const meta = {
  title: 'Design System/Components/Sheet',
  component: Sheet,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      intake: {
        decision: 'EXTEND',
        owner: 'src/components/ui',
        evidence:
          'Kura already owned and used the native-dialog Sheet in AppShell and Results. ReUI c-sheet-1 through c-sheet-4 confirm the existing form, optional close, side, and scroll contracts; this intake adds the missing top posture and complete stories without replacing production behavior.',
        exclusions: [
          {
            reuiApi: 'Base UI render prop triggers and close buttons',
            reason: 'Kura already owns a stable native trigger and canonical icon close contract used in production.',
            replacement: 'Compose SheetTrigger with Kura styling and keep explicit SheetClose in the header.',
          },
        ],
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'c-sheet-1 through c-sheet-4',
        sourceUrl: 'https://reui.io/components/sheet',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-modal',
        icons: 'kura-canonical',
        motion: 'kura-slide-reduced-motion-safe',
        density: 'inherits-content',
        responsive: 'four edge postures; side panels clamp to viewport; bottom sheet for mobile transforms',
      },
    },
    docs: {
      description: {
        component:
          'Side panel on the native <dialog> element: focus trap, Escape, and backdrop dismissal for navigation, queues, and secondary work surfaces. Use AlertDialog for confirmations.',
      },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Sheet>
      <SheetTrigger>Open queue</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div>
            <SheetTitle>Waiting queue</SheetTitle>
            <SheetDescription>Longest wait first.</SheetDescription>
          </div>
          <SheetClose aria-label="Close queue" />
        </SheetHeader>
        <SheetBody>
          <p style={{ margin: 0, font: 'inherit' }}>Queue content renders here.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open queue' }));
    const dialog = await canvas.findByRole('dialog');
    await expect(dialog).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(dialog).not.toBeVisible());
    await expect(canvas.getByRole('button', { name: 'Open queue' })).toHaveFocus();
  },
};

export const LeftNavigation: Story = {
  args: { children: null },
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger>Open navigation</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetClose aria-label="Close menu" />
        </SheetHeader>
        <SheetBody>
          <nav aria-label="Primary">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--space-1)' }}>
              {['Arrivals', 'Queue', 'Patients', 'Bookings'].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </nav>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomMobile: Story = {
  args: { children: null },
  parameters: {
    viewport: { defaultViewport: 'kura320' },
  },
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger>Review order</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <div>
            <SheetTitle>Order cart</SheetTitle>
            <SheetDescription>3 tests · $24.00</SheetDescription>
          </div>
          <SheetClose aria-label="Close cart" />
        </SheetHeader>
        <SheetBody>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--space-2)' }}>
            <li>
              CBC <Badge variant="secondary">EDTA</Badge>
            </li>
            <li>
              HbA1c <Badge variant="secondary">EDTA</Badge>
            </li>
            <li>
              Lipid panel <Badge variant="secondary">SST</Badge>
            </li>
          </ul>
        </SheetBody>
        <SheetFooter>
          <Button variant="primary">Continue to payment</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const NoBackdropDismiss: Story = {
  args: { children: null },
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger>Open draw worksheet</SheetTrigger>
      <SheetContent side="right" closeOnBackdrop={false}>
        <SheetHeader>
          <div>
            <SheetTitle>Draw in progress</SheetTitle>
            <SheetDescription>Finish or defer before leaving this worksheet.</SheetDescription>
          </div>
        </SheetHeader>
        <SheetBody>
          <p style={{ margin: 0 }}>Backdrop clicks are ignored while a draw is active.</p>
        </SheetBody>
        <SheetFooter>
          <Button variant="outline">Defer draw</Button>
          <Button variant="primary">Complete draw</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const TopContext: Story = {
  args: { children: null },
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger>Open visit context</SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <div>
            <SheetTitle>Visit context</SheetTitle>
            <SheetDescription>Keep the verified encounter visible before continuing.</SheetDescription>
          </div>
          <SheetClose aria-label="Close visit context" />
        </SheetHeader>
        <SheetBody>
          <p style={{ margin: 0 }}>Nguyễn Thị Minh Anh · verified identity · today’s consultation.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
};

export const FormContent: Story = {
  args: { children: null },
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger>Edit contact details</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div>
            <SheetTitle>Edit contact details</SheetTitle>
            <SheetDescription>Update operational contact information for this patient record.</SheetDescription>
          </div>
          <SheetClose aria-label="Close contact details" />
        </SheetHeader>
        <SheetBody>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="sheet-preferred-name">Preferred name</FieldLabel>
              <Input id="sheet-preferred-name" defaultValue="Minh Anh" />
            </Field>
            <Field>
              <FieldLabel htmlFor="sheet-contact-phone">Contact phone</FieldLabel>
              <Input id="sheet-contact-phone" defaultValue="012 345 678" inputMode="tel" />
            </Field>
          </FieldGroup>
        </SheetBody>
        <SheetFooter>
          <Button variant="primary">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const ScrollableContent: Story = {
  args: { children: null },
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger>Open result history</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <div>
            <SheetTitle>Result history</SheetTitle>
            <SheetDescription>Verified and amended values, newest first.</SheetDescription>
          </div>
          <SheetClose aria-label="Close result history" />
        </SheetHeader>
        <SheetBody>
          <ol style={{ display: 'grid', gap: 'var(--space-4)', margin: 0, paddingInlineStart: 'var(--space-5)' }}>
            {Array.from({ length: 24 }, (_, index) => (
              <li key={index}>Result review {24 - index} · verified</li>
            ))}
          </ol>
        </SheetBody>
        <SheetFooter>
          <Button variant="outline">Export history</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
