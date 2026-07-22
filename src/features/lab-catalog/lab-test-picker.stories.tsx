import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import {
  FIGMA_DEFAULT_SELECTED_TEST_IDS,
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from './demo-data';
import { LabTestPicker } from './lab-test-picker';
import styles from './lab-test-picker.stories.module.css';
import { LAB_CATALOG_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Lab Catalog/Test Picker',
  component: LabTestPicker,
  tags: ['autodocs', 'source-figma', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: LAB_CATALOG_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'Doctor lab-test picker for browsing, searching, filtering, and selecting active catalog tests. A delayed hover or keyboard focus reveals operational detail and price without adding noise to the scan view.',
      },
    },
  },
  args: {
    categories: LAB_CATALOG_CATEGORIES,
    tests: LAB_CATALOG_TESTS,
    totalCount: 67,
    onSuggestMissingTest: fn(),
  },
} satisfies Meta<typeof LabTestPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({
  args,
  widthClass = styles.desktop,
}: {
  args: ComponentProps<typeof LabTestPicker>;
  widthClass?: string;
}) {
  return (
    <div className={`${styles.frame} ${widthClass}`}>
      <LabTestPicker {...args} />
    </div>
  );
}

export const Default: Story = {
  args: {
    defaultSelectedTestIds: FIGMA_DEFAULT_SELECTED_TEST_IDS,
  },
  render: (args) => <Frame args={args} />,
};

export const NewPatient: Story = {
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryAllByRole('checkbox', { checked: true })).toHaveLength(0);
    await expect(canvas.getByRole('heading', { name: 'All tests' })).toBeVisible();
  },
};

export const SearchResults: Story = {
  args: {
    autoFocusSearch: true,
    defaultQuery: 'glucose',
  },
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Fasting glucose')).toBeVisible();
    await expect(canvas.getByText('Random glucose')).toBeVisible();
    await expect(canvas.queryByText('HbA1c')).not.toBeInTheDocument();
    await expect(canvas.getByRole('status')).toHaveTextContent('2 tests');
  },
};

export const ExternalSearchContract: Story = {
  args: {
    defaultQuery: 'glucose',
    filterStrategy: 'external',
    resultTotal: 2,
    tests: LAB_CATALOG_TESTS.filter((test) =>
      ['fasting-glucose', 'random-glucose'].includes(test.testCatalogId),
    ),
  },
  render: (args) => <Frame args={args} />,
};

export const NoResults: Story = {
  args: {
    autoFocusSearch: true,
    defaultQuery: 'homocysteine',
  },
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('No tests match “homocysteine”'),
    ).toBeVisible();
    await userEvent.click(
      canvas.getByRole('button', { name: 'Suggest a missing test' }),
    );
    await expect(meta.args.onSuggestMissingTest).toHaveBeenCalledWith('homocysteine');
  },
};

export const SelectAndRemove: Story = {
  render: function SelectionPlayground(args) {
    const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
    return (
      <Frame
        args={{
          ...args,
          selectedTestIds,
          onSelectedTestIdsChange: setSelectedTestIds,
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hba1c = canvas.getByRole('checkbox', { name: 'HbA1c' });
    await userEvent.click(hba1c);
    await expect(hba1c).toBeChecked();
    await userEvent.click(hba1c);
    await expect(hba1c).not.toBeChecked();
  },
};

export const HoverState: Story = {
  args: {
    defaultSelectedTestIds: ['fasting-glucose'],
  },
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByTestId('catalog-test-hba1c');
    const restingBackground = getComputedStyle(row).backgroundColor;
    // Synthetic hover cannot drive CSS :hover; the row shares the same
    // surface treatment on :focus-within, which real focus can drive.
    canvas.getByRole('checkbox', { name: 'HbA1c' }).focus();
    await waitFor(() => {
      expect(getComputedStyle(row).backgroundColor).not.toBe(restingBackground);
    });
  },
};

export const LegacyDetailPreview: Story = {
  args: {
    defaultQuery: 'fasting',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Proves the restored Legacy DCM preview: hover intent opens one anchored detail card, its action updates selection, and the card dismisses after the action.',
      },
    },
  },
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overlay = within(document.body);

    await userEvent.hover(canvas.getByTestId('catalog-test-fasting-glucose'));
    await waitFor(
      () =>
        expect(
          overlay.getByRole('dialog', { name: 'Fasting glucose test details' }),
        ).toBeVisible(),
      { timeout: 2500 },
    );
    await expect(
      overlay.getByText(
        'Point-in-time fasting glucose for diagnosis and medication adjustment.',
      ),
    ).toBeVisible();
    await expect(overlay.getByText('Ref 70–99 mg/dL')).toBeVisible();
    await expect(overlay.getByText('$5.00')).toBeVisible();

    await userEvent.click(
      overlay.getByRole('button', { name: 'Add to order: Fasting glucose' }),
    );
    await expect(
      canvas.getByRole('checkbox', { name: 'Fasting glucose' }),
    ).toBeChecked();
    await waitFor(() =>
      expect(
        overlay.queryByRole('dialog', { name: 'Fasting glucose test details' }),
      ).not.toBeInTheDocument(),
    );

    const fastingGlucose = canvas.getByRole('checkbox', {
      name: 'Fasting glucose',
    });
    fastingGlucose.focus();
    await waitFor(() =>
      expect(
        overlay.getByRole('dialog', { name: 'Fasting glucose test details' }),
      ).toBeVisible(),
    );
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        overlay.queryByRole('dialog', { name: 'Fasting glucose test details' }),
      ).not.toBeInTheDocument(),
    );
  },
};

