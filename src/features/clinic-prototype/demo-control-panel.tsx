'use client';

/**
 * Presenter controls for the prototype app: walk the licence lifecycle,
 * jump to edge scenarios, reset the demo. Pure props — the host app wires
 * session state and navigation. Options come from canonical sources; this
 * panel invents no states.
 */

import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Separator,
} from '../../components/ui';
import type { LicenceState } from '../licence/logic';
import { VERIFICATION_META } from '../settings/logic';
import styles from './demo-control-panel.module.css';

export const LICENCE_OPTIONS = (
  Object.entries(VERIFICATION_META) as [LicenceState, { label: string }][]
).map(([value, meta]) => ({ value, label: meta.label }));

/** Home scenario fixtures the prototype exposes (keys of home demo-data). */
export const HOME_SCENARIO_OPTIONS = [
  { value: 'default', label: 'Follow licence state' },
  { value: 'busy-morning', label: 'Busy morning' },
  { value: 'critical-day', label: 'Critical day' },
  { value: 'all-caught-up', label: 'All caught up' },
  { value: 'afternoon-handover', label: 'Afternoon handover' },
  { value: 'empty-clinic', label: 'Verified · empty clinic' },
  { value: 'solo-doctor', label: 'Solo doctor' },
  { value: 'partial-data', label: 'Partial data' },
  { value: 'full-failure', label: 'Full failure' },
  { value: 'stale', label: 'Stale data' },
  { value: 'offline', label: 'Offline' },
];

/** Results episode fixtures (section sets from results demo-data). */
export const RESULTS_EPISODE_OPTIONS = [
  { value: 'critical', label: 'Critical · complete' },
  { value: 'first', label: 'First visit' },
  { value: 'partial', label: 'Results arriving' },
  { value: 'redraw', label: 'Redraw in progress' },
  { value: 'add-on', label: 'Add-on placed' },
  { value: 'with-cancelled', label: 'Released with cancellations' },
  { value: 'cancelled', label: 'All cancelled' },
];

export type DemoControlPanelProps = {
  licence: LicenceState;
  onLicenceChange: (licence: LicenceState) => void;
  onJumpHomeScenario: (scenario: string) => void;
  onJumpResultsEpisode: (episode: string) => void;
  onReset: () => void;
};

export function DemoControlPanel({
  licence,
  onLicenceChange,
  onJumpHomeScenario,
  onJumpResultsEpisode,
  onReset,
}: DemoControlPanelProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button size="sm" variant="outline">
            Demo
          </Button>
        }
      />
      <PopoverContent aria-label="Demo controls" initialFocus={false} role="dialog">
        <div className={styles.panel}>
          <div className={styles.headerRow}>
            <span className={styles.title}>Demo controls</span>
            <Badge size="sm" variant="ai">
              Prototype
            </Badge>
          </div>
          <Select
            label="Licence state"
            onValueChange={(value) => {
              if (value) onLicenceChange(value as LicenceState);
            }}
            options={LICENCE_OPTIONS}
            value={licence}
          />
          <Select
            label="Home scenario"
            onValueChange={(value) => {
              if (value) onJumpHomeScenario(value);
            }}
            options={HOME_SCENARIO_OPTIONS}
            placeholder="Jump to scenario"
            value=""
          />
          <Select
            label="Results episode"
            onValueChange={(value) => {
              if (value) onJumpResultsEpisode(value);
            }}
            options={RESULTS_EPISODE_OPTIONS}
            placeholder="Jump to episode"
            value=""
          />
          <Separator />
          <div className={styles.footerRow}>
            <Button onClick={onReset} size="sm" variant="destructive">
              Reset demo
            </Button>
            <p className={styles.note}>State persists in this browser only.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
