import { useMemo, useState } from 'react';
import type { ColumnDef, PaginationState, RowSelectionState, SortingState } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from '../shared';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  DataGrid,
  DataGridColumnHeader,
  DataGridColumnVisibility,
  DataGridLoadMore,
  DataGridPagination,
  DataGridSelectAll,
  DataGridSelectRow,
  DataGridTable,
  DataGridToolbar,
  Input,
} from './index';
import {
  AlertIcon,
  ChevronDownIcon,
  DatabaseIcon,
  RefreshIcon,
} from './icons';
import type { DataGridLayout } from './data-grid';

type Booking = {
  id: string;
  code: string;
  patient: string;
  tests: number;
  due: number;
  status: 'Waiting' | 'In progress' | 'Done' | 'Needs review';
  branch: string;
  updatedAt: string;
};

const bookings: Booking[] = [
  { id: '1', code: 'FZ-48210', patient: 'Sokha Chan', tests: 3, due: 24, status: 'In progress', branch: 'Toul Kork', updatedAt: '08:42' },
  { id: '2', code: 'KM-77031', patient: 'Lina Sroeun', tests: 1, due: 8.5, status: 'Waiting', branch: 'BKK1', updatedAt: '08:47' },
  { id: '3', code: 'QT-90227', patient: 'Vibol Keo', tests: 5, due: 61, status: 'Done', branch: 'Toul Kork', updatedAt: '08:51' },
  { id: '4', code: 'BD-11034', patient: 'Chanthou Meas', tests: 2, due: 19.75, status: 'Needs review', branch: 'Sen Sok', updatedAt: '09:02' },
  { id: '5', code: 'RP-34811', patient: 'Dara Lim', tests: 4, due: 42, status: 'In progress', branch: 'BKK1', updatedAt: '09:15' },
  { id: '6', code: 'NS-77452', patient: 'Sreyneang Touch', tests: 2, due: 16.5, status: 'Waiting', branch: 'Toul Kork', updatedAt: '09:19' },
  { id: '7', code: 'VX-65220', patient: 'Rathana Nou', tests: 6, due: 72, status: 'Done', branch: 'Sen Sok', updatedAt: '09:26' },
  { id: '8', code: 'KL-44129', patient: 'Bopha Kong', tests: 1, due: 11, status: 'Waiting', branch: 'BKK1', updatedAt: '09:33' },
  { id: '9', code: 'CU-83017', patient: 'Sophea Heng', tests: 3, due: 28.5, status: 'Needs review', branch: 'Toul Kork', updatedAt: '09:41' },
  { id: '10', code: 'LA-22308', patient: 'Pisey Chhim', tests: 2, due: 18, status: 'In progress', branch: 'Sen Sok', updatedAt: '09:50' },
  { id: '11', code: 'TW-11908', patient: 'Sothea Vann', tests: 4, due: 38.25, status: 'Done', branch: 'BKK1', updatedAt: '10:02' },
  { id: '12', code: 'MF-55291', patient: 'Kanika Ros', tests: 2, due: 17, status: 'Waiting', branch: 'Toul Kork', updatedAt: '10:07' },
];

const statusVariant = {
  Waiting: 'neutral',
  'In progress': 'info',
  Done: 'success',
  'Needs review': 'warning',
} as const;

type BookingsGridProps = {
  data?: Booking[];
  layout?: DataGridLayout;
  selectable?: boolean;
  expandable?: boolean;
  showToolbar?: boolean;
  showPagination?: boolean;
  loading?: boolean;
  error?: boolean;
  pinnedColumns?: boolean;
  pinnedRows?: boolean;
  scrollHeight?: 'sm' | 'md' | 'lg';
};

