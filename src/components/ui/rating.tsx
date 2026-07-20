'use client';

import { useId, useMemo, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';

import { StarIcon } from './icons';
import styles from './rating.module.css';

export type RatingSize = 'sm' | 'md' | 'lg';
export type RatingStep = 0.5 | 1;

export type RatingProps = {
  /** Accessible legend for editable ratings and name for read-only values. */
  label?: string;
  rating?: number;
  defaultRating?: number;
  max?: number;
  step?: RatingStep;
  editable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  showValue?: boolean;
  size?: RatingSize;
  className?: string;
  onRatingChange?: (rating: number) => void;
};

type StarStyle = CSSProperties & { '--rating-fill': string };

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function clampRating(value: number, max: number, step: RatingStep) {
  const finite = Number.isFinite(value) ? value : 0;
  return Math.min(max, Math.max(0, Math.round(finite / step) * step));
}

function formatRating(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function Rating({
  className,
  defaultRating = 0,
  disabled = false,
  editable = false,
  label = 'Rating',
  max = 5,
  name,
  onRatingChange,
  rating: controlledRating,
  readOnly = false,
  required = false,
  showValue = false,
  size = 'md',
  step = 1,
}: RatingProps) {
  if (!Number.isInteger(max) || max < 1 || max > 10) {
    throw new RangeError('Rating max must be an integer between 1 and 10.');
  }

  const generatedName = useId();
  const inputName = name ?? `rating-${generatedName}`;
  const [uncontrolledRating, setUncontrolledRating] = useState(() =>
    clampRating(defaultRating, max, step),
  );
  const [previewRating, setPreviewRating] = useState<number | null>(null);
  const value = clampRating(controlledRating ?? uncontrolledRating, max, step);
  const displayedRating = previewRating ?? value;
  const values = useMemo(
    () => Array.from({ length: max / step }, (_, index) => (index + 1) * step),
    [max, step],
  );
  const isInteractive = editable && !readOnly;

  function selectRating(nextRating: number) {
    if (!isInteractive || disabled) return;
    if (controlledRating === undefined) setUncontrolledRating(nextRating);
    onRatingChange?.(nextRating);
  }

  const stars = (
    <span
      className={styles.stars}
      data-disabled={disabled ? 'true' : undefined}
      data-editable={isInteractive ? 'true' : undefined}
      data-size={size}
      onPointerLeave={() => setPreviewRating(null)}
    >
      {Array.from({ length: max }, (_, index) => {
        const starNumber = index + 1;
        const fill = Math.min(1, Math.max(0, displayedRating - index)) * 100;
        const starValues = values.filter((candidate) =>
          candidate > index && candidate <= starNumber,
        );

        return (
          <span
            key={starNumber}
            className={styles.star}
            style={{ '--rating-fill': `${fill}%` } as StarStyle}
          >
            <StarIcon className={styles.starOutline} iconStyle="stroke-rounded" aria-hidden="true" />
            <StarIcon className={styles.starFill} iconStyle="solid-rounded" aria-hidden="true" />
            {isInteractive
              ? starValues.map((candidate, candidateIndex) => (
                  <label
                    key={candidate}
                    className={styles.hitTarget}
                    data-half={step === 0.5 ? (candidateIndex === 0 ? 'start' : 'end') : undefined}
                    onPointerEnter={() => setPreviewRating(candidate)}
                  >
                    <input
                      aria-label={`${formatRating(candidate)} out of ${max}`}
                      checked={value === candidate}
                      className={styles.input}
                      disabled={disabled}
                      name={inputName}
                      onChange={(event: FormEvent<HTMLInputElement>) => {
                        if (event.currentTarget.checked) selectRating(candidate);
                      }}
                      required={required}
                      type="radio"
                      value={candidate}
                    />
                  </label>
                ))
              : null}
          </span>
        );
      })}
    </span>
  );

  if (isInteractive) {
    return (
      <fieldset
        className={joinClasses(styles.root, className)}
        data-disabled={disabled ? 'true' : undefined}
        data-read-only={readOnly ? 'true' : undefined}
        data-slot="rating"
        disabled={disabled}
      >
        <legend className={styles.legend}>{label}</legend>
        <span className={styles.row}>
          {stars}
          {showValue ? (
            <output className={styles.value} aria-live="polite">
              {formatRating(displayedRating)} / {max}
            </output>
          ) : null}
        </span>
      </fieldset>
    );
  }

  return (
    <span
      className={joinClasses(styles.root, className)}
      data-disabled={disabled ? 'true' : undefined}
      data-read-only="true"
      data-slot="rating"
    >
      <span className={styles.row}>
        <span role="img" aria-label={`${label}: ${formatRating(value)} out of ${max}`}>
          {stars}
        </span>
        {showValue ? <span className={styles.value}>{formatRating(value)} / {max}</span> : null}
      </span>
    </span>
  );
}
