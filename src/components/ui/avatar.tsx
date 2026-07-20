/* eslint-disable @next/next/no-img-element -- Avatar accepts arbitrary sources and owns native load/error fallback state. */
'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import { UserCircleIcon } from './icons';
import styles from './avatar.module.css';

type AvatarImageState = 'fallback' | 'loading' | 'loaded' | 'error';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded';
export type AvatarTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'ai';
export type AvatarFallbackTone = AvatarTone;
export type AvatarRing = 'none' | AvatarTone;
export type AvatarRingAnimation = 'none' | 'pulse';
export type AvatarImageTreatment = 'color' | 'muted';
export type AvatarBadgeTone = AvatarTone;
export type AvatarBadgePosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type AvatarContextValue = {
  fallbackTone: AvatarFallbackTone;
  imageState: AvatarImageState;
  setImageState: (state: AvatarImageState) => void;
};

const AvatarContext = createContext<AvatarContextValue | null>(null);

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function useAvatarContext(componentName: string) {
  const context = useContext(AvatarContext);
  if (!context) throw new Error(`${componentName} must be used inside Avatar.`);
  return context;
}

const sizeClassNames: Record<AvatarSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

const toneClassNames: Record<AvatarTone, string> = {
  neutral: styles.toneNeutral,
  brand: styles.toneBrand,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
  info: styles.toneInfo,
  ai: styles.toneAi,
};

const ringClassNames: Record<AvatarRing, string> = {
  none: styles.ringNone,
  neutral: styles.ringNeutral,
  brand: styles.ringBrand,
  success: styles.ringSuccess,
  warning: styles.ringWarning,
  danger: styles.ringDanger,
  info: styles.ringInfo,
  ai: styles.ringAi,
};

const badgePositionClassNames: Record<AvatarBadgePosition, string> = {
  'top-left': styles.badgeTopLeft,
  'top-right': styles.badgeTopRight,
  'bottom-left': styles.badgeBottomLeft,
  'bottom-right': styles.badgeBottomRight,
};

export type AvatarProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  /** Semantic size; md follows the root density setting for operational lists. */
  size?: AvatarSize;
  /** Use circle for people and rounded for compact identity marks. */
  shape?: AvatarShape;
  /** Semantic fallback treatment used when an image is unavailable. */
  fallbackTone?: AvatarFallbackTone;
  /** Optional semantic ring for review, presence, or active identity states. */
  ring?: AvatarRing;
  /** Pulse is optional and automatically disabled for reduced-motion users. */
  ringAnimation?: AvatarRingAnimation;
  /** Shows a stable loading overlay while profile data is being resolved. */
  loading?: boolean;
  children?: ReactNode;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    size = 'md',
    shape = 'circle',
    fallbackTone = 'neutral',
    ring = 'none',
    ringAnimation = 'none',
    loading = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const [imageState, setImageState] = useState<AvatarImageState>('fallback');
  const contextValue = useMemo(
    () => ({ fallbackTone, imageState, setImageState }),
    [fallbackTone, imageState],
  );
  const state = loading ? 'loading' : imageState;

  return (
    <AvatarContext.Provider value={contextValue}>
      <div
        {...props}
        ref={ref}
        data-slot="avatar"
        data-size={size}
        data-shape={shape}
        data-state={state}
        data-loading={loading || undefined}
        aria-busy={loading || imageState === 'loading'}
        className={joinClasses(
          styles.root,
          sizeClassNames[size],
          shape === 'circle' ? styles.circle : styles.rounded,
          toneClassNames[fallbackTone],
          ringClassNames[ring],
          ringAnimation === 'pulse' && ring !== 'none' ? styles.ringPulse : undefined,
          className,
        )}
      >
        {children}
        {state === 'loading' ? (
          <span className={styles.loadingOverlay} aria-hidden="true">
            <span className={styles.loadingIndicator} />
          </span>
        ) : null}
      </div>
    </AvatarContext.Provider>
  );
});

export type AvatarImageProps = Omit<
  ComponentPropsWithoutRef<'img'>,
  'alt'
