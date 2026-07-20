'use client';

/**
 * Wiring only: lets any page open the Storybook-owned SettingsDialog that the
 * clinic shell layout renders. No UI lives here.
 */

import { createContext, useContext } from 'react';

import type { SettingsSectionId } from '../../features/settings';

export type SettingsDialogControl = {
  openSettings: (section?: SettingsSectionId) => void;
};

export const SettingsDialogContext = createContext<SettingsDialogControl>({
  openSettings: () => {},
});

export function useSettingsDialog(): SettingsDialogControl {
  return useContext(SettingsDialogContext);
}
