'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { createContext, forwardRef, useContext, useId, useRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from 'react';

import { useT } from '../foundations/i18n';
import { CheckIcon, ChevronDownIcon, XIcon } from './icons';
import styles from './combobox.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function mergeClassName<State>(
  baseClassName: string,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  if (typeof className === 'function') {
    return (state: State) => joinClasses(baseClassName, className(state));
  }

  return joinClasses(baseClassName, className);
}

/**
 * Base UI's Combobox.Label names the Trigger only; when Combobox.Input is the
 * form control the label must be wired to it explicitly. The root mints one
 * label id, ComboboxLabel claims it, and ComboboxInput consumes it.
 */
const ComboboxLabelContext = createContext<string | null>(null);

/**
 * A searchable controlled-selection primitive. Use Autocomplete for one
 * authoritative record; use Combobox when the workflow genuinely permits
 * multiple selections, grouped choices, or removable selected values.
 */
export function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxPrimitive.Root.Props<Value, Multiple>,
) {
  const labelId = useId();
  return (
    <ComboboxLabelContext.Provider value={labelId}>
      <ComboboxPrimitive.Root {...props} />
    </ComboboxLabelContext.Provider>
  );
}

export type ComboboxLabelProps = Omit<ComponentPropsWithoutRef<'div'>, 'id'>;

export const ComboboxLabel = forwardRef<HTMLDivElement, ComboboxLabelProps>(
  // Not the Base UI Label part: that names the Trigger only (and strips `id`).
  // Kura comboboxes use Input as the form control, so the label text renders
  // as a plain element carrying the shared id ComboboxInput references.
  function ComboboxLabel({ className, ...props }, ref) {
    const labelId = useContext(ComboboxLabelContext);
    return (
      <div
        ref={ref}
        data-slot="combobox-label"
        className={joinClasses(styles.label, className)}
        {...props}
        id={labelId ?? undefined}
      />
    );
  },
);

export type ComboboxValueProps = ComboboxPrimitive.Value.Props;

export function ComboboxValue(props: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

export type ComboboxTriggerProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger> & {
  /** An explicit accessible name is required when the trigger is icon-only. */
  'aria-label'?: string;
  children?: ReactNode;
};

export const ComboboxTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Trigger>,
  ComboboxTriggerProps
>(function ComboboxTrigger({ children, className, 'aria-label': ariaLabel, ...props }, ref) {
  const t = useT();

  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      aria-label={ariaLabel ?? t('Show options')}
      data-slot="combobox-trigger"
      className={mergeClassName(styles.trigger, className)}
      {...props}
    >
      {children ?? <ChevronDownIcon aria-hidden="true" />}
    </ComboboxPrimitive.Trigger>
  );
});

export type ComboboxClearProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Clear> & {
  /** An explicit accessible name is required because the control is icon-only. */
  'aria-label'?: string;
  children?: ReactNode;
};

export const ComboboxClear = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Clear>,
  ComboboxClearProps
>(function ComboboxClear({ children, className, 'aria-label': ariaLabel, ...props }, ref) {
  const t = useT();

  return (
    <ComboboxPrimitive.Clear
      ref={ref}
      aria-label={ariaLabel ?? t('Clear selection')}
      data-slot="combobox-clear"
      className={mergeClassName(styles.clear, className)}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ComboboxPrimitive.Clear>
  );
});

export type ComboboxInputProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input> & {
  /** Optional canonical icon that reinforces the input's purpose. */
  leadingIcon?: ReactNode;
  /** Shows a dedicated, keyboard-accessible disclosure button. */
  showTrigger?: boolean;
  /** Shows a control to remove the current selection and query. */
  showClear?: boolean;
  /** Accessible name for the disclosure control. */
  triggerLabel?: string;
  /** Accessible name for the clear control. */
  clearLabel?: string;
};

export const ComboboxInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComboboxInputProps
>(function ComboboxInput(
  {
    className,
    clearLabel,
    disabled = false,
    leadingIcon,
    showClear = false,
    showTrigger = true,
    triggerLabel,
    ...props
  },
  ref,
) {
  const labelId = useContext(ComboboxLabelContext);
  return (
    <ComboboxPrimitive.InputGroup className={styles.control} data-slot="combobox-input-control">
      {leadingIcon ? (
        <span aria-hidden="true" className={styles.leadingIcon}>
          {leadingIcon}
        </span>
      ) : null}
      <ComboboxPrimitive.Input
        ref={ref}
        aria-labelledby={labelId ?? undefined}
        disabled={disabled}
        data-slot="combobox-input"
        className={mergeClassName(styles.input, className)}
        {...props}
        autoComplete="off"
      />
      <div className={styles.controls}>
        {showClear ? <ComboboxClear aria-label={clearLabel} disabled={disabled} /> : null}
        {showTrigger ? <ComboboxTrigger aria-label={triggerLabel} disabled={disabled} /> : null}
      </div>
    </ComboboxPrimitive.InputGroup>
  );
});

