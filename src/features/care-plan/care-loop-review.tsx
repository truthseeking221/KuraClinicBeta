'use client';

import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from '../../components/ui';
import { useT } from '../../components/foundations/i18n';

import styles from './care-plan.module.css';
import { optionalProposals, proposalsToCommit, spineProposals } from './logic';
import type { CareLoopDraft, CarePlan, LoopProposal } from './types';

export type CareLoopReviewProps = {
  draft: CareLoopDraft;
  plan: CarePlan;
  signedBy: string;
  /** Date label the follow-up is measured from, in the doctor's words. */
  anchorLabel: string;
  onSign: (keptOptionalIds: ReadonlySet<string>) => void;
};

const KIND_LABELS: Record<LoopProposal['kind'], string> = {
  focus: 'Diagnosis',
  goal: 'Goal',
  'repeat-lab': 'Repeat test',
  medication: 'Medicine',
  'follow-up': 'Follow-up',
  instruction: 'For the patient',
};

/**
 * The draft a doctor signs to turn a result into ongoing care.
 *
 * It holds no store and writes nothing. Signing is the only path from a
 * proposal to a patient's plan, which is what keeps a drafted suggestion from
 * ever becoming care on its own.
 */
export function CareLoopReview({
  anchorLabel,
  draft,
  onSign,
  signedBy,
}: CareLoopReviewProps) {
  const t = useT();
  const [dropped, setDropped] = useState<ReadonlySet<string>>(new Set());

  const spine = spineProposals(draft);
  const optional = optionalProposals(draft);
  const kept = new Set(optional.filter((p) => !dropped.has(p.id)).map((p) => p.id));
  const committing = proposalsToCommit(draft, kept);

  const toggle = (id: string) => {
    const next = new Set(dropped);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setDropped(next);
  };

  return (
    <Card as="section" aria-label={t('Care loop review')} className={styles.loopCard}>
      <CardHeader>
        <CardTitle>{t(draft.issueTitle)}</CardTitle>
        <div className={styles.loopStatus}>
          <Badge variant="warning">{t(draft.statusLabel)}</Badge>
          <span className={styles.loopHint}>
            {t('Drafted from this result. Nothing is saved until you sign.')}
          </span>
        </div>
      </CardHeader>

      <CardContent className={styles.loopContent}>
        <Card as="section" aria-label={t('Evidence')} size="sm" variant="tile">
          <CardHeader>
            <CardTitle>{t('What the result shows')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={styles.evidenceList}>
              {draft.evidence.map((item) => (
                <li className={styles.evidenceRow} key={item.label}>
                  <span className={styles.evidenceLabel}>{item.label}</span>
                  <span className={styles.evidenceValue}>{item.value}</span>
                  <span className={styles.evidenceReference}>{item.reference}</span>
                  <Badge size="sm" variant={item.tone === 'danger' ? 'danger' : 'warning'}>
                    {t(item.flagLabel)}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card as="section" aria-label={t('Plan')} size="sm" variant="tile">
          <CardHeader>
            <CardTitle>{t('What this adds to the plan')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={styles.proposalList}>
              {spine.map((proposal) => (
                <li className={styles.proposal} data-spine="true" key={proposal.id}>
                  <span className={styles.proposalKind}>{t(KIND_LABELS[proposal.kind])}</span>
                  <span className={styles.proposalMain}>
                    <span className={styles.proposalLabel}>{proposal.label}</span>
                    {proposal.detail ? (
                      <span className={styles.proposalDetail}>{t(proposal.detail)}</span>
                    ) : null}
                  </span>
                  <span className={styles.proposalFixed}>{t('Always included')}</span>
                </li>
              ))}

              {optional.map((proposal) => (
                <li className={styles.proposal} key={proposal.id}>
                  <span className={styles.proposalKind}>{t(KIND_LABELS[proposal.kind])}</span>
                  <span className={styles.proposalMain}>
                    <span className={styles.proposalLabel}>{proposal.label}</span>
                    {proposal.detail ? (
                      <span className={styles.proposalDetail}>{t(proposal.detail)}</span>
                    ) : null}
                  </span>
                  <Checkbox
                    aria-label={`${t('Include')} ${proposal.label}`}
                    checked={!dropped.has(proposal.id)}
                    onCheckedChange={() => toggle(proposal.id)}
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </CardContent>

      <footer className={styles.loopFooter}>
        <p className={styles.loopSummary}>
          {`${committing.length} ${t('items')} · ${t('next review')} ${draft.reviewCadence} ${t('from')} ${anchorLabel} · ${t('signed by')} ${signedBy}`}
        </p>
        <Button onClick={() => onSign(kept)}>{t('Sign care plan')}</Button>
      </footer>
    </Card>
  );
}
