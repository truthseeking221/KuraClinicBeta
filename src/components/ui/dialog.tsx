'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';

import { CloseIcon } from './icons';
import { IconButton } from './icon-button';
import styles from './dialog.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

/**
 * Modal work surface for short, reversible tasks that need focus containment.
 * Use AlertDialog for confirmations and Sheet for persistent side work.
 */
export function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

export const DialogTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(function DialogTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />;
});

export type DialogPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

export function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={joinClasses(styles.overlay, className)}
      {...props}
    />
  );
});

export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

export const DialogClose = forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  DialogCloseProps
>(function DialogClose(props, ref) {
  return <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />;
});

export type DialogSize = 'sm' | 'md' | 'lg' | 'full';
export type DialogMobilePresentation = 'dialog' | 'full';

export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  size?: DialogSize;
  /** Full is safer for forms and long content; dialog keeps short tasks inset on narrow screens. */
  mobilePresentation?: DialogMobilePresentation;
  showCloseButton?: boolean;
  closeLabel?: string;
  overlayClassName?: string;
};

export const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  {
    children,
    className,
    closeLabel = 'Close dialog',
    mobilePresentation = 'full',
    overlayClassName,
    showCloseButton = true,
    size = 'md',
    ...props
  },
  ref,
) {
  return (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        data-size={size}
        data-mobile-presentation={mobilePresentation}
        className={joinClasses(styles.content, className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close asChild>
            <IconButton
              aria-label={closeLabel}
              className={styles.close}
              size="micro"
              variant="tertiary"
            >
              <CloseIcon aria-hidden="true" />
            </IconButton>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

export type DialogHeaderProps = ComponentPropsWithoutRef<'header'>;

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <header
      data-slot="dialog-header"
      className={joinClasses(styles.header, className)}
      {...props}
    />
  );
}

export type DialogBodyProps = ComponentPropsWithoutRef<'div'>;

export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={joinClasses(styles.body, className)}
      {...props}
    />
  );
}

export type DialogFooterProps = ComponentPropsWithoutRef<'footer'>;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <footer
      data-slot="dialog-footer"
      className={joinClasses(styles.footer, className)}
      {...props}
    />
  );
}

export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

export const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={joinClasses(styles.title, className)}
      {...props}
    />
  );
});

export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

export const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={joinClasses(styles.description, className)}
      {...props}
    />
  );
});
