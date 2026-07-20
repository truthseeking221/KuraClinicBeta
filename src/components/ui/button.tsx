import { cloneElement, isValidElement } from 'react';
import type { ComponentPropsWithoutRef, MouseEvent, ReactElement, ReactNode, Ref } from 'react';

import { ChevronDownIcon, SpinnerGapIcon } from './icons';
import styles from './button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'default'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive';

export type ButtonSize =
  | 'compact'
  | 'sm'
  | 'md'
  | 'default'
  | 'xs'
  | 'lg'
  | 'icon'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon-lg';

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  ref?: Ref<HTMLButtonElement>;
  /** Semantic emphasis for the action. */
  variant?: ButtonVariant;
  /** Visual size; all sizes retain the Kura touch target minimum. Compact is for short inline row actions. */
  size?: ButtonSize;
  /** Renders a pending state and prevents duplicate activation. */
  loading?: boolean;
  /** Canonical leading content, usually a Kura icon. */
  leadingIcon?: ReactNode;
  /** Canonical trailing content, usually a Kura icon. */
  trailingIcon?: ReactNode;
  /** Adds a disclosure affordance; pass an icon to customize it. */
  disclosure?: ReactNode | boolean;
  /** Makes the action fill its containing action region. */
  fullWidth?: boolean;
  /** Composes the styles onto one child, such as a Next.js Link. */
  asChild?: boolean;
  children?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary: styles.primary,
  default: styles.default,
  secondary: styles.secondary,
  outline: styles.outline,
  ghost: styles.ghost,
  link: styles.link,
  destructive: styles.destructive,
};

const sizeClassNames: Record<ButtonSize, string> = {
  compact: styles.sizeCompact,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  default: styles.sizeDefault,
  xs: styles.sizeXs,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
  'icon-xs': styles.sizeIconXs,
  'icon-sm': styles.sizeIconSm,
  'icon-lg': styles.sizeIconLg,
};

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return joinClasses(styles.button, variantClassNames[variant], sizeClassNames[size], className);
}

export function Button({
  className,
  ref,
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  disclosure = false,
  fullWidth = false,
  asChild = false,
  disabled = false,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const resolvedTrailingIcon = trailingIcon ?? (disclosure === true ? <ChevronDownIcon aria-hidden="true" /> : disclosure);
  const renderContent = (content: ReactNode) => (
    <>
      {loading ? <SpinnerGapIcon className={styles.loadingIcon} aria-hidden="true" /> : leadingIcon}
      {content}
      {resolvedTrailingIcon}
    </>
  );
  const content = renderContent(children);
  const sharedProps = {
    'data-slot': 'button',
    'data-variant': variant,
    'data-size': size,
    'data-loading': loading ? 'true' : undefined,
    'data-disabled': isDisabled ? 'true' : undefined,
    'aria-busy': loading ? true : props['aria-busy'],
    className: buttonClassName(variant, size, joinClasses(fullWidth ? styles.fullWidth : undefined, className)),
  };

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('Button with asChild requires one element child.');
    }

    const child = children as ReactElement<Record<string, unknown>>;
    const childProps = child.props as {
      children?: ReactNode;
      className?: string;
      onClick?: (event: MouseEvent<HTMLElement>) => void;
    };
    const childContent = renderContent(childProps.children);
    return cloneElement(child, {
      ...props,
      ...sharedProps,
      className: joinClasses(sharedProps.className, childProps.className),
      'aria-disabled': isDisabled ? true : props['aria-disabled'],
      tabIndex: isDisabled ? -1 : props.tabIndex,
      onClick: (event: MouseEvent<HTMLElement>) => {
        childProps.onClick?.(event);
        if (event.defaultPrevented || !isDisabled) {
          if (!event.defaultPrevented && !isDisabled) {
            onClick?.(event as unknown as MouseEvent<HTMLButtonElement>);
          }
          return;
        }
        event.preventDefault();
      },
      children: childContent,
    } as Record<string, unknown>);
  }

  return (
    <button
      ref={ref}
      {...props}
      {...sharedProps}
      type={props.type ?? 'button'}
      disabled={isDisabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
