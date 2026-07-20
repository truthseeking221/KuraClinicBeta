'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import {
  Button,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Checkbox,
  CloseIcon,
  FilterIcon,
  IconButton,
  Input,
  Kbd,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../ui';
import styles from './filters.module.css';

export type FilterOption<T = string> = {
  value: T;
  label: string;
  icon?: ReactNode;
  metadata?: Record<string, unknown>;
  disabled?: boolean;
};

export type FilterOperator = {
  value: string;
  label: string;
  supportsMultiple?: boolean;
};

export type CustomRendererProps<T = string> = {
  field: FilterFieldConfig<T>;
  values: T[];
  operator: string;
  onChange: (values: T[]) => void;
};

type FilterFieldBase<T> = {
  key?: string;
  label?: string;
  icon?: ReactNode;
  group?: string;
  fields?: readonly FilterFieldConfig<T>[];
  options?: readonly FilterOption<T>[];
  operators?: readonly FilterOperator[];
  placeholder?: string;
  searchable?: boolean;
  maxSelections?: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  pattern?: string;
  validation?: (value: unknown) => boolean | { valid: boolean; message?: string };
  allowCustomValues?: boolean;
  disabled?: boolean;
  defaultOperator?: string;
};

export type FilterFieldConfig<T = string> = FilterFieldBase<T> & {
  type?: 'select' | 'multiselect' | 'text' | 'custom' | 'separator';
  customRenderer?: (props: CustomRendererProps<T>) => ReactNode;
  customValueRenderer?: (values: T[], options: readonly FilterOption<T>[]) => ReactNode;
};

export type FilterFieldGroup<T = string> = {
  group?: string;
  fields: readonly FilterFieldConfig<T>[];
};

export type FilterFieldsConfig<T = string> =
  | readonly FilterFieldConfig<T>[]
  | readonly FilterFieldGroup<T>[];

export type Filter<T = string> = {
  id: string;
  field: string;
  operator: string;
  values: T[];
};

export type FilterGroup<T = string> = {
  id: string;
  label?: string;
  filters: Filter<T>[];
  fields: readonly FilterFieldConfig<T>[];
};

export type FilterI18nConfig = {
  addFilter: string;
  addFilterTitle: string;
  searchFields: string;
  noFieldsFound: string;
  noResultsFound: string;
  select: string;
  selected: string;
  selectedCount: string;
  typeAndPressEnter: string;
  back: string;
  removeFilter: (field: string) => string;
  operators: {
    is: string;
    isNot: string;
    isAnyOf: string;
    isNotAnyOf: string;
    includesAll: string;
    excludesAll: string;
    contains: string;
    notContains: string;
    startsWith: string;
    endsWith: string;
    isExactly: string;
    empty: string;
    notEmpty: string;
  };
  placeholders: {
    enterField: (fieldLabel: string) => string;
    searchField: (fieldLabel: string) => string;
  };
};

export type FilterI18nOverrides = Partial<Omit<FilterI18nConfig, 'operators' | 'placeholders'>> & {
  operators?: Partial<FilterI18nConfig['operators']>;
  placeholders?: Partial<FilterI18nConfig['placeholders']>;
};

export const DEFAULT_I18N: FilterI18nConfig = {
  addFilter: 'Filter',
  addFilterTitle: 'Add filter',
  searchFields: 'Filter…',
  noFieldsFound: 'No filters found.',
  noResultsFound: 'No results found.',
  select: 'Select…',
  selected: 'selected',
  selectedCount: 'selected',
  typeAndPressEnter: 'Type a value and press Enter to add it.',
  back: 'Back',
  removeFilter: (field) => `Remove ${field} filter`,
  operators: {
    is: 'is',
    isNot: 'is not',
    isAnyOf: 'is any of',
    isNotAnyOf: 'is not any of',
    includesAll: 'includes all',
    excludesAll: 'excludes all',
    contains: 'contains',
    notContains: 'does not contain',
    startsWith: 'starts with',
    endsWith: 'ends with',
    isExactly: 'is exactly',
    empty: 'is empty',
    notEmpty: 'is not empty',
  },
  placeholders: {
    enterField: (fieldLabel) => `Enter ${fieldLabel.toLowerCase()}…`,
    searchField: (fieldLabel) => `Search ${fieldLabel.toLowerCase()}…`,
  },
};

