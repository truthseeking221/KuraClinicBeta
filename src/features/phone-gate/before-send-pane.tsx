import { AlertIcon, UserIdentityIcon } from '../../components/ui';

import { PHONE_GATE_COPY } from './logic';
import styles from './phone-gate.module.css';

export type BeforeSendPaneProps = {
  label?: string;
  body?: string;
};

/**
 * The persistent safety pane (spec §4): reassurance + responsibility framing,
 * identical in every modal state. Never a blocking alert; the explicit
 * BEFORE YOU SEND label carries the meaning — color never stands alone.
 */
export function BeforeSendPane({
  body = PHONE_GATE_COPY.beforeSendBody,
  label = PHONE_GATE_COPY.beforeSendLabel,
}: BeforeSendPaneProps) {
  return (
    <aside aria-label="Before you send" className={styles.safetyPane}>
      <UserIdentityIcon aria-hidden="true" className={styles.safetyIllustration} />
      <p className={styles.safetyLabel}>
        <AlertIcon aria-hidden="true" className={styles.safetyLabelIcon} />
        {label}
      </p>
      <p className={styles.safetyBody}>{body}</p>
    </aside>
  );
}
