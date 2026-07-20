'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';

import {
  Button,
  Checkbox,
  Item,
  ItemContent,
  ItemTitle,
  SegmentedToggle,
  Select,
  toast,
} from '../../components/ui';

import type {
  CourierDayId,
  CourierPickup,
  CourierRouteId,
  CourierTime,
  HoursPresetId,
  WeekHours,
} from './logic';
import {
  COURIER_DAYS,
  COURIER_ROUTES,
  COURIER_TIMES,
  HOUR_OPTIONS,
  WEEK_DAYS,
  applyHoursPreset,
  courierPickupError,
  formatCourierPickup,
  formatHours,
  hoursError,
  labelTime,
} from './logic';
import { SettingsRow } from './settings-rows';
import styles from './settings.module.css';

/* ----------------------------- courier pickup ---------------------------- */

const ROUTE_OPTIONS = COURIER_ROUTES.map((route) => ({
  value: route.id,
  label: `${route.label} · ${route.detail}`,
}));

const TIME_OPTIONS = COURIER_TIMES.map((time) => ({ value: time, label: time }));

export type CourierPickupRowProps = { initialPickup: CourierPickup };

/**
 * Structured courier editor: route, pickup time, and pickup days. Lab
 * logistics needs at least one day, so Save blocks until one is selected.
 */
export function CourierPickupRow({ initialPickup }: CourierPickupRowProps) {
  const [pickup, setPickup] = useState(initialPickup);
  const [draft, setDraft] = useState(initialPickup);
  const [editing, setEditing] = useState(false);

  const error = courierPickupError(draft);

  const cancel = () => {
    setDraft(pickup);
    setEditing(false);
  };

  const save = () => {
    if (error) return;
    setPickup(draft);
    setEditing(false);
    toast.success('Courier pickup updated');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
    }
  };

  if (!editing) {
    return (
      <SettingsRow
        action={
          <Button
            onClick={() => {
              setDraft(pickup);
              setEditing(true);
            }}
            size="sm"
            variant="ghost"
          >
            Change route
          </Button>
        }
        label="Courier pickup"
        value={formatCourierPickup(pickup)}
      />
    );
  }

  return (
    <Item className={`${styles.row} ${styles.settingGrid}`} onKeyDown={handleKeyDown} size="sm">
      <ItemContent className={styles.rowLabelCell}>
        <ItemTitle className={styles.rowLabel}>Courier pickup</ItemTitle>
      </ItemContent>
      <div className={styles.editCell}>
        <div className={styles.editorFields}>
          <Select
            label="Route"
            onValueChange={(value) => {
              if (value) setDraft({ ...draft, routeId: value as CourierRouteId });
            }}
            options={ROUTE_OPTIONS}
            value={draft.routeId}
          />
          <Select
            label="Pickup time"
            onValueChange={(value) => {
              if (value) setDraft({ ...draft, time: value as CourierTime });
            }}
            options={TIME_OPTIONS}
            value={draft.time}
          />
          <fieldset className={styles.dayFieldset}>
            <legend className={styles.dayLegend}>Pickup days</legend>
            <div className={styles.dayChecks}>
              {COURIER_DAYS.map((day) => (
                <Checkbox
                  checked={draft.days.includes(day)}
                  key={day}
                  onCheckedChange={(checked) => {
                    setDraft({
                      ...draft,
                      days: checked
                        ? ([...draft.days, day] as CourierDayId[])
                        : draft.days.filter((entry) => entry !== day),
                    });
                  }}
                >
                  {day}
                </Checkbox>
              ))}
            </div>
            {error ? (
              <p className={styles.editorError} role="alert">
                {error}
              </p>
            ) : null}
          </fieldset>
        </div>
        <div className={styles.editControls}>
          <Button disabled={Boolean(error)} onClick={save} size="sm" variant="primary">
            Save
          </Button>
          <Button onClick={cancel} size="sm" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
    </Item>
  );
}

