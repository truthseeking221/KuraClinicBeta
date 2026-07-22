'use client';

import { useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';

import { useT } from '../foundations/i18n';
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
  /** Controlled section value. Use this when the host owns settings navigation. */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Initial section for uncontrolled use. */
  defaultSection?: string;
  title?: string;
};

/**
 * Kura settings-modal anatomy with canonical tokens, dialog behavior, and
 * icons. It owns shell navigation only; feature content and authority rules
 * stay with the consumer.
 */
export function SettingsModal({
  defaultSection,
  onOpenChange,
  onValueChange,
  open,
  sections,
  title,
  value,
}: SettingsModalProps) {
  const t = useT();
  const resolvedTitle = title ?? t('Settings');
  const firstSection = sections[0]?.id;
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState(
    defaultSection ?? firstSection,
  );
  const activeId = value ?? uncontrolledActiveId;
  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];
  const groups = useMemo(() => {
    const entries = new Map<string, SettingsModalSection[]>();
    sections.forEach((section) => {
      const group = section.group ?? resolvedTitle;
      entries.set(group, [...(entries.get(group) ?? []), section]);
    });
    return Array.from(entries.entries());
  }, [resolvedTitle, sections]);

  const selectSection = (nextId: string) => {
    if (value === undefined) setUncontrolledActiveId(nextId);
    onValueChange?.(nextId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-label={resolvedTitle}
        className={styles.panel}
        closeLabel={`${t('Close')} ${resolvedTitle.toLowerCase()}`}
        mobilePresentation="full"
        overlayClassName={styles.overlay}
        showCloseButton={false}
        size="full"
      >
        <div className={styles.layout} data-slot="settings-modal-layout">
          <nav aria-label={`${resolvedTitle} ${t('sections')}`} className={styles.rail}>
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
                        onClick={() => selectSection(section.id)}
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
              <DialogTitle>{activeSection?.label ?? resolvedTitle}</DialogTitle>
              <DialogClose asChild>
                <CloseButton aria-label={`${t('Close')} ${resolvedTitle.toLowerCase()}`} size="md" />
              </DialogClose>
            </header>
            <div className={styles.body}>
              {sections.map((section) => (
                <div hidden={section.id !== activeSection?.id} key={section.id}>
                  {section.content}
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
