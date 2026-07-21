import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './index';

function Example({ current = 2, disabledPrevious = false }: { current?: number; disabledPrevious?: boolean }) {
  return <Pagination label="Patient search result pages"><PaginationContent><PaginationItem><PaginationPrevious aria-disabled={disabledPrevious ? 'true' : undefined} href="#previous" /></PaginationItem><PaginationItem><PaginationLink active={current === 1} href="#1">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink active={current === 2} href="#2">2</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationLink active={current === 12} href="#12">12</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#next" /></PaginationItem></PaginationContent></Pagination>;
}

const meta = {
  title: 'Design System/Components/Pagination',
  component: Pagination,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'Kura', registryItem: 'pagination', visualReference: 'Kura pagination', familySize: 8 },
      intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'DataGrid owns table-specific pagination, but no navigation-semantic standalone composition existed for search, directories, or non-tabular collections.' },
      binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura-control', icons: 'kura-canonical', responsive: 'direction labels collapse at 320px' },
      exclusions: [{ capability: 'Rows-per-page selector', replacement: 'DataGridPagination owns table page size; compose Select in the feature for non-tabular collections.' }],
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Example />, play: async ({ canvasElement }) => { const canvas = within(canvasElement); await expect(canvas.getByRole('link', { name: '2' })).toHaveAttribute('aria-current', 'page'); } };
export const FirstPage: Story = { render: () => <Example current={1} disabledPrevious /> };
export const LongCollection: Story = { render: () => <Example current={12} /> };
export const Mobile: Story = { render: () => <Example />, parameters: { viewport: { defaultViewport: 'kura320' } } };
