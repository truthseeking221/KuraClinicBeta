import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './card.module.css';

export type CardSize = 'sm' | 'md';
export type CardVariant = 'elevated' | 'outline' | 'tile';
export type CardElement = 'article' | 'section' | 'div';
export type CardTitleElement = 'h2' | 'h3' | 'h4' | 'div';
export type CardFooterAlign = 'start' | 'end' | 'between';
export type CardMediaPlacement = 'top' | 'inset';
export type CardActionMobileLayout = 'inline' | 'stack';

export type CardProps = Omit<ComponentPropsWithoutRef<'article'>, 'children'> & {
  /** Choose semantic structure based on whether the card is a standalone item or a page section. */
  as?: CardElement;
  /** Explicit inset size. When omitted, the card follows the root Kura density. */
  size?: CardSize;
  /**
   * Surface separation. Default (`elevated`) is the flat gray tray that sits
   * on the white page — contrast only, no border or shadow. `tile` is a white
   * box with a feather shadow for nesting inside a tray. `outline` is a white
   * surface with a hairline border — for bordered containers and tables.
   */
  variant?: CardVariant;
  /** Adds section dividers when the boundaries are meaningful to the task. */
  dividers?: boolean;
  children?: ReactNode;
};

export type CardHeaderProps = ComponentPropsWithoutRef<'header'> & {
  children?: ReactNode;
};

export type CardTitleProps = Omit<ComponentPropsWithoutRef<'h3'>, 'children'> & {
  as?: CardTitleElement;
  children?: ReactNode;
};

export type CardDescriptionProps = ComponentPropsWithoutRef<'p'> & {
  children?: ReactNode;
};

export type CardActionProps = ComponentPropsWithoutRef<'div'> & {
  /** Keep compact metadata inline; stack controls when space is constrained. */
  mobileLayout?: CardActionMobileLayout;
  children?: ReactNode;
};

export type CardMetaProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

export type CardContentProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

export type CardFooterProps = ComponentPropsWithoutRef<'footer'> & {
  align?: CardFooterAlign;
  children?: ReactNode;
};

export type CardMediaProps = ComponentPropsWithoutRef<'div'> & {
  placement?: CardMediaPlacement;
  children?: ReactNode;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const footerAlignClassNames: Record<CardFooterAlign, string> = {
  start: styles.footerStart,
  end: styles.footerEnd,
  between: styles.footerBetween,
};

export function Card({
  as: Component = 'article',
  children,
  className,
  dividers = false,
  size,
  variant,
  ...props
}: CardProps) {
  return (
    <Component
      {...props}
      data-dividers={dividers ? 'true' : undefined}
      data-size={size}
      data-variant={variant}
      data-slot="card"
      className={joinClasses(styles.card, className)}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <header
      {...props}
      data-slot="card-header"
      className={joinClasses(styles.header, className)}
    >
      {children}
    </header>
  );
}

export function CardTitle({
  as: Component = 'h3',
  children,
  className,
  ...props
}: CardTitleProps) {
  return (
    <Component
      {...props}
      data-slot="card-title"
      className={joinClasses(styles.title, className)}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className, ...props }: CardDescriptionProps) {
  return (
    <p
      {...props}
      data-slot="card-description"
      className={joinClasses(styles.description, className)}
    >
      {children}
    </p>
  );
}

export function CardMeta({ children, className, ...props }: CardMetaProps) {
  return (
    <div
      {...props}
      data-slot="card-meta"
      className={joinClasses(styles.meta, className)}
    >
      {children}
    </div>
  );
}

export function CardAction({
  children,
  className,
  mobileLayout = 'stack',
  ...props
}: CardActionProps) {
  return (
    <div
      {...props}
      data-mobile-layout={mobileLayout}
      data-slot="card-action"
      className={joinClasses(styles.action, className)}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div
      {...props}
      data-slot="card-content"
      className={joinClasses(styles.content, className)}
    >
      {children}
    </div>
  );
}

export function CardFooter({
  align = 'end',
  children,
  className,
  ...props
}: CardFooterProps) {
  return (
    <footer
      {...props}
      data-align={align}
      data-slot="card-footer"
      className={joinClasses(styles.footer, footerAlignClassNames[align], className)}
    >
      {children}
    </footer>
  );
}

export function CardMedia({
  children,
  className,
  placement = 'top',
  ...props
}: CardMediaProps) {
  return (
    <div
      {...props}
      data-placement={placement}
      data-slot="card-media"
      className={joinClasses(styles.media, className)}
    >
      {children}
    </div>
  );
}
