'use client';

import {
  Group as ResizablePrimitiveGroup,
  Panel as ResizablePrimitivePanel,
  Separator as ResizablePrimitiveSeparator,
} from 'react-resizable-panels';
import type {
  GroupProps,
  Layout,
  LayoutChangedMeta,
  PanelImperativeHandle,
  PanelProps,
  PanelSize,
  SeparatorProps,
} from 'react-resizable-panels';

import { useT } from '../foundations/i18n';
import styles from './resizable.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type ResizablePanelGroupProps = GroupProps;

/** Groups directly nested resizable panels and handles along one axis. */
export function ResizablePanelGroup({ className, ...props }: ResizablePanelGroupProps) {
  return (
    <ResizablePrimitiveGroup
      data-slot="resizable-panel-group"
      className={joinClasses(styles.group, className)}
      {...props}
    />
  );
}

export type ResizablePanelProps = PanelProps;

/** A content region whose size is controlled by its surrounding panel group. */
export function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return (
    <ResizablePrimitivePanel
      data-slot="resizable-panel"
      className={joinClasses(styles.panel, className)}
      {...props}
    />
  );
}

export type ResizableHandleProps = SeparatorProps & {
  /** Shows a quiet pill affordance without introducing an icon dependency. */
  showIndicator?: boolean;
};

/** Keyboard-, pointer-, and touch-operable separator between adjacent panels. */
export function ResizableHandle({
  'aria-label': ariaLabel,
  children,
  className,
  showIndicator = false,
  ...props
}: ResizableHandleProps) {
  const t = useT();

  return (
    <ResizablePrimitiveSeparator
      aria-label={ariaLabel ?? t('Resize panels')}
      data-slot="resizable-handle"
      className={joinClasses(styles.handle, className)}
      {...props}
    >
      {showIndicator ? <span className={styles.indicator} aria-hidden="true" /> : null}
      {children}
    </ResizablePrimitiveSeparator>
  );
}

export type {
  Layout as ResizableLayout,
  LayoutChangedMeta as ResizableLayoutChangedMeta,
  PanelImperativeHandle as ResizablePanelImperativeHandle,
  PanelSize as ResizablePanelSize,
};
