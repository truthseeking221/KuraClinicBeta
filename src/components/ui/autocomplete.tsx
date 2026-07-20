'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactNode,
} from 'react';

import { ChevronDownIcon, SpinnerGapIcon, XIcon } from './icons';
import { IconButton } from './icon-button';
import styles from './autocomplete.module.css';

export type AutocompleteItem = {
  /** Stable, submitted identifier for the selected record. */
  id: string;
  /** Visible option label and default matching text. */
  label: string;
  /** Supporting context, such as a role, clinic, or reference detail. */
  description?: string;
  /** Optional named result group. */
  group?: string;
  /** Additional searchable text that is not necessarily displayed. */
  keywords?: string;
  /** Keeps an option visible but prevents selection. */
  disabled?: boolean;
};

export type AutocompleteRenderState = {
  highlighted: boolean;
  selected: boolean;
};

export type AutocompleteProps<T extends AutocompleteItem = AutocompleteItem> = {
  /** Authoritative options supplied by the owning workflow. Free-form values are not submitted. */
  items: readonly T[];
  /** Visible label. Provide inputProps.aria-label when no label is shown. */
  label?: ReactNode;
  /** Helper text for a safe, informed selection. */
  helperText?: ReactNode;
  /** Submitted hidden-field name for the selected identifier. */
  name?: string;
  id?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Shows the current selection without allowing a new search. */
  readOnly?: boolean;
  /** Preselects the first matching enabled option while searching. */
  autoHighlight?: boolean;
  clearable?: boolean;
  showTrigger?: boolean;
  loading?: boolean;
  /** Explains a recoverable search or data-source failure. */
  errorMessage?: ReactNode;
  /** Explains why a disabled control is unavailable. */
  disabledReason?: ReactNode;
  emptyMessage?: ReactNode;
  noResultsMessage?: ReactNode;
  loadingMessage?: ReactNode;
  /** Additional announced status supplied by an asynchronous owner. */
  statusMessage?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined, item: T | undefined) => void;
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  filterItems?: (items: readonly T[], query: string) => readonly T[];
  renderItem?: (item: T, state: AutocompleteRenderState) => ReactNode;
  inputProps?: Omit<
    ComponentPropsWithoutRef<'input'>,
    | 'aria-activedescendant'
    | 'aria-autocomplete'
    | 'aria-controls'
    | 'aria-expanded'
    | 'aria-invalid'
    | 'aria-required'
    | 'autoComplete'
    | 'disabled'
    | 'id'
    | 'name'
    | 'onBlur'
    | 'onChange'
    | 'onFocus'
    | 'onKeyDown'
    | 'placeholder'
    | 'readOnly'
    | 'role'
    | 'type'
    | 'value'
  >;
};

