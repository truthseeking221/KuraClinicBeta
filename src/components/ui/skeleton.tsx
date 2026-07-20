import type { ComponentPropsWithoutRef } from 'react';

import styles from './skeleton.module.css';

export type SkeletonShape = 'rectangle' | 'text' | 'circle';

export type SkeletonProps = ComponentPropsWithoutRef<'div'> & {
  /** Geometric treatment for the content placeholder. */
  shape?: SkeletonShape;
  /** Disables the shimmer while preserving the loading geometry. */
  animated?: boolean;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Skeleton({
  animated = true,
  'aria-hidden': ariaHidden = true,
  className,
  shape = 'rectangle',
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      aria-hidden={ariaHidden}
      className={joinClasses(styles.skeleton, className)}
      data-animated={animated ? 'true' : 'false'}
      data-shape={shape}
      data-slot="skeleton"
    />
  );
}
