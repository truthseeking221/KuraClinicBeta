'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import type { ItemInstance } from '@headless-tree/core';
import { createContext, useContext } from 'react';
import type { CSSProperties, ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import { CollapseIcon, ExpandIcon, ChevronDownIcon } from './icons';
import styles from './tree.module.css';

export type TreeToggleIconType = 'chevron' | 'plus-minus';

type TreeInstance = {
  getContainerProps?: () => ComponentPropsWithoutRef<'div'>;
  getDragLineStyle?: () => CSSProperties;
};

type TreeContextValue<T> = {
  indent: number;
  currentItem?: ItemInstance<T>;
  tree?: TreeInstance;
  toggleIconType: TreeToggleIconType;
};

const TreeContext = createContext<TreeContextValue<unknown>>({
  indent: 20,
  toggleIconType: 'chevron',
});

function useTreeContext<T>() {
  return useContext(TreeContext) as TreeContextValue<T>;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export interface TreeProps extends HTMLAttributes<HTMLDivElement> {
  /** Headless Tree instance created with @headless-tree/react. */
  tree: TreeInstance;
  /** Pixel value used for each level of nesting. */
  indent?: number;
  /** Icon language for folder expansion and collapse. */
  toggleIconType?: TreeToggleIconType;
}

export function Tree({
  indent = 20,
  tree,
  className,
  style,
  toggleIconType = 'chevron',
  ...props
}: TreeProps) {
  const containerProps = tree.getContainerProps?.() ?? {};
  const { style: containerStyle, ...otherContainerProps } = {
    ...containerProps,
    ...props,
  };

  return (
    <TreeContext.Provider value={{ indent, tree, toggleIconType }}>
      <div
        data-slot="tree"
        {...otherContainerProps}
        style={{
          ...style,
          ...containerStyle,
          '--tree-indent': `${indent}px`,
        } as CSSProperties}
        className={joinClasses(styles.root, className)}
      />
    </TreeContext.Provider>
  );
}

export interface TreeItemProps<T = unknown>
  extends Omit<useRender.ComponentProps<'button'>, 'indent'> {
  /** Item instance returned by the headless tree. */
  item: ItemInstance<T>;
  /** Overrides the tree-level indentation for this item. */
  indent?: number;
}

export function TreeItem<T = unknown>({
  item,
  className,
  render,
  children,
  indent: itemIndent,
  ...props
}: TreeItemProps<T>) {
  const parentContext = useTreeContext<T>();
  const indent = itemIndent ?? parentContext.indent;
  const itemProps = typeof item.getProps === 'function' ? item.getProps() : {};
  const mergedProps = { ...props, children, ...itemProps };
  const { style: itemStyle, ...otherItemProps } = mergedProps;
  const level = item.getItemMeta().level;

  const defaultProps = {
    'data-slot': 'tree-item',
    'data-tree-level': level,
    'data-focus': typeof item.isFocused === 'function' ? item.isFocused() || false : undefined,
    'data-folder': typeof item.isFolder === 'function' ? item.isFolder() || false : undefined,
    'data-selected': typeof item.isSelected === 'function' ? item.isSelected() || false : undefined,
    'data-drag-target': typeof item.isDragTarget === 'function' ? item.isDragTarget() || false : undefined,
    'data-search-match': typeof item.isMatchingSearch === 'function' ? item.isMatchingSearch() || false : undefined,
    'aria-expanded': item.isFolder() ? item.isExpanded() : undefined,
    style: {
      ...itemStyle,
      '--tree-padding': `${level * indent}px`,
    } as CSSProperties,
    className: joinClasses(styles.item, className),
  };

  return (
    <TreeContext.Provider
      value={{
        ...parentContext,
        currentItem: item as unknown as ItemInstance<unknown>,
      }}
    >
      {useRender({
        defaultTagName: 'button',
        render,
        props: mergeProps<'button'>(defaultProps, otherItemProps),
      })}
    </TreeContext.Provider>
  );
}

export interface TreeItemLabelProps<T = unknown> extends HTMLAttributes<HTMLSpanElement> {
  /** Optional item instance; normally supplied by the surrounding TreeItem. */
  item?: ItemInstance<T>;
}

export function TreeItemLabel<T = unknown>({
  item: propItem,
  children,
  className,
  ...props
}: TreeItemLabelProps<T>) {
  const { currentItem, toggleIconType } = useTreeContext<T>();
  const item = propItem ?? currentItem;

  if (!item) return null;

  const isFolder = item.isFolder();
  const isExpanded = isFolder && item.isExpanded();

  return (
    <span
      data-slot="tree-item-label"
      className={joinClasses(styles.label, className)}
      {...props}
    >
      {isFolder ? (
        toggleIconType === 'plus-minus' ? (
          isExpanded ? (
            <CollapseIcon aria-hidden="true" className={styles.toggleIcon} size={14} />
          ) : (
            <ExpandIcon aria-hidden="true" className={styles.toggleIcon} size={14} />
          )
        ) : (
          <ChevronDownIcon
            aria-hidden="true"
            className={joinClasses(styles.toggleIcon, !isExpanded && styles.toggleIconCollapsed)}
            size={14}
          />
        )
      ) : (
        <span aria-hidden="true" className={styles.leafIndent} />
      )}
      {children ?? item.getItemName()}
    </span>
  );
}

export type TreeDragLineProps = HTMLAttributes<HTMLDivElement>;

export function TreeDragLine({ className, ...props }: TreeDragLineProps) {
  const { tree } = useTreeContext();
  if (!tree?.getDragLineStyle) return null;

  return (
    <div
      aria-hidden="true"
      data-slot="tree-drag-line"
      style={tree.getDragLineStyle()}
      className={joinClasses(styles.dragLine, className)}
      {...props}
    />
  );
}
