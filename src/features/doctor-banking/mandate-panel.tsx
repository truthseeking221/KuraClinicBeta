'use client';

import { useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Badge,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  QrCodeIcon,
} from '../../components/ui';

import { formatBankingDateTime } from './logic';
import type { MandateLinkSession, MandateState, MandateSummary } from './types';
import styles from './doctor-banking.module.css';

export const MANDATE_COPY: Record<
  MandateState,
  { label: string; variant: 'success' | 'warning' | 'danger' | 'neutral'; description: string }
> = {
  unlinked: {
    label: 'Not linked',
    variant: 'neutral',
    description: 'KHQR remains available. Link ABA only if you want optional scheduled collections.',
  },
  link_pending: {
    label: 'Waiting for ABA',
    variant: 'warning',
    description: 'The authorization is not active until ABA confirms it.',
  },
  linked: {
    label: 'Auto-pay active',
    variant: 'success',
    description: 'Scheduled collections use the linked ABA authorization after the required notice.',
  },
  renewal_required: {
    label: 'Renewal required',
    variant: 'warning',
    description: 'Renew the authorization before the next eligible scheduled collection.',
  },
  expired: {
    label: 'Authorization expired',
    variant: 'danger',
    description: 'Scheduled collections are unavailable. KHQR remains available.',
  },
  frozen: {
    label: 'Collection frozen',
    variant: 'danger',
    description: 'Kura has paused collection actions while the account state is reviewed.',
  },
  deleted: {
    label: 'Authorization deleted',
    variant: 'danger',
    description: 'This authorization cannot be used or restored from this screen.',
  },
};

export type MandatePanelProps = {
  mandate: MandateSummary;
  linkSession?: MandateLinkSession | null;
  onBeginLink?: () => void;
  onRenew?: () => void;
  onRegenerateLink?: () => void;
  onUnlink?: () => void;
};

function LinkSessionContent({
  session,
  onRegenerate,
}: {
  session: MandateLinkSession | null | undefined;
  onRegenerate?: () => void;
}) {
  if (!session) {
    return (
      <Alert tone="info">
        <AlertTitle>Starting secure ABA link</AlertTitle>
        <AlertDescription>Waiting for a provider link session. No authorization is active yet.</AlertDescription>
      </Alert>
    );
  }

  if (session.state === 'expired') {
    return (
      <Alert tone="warning">
        <AlertTitle>Link session expired</AlertTitle>
        <AlertDescription>Create a new secure session. The expired code cannot authorize an account.</AlertDescription>
        <Button onClick={onRegenerate} variant="outline">Create new link</Button>
      </Alert>
    );
  }

  if (session.state === 'confirmed') {
    return (
      <Alert tone="success">
        <AlertTitle>ABA confirmed the authorization</AlertTitle>
        <AlertDescription>The linked account will appear after the balance overview refreshes.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={styles.linkSession}>
      <div aria-label="ABA authorization QR code" className={styles.qrObject} role="img">
        <QrCodeIcon aria-hidden="true" size={96} />
      </div>
      <div className={styles.linkInstructions}>
        <p className={styles.instructionTitle}>Confirm in ABA Mobile</p>
        <ol className={styles.steps}>
          <li>Open ABA Mobile on your phone.</li>
          <li>Scan this code or open the secure mobile link.</li>
          <li>Review and authorize in ABA Mobile.</li>
        </ol>
        <p className={styles.quietCopy}>
          Waiting for provider confirmation · expires {formatBankingDateTime(session.expiresAt)}
        </p>
        <Button asChild variant="secondary">
          <a href={session.mobileDeepLink}>Open ABA Mobile</a>
        </Button>
      </div>
    </div>
  );
}

export function MandatePanel({
  linkSession,
  mandate,
  onBeginLink,
  onRegenerateLink,
  onRenew,
  onUnlink,
}: MandatePanelProps) {
  const [linkOpen, setLinkOpen] = useState(Boolean(linkSession));
  const copy = MANDATE_COPY[mandate.state];
  const canLink = mandate.state === 'unlinked' || mandate.state === 'expired';
  const canRenew = mandate.state === 'renewal_required';
  const canUnlink = mandate.state === 'linked' || mandate.state === 'renewal_required';

  const begin = () => {
    onBeginLink?.();
    setLinkOpen(true);
  };

  return (
    <section
      aria-labelledby="doctor-banking-mandate-title"
      className={styles.objectPanel}
    >
      <div className={styles.objectHeader}>
        <div className={styles.objectHeading}>
          <h2 className={styles.objectTitle} id="doctor-banking-mandate-title">ABA authorization</h2>
          <p className={styles.objectDescription}>{copy.description}</p>
        </div>
        <Badge variant={copy.variant}>{copy.label}</Badge>
      </div>

      {mandate.maskedAccount ? (
        <dl className={styles.objectFacts}>
          <div><dt>Account</dt><dd>{mandate.maskedAccount}</dd></div>
          {mandate.expiresAt ? (
            <div><dt>Expires</dt><dd>{formatBankingDateTime(mandate.expiresAt)}</dd></div>
          ) : null}
        </dl>
      ) : null}

      {mandate.state === 'frozen' || mandate.state === 'deleted' ? (
        <Alert tone="danger">
          <AlertTitle>{copy.label}</AlertTitle>
          <AlertDescription>
            {mandate.state === 'frozen'
              ? 'No collection or account change can be started while this state is active.'
              : 'Contact Kura support if you need to link another eligible account.'}
          </AlertDescription>
        </Alert>
      ) : null}

      <div className={styles.objectActions}>
        {canLink ? <Button onClick={begin}>{mandate.state === 'expired' ? 'Link ABA again' : 'Link ABA'}</Button> : null}
        {canRenew ? <Button onClick={() => { onRenew?.(); setLinkOpen(true); }}>Renew authorization</Button> : null}
        {mandate.state === 'link_pending' ? (
          <Button onClick={() => setLinkOpen(true)} variant="secondary">View link session</Button>
        ) : null}
        {canUnlink ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost">Unlink ABA</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Unlink this ABA authorization?</AlertDialogTitle>
                <AlertDialogDescription>
                  Scheduled collections will stop. Any remaining balance you owe may require a final collection or KHQR settlement.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep authorization</AlertDialogCancel>
                <AlertDialogAction onClick={onUnlink} variant="destructive">Unlink ABA</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </div>

      <Dialog onOpenChange={setLinkOpen} open={linkOpen}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Link ABA securely</DialogTitle>
            <DialogDescription>
              Kura stores a payment token and masked account only. The link succeeds only after ABA confirms it.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <LinkSessionContent session={linkSession} onRegenerate={onRegenerateLink} />
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setLinkOpen(false)} variant="ghost">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
