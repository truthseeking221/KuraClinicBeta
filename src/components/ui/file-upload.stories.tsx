'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { createEvent, expect, fireEvent, userEvent, within } from 'storybook/test';

import { FileUpload, type FileUploadItem } from './index';

const meta = {
  title: 'Design System/Components/File Upload',
  component: FileUpload,
  tags: ['autodocs', 'source-kura', 'adapted-kura'],
  parameters: {
    layout: 'centered',
    kura: {
      source: { vendor: 'Kura', registryItem: 'file-upload', visualReference: 'Kura file-upload', familySize: 10 },
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'Kura had upload icons and an Empty State example but no accessible file selection, drag/drop, validation, progress or file-list owner.',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura-control-and-panel',
        elevation: 'none',
        icons: 'kura-canonical',
        responsive: 'stacking',
      },
      exclusions: [
        {
          capability: 'Avatar and cover replacement',
          reason:
            'These require profile permissions, cropping, image moderation and save/cancel semantics; compose File Upload in the owning feature.',
        },
        {
          capability: 'Sortable gallery',
          reason:
            'Ordering needs keyboard reordering, persisted rank and undo. It is not part of basic file selection.',
        },
        {
          capability: 'Table file manager',
          replacement: 'Compose File Upload state with the canonical Table or Data Grid when metadata comparison is required.',
        },
      ],
    },
  },
  args: {
    label: 'Attach referral documents',
    description: 'PDF or image, up to 5 MB each. Do not attach unrelated patient records.',
    accept: 'application/pdf,image/*',
    maxFiles: 3,
    maxSize: 5 * 1024 * 1024,
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { maxFiles: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Attach referral documents');
    await userEvent.upload(
      input,
      new File(['referral'], 'referral-letter.pdf', { type: 'application/pdf' }),
    );
    await expect(canvas.getByText('referral-letter.pdf')).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Remove referral-letter.pdf' }));
    await expect(canvas.getByText('No files attached.')).toBeVisible();
  },
};

export const MultipleFiles: Story = {
  args: { maxFiles: 4, multiple: true },
};

export const DragAndDrop: Story = {
  args: { maxFiles: 2, multiple: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropzone = canvasElement.querySelector('[data-slot="file-upload-dropzone"]');
    const file = new File(['referral'], 'referral-drop.pdf', { type: 'application/pdf' });
    const dropEvent = createEvent.drop(dropzone as HTMLElement);
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { files: [file] },
    });
    await fireEvent(dropzone as HTMLElement, dropEvent);
    await expect(canvas.getByText('referral-drop.pdf')).toBeVisible();
  },
};

export const ImageGallerySelection: Story = {
  args: {
    accept: 'image/*',
    label: 'Attach wound assessment images',
    description:
      'Images remain draft attachments until the clinician saves the assessment. Patient consent is handled by the owning workflow.',
    maxFiles: 4,
    multiple: true,
  },
};

const progressFiles: FileUploadItem[] = [
  {
    id: 'uploading',
    name: 'external-lab-report.pdf',
    size: 845_000,
    type: 'application/pdf',
    status: 'uploading',
    progress: 64,
  },
  {
    id: 'complete',
    name: 'referral-letter.pdf',
    size: 285_000,
    type: 'application/pdf',
    status: 'complete',
  },
];

export const UploadProgress: Story = {
  args: { defaultValue: progressFiles, maxFiles: 3 },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole('progressbar', {
        name: 'Upload progress for external-lab-report.pdf',
      }),
    ).toHaveValue(64);
  },
};

function RetryExample() {
  const [files, setFiles] = useState<FileUploadItem[]>([
    {
      id: 'failed',
      error: 'The connection ended before the upload completed.',
      name: 'insurance-authorisation.pdf',
      size: 640_000,
      status: 'error',
      type: 'application/pdf',
    },
  ]);
  return (
    <FileUpload
      accept="application/pdf"
      label="Insurance authorisation"
      maxFiles={1}
      onRetry={(file) =>
        setFiles((current) =>
          current.map((item) =>
            item.id === file.id
              ? { ...item, error: undefined, progress: 0, status: 'uploading' }
              : item,
          ),
        )
      }
      onValueChange={setFiles}
      value={files}
    />
  );
}

export const FailedWithRetry: Story = {
  render: () => <RetryExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Retry insurance-authorisation.pdf' }));
    await expect(
      canvas.getByRole('progressbar', {
        name: 'Upload progress for insurance-authorisation.pdf',
      }),
    ).toHaveValue(0);
  },
};

export const ValidationError: Story = {
  args: {
    accept: 'application/pdf',
    maxFiles: 1,
    maxSize: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.upload(
      canvas.getByLabelText('Attach referral documents'),
      new File(['this file is too large'], 'oversize.pdf', { type: 'application/pdf' }),
      { applyAccept: false },
    );
    await expect(canvas.getByText('Some files were not added')).toBeVisible();
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: [progressFiles[1]],
    description: 'Uploaded by Reception on 16 Jul 2026 at 09:42 ICT.',
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    description: 'Attachments are unavailable after the consultation is archived.',
  },
};

export const MobileInteractive: Story = {
  args: {
    label: 'Attach a photo of the referral',
    maxFiles: 2,
    multiple: true,
  },
  parameters: { viewport: { defaultViewport: 'kura320' } },
};
