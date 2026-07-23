import { useEffect, useState } from 'react';
import type { Decorator, Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import { LocaleProvider } from '../src/components/foundations/i18n';
import type { Locale } from '../src/components/foundations/i18n';

const WithDensity: Decorator = (Story, context) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.density = String(context.globals.density ?? 'cozy');
    delete document.documentElement.dataset.theme;
  }

  return Story();
};

/**
 * Every story renders in either interface language from the toolbar, so Khmer
 * line-height, wrapping, and long-label overflow are verified in the same
 * place the component is designed — not discovered in the app.
 *
 * The decorator owns the language as state, the way the app session does, so
 * an in-story language control (the shell account menu) actually switches the
 * story. The toolbar sets the starting language and overrides it when changed.
 */
const WithLocale: Decorator = (Story, context) => {
  const toolbarLocale = (context.globals.locale ?? 'en') as Locale;
  const [locale, setLocale] = useState<Locale>(toolbarLocale);

  useEffect(() => setLocale(toolbarLocale), [toolbarLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleProvider locale={locale} onLocaleChange={setLocale}>
      <Story />
    </LocaleProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Interface language',
      defaultValue: 'en',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'km', title: 'ភាសាខ្មែរ' },
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
  decorators: [WithLocale, WithDensity],
  parameters: {
    options: {
      storySort: {
        order: [
          'Design System',
          [
            'Foundations',
            'Primitives',
            'Components',
            'Clinical Components',
            'Patterns',
            'Governance',
          ],
          'Clinic',
          [
            'Shell',
            'Auth',
            'Clinical',
            [
              'Home',
              'Patients',
              'Assessment',
              'Care Plan',
              'Lab Catalog',
              'Results',
              'Phone Gate',
              'Patient Context Rail',
            ],
            'Front Desk',
            [
              'Desk Queue',
              'Check-In Wizard',
              [
                'Step 1 Identity',
                'Steps 2–3 Patient & Insurance',
                'Step 4 Orders & Consent',
                'Step 5 Pre-Consult',
              ],
              'Booking Detail Sheet',
              'Cart Rail',
              'Payment Receipt',
            ],
            'Collection',
            ['Draw Worksheet', 'Defer Draw Dialog', 'Tube Labeling'],
            'Finance',
            [
              'Earnings',
              ['Overview', 'Settle', 'Auto-pay', 'Activity & Statements', 'Activity Ledger'],
            ],
            'Settings',
            'Flows',
            [
              'Clinic Flow Landscape',
              'First Sign-In',
              'Doctor Onboarding Readiness',
              'Morning Triage',
              'Patient Acquisition and Intake',
              'Create Patient from Registry',
              'First Patient Journey',
              'Test Ordering',
              'Prescribing',
              'Lab Order and Sample Collection',
              'Reception to Phlebotomy',
              'Result Review and Closure',
              'Earnings Settlement',
            ],
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
