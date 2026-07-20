"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { forwardRef } from "react";
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
  ReactNode,
} from "react";

import { CheckIcon, ChevronRightIcon } from "./icons";
import styles from "./context-menu.module.css";

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function mergeClassName<State>(
  baseClassName: string,
  className: string | ((state: State) => string | undefined) | undefined,
) {
  if (typeof className === "function") {
    return (state: State) => joinClasses(baseClassName, className(state));
  }

  return joinClasses(baseClassName, className);
}

/**
 * A desktop-and-keyboard accelerator for a short list of secondary actions.
 * It must never be the only path to an essential, clinical, or destructive task.
 */
export function ContextMenu(props: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

export type ContextMenuPortalProps = ContextMenuPrimitive.Portal.Props;

export function ContextMenuPortal(props: ContextMenuPortalProps) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

export type ContextMenuTriggerProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Trigger
>;
type ContextMenuTriggerKeyDownEvent = Parameters<
  NonNullable<ContextMenuTriggerProps["onKeyDown"]>
>[0];

export const ContextMenuTrigger = forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.Trigger>,
  ContextMenuTriggerProps
>(function ContextMenuTrigger({ className, onKeyDown, ...props }, ref) {
  function handleKeyDown(event: ContextMenuTriggerKeyDownEvent) {
    onKeyDown?.(event);

    const opensContextMenu =
      (event.key === "F10" && event.shiftKey) ||
      event.key === "ContextMenu" ||
      event.key === "Apps";

    if (event.defaultPrevented || !opensContextMenu) {
      return;
    }

    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.dispatchEvent(
      new MouseEvent("contextmenu", {
        bubbles: true,
        button: 2,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      }),
    );
  }

  return (
    <ContextMenuPrimitive.Trigger
      ref={ref}
      data-slot="context-menu-trigger"
      className={mergeClassName(styles.trigger, className)}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});

export type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >;

export function ContextMenuContent({
  align = "start",
  className,
  side = "right",
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        align={align}
        className={styles.positioner}
        side={side}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={mergeClassName(styles.content, className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

export type ContextMenuGroupProps = ContextMenuPrimitive.Group.Props;

export function ContextMenuGroup(props: ContextMenuGroupProps) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

export type ContextMenuLabelProps = ContextMenuPrimitive.GroupLabel.Props & {
  /** Align a text-only label with adjacent selection indicator items. */
  inset?: boolean;
};

export const ContextMenuLabel = forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.GroupLabel>,
  ContextMenuLabelProps
>(function ContextMenuLabel({ className, inset = false, ...props }, ref) {
  return (
    <ContextMenuPrimitive.GroupLabel
      ref={ref}
      data-inset={inset ? "true" : undefined}
      data-slot="context-menu-label"
      className={mergeClassName(styles.label, className)}
      {...props}
    />
  );
});

export type ContextMenuItemProps = ContextMenuPrimitive.Item.Props & {
  /** Use only for a clearly labelled destructive action followed by workflow confirmation. */
  variant?: "default" | "destructive";
  /** Align a text-only item with adjacent selection indicator items. */
  inset?: boolean;
};

export const ContextMenuItem = forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.Item>,
  ContextMenuItemProps
>(function ContextMenuItem(
  { className, inset = false, variant = "default", ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      data-inset={inset ? "true" : undefined}
      data-slot="context-menu-item"
      data-variant={variant}
      className={mergeClassName(
        joinClasses(
          styles.item,
          variant === "destructive" && styles.destructive,
        ),
        className,
      )}
      {...props}
    />
  );
});

export type ContextMenuCheckboxItemProps =
  ContextMenuPrimitive.CheckboxItem.Props & {
    /** Align a selection item with adjacent text-only items. */
    inset?: boolean;
    children: ReactNode;
  };

export const ContextMenuCheckboxItem = forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(function ContextMenuCheckboxItem(
  { children, className, inset = false, ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      data-inset={inset ? "true" : undefined}
      data-slot="context-menu-checkbox-item"
      className={mergeClassName(styles.checkboxItem, className)}
      {...props}
    >
      <span className={styles.indicator} aria-hidden="true">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon aria-hidden="true" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
});

export type ContextMenuRadioGroupProps = ContextMenuPrimitive.RadioGroup.Props;

export function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

export type ContextMenuRadioItemProps = ContextMenuPrimitive.RadioItem.Props & {
  /** Align a selection item with adjacent text-only items. */
  inset?: boolean;
  children: ReactNode;
};

export const ContextMenuRadioItem = forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.RadioItem>,
  ContextMenuRadioItemProps
>(function ContextMenuRadioItem(
  { children, className, inset = false, ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      data-inset={inset ? "true" : undefined}
      data-slot="context-menu-radio-item"
      className={mergeClassName(styles.radioItem, className)}
      {...props}
    >
      <span className={styles.indicator} aria-hidden="true">
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon aria-hidden="true" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
});

export type ContextMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>;

export const ContextMenuSeparator = forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.Separator>,
  ContextMenuSeparatorProps
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      data-slot="context-menu-separator"
      className={mergeClassName(styles.separator, className)}
      {...props}
    />
  );
});

export type ContextMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

export function ContextMenuShortcut({
  className,
  ...props
}: ContextMenuShortcutProps) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={joinClasses(styles.shortcut, className)}
      {...props}
    />
  );
}

export type ContextMenuSubProps = ContextMenuPrimitive.SubmenuRoot.Props;

export function ContextMenuSub(props: ContextMenuSubProps) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  );
}

export type ContextMenuSubTriggerProps =
  ContextMenuPrimitive.SubmenuTrigger.Props & {
    /** Align a text-only item with adjacent selection indicator items. */
    inset?: boolean;
    children: ReactNode;
  };

export const ContextMenuSubTrigger = forwardRef<
  ComponentRef<typeof ContextMenuPrimitive.SubmenuTrigger>,
  ContextMenuSubTriggerProps
>(function ContextMenuSubTrigger(
  { children, className, inset = false, ...props },
  ref,
) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      ref={ref}
      data-inset={inset ? "true" : undefined}
      data-slot="context-menu-sub-trigger"
      className={mergeClassName(styles.subTrigger, className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className={styles.subTriggerIcon} aria-hidden="true" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
});

export type ContextMenuSubContentProps = ContextMenuContentProps;

export function ContextMenuSubContent({
  className,
  side = "right",
  ...props
}: ContextMenuSubContentProps) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={mergeClassName(styles.subContent, className)}
      side={side}
      {...props}
    />
  );
}