export const CategoryFilter: Story = {
  args: {
    defaultSelectedCategoryIds: ['lipids'],
  },
  render: (args) => <Frame args={args} />,
};

export const CategoryFilterInteraction: Story = {
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Filter by category' }));
    const overlay = within(document.body);
    await userEvent.click(overlay.getByRole('checkbox', { name: /^Lipids/ }));
    await userEvent.click(overlay.getByRole('checkbox', { name: /^Renal function/ }));
    await expect(canvas.getByText('Lipid panel')).toBeVisible();
    await expect(canvas.getByText('Creatinine + eGFR')).toBeVisible();
    await expect(canvas.queryByText('HbA1c')).not.toBeInTheDocument();
    await expect(canvas.getByRole('heading', { name: 'Filtered tests' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Filter by category, 2 selected' }),
    ).toHaveTextContent('Category · Lipids +1');
    await userEvent.click(overlay.getByRole('button', { name: 'Clear categories' }));
    await expect(canvas.getByRole('heading', { name: 'All tests' })).toBeVisible();
  },
};

export const CollapseSection: Story = {
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Glycemic control/ }));
    await waitFor(async () => {
      await expect(canvas.queryByText('HbA1c')).not.toBeInTheDocument();
    });
  },
};

export const UnavailableTest: Story = {
  args: {
    defaultQuery: 'GAD65',
  },
  render: (args) => <Frame args={args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: /GAD antibodies/ });
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toHaveAccessibleDescription(
      /Reagents restocking · expected back 18 Jul/,
    );
    await expect(
      canvas.getByText('Reagents restocking · expected back 18 Jul'),
    ).toBeVisible();
  },
};

export const Loading: Story = {
  args: { state: 'loading', tests: [] },
  render: (args) => <Frame args={args} />,
};

function RetryPlayground(args: ComponentProps<typeof LabTestPicker>) {
  const [recovered, setRecovered] = useState(false);
  return (
    <Frame
      args={
        recovered
          ? args
          : {
              ...args,
              state: 'error',
              tests: [],
              onRetry: () => setRecovered(true),
            }
      }
    />
  );
}

export const ErrorAndRecovery: Story = {
  render: (args) => <RetryPlayground {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Could not load tests')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Retry' }));
    await waitFor(async () => {
      await expect(canvas.getByText('HbA1c')).toBeVisible();
    });
  },
};

export const Offline: Story = {
  args: {
    state: 'offline',
    tests: [],
    onRetry: fn(),
  },
  render: (args) => <Frame args={args} />,
};

export const StaleSnapshot: Story = {
  args: {
    staleAt: 'Jul 16, 2026 at 08:20',
    onRetry: fn(),
  },
  render: (args) => <Frame args={args} />,
};

export const PermissionRestricted: Story = {
  args: {
    state: 'permission',
    defaultSelectedTestIds: ['hba1c', 'lipid-panel'],
  },
  render: (args) => <Frame args={args} />,
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultSelectedTestIds: FIGMA_DEFAULT_SELECTED_TEST_IDS,
  },
  render: (args) => <Frame args={args} />,
};

export const LongContent: Story = {
  args: {
    tests: [
      {
        ...LAB_CATALOG_TESTS[0],
        displayName:
          'Glycated haemoglobin with an intentionally long laboratory display name for overflow verification',
      },
      ...LAB_CATALOG_TESTS.slice(1),
    ],
  },
  render: (args) => <Frame args={args} />,
};

export const MobileWidth320: Story = {
  globals: { viewport: { value: 'kura320' } },
  render: (args) => <Frame args={args} widthClass={styles.w320} />,
};

export const MobileWidth360: Story = {
  globals: { viewport: { value: 'kura360' } },
  render: (args) => <Frame args={args} widthClass={styles.w360} />,
};

export const MobileWidth390: Story = {
  globals: { viewport: { value: 'kura390' } },
  render: (args) => <Frame args={args} widthClass={styles.w390} />,
};

export const MobileWidth412: Story = {
  globals: { viewport: { value: 'kura412' } },
  render: (args) => <Frame args={args} widthClass={styles.w412} />,
};

export const MobileWidth480: Story = {
  globals: { viewport: { value: 'kura480' } },
  render: (args) => <Frame args={args} widthClass={styles.w480} />,
};

export const ContainerWidth560: Story = {
  render: (args) => <Frame args={args} widthClass={styles.w560} />,
};

export const TabletWidth768: Story = {
  globals: { viewport: { value: 'kura768' } },
  render: (args) => <Frame args={args} widthClass={styles.w768} />,
};

export const DesktopWidth1024: Story = {
  globals: { viewport: { value: 'kura1024' } },
  args: { defaultSelectedTestIds: FIGMA_DEFAULT_SELECTED_TEST_IDS },
  render: (args) => <Frame args={args} widthClass={styles.w1024} />,
};

export const CompactDensity: Story = {
  globals: { density: 'compact' },
  args: { defaultSelectedTestIds: FIGMA_DEFAULT_SELECTED_TEST_IDS },
  render: (args) => <Frame args={args} />,
};

export const ComfortableDensity: Story = {
  globals: { density: 'comfortable' },
  args: { defaultSelectedTestIds: FIGMA_DEFAULT_SELECTED_TEST_IDS },
  render: (args) => <Frame args={args} />,
};

export const DarkTheme: Story = {
  globals: { theme: 'dark' },
  args: { defaultSelectedTestIds: FIGMA_DEFAULT_SELECTED_TEST_IDS },
  render: (args) => <Frame args={args} />,
};
