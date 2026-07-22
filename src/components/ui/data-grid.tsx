'use client';

import {
  createContext,
  Fragment,
  useContext,
  useMemo,
} from 'react';
import type {
  Cell,
  Column,
  Row,
  RowData,
  Table as TanStackTable,
} from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  KeyboardEvent,
  ReactNode,
} from 'react';

import { useT } from '../foundations/i18n';
import { Button } from './button';
import { Checkbox } from './checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {
  ArrowDownIcon,
  ArrowSortIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ViewIcon,
} from './icons';
import { Select } from './select';
import styles from './data-grid.module.css';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerTitle?: string;
    headerClassName?: string;
    cellClassName?: string;
    numeric?: boolean;
    skeleton?: ReactNode;
    expandedContent?: (row: TData) => ReactNode;
  }
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type DataGridDensity = 'default' | 'compact' | 'comfortable';
export type DataGridBorders = 'rows' | 'cells' | 'none';
export type DataGridWidth = 'fixed' | 'auto';

export type DataGridLayout = {
  density?: DataGridDensity;
  borders?: DataGridBorders;
  striped?: boolean;
  stickyHeader?: boolean;
  width?: DataGridWidth;
  resizable?: boolean;
  rowsPinnable?: boolean;
};

export type DataGridProps<TData extends object> = {
  table: TanStackTable<TData>;
  recordCount: number;
  children: ReactNode;
  className?: string;
  layout?: DataGridLayout;
  isLoading?: boolean;
  loadingRows?: number;
  loadingMessage?: ReactNode;
  emptyState?: ReactNode;
  errorState?: ReactNode;
  onRowClick?: (row: TData) => void;
  getRowLabel?: (row: TData) => string;
};

type DataGridContextValue<TData extends object> = Omit<
  DataGridProps<TData>,
  'children' | 'className'
>;

const DataGridContext = createContext<DataGridContextValue<object> | null>(null);

export function useDataGrid<TData extends object>() {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error('useDataGrid must be used inside DataGrid.');
  }
  return context as unknown as DataGridContextValue<TData>;
}

/**
 * Stateful table composition for sortable, filterable, selectable, expandable,
 * paginated, and large operational datasets. The owning workflow supplies the
 * TanStack table state and all domain actions.
 */
export function DataGrid<TData extends object>({
  children,
  className,
  emptyState,
  errorState,
  getRowLabel,
  isLoading = false,
  layout,
  loadingMessage,
  loadingRows = 5,
  onRowClick,
  recordCount,
  table,
}: DataGridProps<TData>) {
  const t = useT();
  const resolvedEmptyState = emptyState ?? t('No records match the current view.');
  const resolvedLoadingMessage = loadingMessage ?? t('Loading records');
  const resolvedLayout = useMemo<DataGridLayout>(
    () => ({
      borders: 'rows',
      density: 'default',
      resizable: false,
      rowsPinnable: false,
      stickyHeader: false,
      striped: false,
      width: 'fixed',
      ...layout,
    }),
    [layout],
  );

  const value = useMemo(
    () => ({
      emptyState: resolvedEmptyState,
      errorState,
      getRowLabel,
      isLoading,
      layout: resolvedLayout,
      loadingMessage: resolvedLoadingMessage,
      loadingRows,
      onRowClick,
      recordCount,
      table,
    }),
    [
      errorState,
      getRowLabel,
      isLoading,
      loadingRows,
      onRowClick,
      recordCount,
      resolvedEmptyState,
      resolvedLayout,
      resolvedLoadingMessage,
      table,
    ],
  );

  return (
    <DataGridContext.Provider value={value as unknown as DataGridContextValue<object>}>
      <div
        data-slot="data-grid"
        data-borders={resolvedLayout.borders}
        data-density={resolvedLayout.density}
        data-striped={resolvedLayout.striped ? 'true' : undefined}
        className={joinClasses(styles.root, className)}
      >
        {children}
      </div>
    </DataGridContext.Provider>
  );
}

export type DataGridToolbarProps = ComponentPropsWithoutRef<'div'>;

export function DataGridToolbar({ className, ...props }: DataGridToolbarProps) {
  return (
    <div
      data-slot="data-grid-toolbar"
      className={joinClasses(styles.toolbar, className)}
      {...props}
    />
  );
}

