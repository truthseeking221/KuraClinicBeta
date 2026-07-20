'use client';

import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import {
  Children,
  forwardRef,
  isValidElement,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';

import styles from './scroll-area.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function mergeClassName<State>(
  base: string,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  return typeof className === 'function'
    ? (state: State) => joinClasses(base, className(state))
    : joinClasses(base, className);
}

export type ScrollBarProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>;

export const ScrollBar = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ScrollBarProps
>(function ScrollBar({ className, orientation = 'vertical', ...props }, ref) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      {...props}
      className={mergeClassName(styles.scrollbar, className)}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
    >
      <ScrollAreaPrimitive.Thumb className={styles.thumb} data-slot="scroll-area-thumb" />
    </ScrollAreaPrimitive.Scrollbar>
  );
});

export type ScrollAreaProps = Omit<
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>,
  'children'
> & {
  children?: ReactNode;
  /** Adds a content fade only where more block-axis content remains. */
  fadeEdges?: boolean;
  /** Keeps content clear of an overlaid scrollbar when overflow is present. */
  scrollbarGutter?: boolean;
  /** Scrollbars rendered when no explicit ScrollBar children are supplied. */
  scrollbars?: 'vertical' | 'horizontal' | 'both' | 'none';
  viewportRef?: Ref<HTMLDivElement>;
};

function isScrollBarElement(node: ReactNode): node is ReactElement<ScrollBarProps> {
  return isValidElement(node) && node.type === ScrollBar;
}

export const ScrollArea = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(function ScrollArea(
  {
    children,
    className,
    fadeEdges = false,
    scrollbarGutter = false,
    scrollbars = 'vertical',
    viewportRef,
    ...props
  },
  ref,
) {
  const nodes = Children.toArray(children);
  const explicitScrollBars = nodes.filter(isScrollBarElement);
  const content = nodes.filter((node) => !isScrollBarElement(node));
  const defaultScrollBars =
    explicitScrollBars.length > 0 || scrollbars === 'none'
      ? null
      : (
          <>
            {scrollbars === 'vertical' || scrollbars === 'both' ? <ScrollBar /> : null}
            {scrollbars === 'horizontal' || scrollbars === 'both' ? (
              <ScrollBar orientation="horizontal" />
            ) : null}
          </>
        );

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      {...props}
      className={mergeClassName(styles.root, className)}
      data-fade-edges={fadeEdges ? 'true' : undefined}
      data-scrollbar-gutter={scrollbarGutter ? 'true' : undefined}
      data-slot="scroll-area"
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        className={styles.viewport}
        data-slot="scroll-area-viewport"
      >
        <ScrollAreaPrimitive.Content className={styles.content} data-slot="scroll-area-content">
          {content}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      {explicitScrollBars}
      {defaultScrollBars}
      <ScrollAreaPrimitive.Corner className={styles.corner} data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
});
