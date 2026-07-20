import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react';

import styles from './item.module.css';

export type ItemVariant = 'default' | 'outline' | 'muted';
export type ItemSize = 'xs' | 'sm' | 'md';
export type ItemMediaVariant = 'default' | 'icon' | 'image';

export type ItemProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Use an anchor only when the complete item navigates to another location. */
  as?: 'div' | 'a';
  href?: string;
  target?: ComponentPropsWithoutRef<'a'>['target'];
  rel?: string;
  /** Unavailable navigation is removed from tab order and has no href. */
  disabled?: boolean;
  variant?: ItemVariant;
  size?: ItemSize;
  children?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const variantClassNames: Record<ItemVariant, string> = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
  muted: styles.variantMuted,
};

const sizeClassNames: Record<ItemSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

export const Item = forwardRef<HTMLElement, ItemProps>(function Item(
  {
    as = 'div',
    children,
    className,
    disabled = false,
    href,
    rel,
    size = 'md',
    target,
    variant = 'default',
    ...props
  },
  ref,
) {
  const classNames = joinClasses(
    styles.item,
    variantClassNames[variant],
    sizeClassNames[size],
    as === 'a' ? styles.interactive : undefined,
    className,
  );

  if (as === 'a') {
    const anchorProps = props as ComponentPropsWithoutRef<'a'>;
    return (
      <a
        {...anchorProps}
        ref={ref as Ref<HTMLAnchorElement>}
        aria-disabled={disabled || undefined}
        className={classNames}
        data-disabled={disabled || undefined}
        data-size={size}
        data-slot="item"
        data-variant={variant}
        href={disabled ? undefined : href}
        rel={rel}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        target={target}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      {...props}
      ref={ref as Ref<HTMLDivElement>}
      className={classNames}
      data-size={size}
      data-slot="item"
      data-variant={variant}
    >
      {children}
    </div>
  );
});

export type ItemGroupProps = ComponentPropsWithoutRef<'div'>;

export const ItemGroup = forwardRef<HTMLDivElement, ItemGroupProps>(function ItemGroup(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={joinClasses(styles.group, className)} data-slot="item-group" />;
});

export type ItemSeparatorProps = ComponentPropsWithoutRef<'hr'>;

export const ItemSeparator = forwardRef<HTMLHRElement, ItemSeparatorProps>(function ItemSeparator(
  { className, ...props },
  ref,
) {
  return <hr {...props} ref={ref} className={joinClasses(styles.separator, className)} data-slot="item-separator" />;
});

export type ItemMediaProps = ComponentPropsWithoutRef<'div'> & {
  variant?: ItemMediaVariant;
};

export const ItemMedia = forwardRef<HTMLDivElement, ItemMediaProps>(function ItemMedia(
  { className, variant = 'default', ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={joinClasses(styles.media, styles[`media${variant[0].toUpperCase()}${variant.slice(1)}`], className)}
      data-slot="item-media"
      data-variant={variant}
    />
  );
});

export type ItemContentProps = ComponentPropsWithoutRef<'div'>;

export const ItemContent = forwardRef<HTMLDivElement, ItemContentProps>(function ItemContent(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={joinClasses(styles.content, className)} data-slot="item-content" />;
});

export type ItemTitleProps = ComponentPropsWithoutRef<'div'>;

export const ItemTitle = forwardRef<HTMLDivElement, ItemTitleProps>(function ItemTitle(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={joinClasses(styles.title, className)} data-slot="item-title" />;
});

export type ItemDescriptionProps = ComponentPropsWithoutRef<'p'>;

export const ItemDescription = forwardRef<HTMLParagraphElement, ItemDescriptionProps>(function ItemDescription(
  { className, ...props },
  ref,
) {
  return <p {...props} ref={ref} className={joinClasses(styles.description, className)} data-slot="item-description" />;
});

export type ItemActionsProps = ComponentPropsWithoutRef<'div'>;

export const ItemActions = forwardRef<HTMLDivElement, ItemActionsProps>(function ItemActions(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={joinClasses(styles.actions, className)} data-slot="item-actions" />;
});

export type ItemHeaderProps = ComponentPropsWithoutRef<'div'>;

export const ItemHeader = forwardRef<HTMLDivElement, ItemHeaderProps>(function ItemHeader(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={joinClasses(styles.header, className)} data-slot="item-header" />;
});

export type ItemFooterProps = ComponentPropsWithoutRef<'div'>;

export const ItemFooter = forwardRef<HTMLDivElement, ItemFooterProps>(function ItemFooter(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={joinClasses(styles.footer, className)} data-slot="item-footer" />;
});