type AutocompleteGroup<T extends AutocompleteItem> = {
  items: Array<{ item: T; index: number }>;
  label?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function findFirstEnabledIndex<T extends AutocompleteItem>(items: readonly T[]) {
  return items.findIndex((item) => !item.disabled);
}

function findLastEnabledIndex<T extends AutocompleteItem>(items: readonly T[]) {
  return items.findLastIndex((item) => !item.disabled);
}

export function Autocomplete<T extends AutocompleteItem>({
  autoHighlight = false,
  clearable = false,
  defaultOpen = false,
  defaultQuery,
  defaultValue,
  disabled = false,
  disabledReason,
  emptyMessage = 'No options are available.',
  errorMessage,
  filterItems,
  helperText,
  id,
  inputProps,
  items,
  label,
  loading = false,
  loadingMessage = 'Searching options…',
  name,
  noResultsMessage = 'No matching options found.',
  onOpenChange,
  onQueryChange,
  onValueChange,
  open,
  placeholder = 'Search options',
  query,
  readOnly = false,
  renderItem,
  showTrigger = false,
  size = 'md',
  statusMessage,
  value,
}: AutocompleteProps<T>) {
  const generatedId = useId().replaceAll(':', '');
  const fieldId = id ?? `autocomplete-${generatedId}`;
  const listboxId = `${fieldId}-listbox`;
  const helperId = `${fieldId}-helper`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedByDefault = items.find((item) => item.id === defaultValue);
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue);
  const [uncontrolledQuery, setUncontrolledQuery] = useState(
    defaultQuery ?? selectedByDefault?.label ?? '',
  );
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const isValueControlled = value !== undefined;
  const isQueryControlled = query !== undefined;
  const isOpenControlled = open !== undefined;
  const selectedValue = isValueControlled ? value : uncontrolledValue;
  const inputValue = isQueryControlled ? query : uncontrolledQuery;
  const isOpen = isOpenControlled ? open : uncontrolledOpen;
  const selectedItem = items.find((item) => item.id === selectedValue);
  const { className: inputClassName, ...nativeInputProps } = inputProps ?? {};

  const filterForQuery = useCallback(
    (nextQuery: string) => {
      if (filterItems) {
        return [...filterItems(items, nextQuery)];
      }

      const normalizedQuery = nextQuery.trim().toLocaleLowerCase();
      if (!normalizedQuery) return [...items];

      return items.filter((item) =>
        [item.label, item.description, item.keywords]
          .filter(Boolean)
          .join(' ')
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      );
    },
    [filterItems, items],
  );

  const filteredItems = useMemo(() => filterForQuery(inputValue), [filterForQuery, inputValue]);
  const groups = useMemo<AutocompleteGroup<T>[]>(() => {
    const grouped = new Map<string, AutocompleteGroup<T>>();

    filteredItems.forEach((item, index) => {
      const key = item.group ?? '';
      const group = grouped.get(key) ?? { items: [], label: item.group };
      group.items.push({ item, index });
      grouped.set(key, group);
    });

    return [...grouped.values()];
  }, [filteredItems]);

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isOpenControlled, onOpenChange],
  );

  const setQueryState = useCallback(
    (nextQuery: string) => {
      if (!isQueryControlled) {
        setUncontrolledQuery(nextQuery);
      }
      onQueryChange?.(nextQuery);
    },
    [isQueryControlled, onQueryChange],
  );

  const setValueState = useCallback(
    (nextValue: string | undefined, nextItem: T | undefined) => {
      if (!isValueControlled) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue, nextItem);
    },
    [isValueControlled, onValueChange],
  );

  const openWithHighlight = useCallback(
    (direction: 'first' | 'last' = 'first') => {
      const nextIndex = direction === 'first'
        ? findFirstEnabledIndex(filteredItems)
        : findLastEnabledIndex(filteredItems);
      setOpenState(true);
      setHighlightedIndex(autoHighlight || direction === 'last' ? nextIndex : -1);
    },
    [autoHighlight, filteredItems, setOpenState],
  );

  const selectItem = useCallback(
    (item: T) => {
      if (item.disabled) return;

      setValueState(item.id, item);
      setQueryState(item.label);
      setOpenState(false);
      setHighlightedIndex(-1);
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [setOpenState, setQueryState, setValueState],
  );

  const clearSelection = useCallback(() => {
    setValueState(undefined, undefined);
    setQueryState('');
    setOpenState(false);
    setHighlightedIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [setOpenState, setQueryState, setValueState]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenState(false);
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, setOpenState]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    const nextItems = filterForQuery(nextQuery);

    setQueryState(nextQuery);
    if (selectedItem && nextQuery !== selectedItem.label) {
      setValueState(undefined, undefined);
    }
    setOpenState(true);
    setHighlightedIndex(autoHighlight ? findFirstEnabledIndex(nextItems) : -1);
  }

  function moveHighlight(direction: 1 | -1) {
    const enabledIndexes = filteredItems
      .map((item, index) => (!item.disabled ? index : -1))
      .filter((index) => index >= 0);
    if (!enabledIndexes.length) return;

    const currentPosition = enabledIndexes.indexOf(highlightedIndex);
    const nextPosition = currentPosition < 0
      ? (direction === 1 ? 0 : enabledIndexes.length - 1)
      : (currentPosition + direction + enabledIndexes.length) % enabledIndexes.length;
    setHighlightedIndex(enabledIndexes[nextPosition] ?? -1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!isOpen) {
        openWithHighlight('first');
      } else {
        moveHighlight(1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        openWithHighlight('last');
      } else {
        moveHighlight(-1);
      }
    } else if (event.key === 'Home' && isOpen) {
      event.preventDefault();
      setHighlightedIndex(findFirstEnabledIndex(filteredItems));
    } else if (event.key === 'End' && isOpen) {
      event.preventDefault();
      setHighlightedIndex(findLastEnabledIndex(filteredItems));
    } else if (event.key === 'Enter' && isOpen) {
      const item = filteredItems[highlightedIndex];
      if (item && !item.disabled) {
        event.preventDefault();
        selectItem(item);
      }
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setOpenState(false);
      setHighlightedIndex(-1);
      if (!isQueryControlled) {
        setUncontrolledQuery(selectedItem?.label ?? '');
      }
    } else if (event.key === 'Tab') {
      setOpenState(false);
      setHighlightedIndex(-1);
    }
  }

  const helperMessage = errorMessage ?? disabledReason ?? helperText;
  const popupMessage = loading
    ? loadingMessage
    : filteredItems.length === 0
      ? (inputValue ? noResultsMessage : emptyMessage)
      : null;
  const announcedStatus = statusMessage
    ?? (isOpen && !loading ? `${filteredItems.length} option${filteredItems.length === 1 ? '' : 's'} available.` : '');
  const hasClearValue = Boolean(inputValue || selectedItem);
  const activeOptionId = isOpen && highlightedIndex >= 0
    ? `${fieldId}-option-${highlightedIndex}`
    : undefined;

  return (
    <div
      ref={rootRef}
      data-slot="autocomplete"
      data-size={size}
      data-disabled={disabled ? 'true' : undefined}
      data-read-only={readOnly ? 'true' : undefined}
      className={styles.autocomplete}
    >
      {label ? <label className={styles.label} htmlFor={fieldId}>{label}</label> : null}
      {name ? <input type="hidden" name={name} value={selectedValue ?? ''} /> : null}
      <div className={styles.control}>
        <div className={styles.field} data-invalid={errorMessage ? 'true' : undefined}>
          <input
            {...nativeInputProps}
            ref={inputRef}
            id={fieldId}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-describedby={helperMessage ? helperId : undefined}
            aria-expanded={isOpen}
            aria-invalid={errorMessage ? true : undefined}
            aria-readonly={readOnly || undefined}
            className={joinClasses(styles.input, inputClassName)}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readOnly}
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => {
              if (!disabled && !readOnly && !isOpen) openWithHighlight();
            }}
            onFocus={() => {
              if (!disabled && !readOnly) openWithHighlight();
            }}
            onKeyDown={handleKeyDown}
          />
          <div className={styles.controls}>
            {loading ? <SpinnerGapIcon className={styles.loadingIcon} aria-hidden="true" /> : null}
            {clearable && hasClearValue && !disabled && !readOnly ? (
              <IconButton aria-label="Clear selection" size="micro" variant="tertiary" onClick={clearSelection}>
                <XIcon aria-hidden="true" />
              </IconButton>
            ) : null}
            {showTrigger && !disabled && !readOnly ? (
              <IconButton
                aria-label={isOpen ? 'Hide options' : 'Show options'}
                aria-expanded={isOpen}
                size="micro"
                variant="tertiary"
                onClick={() => {
                  if (isOpen) {
                    setOpenState(false);
                    setHighlightedIndex(-1);
                  } else {
                    openWithHighlight();
                  }
                }}
              >
                <ChevronDownIcon aria-hidden="true" />
              </IconButton>
            ) : null}
          </div>
        </div>
        {isOpen && !disabled && !readOnly ? (
          <div className={styles.menu}>
            {popupMessage ? (
              <div className={styles.menuStatus} role="status">{popupMessage}</div>
            ) : (
              <ul id={listboxId} role="listbox" aria-label={typeof label === 'string' ? label : 'Options'} className={styles.list}>
                {groups.map((group) => (
                  <li key={group.label ?? 'ungrouped'} role="presentation" className={styles.group}>
                    {group.label ? <div className={styles.groupLabel}>{group.label}</div> : null}
                    <ul role={group.label ? 'group' : undefined} aria-label={group.label} className={styles.groupItems}>
                      {group.items.map(({ item, index }) => {
                        const highlighted = index === highlightedIndex;
                        const selected = item.id === selectedValue;

                        return (
                          <li
                            key={item.id}
                            id={`${fieldId}-option-${index}`}
                            role="option"
                            aria-disabled={item.disabled || undefined}
                            aria-selected={selected}
                            data-disabled={item.disabled ? 'true' : undefined}
                            data-highlighted={highlighted ? 'true' : undefined}
                            data-selected={selected ? 'true' : undefined}
                            className={styles.option}
                            onClick={() => selectItem(item)}
                            onMouseDown={(event) => event.preventDefault()}
                            onMouseMove={() => {
                              if (!item.disabled) setHighlightedIndex(index);
                            }}
                          >
                            {renderItem ? renderItem(item, { highlighted, selected }) : (
                              <span className={styles.optionCopy}>
                                <span className={styles.optionLabel}>{item.label}</span>
                                {item.description ? <span className={styles.optionDescription}>{item.description}</span> : null}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
      {helperMessage ? (
        <p
          id={helperId}
          data-tone={errorMessage ? 'danger' : undefined}
          className={styles.helper}
          aria-live={errorMessage || disabledReason ? 'polite' : undefined}
        >
          {helperMessage}
        </p>
      ) : null}
      <span className={styles.announcer} aria-live="polite">{announcedStatus}</span>
    </div>
  );
}
