'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { markerFor, zonesFor } from './logic';
import type { LabResultValue, ReferenceRange } from './types';
import styles from './lab-range-band.module.css';

export type LabRangeBandSize = 'sm' | 'md';

export type LabRangeBandProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  range: ReferenceRange;
  /** The released value to mark on the band. Omit to render the scale alone. */
  value?: LabResultValue;
  /** Hide the tick labels under the band (dense rows, popovers). */
  showTicks?: boolean;
  /**
   * Print the measured value above the marker. Use when the band stands
   * alone; omit in rows that already show the value in their own column.
   */
  showValue?: boolean;
  size?: LabRangeBandSize;
  /** Accessible summary; falls back to a generated zone/value description. */
  'aria-label'?: string;
};

function valueDisplay(value: LabResultValue): string | null {
  if (value.kind === 'numeric') return value.display ?? String(value.value);
  if (value.kind === 'text') return value.value;
  return null;
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Reference-range band: equal-width tier zones tinted by severity with the
 * patient value marked as a dot inside its zone. The first-visit reading —
 * one result against its reference — per Figma "Flowsheet F — single visit".
 */
export function LabRangeBand({
  className,
  range,
  value,
  showTicks = true,
  showValue = false,
  size = 'md',
  'aria-label': ariaLabel,
  ...props
}: LabRangeBandProps) {
  const zones = zonesFor(range);
  if (zones.length === 0) return null;

  const marker = value ? markerFor(range, value) : null;
  const zoneCount = zones.length;
  const markerLeft =
    marker == null ? null : ((marker.zoneIndex + marker.fraction) / zoneCount) * 100;

  const fallbackLabel = [
    'Reference scale',
    zones.map((zone) => `${zone.tier.label} ${zone.label}`).join(', '),
    marker && value
      ? `value ${valueDisplay(value)} in ${zones[marker.zoneIndex].tier.label} zone`
      : null,
  ]
    .filter(Boolean)
    .join('; ');

  return (
    <div
      {...props}
      className={joinClasses(styles.band, className)}
      data-slot="lab-range-band"
      data-size={size}
      data-show-value={showValue && marker != null ? 'true' : undefined}
      role="img"
      aria-label={ariaLabel ?? fallbackLabel}
    >
      <div className={styles.track}>
        <div className={styles.zones}>
          {zones.map((zone, index) => (
            <div
              key={`${zone.tier.tier}-${index}`}
              className={styles.zone}
              data-active={marker?.zoneIndex === index || undefined}
              data-tone={zone.tone}
            />
          ))}
        </div>
        {markerLeft != null && marker != null ? (
          <>
            {showValue && value ? (
              <span
                aria-hidden="true"
                className={styles.valueLabel}
                data-tone={marker.tone}
                style={{ left: `${markerLeft}%` }}
              >
                {valueDisplay(value)}
              </span>
            ) : null}
            <span
              className={styles.dot}
              data-tone={marker.tone}
              style={{ left: `${markerLeft}%` }}
              aria-hidden="true"
            />
          </>
        ) : null}
      </div>
      {showTicks ? (
        <div className={styles.ticks} aria-hidden="true">
          {zones.map((zone, index) => (
            <span
              key={`${zone.tier.tier}-tick-${index}`}
              className={styles.tick}
              data-active={marker?.zoneIndex === index || undefined}
            >
              {zone.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
