import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { LAB_CATALOG_CATEGORIES, LAB_CATALOG_TESTS } from './demo-data';
import { LabOrderRail } from './lab-order-rail';
import styles from './lab-order-rail.stories.module.css';
import { LAB_CATALOG_STORYBOOK_KURA } from './storybook-metadata';

const meta = {
  title: 'Clinic/Clinical/Lab Catalog/Order Workspace Rail',
  component: LabOrderRail,
  tags: ['autodocs', 'adapted-kura'],
  parameters: {
    layout: 'fullscreen',
    kura: LAB_CATALOG_STORYBOOK_KURA,
    docs: {
      description: {
        component:
          'A contained lab-order draft that keeps the patient chart visible while tests are selected.',
      },
    },
  },
  args: {
    categories: LAB_CATALOG_CATEGORIES,
    onClose: fn(),
    onReview: fn(),
    tests: LAB_CATALOG_TESTS,
  },
} satisfies Meta<typeof LabOrderRail>;

export default meta;
type Story = StoryObj<typeof meta>;

function Frame({ children, widthClass }: { children: React.ReactNode; widthClass: string }) {
  return <div className={`${styles.frame} ${widthClass}`}>{children}</div>;
}

export const WorkspaceWidth520: Story = {
  render: (args) => (
    <Frame widthClass={styles.width520}>
      <LabOrderRail {...args} />
    </Frame>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { name: 'Order lab tests' })).toBeVisible();
    await expect(canvas.getByText('0 selected')).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', { name: 'HbA1c' }));
    await expect(canvas.getByText('1 selected')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Review order' }));
    await expect(args.onReview).toHaveBeenCalledWith(['hba1c']);
  },
};

export const MinimumWidth400: Story = {
  render: (args) => (
    <Frame widthClass={styles.width400}>
      <LabOrderRail {...args} />
    </Frame>
  ),
};

export const ComfortableWidth560: Story = {
  args: { defaultSelectedTestIds: ['hba1c', 'creatinine-egfr'] },
  render: (args) => (
    <Frame widthClass={styles.width560}>
      <LabOrderRail {...args} />
    </Frame>
  ),
};

export const Mobile320: Story = {
  parameters: { viewport: { defaultViewport: 'kura320' } },
  render: (args) => (
    <Frame widthClass={styles.width320}>
      <LabOrderRail {...args} />
    </Frame>
  ),
};
