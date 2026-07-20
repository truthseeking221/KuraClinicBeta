import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from './index';

function Example() {
  const [density, setDensity] = useState('standard');
  return <Menubar aria-label="Workspace commands"><MenubarMenu><MenubarTrigger>Record</MenubarTrigger><MenubarContent><MenubarItem>Open patient<MenubarShortcut>⌘O</MenubarShortcut></MenubarItem><MenubarItem>Save draft<MenubarShortcut>⌘S</MenubarShortcut></MenubarItem><MenubarSub><MenubarSubTrigger>Export</MenubarSubTrigger><MenubarSubContent><MenubarItem>PDF report</MenubarItem><MenubarItem>CSV data</MenubarItem></MenubarSubContent></MenubarSub><MenubarSeparator /><MenubarItem disabled>Print labels</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarCheckboxItem defaultChecked>Show patient banner</MenubarCheckboxItem><MenubarSeparator /><MenubarRadioGroup onValueChange={setDensity} value={density}><MenubarRadioItem value="compact">Compact</MenubarRadioItem><MenubarRadioItem value="standard">Standard</MenubarRadioItem></MenubarRadioGroup></MenubarContent></MenubarMenu></Menubar>;
}

const meta = {
  title: 'Design System/Components/Menubar', component: Menubar,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: { layout: 'centered', kura: { source: { vendor: 'ReUI', registryItem: 'menubar', familySize: 5 }, intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'DropdownMenu owns one contextual trigger; Menubar adds the persistent multi-menu arrow-key and focus contract needed by desktop command surfaces.' }, binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura-control-and-overlay', elevation: 'kura-popover', icons: 'kura-canonical', responsive: 'horizontal scroll with viewport-contained popup' }, exclusions: [{ capability: 'Global app navigation', replacement: 'Use NavigationMenu or AppShell; Menubar is for command groups.' }] } },
} satisfies Meta<typeof Menubar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Example />, play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole('menuitem', { name: 'Record' })); await expect(await within(document.body).findByText('Save draft')).toBeVisible(); } };
export const Disabled: Story = { render: () => <Menubar disabled aria-label="Unavailable commands"><MenubarMenu><MenubarTrigger>Record</MenubarTrigger></MenubarMenu></Menubar> };
export const Mobile: Story = { render: () => <Example />, parameters: { viewport: { defaultViewport: 'kura320' } } };