function BookingsGrid({
  data = bookings,
  error = false,
  expandable = false,
  layout,
  loading = false,
  pinnedColumns = false,
  pinnedRows = false,
  scrollHeight,
  selectable = false,
  showPagination = true,
  showToolbar = false,
}: BookingsGridProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });

  const columns = useMemo<ColumnDef<Booking>[]>(() => {
    const value: ColumnDef<Booking>[] = [];

    if (selectable) {
      value.push({
        id: 'select',
        size: 56,
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => <DataGridSelectAll table={table} />,
        cell: ({ row }) => <DataGridSelectRow label={`Select booking ${row.original.code}`} row={row} />,
      });
    }

    if (expandable) {
      value.push({
        id: 'expand',
        size: 56,
        enableHiding: false,
        enableSorting: false,
        header: 'Details',
        cell: ({ row }) => (
          <Button
            aria-label={`${row.getIsExpanded() ? 'Hide' : 'Show'} details for ${row.original.code}`}
            size="icon-sm"
            variant="ghost"
            onClick={() => row.toggleExpanded()}
          >
            <ChevronDownIcon
              aria-hidden="true"
              className={row.getIsExpanded() ? 'rotate-180' : undefined}
            />
          </Button>
        ),
      });
    }

    value.push(
      {
        accessorKey: 'code',
        size: 128,
        header: ({ column }) => <DataGridColumnHeader column={column} title="Booking" />,
        meta: { headerTitle: 'Booking' },
      },
      {
        accessorKey: 'patient',
        size: 220,
        header: ({ column }) => <DataGridColumnHeader column={column} title="Patient" />,
        meta: {
          headerTitle: 'Patient',
          expandedContent: (row) => (
            <div className="grid gap-2 sm:grid-cols-3">
              <span><strong>Branch:</strong> {row.branch}</span>
              <span><strong>Last update:</strong> {row.updatedAt}</span>
              <span><strong>Record ID:</strong> {row.id}</span>
            </div>
          ),
        },
      },
      {
        accessorKey: 'tests',
        size: 88,
        header: ({ column }) => <DataGridColumnHeader column={column} title="Tests" />,
        footer: ({ table }) => `${table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.tests, 0)} tests`,
        meta: { headerTitle: 'Tests', numeric: true },
      },
      {
        accessorKey: 'due',
        size: 112,
        header: ({ column }) => <DataGridColumnHeader column={column} title="Due" />,
        cell: ({ getValue }) => `$${(getValue<number>()).toFixed(2)}`,
        footer: ({ table }) =>
          `$${table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.due, 0).toFixed(2)}`,
        meta: { headerTitle: 'Due', numeric: true },
      },
      {
        accessorKey: 'branch',
        size: 140,
        header: ({ column }) => <DataGridColumnHeader column={column} title="Branch" />,
        meta: { headerTitle: 'Branch' },
      },
      {
        accessorKey: 'updatedAt',
        size: 104,
        header: ({ column }) => <DataGridColumnHeader column={column} title="Updated" />,
        meta: { headerTitle: 'Updated', numeric: true },
      },
      {
        accessorKey: 'status',
        size: 144,
        header: ({ column }) => <DataGridColumnHeader column={column} title="Status" />,
        cell: ({ getValue }) => {
          const status = getValue<Booking['status']>();
          return <Badge variant={statusVariant[status]}>{status}</Badge>;
        },
        meta: { headerTitle: 'Status' },
      },
    );

    return value;
  }, [expandable, selectable]);

  const table = useReactTable({
    columns,
    data,
    enableColumnResizing: Boolean(layout?.resizable),
    enableRowSelection: selectable,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowCanExpand: () => expandable,
    getRowId: (row) => row.id,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      ...(pinnedColumns
        ? {
            columnPinning: {
              left: selectable ? ['select', 'code'] : ['code'],
              right: ['status'],
            },
          }
        : {}),
      ...(pinnedRows ? { rowPinning: { top: ['4'], bottom: ['3'] } } : {}),
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: { globalFilter, pagination, rowSelection, sorting },
  });

  return (
    <DataGrid
      table={table}
      recordCount={data.length}
      isLoading={loading}
      layout={{ ...layout, rowsPinnable: pinnedRows }}
      errorState={
        error ? (
          <Alert
            icon={<AlertIcon aria-hidden="true" />}
            role="alert"
            tone="danger"
          >
            <AlertTitle>Bookings could not be loaded</AlertTitle>
            <AlertDescription>
              Check the connection and retry. The current filters have been preserved.
            </AlertDescription>
            <AlertAction>
              <Button leadingIcon={<RefreshIcon aria-hidden="true" />} variant="outline">
                Retry loading bookings
              </Button>
            </AlertAction>
          </Alert>
        ) : undefined
      }
      emptyState={
        <EmptyState>
          <EmptyStateHeader>
            <EmptyStateMedia variant="icon"><DatabaseIcon aria-hidden="true" /></EmptyStateMedia>
            <EmptyStateTitle>No bookings match this view</EmptyStateTitle>
            <EmptyStateDescription>
              Remove a filter or choose another date range. This is not a loading state.
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      }
    >
      {showToolbar ? (
        <DataGridToolbar>
          <Input
            className="w-full sm:max-w-sm"
            label="Search bookings"
            placeholder="Patient, booking, or branch"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.currentTarget.value)}
          />
          <DataGridColumnVisibility />
        </DataGridToolbar>
      ) : null}
      <DataGridTable aria-label="Front desk bookings" scrollHeight={scrollHeight} />
      {showPagination ? <DataGridPagination pageSizes={[5, 10, 25]} /> : null}
    </DataGrid>
  );
}

