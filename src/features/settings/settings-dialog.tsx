"use client";

import { Dialog, DialogContent, DialogTitle } from "../../components/ui";

import type { SettingsSectionId, VerificationStatus } from "./logic";
import { SettingsView } from "./settings-view";
import styles from "./settings.module.css";

export type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Section shown when the dialog opens; the rail navigates internally. */
  section?: SettingsSectionId;
  onSectionChange?: (section: SettingsSectionId) => void;
  /** Mirrors the verification store; settings never contradicts the gate. */
  verification?: VerificationStatus;
  onVerify?: () => void;
};

/**
 * Settings as an overlay above the current work. The internal rail is the only
 * settings navigation — the shell keeps no parallel section list. Full-screen
 * under 480px, where the rail becomes a horizontal strip.
 */
export function SettingsDialog({
  open,
  onOpenChange,
  section,
  onSectionChange,
  verification,
  onVerify,
}: SettingsDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        aria-describedby={undefined}
        className={styles.dialogContent}
        closeLabel="Close settings"
        size="lg"
      >
        <DialogTitle className={styles.srOnly}>Settings</DialogTitle>
        <SettingsView
          frame="dialog"
          onSectionChange={onSectionChange}
          onVerify={onVerify}
          section={section}
          verification={verification}
        />
      </DialogContent>
    </Dialog>
  );
}
