'use client';

import { useT } from '../../components/foundations/i18n';
import { Alert, AlertDescription, AlertTitle, Button, Input } from '../../components/ui';

import { identityVerdict } from './logic';
import type { CollectionPatient, IdentityAnswer, PositiveIdentification as Identification } from './types';
import styles from './positive-identification.module.css';

export type PositiveIdentificationProps = {
  patient: CollectionPatient;
  identity: Identification;
  onChange: (identity: Identification) => void;
  readOnly?: boolean;
};

/**
 * Positive identification before any tube is drawn.
 *
 * The patient states their own name and date of birth; the collector compares
 * both against the order. This is deliberately not one "ID confirmed" tick and
 * deliberately not a yes/no prompt: a leading question ("Are you Sokha?") gets
 * a nod from the wrong person, and a single checkbox records a decision with
 * no evidence behind it.
 *
 * A mismatch stops the draw. It is not a warning the collector can dismiss —
 * the two most common ways a result reaches the wrong chart both start here.
 */
export function PositiveIdentification({
  identity,
  onChange,
  patient,
  readOnly = false,
}: PositiveIdentificationProps) {
  const t = useT();
  const verdict = identityVerdict(identity);

  function answer(field: 'name' | 'dob', value: IdentityAnswer) {
    onChange({ ...identity, [field]: value, unableToState: false });
  }

  return (
    <section aria-label={t('Positive identification')} className={styles.block}>
      <header className={styles.header}>
        <h3 className={styles.title}>{t('Identify the patient')}</h3>
        <p className={styles.hint}>
          {t('Ask the patient to say each answer. Do not read it out for them.')}
        </p>
      </header>

      {verdict === 'mismatch' ? (
        <Alert tone="danger">
          <AlertTitle>{t('Details do not match the order')}</AlertTitle>
          <AlertDescription>
            {t('Do not draw. Escalate to the supervisor and re-check the record.')}
          </AlertDescription>
        </Alert>
      ) : null}

      <ol className={styles.questions}>
        <IdentityQuestion
          answer={identity.name}
          disabled={identity.unableToState || readOnly}
          expected={patient.name}
          onAnswer={(value) => answer('name', value)}
          prompt={t('“Please tell me your full name.”')}
        />
        <IdentityQuestion
          answer={identity.dob}
          disabled={identity.unableToState || readOnly}
          expected={patient.dob}
          onAnswer={(value) => answer('dob', value)}
          prompt={t('“And your date of birth?”')}
        />
      </ol>

      <div className={styles.exception}>
        {identity.unableToState ? (
          <>
            <Input
              disabled={readOnly}
              helpText={t('Recorded with your name and the time of the check.')}
              label={t('Supervisor who confirmed identity')}
              onChange={(event) =>
                onChange({ ...identity, supervisorOverrideBy: event.target.value })
              }
              placeholder={t('Supervisor name')}
              required
              value={identity.supervisorOverrideBy ?? ''}
            />
            <Button
              disabled={readOnly}
              onClick={() =>
                onChange({ ...identity, unableToState: false, supervisorOverrideBy: undefined })
              }
              size="sm"
              variant="ghost"
            >
              {t('Back to asking the patient')}
            </Button>
          </>
        ) : (
          <Button
            disabled={readOnly}
            onClick={() =>
              onChange({
                ...identity,
                name: 'unanswered',
                dob: 'unanswered',
                unableToState: true,
              })
            }
            size="sm"
            variant="ghost"
          >
            {t('Patient cannot state their details')}
          </Button>
        )}
      </div>
    </section>
  );
}

function IdentityQuestion({
  answer,
  disabled,
  expected,
  onAnswer,
  prompt,
}: {
  answer: IdentityAnswer;
  disabled: boolean;
  /** Shown only after an answer is recorded, so it cannot be read out first. */
  expected: string;
  onAnswer: (value: IdentityAnswer) => void;
  prompt: string;
}) {
  const t = useT();

  return (
    <li className={styles.question} data-answer={answer}>
      <p className={styles.prompt}>{prompt}</p>
      <div className={styles.answers}>
        <Button
          data-selected={answer === 'match' || undefined}
          disabled={disabled}
          onClick={() => onAnswer(answer === 'match' ? 'unanswered' : 'match')}
          size="sm"
          variant={answer === 'match' ? 'primary' : 'outline'}
        >
          {t('Matches')}
        </Button>
        <Button
          disabled={disabled}
          onClick={() => onAnswer(answer === 'mismatch' ? 'unanswered' : 'mismatch')}
          size="sm"
          variant={answer === 'mismatch' ? 'destructive' : 'outline'}
        >
          {t('Does not match')}
        </Button>
      </div>
      {answer !== 'unanswered' ? (
        <p className={styles.expected}>
          {t('On the order')}: <span className={styles.expectedValue}>{expected}</span>
        </p>
      ) : null}
    </li>
  );
}
