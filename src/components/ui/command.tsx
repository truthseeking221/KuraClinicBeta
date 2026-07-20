'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
} from 'react';

import { SearchIcon, XIcon } from './icons';
import { IconButton } from './icon-button';
import styles from './command.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * A keyboard-first collection of authorised destinations and commands.
 * The owning workflow supplies only records and actions the current actor may use.
 */
export const Command = forwardRef<ComponentRef<typeof CommandPrimitive>, ComponentPropsWithoutRef<typeof CommandPrimitive>>(
  function Command({ className, ...props }, ref) {
    return (
      <CommandPrimitive
        ref={ref}
        data-slot="command"
        className={joinClasses(styles.command, className)}
        {...props}
      />
    );
  },
);

export type CommandDialogProps = {
  children: ReactNode;
  /** Initial visibility for an uncontrolled palette. */
  defaultOpen?: boolean;
  /** Controlled visibility from the owning application shell. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Visible orientation for the current command context. */
  title?: ReactNode;
  /** Explains the available search scope and any safety constraint. */
  description?: ReactNode;
  /** Escape is normally a safe dismissal; use false only when the owner provides an explicit recovery path. */
  closeOnEscape?: boolean;
  /** Clicks on the native dialog backdrop dismiss a search palette by default. */
  closeOnBackdrop?: boolean;
  /** Receives focus after opening when supplied; otherwise the search input receives focus. */
  initialFocusRef?: RefObject<HTMLElement | null>;
};

export function CommandDialog({
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
  defaultOpen = false,
  description = 'Search the destinations and actions available in your current workspace.',
  initialFocusRef,
  onOpenChange,
  open,
  title = 'Search Kura',
}: CommandDialogProps) {
  const descriptionId = useId().replaceAll(':', '');
  const titleId = useId().replaceAll(':', '');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openingElementRef = useRef<HTMLElement | null>(null);
  const synchronisingCloseRef = useRef(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      openingElementRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      dialog.showModal();
      const frame = requestAnimationFrame(() => {
        const nextFocus = initialFocusRef?.current
          ?? dialog.querySelector<HTMLElement>('[data-slot="command-input"]');
        nextFocus?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (!isOpen && dialog.open) {
      synchronisingCloseRef.current = true;
      dialog.close();
    }
  }, [initialFocusRef, isOpen]);

  function restoreFocus() {
    const openingElement = openingElementRef.current;
    if (!openingElement || !openingElement.isConnected) return;

    requestAnimationFrame(() => openingElement.focus());
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    if (!closeOnEscape) {
      event.preventDefault();
    }
  }

  /** Escape must work from keydown too — the UA cancel event alone is not
   * dependable across browsers and nested-focus situations. */
  function handleKeyDown(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    if (closeOnEscape) {
      dialogRef.current?.close();
    }
  }

  function handleClose() {
    if (synchronisingCloseRef.current) {
      synchronisingCloseRef.current = false;
      restoreFocus();
      return;
    }

    setOpen(false);
    restoreFocus();
  }

  function handleClick(event: ReactMouseEvent<HTMLDialogElement>) {
    if (closeOnBackdrop && event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-describedby={`command-description-${descriptionId}`}
      aria-labelledby={`command-title-${titleId}`}
      aria-modal="true"
      data-slot="command-dialog"
      className={styles.dialog}
      onCancel={handleCancel}
      onClick={handleClick}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
    >
      <section className={styles.panel} aria-label={typeof title === 'string' ? title : undefined}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <h2 id={`command-title-${titleId}`} className={styles.title}>{title}</h2>
            <p id={`command-description-${descriptionId}`} className={styles.description}>{description}</p>
          </div>
          <IconButton
            aria-label="Close search"
            className={styles.close}
            size="micro"
            variant="tertiary"
            onClick={() => dialogRef.current?.close()}
          >
            <XIcon aria-hidden="true" />
          </IconButton>
        </header>
        {children}
      </section>
    </dialog>
  );
}

export type CommandInputProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

export const CommandInput = forwardRef<
  ComponentRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(function CommandInput({ className, ...props }, ref) {
  return (
    <div data-slot="command-input-wrapper" className={styles.inputWrapper}>
      <SearchIcon className={styles.searchIcon} aria-hidden="true" />
      <CommandPrimitive.Input
        ref={ref}
        data-slot="command-input"
        className={joinClasses(styles.input, className)}
        {...props}
      />
    </div>
  );
});

export type CommandListProps = ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

export const CommandList = forwardRef<
  ComponentRef<typeof CommandPrimitive.List>,
  CommandListProps
>(function CommandList({ className, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      data-slot="command-list"
      className={joinClasses(styles.list, className)}
      {...props}
    />
  );
});

export type CommandEmptyProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

export const CommandEmpty = forwardRef<
  ComponentRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(function CommandEmpty({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      data-slot="command-empty"
      className={joinClasses(styles.empty, className)}
      {...props}
    />
  );
});

export type CommandLoadingProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>;

export const CommandLoading = forwardRef<
  ComponentRef<typeof CommandPrimitive.Loading>,
  CommandLoadingProps
>(function CommandLoading({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Loading
      ref={ref}
      data-slot="command-loading"
      className={joinClasses(styles.loading, className)}
      {...props}
    />
  );
});

export type CommandGroupProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

export const CommandGroup = forwardRef<
  ComponentRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(function CommandGroup({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      data-slot="command-group"
      className={joinClasses(styles.group, className)}
      {...props}
    />
  );
});

export type CommandItemProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Item>;

export const CommandItem = forwardRef<
  ComponentRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(function CommandItem({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-item"
      className={joinClasses(styles.item, className)}
      {...props}
    />
  );
});

export type CommandSeparatorProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>;

export const CommandSeparator = forwardRef<
  ComponentRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(function CommandSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      data-slot="command-separator"
      className={joinClasses(styles.separator, className)}
      {...props}
    />
  );
});

export type CommandShortcutProps = ComponentPropsWithoutRef<'span'>;

export function CommandShortcut({ className, ...props }: CommandShortcutProps) {
  return <span data-slot="command-shortcut" className={joinClasses(styles.shortcut, className)} {...props} />;
}
