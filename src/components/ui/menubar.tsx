'use client';

import { Menu } from '@base-ui/react/menu';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef, HTMLAttributes, ReactNode } from 'react';

import { CheckIcon, ChevronRightIcon } from './icons';
import styles from './menubar.module.css';

function joinClasses(...classes: Array<string | undefined | false>) { return classes.filter(Boolean).join(' '); }
function mergeClassName<State>(base: string, className: string | ((state: State) => string | undefined) | undefined) { return typeof className === 'function' ? (state: State) => joinClasses(base, className(state)) : joinClasses(base, className); }

export type MenubarProps = ComponentPropsWithoutRef<typeof MenubarPrimitive>;
export const Menubar = forwardRef<ComponentRef<typeof MenubarPrimitive>, MenubarProps>(function Menubar({ className, ...props }, ref) {
  return <MenubarPrimitive ref={ref} className={mergeClassName(styles.menubar, className)} {...props} />;
});

export type MenubarMenuProps = ComponentPropsWithoutRef<typeof Menu.Root>;
export function MenubarMenu(props: MenubarMenuProps) { return <Menu.Root {...props} />; }

export type MenubarTriggerProps = ComponentPropsWithoutRef<typeof Menu.Trigger>;
export const MenubarTrigger = forwardRef<HTMLButtonElement, MenubarTriggerProps>(function MenubarTrigger({ className, ...props }, ref) {
  return <Menu.Trigger ref={ref} className={mergeClassName(styles.trigger, className)} {...props} />;
});

export type MenubarContentProps = ComponentPropsWithoutRef<typeof Menu.Popup> & { sideOffset?: number };
export const MenubarContent = forwardRef<ComponentRef<typeof Menu.Popup>, MenubarContentProps>(function MenubarContent({ className, sideOffset = 4, ...props }, ref) {
  return <Menu.Portal><Menu.Positioner className={styles.positioner} sideOffset={sideOffset}><Menu.Popup ref={ref} className={mergeClassName(styles.content, className)} {...props} /></Menu.Positioner></Menu.Portal>;
});

export type MenubarItemProps = ComponentPropsWithoutRef<typeof Menu.Item> & { variant?: 'default' | 'destructive' };
export const MenubarItem = forwardRef<ComponentRef<typeof Menu.Item>, MenubarItemProps>(function MenubarItem({ className, variant = 'default', ...props }, ref) {
  return <Menu.Item ref={ref} className={mergeClassName(joinClasses(styles.item, variant === 'destructive' && styles.destructive), className)} data-variant={variant} {...props} />;
});

export type MenubarCheckboxItemProps = ComponentPropsWithoutRef<typeof Menu.CheckboxItem>;
export const MenubarCheckboxItem = forwardRef<ComponentRef<typeof Menu.CheckboxItem>, MenubarCheckboxItemProps>(function MenubarCheckboxItem({ children, className, ...props }, ref) {
  return <Menu.CheckboxItem ref={ref} className={mergeClassName(styles.selectionItem, className)} {...props}><span className={styles.indicator}><Menu.CheckboxItemIndicator><CheckIcon aria-hidden size={16} /></Menu.CheckboxItemIndicator></span>{children}</Menu.CheckboxItem>;
});

export type MenubarRadioGroupProps = ComponentPropsWithoutRef<typeof Menu.RadioGroup>;
export function MenubarRadioGroup(props: MenubarRadioGroupProps) { return <Menu.RadioGroup {...props} />; }

export type MenubarRadioItemProps = ComponentPropsWithoutRef<typeof Menu.RadioItem>;
export const MenubarRadioItem = forwardRef<ComponentRef<typeof Menu.RadioItem>, MenubarRadioItemProps>(function MenubarRadioItem({ children, className, ...props }, ref) {
  return <Menu.RadioItem ref={ref} className={mergeClassName(styles.selectionItem, className)} {...props}><span className={styles.indicator}><Menu.RadioItemIndicator><CheckIcon aria-hidden size={16} /></Menu.RadioItemIndicator></span>{children}</Menu.RadioItem>;
});

export type MenubarLabelProps = ComponentPropsWithoutRef<typeof Menu.GroupLabel>;
export const MenubarLabel = forwardRef<ComponentRef<typeof Menu.GroupLabel>, MenubarLabelProps>(function MenubarLabel({ className, ...props }, ref) {
  return <Menu.GroupLabel ref={ref} className={mergeClassName(styles.label, className)} {...props} />;
});

export type MenubarSeparatorProps = ComponentPropsWithoutRef<typeof Menu.Separator>;
export const MenubarSeparator = forwardRef<ComponentRef<typeof Menu.Separator>, MenubarSeparatorProps>(function MenubarSeparator({ className, ...props }, ref) {
  return <Menu.Separator ref={ref} className={mergeClassName(styles.separator, className)} {...props} />;
});

export type MenubarShortcutProps = HTMLAttributes<HTMLSpanElement>;
export function MenubarShortcut({ className, ...props }: MenubarShortcutProps) { return <span className={joinClasses(styles.shortcut, className)} {...props} />; }

export type MenubarSubProps = ComponentPropsWithoutRef<typeof Menu.SubmenuRoot>;
export function MenubarSub(props: MenubarSubProps) { return <Menu.SubmenuRoot {...props} />; }

export type MenubarSubTriggerProps = ComponentPropsWithoutRef<typeof Menu.SubmenuTrigger> & { children: ReactNode };
export const MenubarSubTrigger = forwardRef<ComponentRef<typeof Menu.SubmenuTrigger>, MenubarSubTriggerProps>(function MenubarSubTrigger({ children, className, ...props }, ref) {
  return <Menu.SubmenuTrigger ref={ref} className={mergeClassName(styles.item, className)} {...props}>{children}<ChevronRightIcon aria-hidden className={styles.subIcon} size={16} /></Menu.SubmenuTrigger>;
});

export type MenubarSubContentProps = MenubarContentProps;
export const MenubarSubContent = forwardRef<ComponentRef<typeof Menu.Popup>, MenubarSubContentProps>(function MenubarSubContent({ className, sideOffset = -4, ...props }, ref) {
  return <Menu.Portal><Menu.Positioner className={styles.positioner} alignOffset={-4} sideOffset={sideOffset}><Menu.Popup ref={ref} className={mergeClassName(styles.content, className)} {...props} /></Menu.Positioner></Menu.Portal>;
});
