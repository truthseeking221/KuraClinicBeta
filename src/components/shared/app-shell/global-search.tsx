'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Kbd,
} from '../../ui';
import styles from './global-search.module.css';

export type GlobalSearchItem = {
  id: string;
  label: string;
  /** Secondary line: destination context, masked identifiers, or the disabled reason. */
  hint?: string;
  icon?: ReactNode;
  keywords?: string[];
  shortcut?: string;
  /** Unavailable actions stay visible; `hint` must then carry the gate reason. */
  disabled?: boolean;
  onSelect?: () => void;
};

export type GlobalSearchSection = {
  id: string;
  heading: string;
  items: GlobalSearchItem[];
};

export type GlobalSearchProps = {
  /** Permission-filtered registry supplied by the application shell. */
  sections: GlobalSearchSection[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Attach the global ⌘K / Ctrl+K listener. Exactly one owner per page. */
  hotkey?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  /** Shown when nothing matches; defaults to explaining the reception doors. */
  emptyContent?: ReactNode;
};

const DEFAULT_EMPTY = (
  <span className={styles.empty}>
    <span>No authorised match.</span>
    <span className={styles.emptyHint}>
      Patients resolve by exact phone or booking code, or from recent patients. Names are never
      searchable across the registry.
    </span>
  </span>
);

/**
 * The shell-owned ⌘K palette: renders an already permission-filtered registry
 * through the canonical Command component and owns the global hotkey. Records
 * resolve through the reception doors only; selecting a consequential action
 * starts its governed flow — nothing clinical completes inside the palette.
 */
export function GlobalSearch({
  description = 'Search the destinations and actions available in your current workspace.',
  emptyContent = DEFAULT_EMPTY,
  hotkey = true,
  onOpenChange,
  open,
  placeholder = 'Exact phone, booking code, test, or action',
  sections,
  title = 'Search Kura',
}: GlobalSearchProps) {
  useEffect(() => {
    if (!hotkey) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hotkey, onOpenChange, open]);

  return (
    <CommandDialog description={description} onOpenChange={onOpenChange} open={open} title={title}>
      <Command label={typeof title === 'string' ? title : 'Global search'} loop>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyContent}</CommandEmpty>
          {sections.map((section) => (
            <CommandGroup heading={section.heading} key={section.id}>
              {section.items.map((item) => (
                <CommandItem
                  disabled={item.disabled}
                  key={item.id}
                  keywords={item.keywords}
                  onSelect={() => {
                    item.onSelect?.();
                    onOpenChange(false);
                  }}
                  value={item.id}
                >
                  {item.icon}
                  <span className={styles.itemBody}>
                    <span>{item.label}</span>
                    {item.hint ? <span className={styles.itemHint}>{item.hint}</span> : null}
                  </span>
                  {item.shortcut ? (
                    <CommandShortcut>
                      <Kbd>{item.shortcut}</Kbd>
                    </CommandShortcut>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