/* ---------------------------- directory hours ---------------------------- */

const HOUR_SELECT_OPTIONS = HOUR_OPTIONS.map((time) => ({
  value: time,
  label: labelTime(time),
}));

const PRESET_OPTIONS = [
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'monToSat', label: 'Mon to Sat' },
  { value: 'custom', label: 'Custom days' },
];

export type HoursRowProps = { initialHours: WeekHours };

/**
 * Directory display hours: quick presets plus a per-day editor behind
 * "Custom days". Open days must close after they open.
 */
export function HoursRow({ initialHours }: HoursRowProps) {
  const [hours, setHours] = useState(initialHours);
  const [draft, setDraft] = useState(initialHours);
  const [preset, setPreset] = useState<HoursPresetId>('monToSat');
  const [editing, setEditing] = useState(false);

  const error = hoursError(draft);

  const cancel = () => {
    setDraft(hours);
    setEditing(false);
  };

  const save = () => {
    if (error) return;
    setHours(draft);
    setEditing(false);
    toast.success('Hours updated');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
    }
  };

  if (!editing) {
    return (
      <SettingsRow
        action={
          <Button
            onClick={() => {
              setDraft(hours);
              setEditing(true);
            }}
            size="sm"
            variant="ghost"
          >
            Edit hours
          </Button>
        }
        label="Hours"
        sub="Shown to patients in the directory"
        value={formatHours(hours)}
      />
    );
  }

  return (
    <Item className={`${styles.row} ${styles.settingGrid}`} onKeyDown={handleKeyDown} size="sm">
      <ItemContent className={styles.rowLabelCell}>
        <ItemTitle className={styles.rowLabel}>Hours</ItemTitle>
      </ItemContent>
      <div className={styles.editCell}>
        <div className={styles.editorFields}>
          <SegmentedToggle
            label="Hours preset"
            labelVisible
            onValueChange={(value) => {
              const next = value as HoursPresetId;
              setPreset(next);
              setDraft(applyHoursPreset(next, draft));
            }}
            options={PRESET_OPTIONS}
            value={preset}
          />
          {preset === 'custom' ? (
            <div className={styles.dayRows}>
              {WEEK_DAYS.map((day) => {
                const dayHours = draft[day.id];
                return (
                  <div className={styles.dayRow} key={day.id}>
                    <Checkbox
                      checked={dayHours.open}
                      onCheckedChange={(checked) => {
                        setDraft({
                          ...draft,
                          [day.id]: { ...dayHours, open: checked },
                        });
                      }}
                    >
                      {day.label}
                    </Checkbox>
                    {dayHours.open ? (
                      <div className={styles.dayTimes}>
                        <Select
                          aria-label={`${day.label} opens at`}
                          onValueChange={(value) => {
                            if (value) {
                              setDraft({
                                ...draft,
                                [day.id]: { ...dayHours, from: value },
                              });
                            }
                          }}
                          options={HOUR_SELECT_OPTIONS}
                          value={dayHours.from}
                        />
                        <span aria-hidden="true" className={styles.dayTimesTo}>
                          to
                        </span>
                        <Select
                          aria-label={`${day.label} closes at`}
                          onValueChange={(value) => {
                            if (value) {
                              setDraft({
                                ...draft,
                                [day.id]: { ...dayHours, to: value },
                              });
                            }
                          }}
                          options={HOUR_SELECT_OPTIONS}
                          value={dayHours.to}
                        />
                      </div>
                    ) : (
                      <span className={styles.rowSub}>Closed</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}
          <p className={styles.editorPreview}>{formatHours(draft)}</p>
          {error ? (
            <p className={styles.editorError} role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <div className={styles.editControls}>
          <Button disabled={Boolean(error)} onClick={save} size="sm" variant="primary">
            Save
          </Button>
          <Button onClick={cancel} size="sm" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
    </Item>
  );
}
