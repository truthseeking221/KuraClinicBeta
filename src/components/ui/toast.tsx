'use client';

import {
  Toaster as SonnerToaster,
  toast,
  type ExternalToast,
  type ToasterProps as SonnerToasterProps,
} from 'sonner';

import { useT } from '../foundations/i18n';
import {
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

export type ToasterProps = Omit<SonnerToasterProps, 'closeButton'>;
export type ToastOptions = ExternalToast;

/**
 * Kura's transient notification surface. Use Alert for information that must
 * remain visible or block a clinical or operational decision.
 */
export function Toaster({
  className,
  containerAriaLabel,
  icons,
  mobileOffset = 'var(--space-3)',
  offset = 'var(--space-4)',
  position = 'bottom-right',
  toastOptions,
  ...props
}: ToasterProps) {
  const t = useT();
  const classNames = toastOptions?.classNames ?? {};

  return (
    <SonnerToaster
      {...props}
      className={joinClasses(styles.toaster, className)}
      closeButton={false}
      containerAriaLabel={containerAriaLabel ?? t('Notifications')}
      icons={{
        success: <SuccessIcon aria-hidden="true" />,
        info: <InformationIcon aria-hidden="true" />,
        warning: <WarningIcon aria-hidden="true" />,
        error: <ErrorIcon aria-hidden="true" />,
        loading: <LoadingIcon aria-hidden="true" className={styles.loadingIcon} />,
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
          success: joinClasses(styles.success, classNames.success),
          info: joinClasses(styles.info, classNames.info),
          warning: joinClasses(styles.warning, classNames.warning),
          error: joinClasses(styles.error, classNames.error),
          loading: joinClasses(styles.loading, classNames.loading),
          default: joinClasses(styles.default, classNames.default),
        },
        closeButton: false,
      }}
    />
  );
}

export { toast };
