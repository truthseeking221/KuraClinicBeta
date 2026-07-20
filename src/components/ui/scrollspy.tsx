'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type {
  ComponentPropsWithoutRef,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  RefObject,
} from 'react';

import styles from './scrollspy.module.css';

type ScrollspyAnchorProps = {
  'aria-current'?: 'location';
  'data-active'?: 'true';
  'data-scrollspy-anchor'?: string;
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
};

export type ScrollspyProps = ComponentPropsWithoutRef<'nav'> & {
  /** Ref to the scrollable viewport or an ancestor containing one. */
  targetRef: RefObject<HTMLElement | null>;
  /** Distance from the viewport start at which a section becomes current. */
  offset?: number;
  onActiveChange?: (id: string) => void;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function resolveViewport(target: HTMLElement | null) {
  if (!target) return null;
  return (
    target.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]') ?? target
  );
}

/** Keeps local navigation synchronized with sections inside one scrolling viewport. */
export function Scrollspy({
  children,
  className,
  offset = 0,
  onActiveChange,
  targetRef,
  ...props
}: ScrollspyProps) {
  const anchorIds = useMemo(
    () => Children.toArray(children)
      .filter(
        (child): child is ReactElement<ScrollspyAnchorProps> =>
          isValidElement<ScrollspyAnchorProps>(child) &&
          typeof child.props['data-scrollspy-anchor'] === 'string',
      )
      .map((child) => child.props['data-scrollspy-anchor'] as string),
    [children],
  );
  const [activeId, setActiveId] = useState(anchorIds[0] ?? '');
  const [viewport, setViewport] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setViewport(resolveViewport(targetRef.current));
  }, [targetRef]);

  const updateActive = useCallback(() => {
    if (!viewport || anchorIds.length === 0) return;

    const viewportRect = viewport.getBoundingClientRect();
    const threshold = viewportRect.top + offset + 1;
    const sections = anchorIds
      .map((id) => viewport.ownerDocument.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section && viewport.contains(section)));
    if (sections.length === 0) return;

    const atEnd = viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 1;
    const next = atEnd
      ? sections.at(-1)
      : ([...sections].reverse().find((section) => section.getBoundingClientRect().top <= threshold) ?? sections[0]);
    if (!next || next.id === activeId) return;

    setActiveId(next.id);
    onActiveChange?.(next.id);
  }, [activeId, anchorIds, offset, onActiveChange, viewport]);

  useEffect(() => {
    if (!viewport) return;

    const frame = requestAnimationFrame(updateActive);
    const resizeObserver = new ResizeObserver(updateActive);
    resizeObserver.observe(viewport);
    viewport.addEventListener('scroll', updateActive, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', updateActive);
    };
  }, [updateActive, viewport]);

  const scrollToSection = useCallback((id: string) => {
    const section = viewport?.ownerDocument.getElementById(id);
    if (!viewport || !section || !viewport.contains(section)) return;

    const top = section.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop - offset;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    viewport.scrollTo({ behavior: reduceMotion ? 'auto' : 'smooth', top });
  }, [offset, viewport]);

  return (
    <nav {...props} className={joinClasses(styles.root, className)} data-slot="scrollspy">
      {Children.map(children, (child) => {
        if (!isValidElement<ScrollspyAnchorProps>(child)) return child;
        const id = child.props['data-scrollspy-anchor'];
        if (!id) return child;
        const isActive = id === activeId;

        return cloneElement(child, {
          'aria-current': isActive ? 'location' : undefined,
          'data-active': isActive ? 'true' : undefined,
          onClick: (event: ReactMouseEvent<HTMLElement>) => {
            child.props.onClick?.(event);
            if (!event.defaultPrevented) scrollToSection(id);
          },
        });
      })}
    </nav>
  );
}
