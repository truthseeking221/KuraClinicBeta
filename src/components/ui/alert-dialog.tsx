'use client';

import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';

import { Button } from './button';
import type { ButtonProps } from './button';
import styles from './alert-dialog.module.css';

type AlertDialogContextValue = {
  descriptionId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
};

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

export type AlertDialogSize = 'sm' | 'default';
export type AlertDialogMediaTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'ai';

export type AlertDialogProps = {
  children?: ReactNode;
  /** Controlled open state for workflow-owned confirmation logic. */
  open?: boolean;
  /** Initial open state for an uncontrolled dialog. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type AlertDialogTriggerProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'onClick' | 'type'
> & {
  /** Composes the trigger behavior onto one canonical action component. */
  asChild?: boolean;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export type AlertDialogContentProps = Omit<
  ComponentPropsWithoutRef<'dialog'>,
  'children' | 'onCancel' | 'onClose' | 'open' | 'role'
> & {
  children?: ReactNode;
  size?: AlertDialogSize;
  /** Escape follows the safe cancel path by default; disable only when acknowledgement must be explicit. */
  closeOnEscape?: boolean;
  /** Optional first focus target; otherwise the first dialog control receives focus. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Optional trigger to restore focus to when a controlled dialog closes. */
  returnFocusRef?: RefObject<HTMLElement | null>;
  onCancel?: ComponentPropsWithoutRef<'dialog'>['onCancel'];
  onClose?: ComponentPropsWithoutRef<'dialog'>['onClose'];
};

export type AlertDialogHeaderProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

export type AlertDialogFooterProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

export type AlertDialogMediaProps = ComponentPropsWithoutRef<'div'> & {
  tone?: AlertDialogMediaTone;
  children?: ReactNode;
};

export type AlertDialogTitleProps = ComponentPropsWithoutRef<'h2'> & {
  children?: ReactNode;
};

export type AlertDialogDescriptionProps = ComponentPropsWithoutRef<'p'> & {
  children?: ReactNode;
};

export type AlertDialogActionProps = Omit<ButtonProps, 'asChild' | 'onClick'> & {
  /** Keep the dialog open for asynchronous or additional workflow validation. */
  closeOnAction?: boolean;
  onClick?: ButtonProps['onClick'];
};

export type AlertDialogCancelProps = Omit<ButtonProps, 'asChild' | 'onClick'> & {
  onClick?: ButtonProps['onClick'];
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function useAlertDialogContext(componentName: string) {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(`${componentName} must be used inside AlertDialog.`);
  }
  return context;
}

export function AlertDialog({
  children,
  defaultOpen = false,
  onOpenChange,
  open,
}: AlertDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : uncontrolledOpen;
  const id = useId().replaceAll(':', '');

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return (
    <AlertDialogContext.Provider
      value={{
        descriptionId: `${id}-description`,
        open: resolvedOpen,
        setOpen,
        titleId: `${id}-title`,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({
  asChild = false,
  children,
  onClick,
  ...props
}: AlertDialogTriggerProps) {
  const { open, setOpen } = useAlertDialogContext('AlertDialogTrigger');

  function handleClick(event: MouseEvent<HTMLElement>) {
    onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(true);
    }
  }

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('AlertDialogTrigger with asChild requires one element child.');
    }

    const child = children as ReactElement<Record<string, unknown>>;
    const childOnClick = child.props.onClick as
      | ((event: MouseEvent<HTMLElement>) => void)
      | undefined;

    return cloneElement(child, {
      ...props,
      'aria-expanded': open,
      'aria-haspopup': 'dialog',
      onClick: (event: MouseEvent<HTMLElement>) => {
        childOnClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event);
        }
      },
    } as Record<string, unknown>);
  }

  return (
    <button
      {...props}
      type="button"
      aria-expanded={open}
      aria-haspopup="dialog"
      data-slot="alert-dialog-trigger"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export function AlertDialogContent({
  children,
  className,
  closeOnEscape = true,
  initialFocusRef,
  onCancel,
  onClose,
  returnFocusRef,
  size = 'default',
  ...props
}: AlertDialogContentProps) {
  const { descriptionId, open, setOpen, titleId } = useAlertDialogContext('AlertDialogContent');
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

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement>) {
    if (!closeOnEscape) {
      event.preventDefault();
    }

    onCancel?.(event);
    if (!event.defaultPrevented) {
      setOpen(false);
    }
  }

  function handleClose(event: React.SyntheticEvent<HTMLDialogElement>) {
    onClose?.(event);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Escape') return;

    event.preventDefault();
    if (closeOnEscape) {
      setOpen(false);
    }
  }

  return (
    <dialog
      {...props}
      ref={dialogRef}
      role="alertdialog"
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      aria-modal="true"
      data-size={size}
      data-slot="alert-dialog-content"
      className={joinClasses(styles.content, className)}
      onCancel={handleCancel}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
    >
      {children}
    </dialog>
  );
}

export function AlertDialogHeader({ children, className, ...props }: AlertDialogHeaderProps) {
  return (
    <div {...props} data-slot="alert-dialog-header" className={joinClasses(styles.header, className)}>
      {children}
    </div>
  );
}

export function AlertDialogFooter({ children, className, ...props }: AlertDialogFooterProps) {
  return (
    <div {...props} data-slot="alert-dialog-footer" className={joinClasses(styles.footer, className)}>
      {children}
    </div>
  );
}

const mediaToneClassNames: Record<AlertDialogMediaTone, string> = {
  neutral: styles.mediaNeutral,
  info: styles.mediaInfo,
  success: styles.mediaSuccess,
  warning: styles.mediaWarning,
  danger: styles.mediaDanger,
  ai: styles.mediaAi,
};

export function AlertDialogMedia({
  children,
  className,
  tone = 'neutral',
  ...props
}: AlertDialogMediaProps) {
  return (
    <div
      {...props}
      data-slot="alert-dialog-media"
      data-tone={tone}
      className={joinClasses(styles.media, mediaToneClassNames[tone], className)}
    >
      {children}
    </div>
  );
}

export function AlertDialogTitle({ children, className, ...props }: AlertDialogTitleProps) {
  const { titleId } = useAlertDialogContext('AlertDialogTitle');

  return (
    <h2
      {...props}
      id={props.id ?? titleId}
      data-slot="alert-dialog-title"
      className={joinClasses(styles.title, className)}
    >
      {children}
    </h2>
  );
}

export function AlertDialogDescription({
  children,
  className,
  ...props
}: AlertDialogDescriptionProps) {
  const { descriptionId } = useAlertDialogContext('AlertDialogDescription');

  return (
    <p
      {...props}
      id={props.id ?? descriptionId}
      data-slot="alert-dialog-description"
      className={joinClasses(styles.description, className)}
    >
      {children}
    </p>
  );
}

export function AlertDialogAction({
  closeOnAction = true,
  onClick,
  ...props
}: AlertDialogActionProps) {
  const { setOpen } = useAlertDialogContext('AlertDialogAction');

  return (
    <Button
      {...props}
      data-slot="alert-dialog-action"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && closeOnAction) {
          setOpen(false);
        }
      }}
    />
  );
}

export function AlertDialogCancel({
  onClick,
  variant = 'outline',
  ...props
}: AlertDialogCancelProps) {
  const { setOpen } = useAlertDialogContext('AlertDialogCancel');

  return (
    <Button
      {...props}
      variant={variant}
      data-slot="alert-dialog-cancel"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
    />
  );
}
