'use client';

import {
  Toaster as SonnerToaster,
  toast,
  type ExternalToast,
  type ToasterProps as SonnerToasterProps,
} from 'sonner';

import {
  CloseIcon,
  ErrorIcon,
  InformationIcon,
  LoadingIcon,
  SuccessIcon,
  WarningIcon,
} from './icons';
import styles from './toast.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type ToasterProps = SonnerToasterProps;
export type ToastOptions = ExternalToast;

/**
 * Kura's transient notification surface. Use Alert for information that must
 * remain visible or block a clinical or operational decision.
 */
export function Toaster({
  className,
  closeButton = true,
  containerAriaLabel = 'Notifications',
  icons,
  mobileOffset = 'var(--space-3)',
  offset = 'var(--space-4)',
  position = 'bottom-right',
  toastOptions,
  ...props
}: ToasterProps) {
  const classNames = toastOptions?.classNames ?? {};

  return (
    <SonnerToaster
      {...props}
      className={joinClasses(styles.toaster, className)}
      closeButton={closeButton}
      containerAriaLabel={containerAriaLabel}
      icons={{
        success: <SuccessIcon aria-hidden="true" />,
        info: <InformationIcon aria-hidden="true" />,
        warning: <WarningIcon aria-hidden="true" />,
        error: <ErrorIcon aria-hidden="true" />,
        loading: <LoadingIcon aria-hidden="true" className={styles.loadingIcon} />,
        close: <CloseIcon aria-hidden="true" />,
        ...icons,
      }}
      mobileOffset={mobileOffset}
      offset={offset}
      position={position}
      richColors={false}
      toastOptions={{
        ...toastOptions,
        unstyled: true,
        classNames: {
          ...classNames,
          toast: joinClasses(styles.toast, classNames.toast),
          title: joinClasses(styles.title, classNames.title),
          description: joinClasses(styles.description, classNames.description),
          content: joinClasses(styles.content, classNames.content),
          icon: joinClasses(styles.icon, classNames.icon),
          actionButton: joinClasses(styles.actionButton, classNames.actionButton),
          cancelButton: joinClasses(styles.cancelButton, classNames.cancelButton),
          closeButton: joinClasses(styles.closeButton, classNames.closeButton),
          success: joinClasses(styles.success, classNames.success),
          info: joinClasses(styles.info, classNames.info),
          warning: joinClasses(styles.warning, classNames.warning),
          error: joinClasses(styles.error, classNames.error),
          loading: joinClasses(styles.loading, classNames.loading),
          default: joinClasses(styles.default, classNames.default),
        },
      }}
    />
  );
}

export { toast };