const meta = {
  title: 'Design System/Components/Data Grid',
  component: BookingsGrid,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Table remains the light semantic owner for static operational rows. Data Grid adds TanStack-managed sorting, filtering, pagination, selection, expansion, visibility, resizing, pinning, loading, aggregates, and incremental loading without duplicating Table.',
      },
      source: {
        vendor: 'ReUI',
        registryItem:
          'data-grid family, 10 composable source modules, and c-data-grid-1 through c-data-grid-29',
        sourceUrl: 'https://reui.io/components/data-grid',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura + tabular numeric columns',
        spacing: 'kura-density-aware',
        radius: 'kura-card-surface',
        elevation: 'none; focus and selection rings only',
        icons: 'kura-canonical',
        density: 'default-compact-comfortable',
        responsive: 'SCROLLING for relationship-preserving wide data; STACKING toolbar and pagination',
        motion: 'loading-only, reduced-motion-safe',
      },
      retainedFamily: [
        'pagination',
        'row/cell/no borders',
        'dense and comfortable layouts',
        'striped rows',
        'auto/fixed layout',
        'selection',
        'expansion and nested composition',
        'sortable columns',
        'column resizing',
        'sticky header',
        'column visibility',
        'loading skeleton',
        'footer totals and aggregates',
        'column and row pinning',
        'local or remote incremental loading through DataGridLoadMore',
      ],
      exclusions: [
        {
          reuiExamples: 'c-data-grid-12, 13, and 14 movable/draggable columns and rows',
          reason:
            'Drag order has domain consequences and needs an explicit keyboard reorder contract, persistence, permission, undo, and audit behavior. No current Kura owner proves that shared contract.',
          replacement:
            'Feature-owned reorder pattern composed with Data Grid after a stable order model is approved.',
        },
        {
          reuiExamples: 'c-data-grid-22 and 23 CRUD demos',
          reason:
            'CRUD validation, permissions, confirmation, optimistic updates, conflict recovery, and audit events belong to the owning feature.',
          replacement:
            'Compose Data Grid with Dialog, AlertDialog, DropdownMenu, and feature commands.',
        },
        {
          reuiExamples: 'c-data-grid-27 and 28 automatic infinite scroll',
          reason:
            'Automatic loading can move focus and obscure completion. Kura retains explicit incremental loading with announced status; the owning API controls cursor and retry behavior.',
          replacement: 'DataGridLoadMore',
        },
        {
          reuiExample: 'virtualized rendering',
          reason:
            'Virtualization changes screen-reader and dynamic-row-height behavior. It should be enabled only for a measured large-data consumer with a known row-height and accessibility contract.',
          replacement:
            'Current grid supports bounded scrolling and pagination; add a dedicated virtual owner when a real dataset proves the need.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'A TanStack-powered data grid for interactive operational datasets. Use Table for static semantic rows. Keep identifiers and clinically necessary columns visible; wide relationships scroll inside the grid instead of converting automatically to cards.',
      },
    },
  },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaginatedSortable: Story = {
  render: () => <BookingsGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bookingSort = canvas.getByRole('button', { name: /booking: not sorted/i });
    await userEvent.click(bookingSort);
    await expect(bookingSort).toHaveAccessibleName(/sorted ascending/i);
    await userEvent.click(canvas.getByRole('button', { name: /go to next page/i }));
    await expect(canvas.getByText(/6–10 of 12/i)).toBeVisible();
  },
};

