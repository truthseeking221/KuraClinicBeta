import type { Decorator, Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const withTheme: Decorator = (Story, context) => {
  if (typeof document !== 'undefined') {
    // Docs are the canonical light-mode reference. Keep explicit dark-theme
    // stories available in Canvas without allowing them to change autodocs.
    const theme = context.viewMode === 'docs' ? 'light' : String(context.globals.theme ?? 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.density = String(context.globals.density ?? 'cozy');
  }

  return Story();
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
    density: {
      description: 'Density',
      defaultValue: 'cozy',
      toolbar: {
        title: 'Density',
        icon: 'expand',
        items: [
          { value: 'compact', title: 'Compact' },
          { value: 'cozy', title: 'Cozy' },
          { value: 'comfortable', title: 'Comfortable' },
        ],
      },
    },
    actor: {
      description: 'Clinic actor',
      defaultValue: 'doctor',
      toolbar: {
        title: 'Actor',
        icon: 'user',
        items: [
          { value: 'doctor', title: 'Doctor' },
          { value: 'receptionist', title: 'Receptionist' },
          { value: 'phlebotomist', title: 'Phlebotomist' },
          { value: 'workspace-admin', title: 'Workspace Admin' },
        ],
      },
    },
    workspacePackage: {
      description: 'Workspace package',
      defaultValue: 'full-clinic',
      toolbar: {
        title: 'Workspace',
        icon: 'component',
        items: [
          { value: 'doctor-only', title: 'Doctor only' },
          { value: 'doctor-reception', title: 'Doctor + Reception' },
          { value: 'doctor-phlebotomy', title: 'Doctor + Phlebotomy' },
          { value: 'full-clinic', title: 'Full clinic' },
        ],
      },
    },
    permissionPreset: {
      description: 'Permission preset',
      defaultValue: 'standard',
      toolbar: {
        title: 'Permissions',
        icon: 'lock',
        items: [
          { value: 'read-only', title: 'Read only' },
          { value: 'standard', title: 'Standard' },
          { value: 'supervisor', title: 'Supervisor' },
          { value: 'owner', title: 'Owner' },
        ],
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    options: {
      storySort: {
        order: [
          'Design System',
          [
            'Introduction',
            'Foundations',
            ['Overview'],
            'Primitives',
            'Components',
            'Clinical Components',
            'Patterns',
            'Patterns (Planned)',
            'Governance',
          ],
          'Clinic',
          [
            'Shell',
            'Auth',
            'Clinical',
            ['Home', 'Results', 'Lab Catalog', 'Phone Gate', 'Patient Context Rail', 'Patient Workspace (Planned)'],
            'Front Desk',
            [
              'Check-In Wizard',
              [
                'Step 1 Identity',
                'Steps 2–3 Patient & Insurance',
                'Step 4 Orders & Consent',
                'Step 5 Pre-Consult',
              ],
            ],
            'Collection',
            'Finance',
            'Practice Admin (Planned)',
            'Settings',
            'Flows',
          ],
          'Platform Admin',
        ],
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      options: {
        kura320: {
          name: 'Kura narrow · 320',
          styles: { width: '320px', height: '800px' },
        },
        kura360: {
          name: 'Kura mobile · 360',
          styles: { width: '360px', height: '800px' },
        },
        kura390: {
          name: 'Kura mobile · 390',
          styles: { width: '390px', height: '844px' },
        },
        kura412: {
          name: 'Kura mobile · 412',
          styles: { width: '412px', height: '915px' },
        },
        kura480: {
          name: 'Kura wide mobile · 480',
          styles: { width: '480px', height: '900px' },
        },
        kura768: {
          name: 'Kura tablet · 768',
          styles: { width: '768px', height: '1024px' },
        },
        kura1024: {
          name: 'Kura desktop · 1024',
          styles: { width: '1024px', height: '900px' },
        },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
