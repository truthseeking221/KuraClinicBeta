'use client';

import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DropAnimation,
  type Modifiers,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  type AnimateLayoutChanges,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { useT } from '../foundations/i18n';
import styles from './sortable.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.35' } },
  }),
};

type SortableHookResult = ReturnType<typeof useSortable>;

type SortableItemContextValue = {
  attributes: SortableHookResult['attributes'];
  disabled: boolean;
  isDragging: boolean;
  isOverlay: boolean;
  listeners: SortableHookResult['listeners'];
};

const SortableItemContext = createContext<SortableItemContextValue | null>(null);
const SortableOverlayContext = createContext(false);

export type SortableStrategy = 'horizontal' | 'vertical' | 'grid';

export type SortableMoveEvent = {
  event: DragEndEvent;
  activeIndex: number;
  overIndex: number;
};

export type SortableProps<T> = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'onDragEnd' | 'onDragStart'
> & {
  value: T[];
  onValueChange: (value: T[]) => void;
  getItemValue: (item: T) => string;
  children: ReactNode;
  onMove?: (event: SortableMoveEvent) => void;
  strategy?: SortableStrategy;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  modifiers?: Modifiers;
};

export function Sortable<T>({
  'aria-label': ariaLabel,
  children,
  className,
  getItemValue,
  modifiers,
  onDragEnd,
  onDragStart,
  onMove,
  onValueChange,
  role = 'list',
  strategy = 'vertical',
  value,
  ...props
}: SortableProps<T>) {
  const t = useT();
  const resolvedAriaLabel = ariaLabel ?? t('Sortable items');
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const itemIds = useMemo(() => value.map(getItemValue), [getItemValue, value]);
  const sortingStrategy = strategy === 'vertical' ? verticalListSortingStrategy : rectSortingStrategy;

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id);
      onDragStart?.(event);
    },
    [onDragStart],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      onDragEnd?.(event);

      if (!over || active.id === over.id) return;

      const activeIndex = value.findIndex((item) => getItemValue(item) === active.id);
      const overIndex = value.findIndex((item) => getItemValue(item) === over.id);
      if (activeIndex < 0 || overIndex < 0) return;

      if (onMove) {
        onMove({ event, activeIndex, overIndex });
      } else {
        onValueChange(arrayMove(value, activeIndex, overIndex));
      }
    },
    [getItemValue, onDragEnd, onMove, onValueChange, value],
  );

  const overlayChild = useMemo(() => {
    if (activeId === null) return null;

    let match: ReactElement<SortableItemProps> | null = null;
    Children.forEach(children, (child) => {
      if (isValidElement<SortableItemProps>(child) && child.props.value === String(activeId)) {
        match = cloneElement(child, {
          className: joinClasses(child.props.className, styles.overlayItem),
        });
      }
    });
    return match;
  }, [activeId, children]);

  return (
    <DndContext
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      modifiers={modifiers}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <SortableContext items={itemIds} strategy={sortingStrategy}>
        <div
          {...props}
          aria-label={resolvedAriaLabel}
          className={joinClasses(styles.root, className)}
          data-dragging={activeId !== null ? 'true' : undefined}
          data-slot="sortable"
          data-strategy={strategy}
          role={role}
        >
          {children}
        </div>
      </SortableContext>
      {overlayChild
        ? createPortal(
            <DragOverlay className={styles.overlay} dropAnimation={dropAnimation} modifiers={modifiers}>
              <SortableOverlayContext.Provider value>{overlayChild}</SortableOverlayContext.Provider>
            </DragOverlay>,
            document.body,
          )
        : null}
    </DndContext>
  );
}

export type SortableItemProps = ComponentPropsWithoutRef<'div'> & {
  value: string;
  disabled?: boolean;
};

export function SortableItem({
  children,
  className,
  disabled = false,
  role = 'listitem',
  style,
  value,
  ...props
}: SortableItemProps) {
  const isOverlay = useContext(SortableOverlayContext);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: value, disabled: disabled || isOverlay, animateLayoutChanges });

  const itemStyle: CSSProperties = isOverlay
    ? style ?? {}
    : {
        ...style,
        transform: CSS.Transform.toString(transform),
        transition,
      };

  return (
    <SortableItemContext.Provider
      value={{ attributes, disabled, isDragging, isOverlay, listeners }}
    >
      <div
        {...props}
        className={joinClasses(styles.item, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-dragging={isDragging || isOverlay ? 'true' : undefined}
        data-slot="sortable-item"
        data-value={value}
        ref={isOverlay ? undefined : setNodeRef}
        role={isOverlay ? 'presentation' : role}
        style={itemStyle}
      >
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}

export type SortableItemHandleProps = ComponentPropsWithoutRef<'button'> & {
  cursor?: boolean;
};

export function SortableItemHandle({
  'aria-label': ariaLabel,
  children,
  className,
  cursor = true,
  disabled,
  type = 'button',
  ...props
}: SortableItemHandleProps) {
  const t = useT();
  const context = useContext(SortableItemContext);
  if (!context) throw new Error('SortableItemHandle must be used within SortableItem.');

  const { attributes, disabled: itemDisabled, isDragging, isOverlay, listeners } = context;
  const isDisabled = disabled || itemDisabled || isOverlay;

  return (
    <button
      {...props}
      {...attributes}
      {...listeners}
      aria-label={ariaLabel ?? t('Reorder item')}
      className={joinClasses(
        styles.handle,
        cursor && styles.handleCursor,
        isDragging && styles.handleDragging,
        className,
      )}
      disabled={isDisabled}
      tabIndex={isOverlay ? -1 : attributes.tabIndex}
      type={type}
    >
      {children}
    </button>
  );
}
