'use client';

/**
 * Presenter control for restarting the onboarding-driven prototype. Scenario
 * selection belongs to the Storybook-owned phone registry at the Door.
 */

import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui';
import styles from './demo-control-panel.module.css';

export type DemoControlPanelProps = {
  onRestart: () => void;
};

export function DemoControlPanel({ onRestart }: DemoControlPanelProps) {
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
          <p className={styles.description}>
            This scenario was selected at sign-in. Start again to test another one.
          </p>
          <div className={styles.footerRow}>
            <Button onClick={onRestart} size="sm" variant="secondary">
              Choose another scenario
            </Button>
            <p className={styles.note}>Clears demo-only browser state.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
