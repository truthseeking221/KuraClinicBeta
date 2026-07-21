'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  DragEvent,
  ReactNode,
} from 'react';

import { Alert, AlertDescription, AlertTitle } from './alert';
import { Button } from './button';
import { IconButton } from './icon-button';
import {
  FileIcon,
  ImageIcon,
  RefreshIcon,
  UploadIcon,
  XIcon,
} from './icons';
import styles from './file-upload.module.css';

export type FileUploadStatus = 'selected' | 'uploading' | 'complete' | 'error';

export type FileUploadItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  file?: File;
  previewUrl?: string;
  progress?: number;
  status?: FileUploadStatus;
  error?: string;
};

export type FileUploadProps = Omit<ComponentPropsWithoutRef<'div'>, 'defaultValue' | 'onChange'> & {
  label: ReactNode;
  description?: ReactNode;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: FileUploadItem[];
  defaultValue?: FileUploadItem[];
  onValueChange?: (files: FileUploadItem[]) => void;
  onRejected?: (messages: string[]) => void;
  onRetry?: (file: FileUploadItem) => void;
  browseLabel?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function formatFileSize(bytes: number) {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`;
}

function matchesAccept(file: File, accept: string) {
  if (!accept || accept === '*') return true;
  return accept.split(',').some((entry) => {
    const rule = entry.trim().toLowerCase();
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    if (rule.startsWith('.')) return name.endsWith(rule);
    if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

function nativeItem(file: File): FileUploadItem {
  return {
    file,
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    size: file.size,
    status: 'selected',
    type: file.type,
  };
}

function statusLabel(status: FileUploadStatus | undefined, progress: number | undefined) {
  if (status === 'uploading') return `Uploading${progress === undefined ? '' : ` ${progress}%`}`;
  if (status === 'complete') return 'Uploaded';
  if (status === 'error') return 'Upload failed';
  return 'Ready to upload';
}

export function FileUpload({
  accept = '*',
  browseLabel = 'select',
  className,
  defaultValue = [],
  description,
  disabled = false,
  label,
  maxFiles = 1,
  maxSize = Number.POSITIVE_INFINITY,
  multiple = maxFiles > 1,
  onRejected,
  onRetry,
  onValueChange,
  readOnly = false,
  value,
  ...props
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = `file-upload-${generatedId}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = `${inputId}-errors`;
  const inputRef = useRef<HTMLInputElement>(null);
  const ownedPreviewUrls = useRef(new Set<string>());
  const [internalFiles, setInternalFiles] = useState<FileUploadItem[]>(defaultValue);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const files = value ?? internalFiles;

  const commit = useCallback(
    (next: FileUploadItem[]) => {
      if (value === undefined) setInternalFiles(next);
      onValueChange?.(next);
    },
    [onValueChange, value],
  );

  useEffect(
    () => () => {
      ownedPreviewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const addFiles = useCallback(
    (incoming: File[]) => {
      if (disabled || readOnly || incoming.length === 0) return;
      const messages: string[] = [];
      const candidates = multiple ? incoming : incoming.slice(0, 1);
      const remaining = multiple ? Math.max(0, maxFiles - files.length) : 1;

      if (candidates.length > remaining) {
        messages.push(`You can attach up to ${maxFiles} file${maxFiles === 1 ? '' : 's'}.`);
      }

      const accepted = candidates.slice(0, remaining).flatMap((file) => {
        if (file.size > maxSize) {
          messages.push(`${file.name} is larger than ${formatFileSize(maxSize)}.`);
          return [];
        }
        if (!matchesAccept(file, accept)) {
          messages.push(`${file.name} is not an accepted file type.`);
          return [];
        }
        const duplicate = files.some(
          (existing) => existing.name === file.name && existing.size === file.size,
        );
        if (duplicate) {
          messages.push(`${file.name} is already attached.`);
          return [];
        }
        const item = nativeItem(file);
        if (item.previewUrl) ownedPreviewUrls.current.add(item.previewUrl);
        return [item];
      });

      const next = multiple ? [...files, ...accepted] : accepted;
      if (accepted.length > 0) commit(next);
      setErrors(messages);
      if (messages.length > 0) onRejected?.(messages);
      if (inputRef.current) inputRef.current.value = '';
    },
    [accept, commit, disabled, files, maxFiles, maxSize, multiple, onRejected, readOnly],
  );

  function removeFile(id: string) {
    const removed = files.find((item) => item.id === id);
    if (removed?.previewUrl && ownedPreviewUrls.current.has(removed.previewUrl)) {
      URL.revokeObjectURL(removed.previewUrl);
      ownedPreviewUrls.current.delete(removed.previewUrl);
    }
    commit(files.filter((item) => item.id !== id));
    setErrors([]);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.currentTarget.files ?? []));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  const atLimit = files.length >= maxFiles;
  const unavailable = disabled || readOnly || atLimit;

  return (
    <div
      {...props}
      className={joinClasses(styles.root, className)}
      data-disabled={disabled ? 'true' : undefined}
      data-read-only={readOnly ? 'true' : undefined}
      data-slot="file-upload"
    >
      <div className={styles.heading}>
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
        {description ? (
          <p className={styles.description} id={descriptionId}>
            {description}
          </p>
        ) : null}
      </div>

      {!readOnly ? (
        <div
          className={styles.dropzone}
          data-dragging={dragging ? 'true' : undefined}
          data-slot="file-upload-dropzone"
          data-unavailable={unavailable ? 'true' : undefined}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!unavailable) setDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            accept={accept}
            aria-describedby={[descriptionId, errors.length ? errorId : undefined].filter(Boolean).join(' ') || undefined}
            aria-label={typeof label === 'string' ? label : 'Choose files'}
            className={styles.input}
            disabled={unavailable}
            id={inputId}
            multiple={multiple}
            onChange={handleChange}
            type="file"
          />
          <UploadIcon aria-hidden size={24} />
          <div className={styles.dropzoneCopy}>
            <div className={styles.dropzonePrompt}>
              <strong>{dragging ? 'Drop files here' : 'Drag and drop to upload or'}</strong>
              {!dragging ? (
                <Button
                  disabled={unavailable}
                  onClick={() => inputRef.current?.click()}
                  size="sm"
                  variant="link"
                >
                  {atLimit ? 'File limit reached' : browseLabel}
                </Button>
              ) : null}
            </div>
            <span>
              {maxFiles === 1 ? 'One file' : `Up to ${maxFiles} files`}
              {Number.isFinite(maxSize) ? ` · ${formatFileSize(maxSize)} each` : ''}
            </span>
          </div>
        </div>
      ) : null}

      {errors.length > 0 ? (
        <Alert id={errorId} tone="danger">
          <AlertTitle>Some files were not added</AlertTitle>
          <AlertDescription>
            <ul className={styles.errorList}>
              {errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : null}

      {files.length > 0 ? (
        <ul className={styles.list} aria-label="Attached files">
          {files.map((item) => {
            const status = item.status ?? 'selected';
            return (
              <li className={styles.item} data-status={status} key={item.id}>
                {item.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" className={styles.preview} src={item.previewUrl} />
                ) : (
                  <span className={styles.fileIcon}>
                    {item.type.startsWith('image/') ? (
                      <ImageIcon aria-hidden size={20} />
                    ) : (
                      <FileIcon aria-hidden size={20} />
                    )}
                  </span>
                )}
                <div className={styles.fileInfo}>
                  <strong className={styles.fileName}>{item.name}</strong>
                  <span className={styles.fileMeta}>
                    {formatFileSize(item.size)} · {statusLabel(status, item.progress)}
                  </span>
                  {status === 'uploading' ? (
                    <progress
                      aria-label={`Upload progress for ${item.name}`}
                      className={styles.progress}
                      max={100}
                      value={item.progress ?? 0}
                    />
                  ) : null}
                  {item.error ? <span className={styles.fileError}>{item.error}</span> : null}
                </div>
                {!readOnly && status === 'error' && onRetry ? (
                  <IconButton
                    aria-label={`Retry ${item.name}`}
                    onClick={() => onRetry(item)}
                    size="micro"
                    variant="tertiary"
                  >
                    <RefreshIcon aria-hidden size={16} />
                  </IconButton>
                ) : null}
                {!readOnly ? (
                  <IconButton
                    aria-label={`Remove ${item.name}`}
                    disabled={disabled || status === 'uploading'}
                    onClick={() => removeFile(item.id)}
                    size="micro"
                    variant="tertiary"
                  >
                    <XIcon aria-hidden size={16} />
                  </IconButton>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.empty}>No files attached.</p>
      )}
    </div>
  );
}