export const DEFAULT_OPERATORS: Record<'select' | 'multiselect' | 'text' | 'custom', FilterOperator[]> = {
  select: [
    { value: 'is', label: DEFAULT_I18N.operators.is },
    { value: 'is_not', label: DEFAULT_I18N.operators.isNot },
    { value: 'empty', label: DEFAULT_I18N.operators.empty },
    { value: 'not_empty', label: DEFAULT_I18N.operators.notEmpty },
  ],
  multiselect: [
    { value: 'is_any_of', label: DEFAULT_I18N.operators.isAnyOf },
    { value: 'is_not_any_of', label: DEFAULT_I18N.operators.isNotAnyOf },
    { value: 'includes_all', label: DEFAULT_I18N.operators.includesAll },
    { value: 'excludes_all', label: DEFAULT_I18N.operators.excludesAll },
    { value: 'empty', label: DEFAULT_I18N.operators.empty },
    { value: 'not_empty', label: DEFAULT_I18N.operators.notEmpty },
  ],
  text: [
    { value: 'contains', label: DEFAULT_I18N.operators.contains },
    { value: 'not_contains', label: DEFAULT_I18N.operators.notContains },
    { value: 'starts_with', label: DEFAULT_I18N.operators.startsWith },
    { value: 'ends_with', label: DEFAULT_I18N.operators.endsWith },
    { value: 'is', label: DEFAULT_I18N.operators.isExactly },
    { value: 'empty', label: DEFAULT_I18N.operators.empty },
    { value: 'not_empty', label: DEFAULT_I18N.operators.notEmpty },
  ],
  custom: [
    { value: 'is', label: DEFAULT_I18N.operators.is },
    { value: 'empty', label: DEFAULT_I18N.operators.empty },
    { value: 'not_empty', label: DEFAULT_I18N.operators.notEmpty },
  ],
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function mergeI18n(overrides?: FilterI18nOverrides): FilterI18nConfig {
  return {
    ...DEFAULT_I18N,
    ...overrides,
    operators: { ...DEFAULT_I18N.operators, ...overrides?.operators },
    placeholders: { ...DEFAULT_I18N.placeholders, ...overrides?.placeholders },
  };
}

function flattenFields<T>(fields: FilterFieldsConfig<T>): FilterFieldConfig<T>[] {
  return fields.flatMap((entry) => {
    if ('fields' in entry && Array.isArray(entry.fields)) return [...entry.fields];
    return [entry as FilterFieldConfig<T>];
  });
}

function fieldMap<T>(fields: FilterFieldsConfig<T>) {
  return Object.fromEntries(
    flattenFields(fields)
      .filter((field) => Boolean(field.key))
      .map((field) => [field.key as string, field]),
  ) as Record<string, FilterFieldConfig<T>>;
}

function filterType<T>(field: FilterFieldConfig<T>) {
  return field.type ?? 'select';
}

function needsValue(operator: string) {
  return operator !== 'empty' && operator !== 'not_empty';
}

function operatorsForField<T>(field: FilterFieldConfig<T>, values: T[], i18n: FilterI18nConfig) {
  if (field.operators) return [...field.operators];

  const operators = {
    select: DEFAULT_OPERATORS.select.map((operator) => ({
      ...operator,
      label:
        operator.value === 'is'
          ? i18n.operators.is
          : operator.value === 'is_not'
            ? i18n.operators.isNot
            : operator.value === 'empty'
              ? i18n.operators.empty
              : i18n.operators.notEmpty,
    })),
    multiselect: DEFAULT_OPERATORS.multiselect.map((operator) => ({
      ...operator,
      label:
        operator.value === 'is_any_of'
          ? i18n.operators.isAnyOf
          : operator.value === 'is_not_any_of'
            ? i18n.operators.isNotAnyOf
            : operator.value === 'includes_all'
              ? i18n.operators.includesAll
              : operator.value === 'excludes_all'
                ? i18n.operators.excludesAll
                : operator.value === 'empty'
                  ? i18n.operators.empty
                  : i18n.operators.notEmpty,
    })),
    text: DEFAULT_OPERATORS.text.map((operator) => ({
      ...operator,
      label:
        operator.value === 'contains'
          ? i18n.operators.contains
          : operator.value === 'not_contains'
            ? i18n.operators.notContains
            : operator.value === 'starts_with'
              ? i18n.operators.startsWith
              : operator.value === 'ends_with'
                ? i18n.operators.endsWith
                : operator.value === 'is'
                  ? i18n.operators.isExactly
                  : operator.value === 'empty'
                    ? i18n.operators.empty
                    : i18n.operators.notEmpty,
    })),
    custom: DEFAULT_OPERATORS.custom.map((operator) => ({
      ...operator,
      label: operator.value === 'is' ? i18n.operators.is : operator.value === 'empty' ? i18n.operators.empty : i18n.operators.notEmpty,
    })),
  };

  const type = filterType(field);
  if (type === 'select' && values.length > 1) return operators.multiselect;
  if (type === 'separator') return [];
  return operators[type];
}

function operatorLabel<T>(field: FilterFieldConfig<T>, filter: Filter<T>, i18n: FilterI18nConfig) {
  return (
    operatorsForField(field, filter.values, i18n).find((operator) => operator.value === filter.operator)
      ?.label ?? filter.operator.replaceAll('_', ' ')
  );
}

function valuesEqual<T>(left: T, right: T) {
  return Object.is(left, right);
}

function valueLabel<T>(field: FilterFieldConfig<T>, values: T[], i18n: FilterI18nConfig): ReactNode {
  if (field.customValueRenderer) return field.customValueRenderer(values, field.options ?? []);
  if (values.length === 0) return i18n.select;
  const labels = values.map(
    (value) => field.options?.find((option) => valuesEqual(option.value, value))?.label ?? String(value),
  );
  if (labels.length === 1) return labels[0];
  return `${labels.length} ${i18n.selectedCount}`;
}

function buttonSize(size: FiltersProps['size']) {
  if (size === 'compact') return 'compact' as const;
  if (size === 'sm') return 'sm' as const;
  if (size === 'lg') return 'lg' as const;
  return 'md' as const;
}

function inputSize(size: FiltersProps['size']) {
  if (size === 'lg') return 'lg' as const;
  if (size === 'default') return 'md' as const;
  return 'sm' as const;
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function validateText<T>(field: FilterFieldConfig<T>, value: string) {
  if (field.pattern && !new RegExp(field.pattern).test(value)) return 'Enter a valid value.';
  const validation = field.validation?.(value);
  if (validation === false) return 'Enter a valid value.';
  if (typeof validation === 'object' && !validation.valid) return validation.message ?? 'Enter a valid value.';
  return undefined;
}

type OperatorMenuProps<T> = {
  field: FilterFieldConfig<T>;
  filter: Filter<T>;
  i18n: FilterI18nConfig;
  size: NonNullable<FiltersProps['size']>;
  onChange: (operator: string) => void;
};

function OperatorMenu<T>({ field, filter, i18n, onChange, size }: OperatorMenuProps<T>) {
  const operators = operatorsForField(field, filter.values, i18n);
  const label = operatorLabel(field, filter, i18n);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button aria-label={`Change ${field.label ?? 'filter'} operator`} className={styles.chipControl} size={buttonSize(size)} variant="ghost">
            {label}
            <ChevronDownIcon aria-hidden="true" />
          </Button>
        }
      />
      <PopoverContent aria-label={`Operators for ${field.label ?? 'filter'}`} className={styles.operatorMenu} initialFocus={false} role="dialog">
        <div className={styles.menuList} role="listbox">
          {operators.map((operator) => (
            <Button
              aria-selected={filter.operator === operator.value}
              className={styles.menuOption}
              key={operator.value}
              onClick={() => onChange(operator.value)}
              role="option"
              size="sm"
              variant="ghost"
            >
              <span>{operator.label}</span>
              {filter.operator === operator.value ? <CheckIcon aria-hidden="true" /> : null}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type OptionPickerProps<T> = {
  field: FilterFieldConfig<T>;
  values: T[];
  i18n: FilterI18nConfig;
  size: NonNullable<FiltersProps['size']>;
  onChange: (values: T[]) => void;
  closeOnSelect?: boolean;
};

function OptionPicker<T>({ closeOnSelect = false, field, i18n, onChange, size, values }: OptionPickerProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const isMultiple = filterType(field) === 'multiselect';
  const options = useMemo(
    () =>
      (field.options ?? []).filter((option) => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    [field.options, query],
  );

  function choose(value: T) {
    const selected = values.some((entry) => valuesEqual(entry, value));
    const next = isMultiple
      ? selected
        ? values.filter((entry) => !valuesEqual(entry, value))
        : [...values, value]
      : [value];
    onChange(next);
    if (!isMultiple || closeOnSelect) setOpen(false);
  }

  function addCustomValue() {
    if (!query.trim()) return;
    choose(query.trim() as T);
    setQuery('');
  }

  const reachedLimit = Boolean(field.maxSelections && values.length >= field.maxSelections);

  return (
    <Popover
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setQuery('');
      }}
      open={open}
    >
      <PopoverTrigger
        render={
          <Button aria-label={`Choose ${field.label ?? 'filter'} value`} className={joinClasses(styles.chipControl, styles.valueControl)} size={buttonSize(size)} variant="ghost">
            <span className={styles.valueLabel}>{valueLabel(field, values, i18n)}</span>
            <ChevronDownIcon aria-hidden="true" />
          </Button>
        }
      />
      <PopoverContent aria-label={`Values for ${field.label ?? 'filter'}`} className={styles.valueMenu} initialFocus={false} role="dialog">
        {field.searchable !== false ? (
          <Input
            aria-label={i18n.placeholders.searchField(field.label ?? 'filter')}
            className={styles.menuSearch}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder={i18n.placeholders.searchField(field.label ?? 'filter')}
            size="sm"
            value={query}
          />
        ) : null}
        <div className={styles.optionList} role="listbox">
          {options.map((option) => {
            const selected = values.some((entry) => valuesEqual(entry, option.value));
            const disabled = Boolean(option.disabled || (!selected && reachedLimit));
            return (
              <Checkbox
                aria-selected={selected}
                checked={selected}
                disabled={disabled}
                key={String(option.value)}
                onCheckedChange={() => choose(option.value)}
              >
                {option.icon}
                <span>{option.label}</span>
              </Checkbox>
            );
          })}
          {options.length === 0 && !field.allowCustomValues ? (
            <p className={styles.emptyMessage}>{i18n.noResultsFound}</p>
          ) : null}
          {field.allowCustomValues && query.trim() ? (
            <Button className={styles.customValue} onClick={addCustomValue} size="sm" variant="ghost">
              {query.trim()}
            </Button>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type TextValueProps<T> = {
  field: FilterFieldConfig<T>;
  values: T[];
  i18n: FilterI18nConfig;
  size: NonNullable<FiltersProps['size']>;
  onChange: (values: T[]) => void;
};

function TextValue<T>({ field, i18n, onChange, size, values }: TextValueProps<T>) {
  const [error, setError] = useState<string>();
  const value = String(values[0] ?? '');
  const isNumeric = field.min !== undefined || field.max !== undefined || field.step !== undefined;

  return (
    <Input
      aria-label={i18n.placeholders.enterField(field.label ?? 'filter')}
      className={styles.chipInput}
      error={error}
      max={field.max}
      min={field.min}
      onBlur={() => setError(validateText(field, value))}
      onChange={(event) => {
        const nextValue = event.currentTarget.value;
        setError(undefined);
        onChange([nextValue as T]);
      }}
      placeholder={field.placeholder ?? i18n.placeholders.enterField(field.label ?? 'filter')}
      prefix={field.prefix}
      step={field.step}
      suffix={field.suffix}
      size={inputSize(size)}
      type={isNumeric ? 'number' : 'text'}
      value={value}
    />
  );
}

type FilterValueControlProps<T> = {
  field: FilterFieldConfig<T>;
  filter: Filter<T>;
  i18n: FilterI18nConfig;
  size: NonNullable<FiltersProps['size']>;
  onChange: (values: T[]) => void;
};

function FilterValueControl<T>({ field, filter, i18n, onChange, size }: FilterValueControlProps<T>) {
  if (!needsValue(filter.operator)) return null;
  if (filterType(field) === 'custom') {
    return field.customRenderer?.({ field, values: filter.values, operator: filter.operator, onChange }) ?? null;
  }
  if (filterType(field) === 'text') {
    return <TextValue field={field} i18n={i18n} onChange={onChange} size={size} values={filter.values} />;
  }
  return <OptionPicker field={field} i18n={i18n} onChange={onChange} size={size} values={filter.values} />;
}

type FilterChipProps<T> = {
  field: FilterFieldConfig<T>;
  filter: Filter<T>;
  i18n: FilterI18nConfig;
  radius: NonNullable<FiltersProps['radius']>;
  size: NonNullable<FiltersProps['size']>;
  onChange: (updates: Partial<Filter<T>>) => void;
  onRemove: () => void;
};

function FilterChip<T>({ field, filter, i18n, onChange, onRemove, radius, size }: FilterChipProps<T>) {
  return (
    <div aria-label={`${field.label ?? 'Filter'} filter`} className={styles.chip} data-radius={radius} data-size={size} role="group">
      <span className={styles.fieldLabel}>
        {field.icon}
        <span>{field.label}</span>
      </span>
      <OperatorMenu
        field={field}
        filter={filter}
        i18n={i18n}
        onChange={(operator) => onChange({ operator, values: needsValue(operator) ? filter.values : [] })}
        size={size}
      />
      <FilterValueControl field={field} filter={filter} i18n={i18n} onChange={(values) => onChange({ values })} size={size} />
      <IconButton aria-label={i18n.removeFilter(field.label ?? 'filter')} className={styles.removeButton} onClick={onRemove} size="micro" variant="tertiary">
        <CloseIcon aria-hidden="true" />
      </IconButton>
    </div>
  );
}

export type FiltersContentProps<T = string> = {
  filters: readonly Filter<T>[];
  fields: FilterFieldsConfig<T>;
  onChange: (filters: Filter<T>[]) => void;
  i18n?: FilterI18nOverrides;
  radius?: 'default' | 'full';
  size?: 'compact' | 'sm' | 'default' | 'lg';
};

export function FiltersContent<T = string>({
  fields,
  filters,
  i18n: i18nOverrides,
  onChange,
  radius = 'default',
  size = 'sm',
}: FiltersContentProps<T>) {
  const i18n = mergeI18n(i18nOverrides);
  const fieldsByKey = useMemo(() => fieldMap(fields), [fields]);

  function updateFilter(filterId: string, updates: Partial<Filter<T>>) {
    onChange(
      filters.map((filter) => {
        if (filter.id !== filterId) return filter;
        const updated = { ...filter, ...updates };
        if (!needsValue(updated.operator)) updated.values = [];
        return updated;
      }),
    );
  }

  return (
    <div className={styles.content} data-size={size}>
      {filters.map((filter) => {
        const field = fieldsByKey[filter.field];
        if (!field || filterType(field) === 'separator') return null;
        return (
          <FilterChip
            field={field}
            filter={filter}
            i18n={i18n}
            key={filter.id}
            onChange={(updates) => updateFilter(filter.id, updates)}
            onRemove={() => onChange(filters.filter((entry) => entry.id !== filter.id))}
            radius={radius}
            size={size}
          />
        );
      })}
    </div>
  );
}

type FilterAddMenuProps<T> = {
  allowMultiple: boolean;
  collapseAddButton: boolean;
  enableShortcut: boolean;
  fields: FilterFieldsConfig<T>;
  filters: readonly Filter<T>[];
  i18n: FilterI18nConfig;
  menuPopupClassName?: string;
  onChange: (filters: Filter<T>[]) => void;
  shortcutKey: string;
  shortcutLabel?: string;
  showSearchInput: boolean;
  size: NonNullable<FiltersProps['size']>;
  trigger?: ReactElement;
};

function FilterAddMenu<T>({
  allowMultiple,
  collapseAddButton,
  enableShortcut,
  fields,
  filters,
  i18n,
  menuPopupClassName,
  onChange,
  shortcutKey,
  shortcutLabel,
  showSearchInput,
  size,
  trigger,
}: FilterAddMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeFieldKey, setActiveFieldKey] = useState<string>();
  const [sessionFilterId, setSessionFilterId] = useState<string>();
  const fieldsByKey = useMemo(() => fieldMap(fields), [fields]);
  const selectableFields = useMemo(
    () =>
      flattenFields(fields).filter((field) => {
        if (!field.key || filterType(field) === 'separator' || field.disabled) return false;
        if (allowMultiple) return true;
        // Option fields stay listed while filtered so the trigger reopens the
        // existing filter's values instead of dead-ending on an empty menu.
        const type = filterType(field);
        if (type === 'select' || type === 'multiselect') return true;
        return !filters.some((filter) => filter.field === field.key);
      }),
    [allowMultiple, fields, filters],
  );
  const shownFields = useMemo(
    () =>
      selectableFields.filter(
        (field) => !query || field.label?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [query, selectableFields],
  );
  const activeField = activeFieldKey ? fieldsByKey[activeFieldKey] : undefined;
  // Controlled owners may rebuild Filter objects with their own ids on every
  // change, so the id lookup falls back to the latest filter for the active
  // field: always when only one filter per field is allowed, otherwise only
  // after this menu session created one.
  const activeFieldFilters = activeFieldKey
    ? filters.filter((filter) => filter.field === activeFieldKey)
    : [];
  const sessionFilter =
    (sessionFilterId ? filters.find((filter) => filter.id === sessionFilterId) : undefined) ??
    (sessionFilterId || !allowMultiple
      ? activeFieldFilters[activeFieldFilters.length - 1]
      : undefined);

  useEffect(() => {
    if (!enableShortcut) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        Boolean(target?.isContentEditable);
      if (!typing && !open && event.key.toLocaleLowerCase() === shortcutKey.toLocaleLowerCase()) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcut, open, shortcutKey]);

  function resetMenu() {
    setQuery('');
    setActiveFieldKey(undefined);
    setSessionFilterId(undefined);
  }

  function closeMenu() {
    setOpen(false);
    resetMenu();
  }

  function addEmptyFilter(field: FilterFieldConfig<T>) {
    if (!field.key) return;
    if (!allowMultiple && filters.some((filter) => filter.field === field.key)) {
      closeMenu();
      return;
    }
    const type = filterType(field);
    const values = type === 'text' ? ([''] as T[]) : [];
    onChange([...filters, createFilter(field.key, field.defaultOperator ?? (type === 'multiselect' ? 'is_any_of' : 'is'), values)]);
    closeMenu();
  }

  function chooseOption(option: FilterOption<T>) {
    if (!activeField?.key || option.disabled) return;
    const multiple = filterType(activeField) === 'multiselect';
    if (!multiple) {
      const existing = !allowMultiple
        ? filters.find((filter) => filter.field === activeField.key)
        : undefined;
      onChange(
        existing
          ? filters.map((filter) =>
              filter.id === existing.id ? { ...filter, values: [option.value] } : filter,
            )
          : [
              ...filters,
              createFilter(activeField.key, activeField.defaultOperator ?? 'is', [option.value]),
            ],
      );
      closeMenu();
      return;
    }

    const currentValues = sessionFilter?.values ?? [];
    const selected = currentValues.some((value) => valuesEqual(value, option.value));
    const nextValues = selected
      ? currentValues.filter((value) => !valuesEqual(value, option.value))
      : [...currentValues, option.value];

    if (sessionFilter) {
      onChange(
        nextValues.length === 0
          ? filters.filter((filter) => filter.id !== sessionFilter.id)
          : filters.map((filter) => (filter.id === sessionFilter.id ? { ...filter, values: nextValues } : filter)),
      );
      if (nextValues.length === 0) setSessionFilterId(undefined);
      return;
    }

    const next = createFilter(activeField.key, activeField.defaultOperator ?? 'is_any_of', nextValues);
    setSessionFilterId(next.id);
    onChange([...filters, next]);
  }

  function chooseCustomValue() {
    if (!activeField?.allowCustomValues || !activeField.key || !query.trim()) return;
    chooseOption({ label: query.trim(), value: query.trim() as T });
    setQuery('');
  }

  function selectField(field: FilterFieldConfig<T>) {
    if (filterType(field) === 'select' || filterType(field) === 'multiselect') {
      setActiveFieldKey(field.key);
      setQuery('');
      return;
    }
    addEmptyFilter(field);
  }

  const activeOptions = useMemo(
    () =>
      (activeField?.options ?? []).filter(
        (option) => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
    [activeField?.options, query],
  );
  const activeValues = sessionFilter?.values ?? [];
  const maxSelectionsReached = Boolean(activeField?.maxSelections && activeValues.length >= activeField.maxSelections);
  const defaultTrigger = collapseAddButton ? (
    <IconButton aria-label={i18n.addFilterTitle} className={styles.addTrigger} size="default" variant="tertiary">
      <FilterIcon aria-hidden="true" />
    </IconButton>
  ) : (
    <Button className={styles.addTrigger} leadingIcon={<FilterIcon aria-hidden="true" />} size={buttonSize(size)} variant="outline">
      {i18n.addFilter}
    </Button>
  );

  return (
    <Popover
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) resetMenu();
      }}
      open={open}
    >
      <PopoverTrigger render={trigger ?? defaultTrigger} />
      <PopoverContent
        aria-label={activeField ? `${activeField.label} values` : i18n.addFilterTitle}
        className={joinClasses(styles.addMenu, menuPopupClassName)}
        initialFocus={false}
        role="dialog"
      >
        {activeField ? (
          <>
            <div className={styles.menuHeader}>
              <Button className={styles.backButton} onClick={() => { setActiveFieldKey(undefined); setQuery(''); }} size="sm" variant="ghost">
                <ChevronLeftIcon aria-hidden="true" />
                {i18n.back}
              </Button>
              <span>{activeField.label}</span>
            </div>
            {activeField.searchable !== false ? (
              <Input
                aria-label={i18n.placeholders.searchField(activeField.label ?? 'filter')}
                className={styles.menuSearch}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder={i18n.placeholders.searchField(activeField.label ?? 'filter')}
                size="sm"
                value={query}
              />
            ) : null}
            <div className={styles.optionList} role="listbox">
              {activeOptions.map((option) => {
                const selected = activeValues.some((value) => valuesEqual(value, option.value));
                const disabled = Boolean(option.disabled || (!selected && maxSelectionsReached));
                return (
                  <Checkbox
                    aria-selected={selected}
                    checked={selected}
                    disabled={disabled}
                    key={String(option.value)}
                    onCheckedChange={() => chooseOption(option)}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </Checkbox>
                );
              })}
              {activeOptions.length === 0 && !activeField.allowCustomValues ? (
                <p className={styles.emptyMessage}>{i18n.noResultsFound}</p>
              ) : null}
              {activeField.allowCustomValues && query.trim() ? (
                <Button className={styles.customValue} onClick={chooseCustomValue} size="sm" variant="ghost">
                  {query.trim()}
                </Button>
              ) : null}
            </div>
          </>
        ) : (
          <>
            {showSearchInput ? (
              <div className={styles.searchRow}>
                <Input
                  aria-label={i18n.searchFields}
                  className={styles.menuSearch}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  placeholder={i18n.searchFields}
                  size="sm"
                  value={query}
                />
                {enableShortcut && shortcutLabel ? <Kbd>{shortcutLabel}</Kbd> : null}
              </div>
            ) : null}
            <div className={styles.menuList} role="listbox">
              {shownFields.length > 0 ? (
                shownFields.map((field) => (
                  <Button
                    className={styles.menuOption}
                    key={field.key}
                    onClick={() => selectField(field)}
                    role="option"
                    size="sm"
                    variant="ghost"
                  >
                    {field.icon}
                    <span>{field.label}</span>
                    {(filterType(field) === 'select' || filterType(field) === 'multiselect') ? (
                      <ChevronDownIcon aria-hidden="true" className={styles.optionDisclosure} />
                    ) : null}
                  </Button>
                ))
              ) : (
                <p className={styles.emptyMessage}>{i18n.noFieldsFound}</p>
              )}
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export type FiltersProps<T = string> = {
  filters: readonly Filter<T>[];
  fields: FilterFieldsConfig<T>;
  onChange: (filters: Filter<T>[]) => void;
  className?: string;
  variant?: 'solid' | 'default';
  size?: 'compact' | 'sm' | 'default' | 'lg';
  radius?: 'default' | 'full';
  i18n?: FilterI18nOverrides;
  showSearchInput?: boolean;
  trigger?: ReactElement;
  allowMultiple?: boolean;
  menuPopupClassName?: string;
  collapseAddButton?: boolean;
  enableShortcut?: boolean;
  shortcutKey?: string;
  shortcutLabel?: string;
};

/**
 * Controlled query-builder filters. This is a generic visual pattern only:
 * routes own URL serialization, validation rules, permissions, and API mapping.
 */
export function Filters<T = string>({
  allowMultiple = true,
  className,
  collapseAddButton = false,
  enableShortcut = false,
  fields,
  filters,
  i18n: i18nOverrides,
  menuPopupClassName,
  onChange,
  radius = 'default',
  shortcutKey = 'f',
  shortcutLabel = 'F',
  showSearchInput = true,
  size = 'sm',
  trigger,
  variant = 'default',
}: FiltersProps<T>) {
  const i18n = mergeI18n(i18nOverrides);

  return (
    <div className={joinClasses(styles.root, className)} data-radius={radius} data-size={size} data-variant={variant} data-slot="filters">
      <FilterAddMenu
        allowMultiple={allowMultiple}
        collapseAddButton={collapseAddButton}
        enableShortcut={enableShortcut}
        fields={fields}
        filters={filters}
        i18n={i18n}
        menuPopupClassName={menuPopupClassName}
        onChange={onChange}
        shortcutKey={shortcutKey}
        shortcutLabel={shortcutLabel}
        showSearchInput={showSearchInput}
        size={size}
        trigger={trigger}
      />
      <FiltersContent fields={fields} filters={filters} i18n={i18n} onChange={onChange} radius={radius} size={size} />
    </div>
  );
}

export function createFilter<T = string>(field: string, operator = 'is', values: T[] = []): Filter<T> {
  return { id: createId(), field, operator, values };
}

export function createFilterGroup<T = string>(
  id: string,
  label: string,
  fields: readonly FilterFieldConfig<T>[],
  initialFilters: Filter<T>[] = [],
): FilterGroup<T> {
  return { id, label, fields, filters: initialFilters };
}
