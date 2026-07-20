import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuPopup, NavigationMenuPortal, NavigationMenuPositioner, NavigationMenuTrigger, NavigationMenuViewport } from './index';

function Example() {
  return <NavigationMenu aria-label="Clinic sections"><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Clinic</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#appointments"><span><strong>Appointments</strong><small>Review today’s scheduled visits.</small></span></NavigationMenuLink><NavigationMenuLink href="#patients"><span><strong>Patients</strong><small>Find identity and care context.</small></span></NavigationMenuLink></NavigationMenuContent></NavigationMenuItem><NavigationMenuItem><NavigationMenuTrigger>Laboratory</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#collection"><span><strong>Collection</strong><small>Track specimen collection work.</small></span></NavigationMenuLink><NavigationMenuLink href="#results"><span><strong>Results</strong><small>Review released laboratory findings.</small></span></NavigationMenuLink></NavigationMenuContent></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink active href="#dashboard">Dashboard</NavigationMenuLink></NavigationMenuItem></NavigationMenuList><NavigationMenuPortal><NavigationMenuPositioner><NavigationMenuPopup><NavigationMenuViewport /></NavigationMenuPopup></NavigationMenuPositioner></NavigationMenuPortal></NavigationMenu>;
}

const meta = {
  title: 'Design System/Components/Navigation Menu', component: NavigationMenu,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: { layout: 'centered', kura: { source: { vendor: 'ReUI', registryItem: 'navigation-menu', familySize: 5 }, intake: { decision: 'CREATE', owner: 'src/components/ui', evidence: 'AppShell owns product shell navigation and DropdownMenu owns actions; no reusable link-first navigation disclosure with active-link and composite keyboard behavior existed.' }, binding: { colors: 'kura-semantic', typography: 'kura', spacing: 'kura', radius: 'kura-control-and-overlay', elevation: 'kura-popover', icons: 'kura-canonical', responsive: 'horizontal list and viewport-contained content' }, exclusions: [{ capability: 'Mobile app navigation replacement', replacement: 'AppShell owns mobile navigation composition; this primitive only preserves horizontal link disclosure.' }] } },
} satisfies Meta<typeof NavigationMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Example />, play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole('button', { name: 'Clinic' })); await expect(await within(document.body).findByText('Appointments')).toBeVisible(); } };
export const LinkOnly: Story = { render: () => <NavigationMenu aria-label="Results navigation"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink active href="#current">Current results</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#history">History</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu> };
export const Mobile: Story = { render: () => <Example />, parameters: { viewport: { defaultViewport: 'kura320' } } };