export type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'anchor' | 'side' | 'sideOffset'
  >;

export function ComboboxContent({
  align = 'start',
  alignOffset,
  anchor,
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={styles.positioner}
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={mergeClassName(styles.content, className)}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export type ComboboxListProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.List>;

export const ComboboxList = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.List>,
  ComboboxListProps
>(function ComboboxList({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      data-slot="combobox-list"
      className={mergeClassName(styles.list, className)}
      {...props}
    />
  );
});

export type ComboboxGroupProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group>;

export const ComboboxGroup = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Group>,
  ComboboxGroupProps
>(function ComboboxGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Group
      ref={ref}
      data-slot="combobox-group"
      className={mergeClassName(styles.group, className)}
      {...props}
    />
  );
});

export type ComboboxGroupLabelProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.GroupLabel>;

export const ComboboxGroupLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.GroupLabel>,
  ComboboxGroupLabelProps
>(function ComboboxGroupLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.GroupLabel
      ref={ref}
      data-slot="combobox-group-label"
      className={mergeClassName(styles.groupLabel, className)}
      {...props}
    />
  );
});

export type ComboboxItemProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item>;

export const ComboboxItem = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Item>,
  ComboboxItemProps
>(function ComboboxItem({ children, className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      data-slot="combobox-item"
      className={mergeClassName(styles.item, className)}
      {...props}
    >
      <span className={styles.itemCopy}>{children}</span>
      <ComboboxPrimitive.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon aria-hidden="true" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
});

export type ComboboxEmptyProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>;

export const ComboboxEmpty = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Empty>,
  ComboboxEmptyProps
>(function ComboboxEmpty({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      data-slot="combobox-empty"
      className={mergeClassName(styles.empty, className)}
      {...props}
    />
  );
});

export type ComboboxStatusProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Status>;

export const ComboboxStatus = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Status>,
  ComboboxStatusProps
>(function ComboboxStatus({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Status
      ref={ref}
      data-slot="combobox-status"
      className={mergeClassName(styles.status, className)}
      {...props}
    />
  );
});

export type ComboboxSeparatorProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Separator>;

export const ComboboxSeparator = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Separator>,
  ComboboxSeparatorProps
>(function ComboboxSeparator({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Separator
      ref={ref}
      data-slot="combobox-separator"
      className={mergeClassName(styles.separator, className)}
      {...props}
    />
  );
});

export type ComboboxChipsProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Chips>;

export const ComboboxChips = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Chips>,
  ComboboxChipsProps
>(function ComboboxChips({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Chips
      ref={ref}
      data-slot="combobox-chips"
      className={mergeClassName(styles.chips, className)}
      {...props}
    />
  );
});

export type ComboboxChipProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Chip> & {
  /** Hides removal for selections imposed by policy or read-only workflow state. */
  removable?: boolean;
  /** Contextual accessible label for the removal control. */
  removeLabel?: string;
};

export const ComboboxChip = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Chip>,
  ComboboxChipProps
>(function ComboboxChip(
  { children, className, removable = true, removeLabel = 'Remove selected option', ...props },
  ref,
) {
  return (
    <ComboboxPrimitive.Chip
      ref={ref}
      data-slot="combobox-chip"
      className={mergeClassName(styles.chip, className)}
      {...props}
    >
      <span className={styles.chipLabel}>{children}</span>
      {removable ? (
        <ComboboxPrimitive.ChipRemove
          aria-label={removeLabel}
          data-slot="combobox-chip-remove"
          className={styles.chipRemove}
        >
          <XIcon aria-hidden="true" />
        </ComboboxPrimitive.ChipRemove>
      ) : null}
    </ComboboxPrimitive.Chip>
  );
});

export type ComboboxChipsInputProps = ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>;

export const ComboboxChipsInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComboboxChipsInputProps
>(function ComboboxChipsInput({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      data-slot="combobox-chips-input"
      className={mergeClassName(styles.chipsInput, className)}
      {...props}
      autoComplete="off"
    />
  );
});

/** Provides the correct anchor reference for a chip-based combobox popup. */
export function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null);
}