export const SearchAndColumnVisibility: Story = {
  render: () => <BookingsGrid showToolbar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/search bookings/i), 'Sokha');
    await expect(canvas.getByText('Sokha Chan')).toBeVisible();
    await expect(canvas.queryByText('Lina Sroeun')).not.toBeInTheDocument();
  },
};

export const RowSelection: Story = {
  render: () => <BookingsGrid selectable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rowChoice = canvas.getByRole('checkbox', { name: /select booking fz-48210/i });
    await userEvent.click(rowChoice);
    await expect(rowChoice).toBeChecked();
  },
};

export const ExpandableRows: Story = {
  render: () => <BookingsGrid expandable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /show details for fz-48210/i }));
    await expect(canvas.getByText(/record id:/i)).toBeVisible();
  },
};

export const LayoutVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <BookingsGrid layout={{ density: 'compact', borders: 'cells' }} showPagination={false} />
      <BookingsGrid layout={{ striped: true, borders: 'none' }} showPagination={false} />
      <BookingsGrid layout={{ density: 'comfortable', width: 'auto' }} showPagination={false} />
    </div>
  ),
};

export const ResizableAndPinnedColumns: Story = {
  render: () => (
    <BookingsGrid
      pinnedColumns
      layout={{ resizable: true }}
      showToolbar
    />
  ),
};

export const StickyHeaderAndPinnedRows: Story = {
  render: () => (
    <BookingsGrid
      pinnedRows
      layout={{ stickyHeader: true, density: 'compact' }}
      scrollHeight="sm"
      showPagination={false}
    />
  ),
};

export const Loading: Story = {
  render: () => <BookingsGrid loading />,
};

export const Empty: Story = {
  render: () => <BookingsGrid data={[]} />,
};

export const ErrorRecovery: Story = {
  render: () => <BookingsGrid error />,
};

export const AggregateFooter: Story = {
  render: () => <BookingsGrid showPagination={false} />,
};

function IncrementalBookings() {
  const [count, setCount] = useState(5);
  const visible = bookings.slice(0, count);
  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      { accessorKey: 'code', header: 'Booking', meta: { headerTitle: 'Booking' } },
      { accessorKey: 'patient', header: 'Patient', meta: { headerTitle: 'Patient' } },
      { accessorKey: 'status', header: 'Status', meta: { headerTitle: 'Status' } },
    ],
    [],
  );
  const table = useReactTable({
    columns,
    data: visible,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataGrid table={table} recordCount={visible.length}>
      <DataGridTable aria-label="Incrementally loaded bookings" />
      <DataGridLoadMore
        allRowsLoaded={count >= bookings.length}
        onLoadMore={() => setCount((current) => Math.min(current + 5, bookings.length))}
      />
    </DataGrid>
  );
}

export const IncrementalLoading: Story = {
  render: () => <IncrementalBookings />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /load more records/i }));
    await expect(canvas.getByText('Pisey Chhim')).toBeVisible();
  },
};

export const LongContent: Story = {
  render: () => (
    <BookingsGrid
      data={[
        {
          ...bookings[0],
          patient:
            'Sokha Chan — verified name with additional transliteration and a long clinic-provided identifier',
          branch: 'Toul Kork Diagnostic and Preventive Care Centre — Main Collection Floor',
        },
      ]}
      layout={{ width: 'auto' }}
      showPagination={false}
    />
  ),
};

export const MobileOverflow: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: () => <BookingsGrid selectable showToolbar />,
};

export const Tablet: Story = {
  render: () => <BookingsGrid showToolbar />,
};

export const Desktop: Story = {
  render: () => <BookingsGrid pinnedColumns showToolbar />,
};