> & {
  /** Describe the person or role represented by the image. */
  alt: string;
  /** Muted is useful for archived or inactive people; never use it as the only status cue. */
  treatment?: AvatarImageTreatment;
};

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(function AvatarImage(
  { alt, className, onError, onLoad, src, treatment = 'color', ...props },
  ref,
) {
  const { imageState, setImageState } = useAvatarContext('AvatarImage');

  useEffect(() => {
    setImageState(src ? 'loading' : 'fallback');
    return () => setImageState('fallback');
  }, [setImageState, src]);

  return (
    <img
      {...props}
      ref={ref}
      alt={alt}
      src={src}
      data-slot="avatar-image"
      data-state={imageState}
      data-treatment={treatment}
      className={joinClasses(
        styles.image,
        imageState === 'loaded' ? undefined : styles.imageHidden,
        treatment === 'muted' ? styles.imageMuted : undefined,
        className,
      )}
      onLoad={(event) => {
        onLoad?.(event);
        if (!event.defaultPrevented) setImageState('loaded');
      }}
      onError={(event) => {
        onError?.(event);
        if (!event.defaultPrevented) setImageState('error');
      }}
    />
  );
});

export type AvatarFallbackProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'children' | 'hidden' | 'aria-hidden'
> & {
  /** Initials or a canonical icon; the icon fallback is used when omitted. */
  children?: ReactNode;
  /** Overrides the parent fallback tone for a deliberate semantic treatment. */
  tone?: AvatarFallbackTone;
};

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(function AvatarFallback(
  { className, children, tone, ...props },
  ref,
) {
  const { fallbackTone, imageState } = useAvatarContext('AvatarFallback');
  const fallback = children ?? <UserCircleIcon className={styles.fallbackIcon} />;

  return (
    <span
      {...props}
      ref={ref}
      data-slot="avatar-fallback"
      data-state={imageState}
      data-tone={tone ?? fallbackTone}
      hidden={imageState === 'loaded'}
      aria-hidden={imageState === 'loaded'}
      className={joinClasses(
        styles.fallback,
        toneClassNames[tone ?? fallbackTone],
        className,
      )}
    >
      {fallback}
    </span>
  );
});

export type AvatarBadgeProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'children'
> & {
  /** Status tone for the indicator. It is paired with a label when announced. */
  tone?: AvatarBadgeTone;
  position?: AvatarBadgePosition;
  children?: ReactNode;
};

export const AvatarBadge = forwardRef<HTMLSpanElement, AvatarBadgeProps>(function AvatarBadge(
  {
    children,
    className,
    tone = 'neutral',
    position = 'bottom-right',
    'aria-label': ariaLabel,
    'aria-hidden': ariaHidden,
    ...props
  },
  ref,
) {
  const decorative = ariaLabel == null && ariaHidden !== false;

  return (
    <span
      {...props}
      ref={ref}
      data-slot="avatar-badge"
      data-tone={tone}
        data-position={position}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={decorative ? true : ariaHidden}
        className={joinClasses(
          styles.badge,
          styles[`badgeSize${children ? 'Md' : 'Sm'}` as keyof typeof styles],
        toneClassNames[tone],
        badgePositionClassNames[position],
        className,
      )}
    >
      {children ?? <span className={styles.badgeDot} aria-hidden="true" />}
    </span>
  );
});

export type AvatarGroupProps = ComponentPropsWithoutRef<'div'> & {
  /** Controls the canonical overlap rhythm between adjacent avatars. */
  overlap?: 'tight' | 'default';
};

export function AvatarGroup({
  className,
  overlap = 'default',
  ...props
}: AvatarGroupProps) {
  return (
    <div
      {...props}
      data-slot="avatar-group"
      data-overlap={overlap}
      className={joinClasses(
        styles.group,
        overlap === 'tight' ? styles.overlapTight : styles.overlapDefault,
        className,
      )}
    />
  );
}

export type AvatarGroupCountProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'children'
> & {
  children?: ReactNode;
  size?: AvatarSize;
  tone?: AvatarTone;
};

export function AvatarGroupCount({
  children,
  className,
  size = 'md',
  tone = 'neutral',
  ...props
}: AvatarGroupCountProps) {
  return (
    <span
      {...props}
      data-slot="avatar-group-count"
      data-size={size}
      data-tone={tone}
      className={joinClasses(
        styles.count,
        sizeClassNames[size],
        toneClassNames[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
