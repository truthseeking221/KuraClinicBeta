import type { ComponentPropsWithoutRef } from 'react';

import styles from './table.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type TableProps = ComponentPropsWithoutRef<'table'> & {
  /** Compact rows for dense operational lists. */
  density?: 'default' | 'compact';
};

/**
 * Semantic data table for operational lists. Wraps in a scroll container so
 * wide clinical rows scroll inside the table, never the page.
 */
export function Table({ className, density = 'default', ...props }: TableProps) {
  return (
    <div className={styles.scroller} data-slot="table-scroller">
      <table
        {...props}
        className={joinClasses(styles.table, className)}
        data-density={density}
        data-slot="table"
      />
    </div>
  );
}

export type TableHeaderProps = ComponentPropsWithoutRef<'thead'>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead {...props} className={joinClasses(styles.header, className)} data-slot="table-header" />;
}

export type TableBodyProps = ComponentPropsWithoutRef<'tbody'>;

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody {...props} className={joinClasses(styles.body, className)} data-slot="table-body" />;
}

export type TableFooterProps = ComponentPropsWithoutRef<'tfoot'>;

export function TableFooter({ className, ...props }: TableFooterProps) {
  return <tfoot {...props} className={joinClasses(styles.footer, className)} data-slot="table-footer" />;
}

export type TableRowProps = ComponentPropsWithoutRef<'tr'> & {
  /** Row is clickable and shows hover/focus affordances. */
  interactive?: boolean;
  /** Row is the current selection/focus target. */
  selected?: boolean;
};

export function TableRow({ className, interactive = false, selected = false, ...props }: TableRowProps) {
  return (
    <tr
      {...props}
      className={joinClasses(styles.row, className)}
      data-interactive={interactive ? 'true' : undefined}
      data-selected={selected ? 'true' : undefined}
      data-slot="table-row"
    />
  );
}

export type TableHeadProps = ComponentPropsWithoutRef<'th'> & {
  /** Right-align numeric columns. */
  numeric?: boolean;
};

export function TableHead({ className, numeric = false, ...props }: TableHeadProps) {
  return (
    <th
      {...props}
      className={joinClasses(styles.head, numeric && styles.numeric, className)}
      data-slot="table-head"
      scope={props.scope ?? 'col'}
    />
  );
}

export type TableCellProps = ComponentPropsWithoutRef<'td'> & {
  numeric?: boolean;
};

export function TableCell({ className, numeric = false, ...props }: TableCellProps) {
  return (
    <td
      {...props}
      className={joinClasses(styles.cell, numeric && styles.numeric, className)}
      data-slot="table-cell"
    />
  );
}

export type TableCaptionProps = ComponentPropsWithoutRef<'caption'>;

export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption {...props} className={joinClasses(styles.caption, className)} data-slot="table-caption" />
  );
}
