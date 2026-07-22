'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
} from 'react';

import { useT } from '../foundations/i18n';
import { CloseButton } from './close-button';
import styles from './sheet.module.css';

export type SheetSide = 'top' | 'left' | 'right' | 'bottom';

type SheetContextValue = {
  descriptionId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(caller: string) {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error(`${caller} must be used within <Sheet>.`);
  }
  return context;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type SheetProps = {
  children: ReactNode;
  /** Initial open state for an uncontrolled sheet. */
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Sheet({ children, defaultOpen = false, onOpenChange, open }: SheetProps) {
  const generatedId = useId();
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const value = useMemo(
    () => ({
      descriptionId: `sheet-description-${generatedId}`,
      open: isOpen,
      setOpen,
      titleId: `sheet-title-${generatedId}`,
    }),
    [generatedId, isOpen, setOpen],
  );

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export type SheetTriggerProps = ComponentPropsWithoutRef<'button'>;

export function SheetTrigger({ children, className, onClick, ...props }: SheetTriggerProps) {
  const { open, setOpen } = useSheetContext('SheetTrigger');

  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      aria-expanded={open}
      aria-haspopup="dialog"
      data-slot="sheet-trigger"
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
    >
      {children}
    </button>
  );
}

export type SheetContentProps = Omit<
  ComponentPropsWithoutRef<'dialog'>,
  'aria-labelledby' | 'aria-describedby'
> & {
  /** Edge the panel slides from. Bottom is the mobile transformation of side panels. */
  side?: SheetSide;
  /** Escape closes by default; sheets host navigation and queues, not confirmations. */
  closeOnEscape?: boolean;
  /** Backdrop click closes by default. Disable when mid-task loss is possible. */
  closeOnBackdrop?: boolean;
  /** Optional first focus target; otherwise the close control receives focus. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Optional trigger to restore focus to when a controlled sheet closes. */
  returnFocusRef?: RefObject<HTMLElement | null>;
};

export function SheetContent({
  children,
  className,
  closeOnBackdrop = true,
  closeOnEscape = true,
  initialFocusRef,
  onCancel,
  onClick,
  onClose,
  onKeyDown,
  returnFocusRef,
  side = 'right',
  ...props
}: SheetContentProps) {
  const { descriptionId, open, setOpen, titleId } = useSheetContext('SheetContent');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      const activeElement = returnFocusRef?.current ?? document.activeElement;
      restoreFocusRef.current = activeElement instanceof HTMLElement ? activeElement : null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (open || !restoreFocusRef.current) return;

    const frame = requestAnimationFrame(() => {
      const restoreFocusTarget = restoreFocusRef.current;
      if (restoreFocusTarget?.isConnected) {
        restoreFocusTarget.focus();
      }
      restoreFocusRef.current = null;
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open || !initialFocusRef?.current) return;

    const frame = requestAnimationFrame(() => initialFocusRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [initialFocusRef, open]);

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    if (!closeOnEscape) {
      event.preventDefault();
    }

    onCancel?.(event);
    if (!event.defaultPrevented) {
      setOpen(false);
    }
  }

  function handleClose(event: SyntheticEvent<HTMLDialogElement>) {
    onClose?.(event);
    setOpen(false);
  }

  function handleClick(event: ReactMouseEvent<HTMLDialogElement>) {
    onClick?.(event);
    if (
      closeOnBackdrop &&
      !event.defaultPrevented &&
      event.target === dialogRef.current
    ) {
      setOpen(false);
    }
  }

  /**
   * Native `cancel` only fires for trusted UA Escape handling. Close on the
   * keydown itself so assistive tech and synthetic keyboards close the sheet
   * too; preventDefault stops the UA cancel path from double-firing.
   */
  function handleKeyDown(event: ReactKeyboardEvent<HTMLDialogElement>) {
    onKeyDown?.(event);
    if (event.key === 'Escape' && closeOnEscape && !event.defaultPrevented) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <dialog
      {...props}
      ref={dialogRef}
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-modal="true"
      data-side={side}
      data-slot="sheet-content"
      className={joinClasses(styles.content, className)}
      onCancel={handleCancel}
      onClick={handleClick}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.panel} data-slot="sheet-panel">
        {children}
      </div>
    </dialog>
  );
}

export type SheetHeaderProps = ComponentPropsWithoutRef<'header'>;

export function SheetHeader({ children, className, ...props }: SheetHeaderProps) {
  return (
    <header {...props} data-slot="sheet-header" className={joinClasses(styles.header, className)}>
      {children}
    </header>
  );
}

export type SheetTitleProps = ComponentPropsWithoutRef<'h2'>;

export function SheetTitle({ children, className, ...props }: SheetTitleProps) {
  const { titleId } = useSheetContext('SheetTitle');

  return (
    <h2 {...props} id={titleId} data-slot="sheet-title" className={joinClasses(styles.title, className)}>
      {children}
    </h2>
  );
}

export type SheetDescriptionProps = ComponentPropsWithoutRef<'p'>;

export function SheetDescription({ children, className, ...props }: SheetDescriptionProps) {
  const { descriptionId } = useSheetContext('SheetDescription');

  return (
    <p
      {...props}
      id={descriptionId}
      data-slot="sheet-description"
      className={joinClasses(styles.description, className)}
    >
      {children}
    </p>
  );
}

export type SheetBodyProps = ComponentPropsWithoutRef<'div'>;

export function SheetBody({ children, className, ...props }: SheetBodyProps) {
  return (
    <div {...props} data-slot="sheet-body" className={joinClasses(styles.body, className)}>
      {children}
    </div>
  );
}

export type SheetFooterProps = ComponentPropsWithoutRef<'footer'>;

export function SheetFooter({ children, className, ...props }: SheetFooterProps) {
  return (
    <footer {...props} data-slot="sheet-footer" className={joinClasses(styles.footer, className)}>
      {children}
    </footer>
  );
}

export type SheetCloseProps = {
  /** Accessible name for the close control. */
  'aria-label'?: string;
  className?: string;
};

export function SheetClose({ 'aria-label': ariaLabel, className }: SheetCloseProps) {
  const t = useT();
  const { setOpen } = useSheetContext('SheetClose');

  return (
    <CloseButton
      aria-label={ariaLabel ?? t('Close')}
      className={joinClasses(styles.close, className)}
      onClick={() => setOpen(false)}
      size="md"
    />
  );
}
