import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './index';

const meta = {
  title: 'Design System/Primitives/Table',
  component: Table,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      source: { vendor: 'Kura', registryItem: 'table', visualReference: 'Kura table' },
      intake: {
        decision: 'REUSE-AND-EXTEND',
        owner: 'src/components/ui',
        evidence:
          'The canonical semantic Kura table keeps operational-list behavior while adopting Kura header, row, border, and density finish.',
        exclusions: ['Dashboard cards, action menus, sorting, filtering, and selection models belong to composed tables or DataGrid.', 'Interactive rows keep a nested semantic action instead of turning tr into a button.'],
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura (tabular-nums on numeric columns)',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'none (border separation)',
        icons: 'none',
        motion: 'none',
        density: 'kura-root-attribute + per-table density prop',
        responsive: 'horizontal scroll inside the table container, never the page',
      },
    },
    docs: {
      description: {
        component:
          'Semantic table for dense operational lists. Wide rows scroll inside the container; numeric columns use tabular numerals; rows can be interactive with visible selection.',
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { code: 'FZ-48210', patient: 'Sokha Chan', tests: 3, due: '$24.00', status: 'In progress' },
  { code: 'KM-77031', patient: 'Lina Sroeun', tests: 1, due: '$8.50', status: 'Waiting' },
  { code: 'QT-90227', patient: 'Vibol Keo', tests: 5, due: '$61.00', status: 'Done' },
];

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead numeric>Tests</TableHead>
          <TableHead numeric>Due</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.code}>
            <TableCell>{row.code}</TableCell>
            <TableCell>{row.patient}</TableCell>
            <TableCell numeric>{row.tests}</TableCell>
            <TableCell numeric>{row.due}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'Done' ? 'success' : row.status === 'Waiting' ? 'neutral' : 'info'}>
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>3 bookings · Toul Kork Branch · today</TableCaption>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('table')).toBeVisible();
    await expect(canvas.getAllByRole('row')).toHaveLength(4);
  },
};

export const InteractiveRows: Story = {
  args: { children: null },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Patient</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell><Button onClick={() => undefined} size="compact" variant="link">Open FZ-48210</Button></TableCell>
          <TableCell>Sokha Chan</TableCell>
        </TableRow>
        <TableRow interactive selected>
          <TableCell><Button onClick={() => undefined} size="compact" variant="link">Open KM-77031</Button></TableCell>
          <TableCell>Lina Sroeun</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const action = within(canvasElement).getByRole('button', { name: 'Open FZ-48210' });
    await userEvent.tab();
    await expect(action).toHaveFocus();
  },
};

export const WithFooter: Story = {
  args: { children: null },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead numeric>Items</TableHead>
          <TableHead numeric>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow><TableCell>Laboratory tests</TableCell><TableCell numeric>3</TableCell><TableCell numeric>$24.00</TableCell></TableRow>
        <TableRow><TableCell>Collection fee</TableCell><TableCell numeric>1</TableCell><TableCell numeric>$4.00</TableCell></TableRow>
      </TableBody>
      <TableFooter>
        <TableRow><TableCell>Total due</TableCell><TableCell numeric>4</TableCell><TableCell numeric>$28.00</TableCell></TableRow>
      </TableFooter>
      <TableCaption>Booking FZ-48210 · patient-pay summary</TableCaption>
    </Table>
  ),
};

export const CompactDensity: Story = {
  args: { children: null },
  render: () => (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableHead>Analyte</TableHead>
          <TableHead numeric>Value</TableHead>
          <TableHead numeric>Ref range</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ['Creatinine', '3.86', '0.51–0.95'],
          ['BUN', '38', '6–20'],
          ['Potassium', '5.2', '3.5–5.1'],
        ].map(([name, value, range]) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell numeric>{value}</TableCell>
            <TableCell numeric>{range}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const MobileOverflow: Story = {
  args: { children: null },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          {['Sample', 'Tube', 'Tests', 'Volume', 'Container', 'Priority', 'Status'].map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>104481920733</TableCell>
          <TableCell>Lavender · EDTA</TableCell>
          <TableCell>CBC, HbA1c</TableCell>
          <TableCell numeric>4 mL</TableCell>
          <TableCell>4 mL K₂ EDTA</TableCell>
          <TableCell>
            <Badge variant="danger">STAT</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="neutral">Awaiting collection</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableCaption>Wide clinical rows scroll inside the table — the page never scrolls sideways.</TableCaption>
    </Table>
  ),
};