function getPinnedColumnStyles<TData>(column: Column<TData>): CSSProperties {
  const pinned = column.getIsPinned();
  if (!pinned) {
    return { width: column.getSize() };
  }

  return {
    insetInlineStart: pinned === 'left' ? column.getStart('left') : undefined,
    insetInlineEnd: pinned === 'right' ? column.getAfter('right') : undefined,
    position: 'sticky',
    width: column.getSize(),
    zIndex: 2,
  };
}

function getRowSections<TData>(
  table: TanStackTable<TData>,
  rowsPinnable: boolean,
) {
  if (!rowsPinnable) {
    return [{ rows: table.getRowModel().rows, position: 'center' as const }];
  }

  return [
    { rows: table.getTopRows(), position: 'top' as const },
    { rows: table.getCenterRows(), position: 'center' as const },
    { rows: table.getBottomRows(), position: 'bottom' as const },
  ];
}

function activateRow<TData>(
  event: KeyboardEvent<HTMLTableRowElement>,
  row: Row<TData>,
  onRowClick?: (value: TData) => void,
) {
  if (!onRowClick || (event.key !== 'Enter' && event.key !== ' ')) return;
  event.preventDefault();
  onRowClick(row.original);
}

function DataGridBodyCell<TData>({
  cell,
}: {
  cell: Cell<TData, unknown>;
}) {
  const meta = cell.column.columnDef.meta;
  return (
    <td
      data-slot="data-grid-cell"
      data-numeric={meta?.numeric ? 'true' : undefined}
      data-pinned={cell.column.getIsPinned() || undefined}
      className={joinClasses(styles.cell, meta?.cellClassName)}
      style={getPinnedColumnStyles(cell.column)}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}

export type DataGridScrollHeight = 'sm' | 'md' | 'lg';
export type DataGridTableProps = Omit<ComponentPropsWithoutRef<'table'>, 'children'> & {
  scrollHeight?: DataGridScrollHeight;
};

export function DataGridTable<TData extends object>({
  'aria-label': ariaLabel,
  className,
  scrollHeight,
  ...props
}: DataGridTableProps) {
  const t = useT();
  const resolvedAriaLabel = ariaLabel ?? t('Data grid');
  const {
    emptyState,
    errorState,
    getRowLabel,
    isLoading,
    layout,
    loadingMessage,
    loadingRows,
    onRowClick,
    table,
  } = useDataGrid<TData>();
  const visibleColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);
  const rowSections = getRowSections(table, Boolean(layout?.rowsPinnable));
  const hasRows = rowSections.some((section) => section.rows.length > 0);
  // Aggregates only make sense over real rows — never over skeleton, error, or empty states.
  const hasFooter =
    hasRows &&
    !isLoading &&
    !errorState &&
    table
      .getFooterGroups()
      .some((group) => group.headers.some((header) => header.column.columnDef.footer));

  return (
    <div
      data-slot="data-grid-scroller"
      data-scroll-height={scrollHeight}
      className={styles.scroller}
      tabIndex={0}
      aria-label={`${resolvedAriaLabel} ${t('scroll area')}`}
    >
      <table
        {...props}
        aria-label={resolvedAriaLabel}
        aria-busy={isLoading || undefined}
        data-slot="data-grid-table"
        data-sticky-header={layout?.stickyHeader ? 'true' : undefined}
        data-width={layout?.width}
        className={joinClasses(styles.table, className)}
        style={{
          minWidth: layout?.width === 'fixed' ? table.getTotalSize() : undefined,
        }}
      >
        <thead className={styles.header} data-slot="data-grid-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={styles.headerRow} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;
                return (
                  <th
                    className={joinClasses(styles.head, meta?.headerClassName)}
                    colSpan={header.colSpan}
                    data-numeric={meta?.numeric ? 'true' : undefined}
                    data-pinned={header.column.getIsPinned() || undefined}
                    key={header.id}
                    scope="col"
                    style={getPinnedColumnStyles(header.column)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {layout?.resizable && header.column.getCanResize() ? (
                      <button
                        type="button"
                        aria-label={`${t('Resize')} ${getDataGridColumnLabel(header.column)} ${t('column')}`}
                        className={styles.resizeHandle}
                        data-resizing={header.column.getIsResizing() ? 'true' : undefined}
                        onDoubleClick={() => header.column.resetSize()}
                        onKeyDown={(event) => {
                          if (event.key === 'ArrowLeft') {
                            event.preventDefault();
                            table.setColumnSizing((current) => ({
                              ...current,
                              [header.column.id]: Math.max(header.column.getSize() - 16, 48),
                            }));
                          } else if (event.key === 'ArrowRight') {
                            event.preventDefault();
                            table.setColumnSizing((current) => ({
                              ...current,
                              [header.column.id]: header.column.getSize() + 16,
                            }));
                          }
                        }}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className={styles.body} data-slot="data-grid-body">
          {errorState ? (
            <tr>
              <td className={styles.stateCell} colSpan={visibleColumnCount}>
                {errorState}
              </td>
            </tr>
          ) : isLoading ? (
            Array.from({ length: loadingRows ?? 5 }, (_, rowIndex) => (
              <tr aria-hidden="true" className={styles.skeletonRow} key={rowIndex}>
                {table.getVisibleLeafColumns().map((column) => (
                  <td
                    className={styles.cell}
                    data-numeric={column.columnDef.meta?.numeric ? 'true' : undefined}
                    key={column.id}
                    style={{ width: column.getSize() }}
                  >
                    {column.columnDef.meta?.skeleton ?? <span className={styles.skeleton} />}
                  </td>
                ))}
              </tr>
            ))
          ) : hasRows ? (
            rowSections.map((section) => (
              <Fragment key={section.position}>
                {section.rows.map((row) => (
                  <Fragment key={row.id}>
                    <tr
                      aria-label={getRowLabel?.(row.original)}
                      className={styles.row}
                      data-interactive={onRowClick ? 'true' : undefined}
                      data-pinned-row={section.position}
                      data-selected={row.getIsSelected() ? 'true' : undefined}
                      tabIndex={onRowClick ? 0 : undefined}
                      onClick={() => onRowClick?.(row.original)}
                      onKeyDown={(event) => activateRow(event, row, onRowClick)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <DataGridBodyCell cell={cell} key={cell.id} />
                      ))}
                    </tr>
                    {row.getIsExpanded() ? (
                      <tr className={styles.expandedRow}>
                        <td className={styles.expandedCell} colSpan={visibleColumnCount}>
                          {row
                            .getVisibleCells()
                            .map((cell) => cell.column.columnDef.meta?.expandedContent)
                            .find(Boolean)?.(row.original)}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </Fragment>
            ))
          ) : (
            <tr>
              <td className={styles.stateCell} colSpan={visibleColumnCount}>
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
        {hasFooter ? (
          <tfoot className={styles.footer} data-slot="data-grid-footer">
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <td
                    className={styles.footerCell}
                    data-numeric={header.column.columnDef.meta?.numeric ? 'true' : undefined}
                    data-pinned={header.column.getIsPinned() || undefined}
                    key={header.id}
                    style={getPinnedColumnStyles(header.column)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        ) : null}
      </table>
      {isLoading ? <span className={styles.srOnly}>{loadingMessage}</span> : null}
    </div>
  );
}

export function getDataGridColumnLabel<TData, TValue>(
  column: Column<TData, TValue>,
) {
  const meta = column.columnDef.meta;
  if (typeof meta?.headerTitle === 'string') return meta.headerTitle;
  if (typeof column.columnDef.header === 'string') return column.columnDef.header;
  return column.id;
}

export type DataGridColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title?: ReactNode;
};

export function DataGridColumnHeader<TData, TValue>({
  column,
  title,
}: DataGridColumnHeaderProps<TData, TValue>) {
  const t = useT();
  const label = title ?? getDataGridColumnLabel(column);
  if (!column.getCanSort()) {
    return <span className={styles.columnTitle}>{label}</span>;
  }

  const sorted = column.getIsSorted();
  return (
    <button
      type="button"
      className={styles.sortButton}
      aria-label={`${getDataGridColumnLabel(column)}: ${
        sorted === 'asc'
          ? t('sorted ascending')
          : sorted === 'desc'
            ? t('sorted descending')
            : t('not sorted')
      }`}
      onClick={column.getToggleSortingHandler()}
    >
      <span>{label}</span>
      {sorted === 'asc' ? (
        <ArrowUpIcon aria-hidden="true" />
      ) : sorted === 'desc' ? (
        <ArrowDownIcon aria-hidden="true" />
      ) : (
        <ArrowSortIcon aria-hidden="true" />
      )}
    </button>
  );
}

export type DataGridPaginationProps = {
  pageSizes?: readonly number[];
  rowsPerPageLabel?: string;
  previousPageLabel?: string;
  nextPageLabel?: string;
  className?: string;
};

export function DataGridPagination<TData extends object>({
  className,
  nextPageLabel,
  pageSizes = [10, 25, 50, 100],
  previousPageLabel,
  rowsPerPageLabel,
}: DataGridPaginationProps) {
  const t = useT();
  const resolvedNextPageLabel = nextPageLabel ?? t('Go to next page');
  const resolvedPreviousPageLabel = previousPageLabel ?? t('Go to previous page');
  const resolvedRowsPerPageLabel = rowsPerPageLabel ?? t('Rows per page');
  const { recordCount, table } = useDataGrid<TData>();
  const { pageIndex, pageSize } = table.getState().pagination;
  const from = recordCount === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, recordCount);

  return (
    <div
      data-slot="data-grid-pagination"
      className={joinClasses(styles.pagination, className)}
    >
      <label className={styles.pageSize}>
        <span>{resolvedRowsPerPageLabel}</span>
        <Select
          aria-label={resolvedRowsPerPageLabel}
          options={pageSizes.map((size) => ({ label: String(size), value: String(size) }))}
          value={String(pageSize)}
          onChange={(event) => table.setPageSize(Number(event.currentTarget.value))}
        />
      </label>
      <div className={styles.pageNavigation}>
        <span aria-live="polite" className={styles.pageInfo}>
          {from}–{to} {t('of')} {recordCount}
        </span>
        <div className={styles.pageButtons}>
          <Button
            aria-label={resolvedPreviousPageLabel}
            disabled={!table.getCanPreviousPage()}
            size="icon-sm"
            variant="ghost"
            onClick={() => table.previousPage()}
          >
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
          <Button
            aria-label={resolvedNextPageLabel}
            disabled={!table.getCanNextPage()}
            size="icon-sm"
            variant="ghost"
            onClick={() => table.nextPage()}
          >
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export type DataGridColumnVisibilityProps = {
  label?: string;
};

export function DataGridColumnVisibility<TData extends object>({
  label,
}: DataGridColumnVisibilityProps) {
  const t = useT();
  const resolvedLabel = label ?? t('Columns');
  const { table } = useDataGrid<TData>();
  const columns = table.getAllLeafColumns().filter((column) => column.getCanHide());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button leadingIcon={<ViewIcon aria-hidden="true" />} variant="outline" disclosure>
          {resolvedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('Visible columns')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            checked={column.getIsVisible()}
            key={column.id}
            onCheckedChange={(checked) => column.toggleVisibility(Boolean(checked))}
          >
            {getDataGridColumnLabel(column)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type DataGridSelectAllProps<TData extends object> = {
  table: TanStackTable<TData>;
  label?: string;
};

export function DataGridSelectAll<TData extends object>({
  label,
  table,
}: DataGridSelectAllProps<TData>) {
  const t = useT();

  return (
    <Checkbox
      aria-label={label ?? t('Select all visible rows')}
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected()}
      onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
    />
  );
}

export type DataGridSelectRowProps<TData extends object> = {
  row: Row<TData>;
  label: string;
};

export function DataGridSelectRow<TData extends object>({
  label,
  row,
}: DataGridSelectRowProps<TData>) {
  return (
    <Checkbox
      aria-label={label}
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onCheckedChange={(checked) => row.toggleSelected(checked)}
    />
  );
}

export type DataGridLoadMoreProps = {
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  allRowsLoaded?: boolean;
  allRowsLoadedMessage?: ReactNode;
  onLoadMore?: () => void;
};

export function DataGridLoadMore({
  allRowsLoaded = false,
  allRowsLoadedMessage,
  children,
  disabled = false,
  loading = false,
  onLoadMore,
}: DataGridLoadMoreProps) {
  const t = useT();

  return (
    <div className={styles.loadMore} data-slot="data-grid-load-more">
      {allRowsLoaded ? (
        <span className={styles.loadMoreStatus}>
          {allRowsLoadedMessage ?? t('All records loaded.')}
        </span>
      ) : (
        <Button
          disabled={disabled}
          loading={loading}
          variant="outline"
          onClick={onLoadMore}
        >
          {children ?? t('Load more records')}
        </Button>
      )}
    </div>
  );
}
