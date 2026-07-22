import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import styles from './link-button.module.css';

export type LinkButtonVariant = 'primary' | 'secondary';
export type LinkButtonSize = 'medium' | 'small' | 'xs';

type LinkButtonBaseProps = {
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export type LinkButtonAnchorProps = LinkButtonBaseProps
  & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'>
  & { href: string; ref?: Ref<HTMLAnchorElement> };
export type LinkButtonButtonProps = LinkButtonBaseProps
  & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>
  & { href?: undefined; ref?: Ref<HTMLButtonElement> };
export type LinkButtonProps = LinkButtonAnchorProps | LinkButtonButtonProps;

const sizeClassNames: Record<LinkButtonSize, string> = {
  medium: styles.medium,
  small: styles.small,
  xs: styles.xs,
};

const variantClassNames: Record<LinkButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function LinkButton({
  children,
  className,
  disabled = false,
  leadingIcon,
  size = 'medium',
  trailingIcon,
  variant = 'primary',
  ...props
}: LinkButtonProps) {
  const classes = joinClasses(styles.linkButton, sizeClassNames[size], variantClassNames[variant], className);
  const content = (
    <>
      {leadingIcon ? <span className={styles.icon} aria-hidden="true">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className={styles.icon} aria-hidden="true">{trailingIcon}</span> : null}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, ref, ...anchorProps } = props as LinkButtonAnchorProps;
    return (
      <a
        ref={ref}
        {...anchorProps}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        data-slot="link-button"
        className={classes}
      >
        {content}
      </a>
    );
  }

  const { ref, type = 'button', ...buttonProps } = props as LinkButtonButtonProps;
  return (
    <button ref={ref} {...buttonProps} type={type} disabled={disabled} data-slot="link-button" className={classes}>
      {content}
    </button>
  );
}
