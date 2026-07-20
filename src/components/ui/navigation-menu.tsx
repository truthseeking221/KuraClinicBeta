'use client';

import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';

import { ChevronDownIcon } from './icons';
import styles from './navigation-menu.module.css';

function joinClasses(...classes: Array<string | undefined | false>) { return classes.filter(Boolean).join(' '); }
function mergeClassName<State>(base: string, className: string | ((state: State) => string | undefined) | undefined) { return typeof className === 'function' ? (state: State) => joinClasses(base, className(state)) : joinClasses(base, className); }

export type NavigationMenuProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>;
export const NavigationMenu = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Root>, NavigationMenuProps>(function NavigationMenu({ className, ...props }, ref) { return <NavigationMenuPrimitive.Root ref={ref} className={mergeClassName(styles.root, className)} {...props} />; });
export type NavigationMenuListProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;
export const NavigationMenuList = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.List>, NavigationMenuListProps>(function NavigationMenuList({ className, ...props }, ref) { return <NavigationMenuPrimitive.List ref={ref} className={mergeClassName(styles.list, className)} {...props} />; });
export type NavigationMenuItemProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>;
export function NavigationMenuItem(props: NavigationMenuItemProps) { return <NavigationMenuPrimitive.Item {...props} />; }
export type NavigationMenuTriggerProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>;
export const NavigationMenuTrigger = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Trigger>, NavigationMenuTriggerProps>(function NavigationMenuTrigger({ children, className, ...props }, ref) { return <NavigationMenuPrimitive.Trigger ref={ref} className={mergeClassName(styles.trigger, className)} {...props}>{children}<NavigationMenuPrimitive.Icon className={styles.icon}><ChevronDownIcon aria-hidden size={14} /></NavigationMenuPrimitive.Icon></NavigationMenuPrimitive.Trigger>; });
export type NavigationMenuContentProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>;
export const NavigationMenuContent = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Content>, NavigationMenuContentProps>(function NavigationMenuContent({ className, ...props }, ref) { return <NavigationMenuPrimitive.Content ref={ref} className={mergeClassName(styles.content, className)} {...props} />; });
export type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>;
export const NavigationMenuLink = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Link>, NavigationMenuLinkProps>(function NavigationMenuLink({ className, ...props }, ref) { return <NavigationMenuPrimitive.Link ref={ref} className={mergeClassName(styles.link, className)} {...props} />; });
export type NavigationMenuPopupProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Popup>;
export const NavigationMenuPopup = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Popup>, NavigationMenuPopupProps>(function NavigationMenuPopup({ className, ...props }, ref) { return <NavigationMenuPrimitive.Popup ref={ref} className={mergeClassName(styles.popup, className)} {...props} />; });
export type NavigationMenuViewportProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>;
export const NavigationMenuViewport = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Viewport>, NavigationMenuViewportProps>(function NavigationMenuViewport({ className, ...props }, ref) { return <NavigationMenuPrimitive.Viewport ref={ref} className={mergeClassName(styles.viewport, className)} {...props} />; });
export type NavigationMenuPositionerProps = ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Positioner>;
export const NavigationMenuPositioner = forwardRef<ComponentRef<typeof NavigationMenuPrimitive.Positioner>, NavigationMenuPositionerProps>(function NavigationMenuPositioner({ className, sideOffset = 8, ...props }, ref) { return <NavigationMenuPrimitive.Positioner ref={ref} className={mergeClassName(styles.positioner, className)} collisionPadding={16} sideOffset={sideOffset} {...props} />; });
export const NavigationMenuPortal = NavigationMenuPrimitive.Portal;
