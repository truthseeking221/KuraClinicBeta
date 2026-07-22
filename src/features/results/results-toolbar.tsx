'use client';

import { useT } from '../../components/foundations/i18n';
import { Button } from '../../components/ui/button';
import { SearchIcon } from '../../components/ui/icons';
import { Input } from '../../components/ui/input';
import { SegmentedToggle } from '../../components/ui/segmented-toggle';
import { Select } from '../../components/ui/select';
import type { ResultsFilter } from './types';
import styles from './results-toolbar.module.css';

export type ResultsHistoryMode = 'latest' | 'full';

export type ResultsToolbarProps = {
  query: string;
  filter: ResultsFilter;
  historyMode: ResultsHistoryMode;
  onQueryChange: (query: string) => void;
  onFilterChange: (filter: ResultsFilter) => void;
  onHistoryModeChange: (mode: ResultsHistoryMode) => void;
  onReset: () => void;
};

const FILTER_OPTIONS = [
  { value: 'all', label: 'All results' },
  { value: 'flagged', label: 'Flagged' },
  { value: 'critical', label: 'Critical only' },
  { value: 'no_reference', label: 'No reference' },
  { value: 'pending', label: 'Pending' },
] as const;

const HISTORY_OPTIONS = [
  { value: 'latest', label: 'Latest only' },
  { value: 'full', label: 'Full history' },
] as const;

export function ResultsToolbar({
  filter,
  historyMode,
  onFilterChange,
  onHistoryModeChange,
  onQueryChange,
  onReset,
  query,
}: ResultsToolbarProps) {
  const t = useT();
  const hasFilters = query.trim().length > 0 || filter !== 'all' || historyMode !== 'full';

  return (
    <section className={styles.toolbar} aria-label={t('Results controls')}>
      <Input
        aria-label={t('Search analytes, codes, or panels')}
        className={styles.search}
        placeholder={t('Search analytes, codes, or panels')}
        prefix={<SearchIcon size={16} />}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.currentTarget.value)}
      />
      {/* Each control names itself through its own value, so no floating field
          labels sit above a toolbar row and break its shared baseline. */}
      <Select
        aria-label={t('Result filter')}
        className={styles.filter}
        options={FILTER_OPTIONS.map((option) => ({ ...option, label: t(option.label) }))}
        value={filter}
        onChange={(event) => onFilterChange(event.currentTarget.value as ResultsFilter)}
      />
      <SegmentedToggle
        className={styles.history}
        label={t('History display')}
        options={HISTORY_OPTIONS.map((option) => ({ ...option, label: t(option.label) }))}
        value={historyMode}
        onValueChange={(value) => onHistoryModeChange(value as ResultsHistoryMode)}
      />
      <Button
        className={styles.reset}
        disabled={!hasFilters}
        size="sm"
        variant="ghost"
        onClick={onReset}
      >
        {t('Reset')}
      </Button>
    </section>
  );
}
