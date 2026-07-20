import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import styles from './badge.module.css';

export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'ai';
export type BadgeAppearance = 'soft' | 'solid' | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'children'
> & {
  /** Status or metadata meaning; badges are non-interactive by default. */
  variant?: BadgeVariant;
  /** Soft is the default for scan-friendly status labels. */
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  /** Optional status dot; pair it with text rather than relying on color alone. */
  dot?: boolean;
  /** Canonical leading content such as a semantic icon or compact avatar. */
  leading?: ReactNode;
  /** Canonical trailing content for metadata or a compact avatar. */
  trailing?: ReactNode;
  /** Use only for navigation. Badges must not become button-like actions. */
  as?: 'span' | 'a';
  href?: string;
  target?: ComponentPropsWithoutRef<'a'>['target'];
  rel?: string;
  children?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const sizeClassNames: Record<BadgeSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const variantClassNames: Record<BadgeVariant, string> = {
  neutral: styles.variantNeutral,
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  outline: styles.variantNeutral,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
  info: styles.variantInfo,
  ai: styles.variantAi,
};

const appearanceClassNames: Record<BadgeAppearance, string> = {
  soft: styles.appearanceSoft,
  solid: styles.appearanceSolid,
  outline: styles.appearanceOutline,
};

export function Badge({
  as = 'span',
  appearance = 'soft',
  className,
  children,
  dot = false,
  href,
  leading,
  rel,
  size = 'md',
  target,
  trailing,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  const Element = as;
  const resolvedAppearance = variant === 'outline' ? 'outline' : appearance;
  const resolvedHref = as === 'a' ? href : undefined;

  return (
    <Element
      {...props}
      href={resolvedHref}
      rel={as === 'a' ? rel : undefined}
      target={as === 'a' ? target : undefined}
      data-slot="badge"
      data-variant={variant}
      data-appearance={resolvedAppearance}
      data-size={size}
      data-interactive={as === 'a' || undefined}
      className={joinClasses(
        styles.badge,
        sizeClassNames[size],
        variantClassNames[variant],
        appearanceClassNames[resolvedAppearance],
        dot ? styles.withDot : undefined,
        leading ? styles.withLeading : undefined,
        trailing ? styles.withTrailing : undefined,
        as === 'a' ? styles.link : undefined,
        className,
      )}
    >
      {dot ? <span className={styles.dot} aria-hidden="true" /> : null}
      {leading ? <span className={styles.leading} aria-hidden="true">{leading}</span> : null}
      <span className={styles.label}>{children}</span>
      {trailing ? <span className={styles.trailing} aria-hidden="true">{trailing}</span> : null}
    </Element>
  );
}
