'use client';

import { useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';

import { CloseButton } from './close-button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from './dialog';
import type { KuraIconProps } from './icons';
import styles from './settings-modal.module.css';

export type SettingsModalSection = {
  id: string;
  label: string;
  icon: ComponentType<KuraIconProps>;
  content: ReactNode;
  group?: string;
};

export type SettingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sections: readonly SettingsModalSection[];
  defaultSection?: string;
  title?: string;
};

/** Kura settings shell with a fixed navigation rail and scrollable panel. */
export function SettingsModal({
  defaultSection,
  onOpenChange,
  open,
  sections,
  title = 'Settings',
}: SettingsModalProps) {
  const firstSection = sections[0]?.id;
  const [activeId, setActiveId] = useState(defaultSection ?? firstSection);
  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];
  const groups = useMemo(() => {
    const entries = new Map<string, SettingsModalSection[]>();
    sections.forEach((section) => {
      const group = section.group ?? title;
      entries.set(group, [...(entries.get(group) ?? []), section]);
    });
    return Array.from(entries.entries());
  }, [sections, title]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-label={title}
        className={styles.panel}
        closeLabel={`Close ${title.toLowerCase()}`}
        mobilePresentation="full"
        overlayClassName={styles.overlay}
        showCloseButton={false}
        size="full"
      >
        <div className={styles.layout} data-slot="settings-modal-layout">
          <nav aria-label={`${title} sections`} className={styles.rail}>
            {groups.map(([group, items]) => (
              <div className={styles.navGroup} key={group}>
                <span className={styles.groupLabel}>{group}</span>
                <div className={styles.navItems}>
                  {items.map((section) => {
                    const selected = section.id === activeSection?.id;
                    const Icon = section.icon;
                    return (
                      <button
                        aria-current={selected ? 'page' : undefined}
                        className={styles.navItem}
                        data-selected={selected ? 'true' : undefined}
                        key={section.id}
                        onClick={() => setActiveId(section.id)}
                        type="button"
                      >
                        <Icon aria-hidden size={20} />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <section className={styles.main}>
            <header className={styles.header}>
              <DialogTitle>{activeSection?.label ?? title}</DialogTitle>
              <DialogClose asChild>
                <CloseButton aria-label={`Close ${title.toLowerCase()}`} size="md" />
              </DialogClose>
            </header>
            <div className={styles.body}>{activeSection?.content}</div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
