'use client';

import PhoneNumberInput, {
  getCountryCallingCode,
  type Country,
  type FlagProps,
  type Labels,
  type Value,
} from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { createContext, forwardRef, useContext, useId, useMemo, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from './combobox';
import { GlobeIcon } from './icons';
import styles from './phone-input.module.css';

export type PhoneInputSize = 'sm' | 'md' | 'lg';

type PhoneCountryOption = {
  label: string;
  value: Country;
};

type PhoneInputContextValue = {
  readOnly: boolean;
  size: PhoneInputSize;
};

const PhoneInputContext = createContext<PhoneInputContextValue>({
  readOnly: false,
  size: 'md',
});

export type PhoneInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'defaultValue' | 'onChange' | 'size' | 'type' | 'value'
> & {
  /** Visible field label. Omit only when an external label references the phone input. */
  label?: ReactNode;
  /** Supporting text that helps a person enter a reachable number. */
  helpText?: ReactNode;
  /** Specific recovery guidance for an invalid or unavailable number. */
  error?: ReactNode;
  /** Controls the field's visual density without changing its phone value. */
  size?: PhoneInputSize;
  /** E.164 value supplied by the owning form or workflow. */
  value?: Value | string;
  /** Initial E.164 value for an uncontrolled field. */
  defaultValue?: Value | string;
  /** Called with an E.164 value, or `undefined` when the field is cleared. */
  onChange?: (value: Value | undefined) => void;
  /** Initial country used to format national input and select a calling code. */
  defaultCountry?: Country;
  /** Limits the selectable countries to an owner-authorised set. */
  countries?: Country[];
  /** Localized country names forwarded to the international-number formatter. */
  labels?: Labels;
  /** Enables international entry instead of a default-country national format. */
  international?: boolean;
  /** Lets a person edit the country calling code as part of the number. */
  countryCallingCodeEditable?: boolean;
  /** Receives the selected ISO country code when the calling code changes. */
  onCountryChange?: (country: Country | undefined) => void;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Country-aware telephone entry that returns an E.164 value. Use workflow-owned
 * validation for reachability, verification, consent, and any identity decision.
 */
export function PhoneInput({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  defaultValue,
  disabled = false,
  error,
  helpText,
  id,
  international = false,
  label,
  onChange,
  readOnly = false,
  required = false,
  size = 'md',
  value,
  ...props
}: PhoneInputProps) {
  const generatedId = useId();
  const inputId = id ?? `phone-input-${generatedId}`;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, helpId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = error ? true : ariaInvalid;
  const [uncontrolledValue, setUncontrolledValue] = useState<Value | string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const phoneValue = isControlled ? value : uncontrolledValue;

  return (
    <PhoneInputContext.Provider value={{ readOnly, size }}>
      <div
        className={joinClasses(styles.field, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
        data-read-only={readOnly ? 'true' : undefined}
        data-size={size}
        data-slot="phone-input-field"
      >
        {label ? (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {required ? (
              <span aria-hidden="true" className={styles.requiredMark}>
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <PhoneNumberInput
          {...props}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={styles.control}
          countrySelectComponent={CountrySelect}
          disabled={disabled}
          flagComponent={CountryFlag}
          id={inputId}
          international={international}
          inputComponent={NumberInput}
          onChange={(nextValue) => {
            if (!isControlled) {
              setUncontrolledValue(nextValue);
            }
            onChange?.(nextValue);
          }}
          readOnly={readOnly}
          required={required}
          smartCaret={false}
          value={phoneValue}
        />
        {helpText ? (
          <span className={styles.helpText} id={helpId}>
            {helpText}
          </span>
        ) : null}
        {error ? (
          <span className={styles.errorText} id={errorId} role="alert">
            {error}
          </span>
        ) : null}
      </div>
    </PhoneInputContext.Provider>
  );
}

const NumberInput = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  function NumberInput({ className, ...props }, ref) {
    return (
      <input
        {...props}
        ref={ref}
        className={joinClasses(styles.input, className)}
        data-slot="phone-input"
        inputMode="tel"
        type="tel"
      />
    );
  },
);

type CountrySelectProps = {
  disabled?: boolean;
  onChange: (country: Country) => void;
  options: Array<{ label: string; value?: Country }>;
  value?: Country;
};

function CountrySelect({ disabled = false, onChange, options, value: selectedCountry }: CountrySelectProps) {
  const { readOnly } = useContext(PhoneInputContext);
  const countryOptions = useMemo<PhoneCountryOption[]>(
    () =>
      options.flatMap((option) => (option.value ? [{ label: option.label, value: option.value }] : [])),
    [options],
  );
  const selectedOption = countryOptions.find((option) => option.value === selectedCountry);
  const selectedCallingCode = selectedCountry ? `+${getCountryCallingCode(selectedCountry)}` : undefined;
  const countryLabel = selectedOption
    ? `${selectedOption.label}, ${selectedCallingCode}`
    : 'international number';
  const unavailable = disabled || readOnly;

  return (
    <Combobox<PhoneCountryOption>
      disabled={unavailable}
      itemToStringLabel={(option) => `${option.label} +${getCountryCallingCode(option.value)}`}
      itemToStringValue={(option) => option.value}
      items={countryOptions}
      onValueChange={(option) => {
        if (option) {
          onChange(option.value);
        }
      }}
      value={selectedOption}
    >
      <ComboboxTrigger
        aria-label={`Change country or region, currently ${countryLabel}`}
        className={styles.countryTrigger}
        disabled={unavailable}
      >
        <CountryFlag country={selectedCountry} countryName={selectedOption?.label ?? 'International number'} />
        {selectedCallingCode ? (
          <span className={styles.selectedCountryCode}>{selectedCallingCode}</span>
        ) : null}
      </ComboboxTrigger>
      <ComboboxContent className={styles.countryContent}>
        <ComboboxInput
          aria-label="Search country or region"
          placeholder="e.g. United States"
          showTrigger={false}
        />
        <ComboboxEmpty>No country or region matches this search.</ComboboxEmpty>
        <ComboboxList>
          {(option: PhoneCountryOption) => (
            <ComboboxItem key={option.value} value={option}>
              <span className={styles.countryOption}>
                <CountryFlag country={option.value} countryName={option.label} />
                <span className={styles.countryName}>{option.label}</span>
                <span className={styles.countryCode}>+{getCountryCallingCode(option.value)}</span>
              </span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function CountryFlag({ country, countryName }: Omit<FlagProps, 'country'> & { country?: Country }) {
  const Flag = country ? flags[country] : undefined;

  return (
    <span aria-hidden="true" className={styles.flag} data-slot="phone-input-flag">
      {Flag ? <Flag title={countryName} /> : <GlobeIcon size={16} />}
    </span>
  );
}

export type { Country, Value as PhoneValue } from 'react-phone-number-input';
export { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
