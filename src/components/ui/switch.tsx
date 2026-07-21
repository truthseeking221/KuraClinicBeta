'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { useId } from 'react';
import type { ReactNode } from 'react';

import styles from './switch.module.css';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchShape = 'pill' | 'rectangle';

export type SwitchProps = Omit<SwitchPrimitive.Root.Props, 'className'> & {
  className?: string;
  /** Visible outcome-oriented label. */
  children?: ReactNode;
  /** Supporting text that explains what the setting changes. */
  description?: ReactNode;
  size?: SwitchSize;
  shape?: SwitchShape;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Switch({
  children,
  className,
  description,
  disabled = false,
  id,
  readOnly = false,
  size = 'md',
  shape = 'pill',
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? `switch-${generatedId}`;
  const descriptionId = description ? `${switchId}-description` : undefined;

  const control = (
    <SwitchPrimitive.Root
      {...props}
      aria-describedby={descriptionId}
      className={styles.control}
      data-size={size}
      data-shape={shape}
      data-slot="switch-control"
      disabled={disabled}
      id={switchId}
      readOnly={readOnly}
    >
      <SwitchPrimitive.Thumb className={styles.thumb}>
        <span className={styles.chip} />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );

  if (!children && !description) {
    return <span className={joinClasses(styles.standalone, className)}>{control}</span>;
  }

  return (
    <div
      className={joinClasses(styles.field, className)}
      data-disabled={disabled ? 'true' : undefined}
      data-readonly={readOnly ? 'true' : undefined}
      data-slot="switch-field"
    >
      {control}
      <div className={styles.copy}>
        {children ? (
          <label className={styles.label} htmlFor={switchId}>
            {children}
          </label>
        ) : null}
        {description ? (
          <span className={styles.description} id={descriptionId}>
            {description}
          </span>
        ) : null}
      </div>
    </div>
  );
}
