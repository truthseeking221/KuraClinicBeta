'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { useT } from '../../components/foundations/i18n';
import { Badge, BarcodeScanIcon, Button, Input, Kbd } from '../../components/ui';

import { PID_PATTERN } from './catalog';
import { findPatientByPid, waitTone } from './logic';
import type { CollectionPatient, StationRole } from './types';
import styles from './scan-gate.module.css';

export type ScanGateProps = {
  role: StationRole;
  /** Booth queue, already filtered for this station. */
  queue: CollectionPatient[];
  onMatch: (patient: CollectionPatient) => void;
};

const ROLE_TITLE: Record<StationRole, string> = {
  vitals: 'Vital signs station',
  phlebotomy: 'Phlebotomy station',
};

/**
 * Scanner-first entry for booth work. The field owns focus: autofocus on
 * mount, refocus when the window regains focus and nothing else holds it —
 * barcode scanners type into the focused field and send Enter.
 */
export function ScanGate({ onMatch, queue, role }: ScanGateProps) {
  const t = useT();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [browseOpen, setBrowseOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function refocus() {
      if (document.activeElement === document.body) {
        inputRef.current?.focus();
      }
    }
    window.addEventListener('focus', refocus);
    return () => window.removeEventListener('focus', refocus);
  }, []);

  const trimmed = value.trim();
  const formatLooksOff = trimmed !== '' && !PID_PATTERN.test(trimmed);

  function tryLookup() {
    if (!trimmed) return;
    const match = findPatientByPid(queue, trimmed);
    if (match) {
      setError(null);
      setValue('');
      onMatch(match);
    } else {
      setError(`${t('No patient for')} "${trimmed.toUpperCase()}". ${t('Try again')}.`);
      inputRef.current?.select();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      tryLookup();
    } else if (event.key === 'Escape') {
      setValue('');
      setError(null);
    }
  }

  return (
    <section aria-label={t(ROLE_TITLE[role])} className={styles.gate} data-role={role}>
      <div className={styles.glyph} aria-hidden="true">
        <BarcodeScanIcon size={28} />
      </div>
      <h2 className={styles.title}>{t('Scan patient barcode')}</h2>
      <p className={styles.sub}>{t('Hand-scan the printed bill, or type the patient ID.')}</p>

      <div className={styles.field}>
        <Input
          aria-label={t('Patient ID')}
          autoCapitalize="characters"
          error={error}
          helpText={
            formatLooksOff && !error
              ? t('Format looks off — expected e.g. P123456.')
              : undefined
          }
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="P _ _ _ _ _ _"
          ref={inputRef}
          size="lg"
          spellCheck={false}
          value={value}
        />
        <div className={styles.tips}>
          <span>
            <Kbd>Enter</Kbd> {t('look up')}
          </span>
          <span>
            <Kbd>Esc</Kbd> {t('clear — the scanner sends both for you')}
          </span>
        </div>
      </div>

      <div className={styles.browse}>
        <Button
          aria-expanded={browseOpen}
          onClick={() => setBrowseOpen((open) => !open)}
          variant="outline"
        >
          {t('Browse queue')} · {queue.length}
        </Button>
      </div>

      {browseOpen ? (
        <ul aria-label={t('Waiting patients')} className={styles.queueList}>
          {queue.length === 0 ? (
            <li className={styles.queueEmpty}>{t('Queue is clear.')}</li>
          ) : (
            queue.map((patient) => {
              const tone = waitTone(patient.waitingMinutes);
              return (
                <li key={patient.id}>
                  <button
                    className={styles.queueRow}
                    onClick={() => onMatch(patient)}
                    type="button"
                  >
                    <span aria-hidden="true" className={styles.queueAvatar}>
                      {patient.initials}
                    </span>
                    <span className={styles.queueText}>
                      <span className={styles.queueName}>{patient.name}</span>
                      <span className={styles.queueMeta}>
                        {patient.pid} · {patient.checkInAt}
                      </span>
                    </span>
                    <Badge variant={tone === 'danger' ? 'danger' : tone === 'warn' ? 'warning' : 'neutral'}>
                      {patient.waitingMinutes} {t('min')}
                    </Badge>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </section>
  );
}
