import { describe, expect, it } from 'vitest';

import { blankWalkIn, EXISTING_PATIENTS } from './demo-data';
import {
  canNavigateToStep,
  cartTotals,
  findCollisionCandidates,
  paymentAfterPaidEdit,
  phonesMatch,
  wizardGate,
} from './logic';
import { acceptReprice, attributionBlocker, deskNextAction, deskWaitIsActive, eligiblePrescribers, orderBlockerMessage, orderBlockers, orderDeskVisits, waitTone } from './logic';
import {
  collisionOverridePinValid,
  identityEditClearsAcks,
  matchedOnLabel,
  trustSignalsFor,
} from './logic';
import {
  checkedInVisit,
  inProgressVisit,
  intakeStatus,
  nextQueueNumber,
  promoLines,
  visitPaymentFact,
} from './logic';
import {
  consentBlockers,
  consentRequirement,
  consentResolved,
  pregnancyGateApplies,
  splitCashPortionValid,
  splitRemainderMinor,
  verbalConsentValid,
} from './logic';
import { maxTatHours, tatDayOffset, teleconsultSpecialtyFor } from './logic';
import { ORDER_CATALOG } from './catalog';

describe('wizard gate engine', () => {
  it('locks later steps until the current step is done', () => {
    const blank = blankWalkIn('gate-test', 1);
    let gate = wizardGate(blank);
    expect(gate.stepStatus[1]).toBe('active');
    expect(gate.stepStatus[2]).toBe('locked');

    const named = {
      ...blank,
      name: 'Bopha Kim',
      identity: { source: 'manual' as const, lockedFields: [] },
    };
    gate = wizardGate(named);
    expect(gate.step1Done).toBe(true);
    expect(gate.stepStatus[2]).toBe('active');
  });

  it('does not deadlock a phone-only capture that has no name yet', () => {
    const phoneOnly = {
      ...blankWalkIn('gate-test', 1),
      phoneNumber: '12345678',
      identity: { source: 'manual' as const, lockedFields: [] },
    };
    const gate = wizardGate(phoneOnly);
    expect(gate.step1Done).toBe(true);
    expect(gate.stepStatus[2]).toBe('active');
  });

  it('requires a non-auto order before step 4 is done', () => {
    const contactable = {
      ...blankWalkIn('gate-test', 1),
      name: 'Bopha Kim',
      identity: { source: 'manual' as const, lockedFields: [] },
      dob: '1990-01-01',
      sexAtBirth: 'Female' as const,
      otpVerified: true,
      insuranceAcked: true,
    };
    let gate = wizardGate(contactable);
    expect(gate.step3Done).toBe(true);
    expect(gate.step4Done).toBe(false);

    const withOrder = {
      ...contactable,
      cart: {
        ...contactable.cart,
        items: [
          ...contactable.cart.items,
          {
            id: 'cbc',
            kind: 'lab' as const,
            name: 'CBC',
            priceMinor: '600',
            currencyCode: 'USD' as const,
            qty: 1,
          },
        ],
      },
    };
    gate = wizardGate(withOrder);
    expect(gate.step5Done).toBe(true); // no telecon in cart → tele resolved
    expect(gate.step6Done).toBe(false);

    const paid = {
      ...withOrder,
      cart: {
        ...withOrder.cart,
        payment: { ...withOrder.cart.payment, status: 'confirmed' as const },
      },
    };
    expect(wizardGate(paid).isReadyToCheckIn).toBe(true);
  });

  it('allows forward navigation only one step ahead and only when current is done', () => {
    const contactable = {
      ...blankWalkIn('gate-test', 1),
      name: 'Bopha Kim',
      identity: { source: 'manual' as const, lockedFields: [] },
      dob: '1990-01-01',
      sexAtBirth: 'Female' as const,
      otpVerified: true,
      insuranceAcked: true,
    };
    expect(canNavigateToStep(3, 2, wizardGate(contactable))).toBe(true);
    expect(canNavigateToStep(5, 2, wizardGate(contactable))).toBe(false);
  });
});

describe('duplicate detection', () => {
  it('scores name + dob + phone as an exact identity match', () => {
    const candidates = findCollisionCandidates(
      {
        ...blankWalkIn('t', 1),
        name: 'Sokha Chan',
        dob: '1992-03-14',
        sexAtBirth: 'Female',
        phoneNumber: '12777088',
      },
      EXISTING_PATIENTS,
    );
    expect(candidates[0].score).toBe(88); // 46 + 34 + 8
    expect(candidates[0].strength).toBe('Exact identity match');
  });

  it('matches phones on normalized digits with an 8-digit minimum', () => {
    expect(phonesMatch('+85512777088', '12777088')).toBe(true);
    expect(phonesMatch('1277', '12777088')).toBe(false);
  });
});

describe('cart math', () => {
  const base = blankWalkIn('math', 1);
  const priced = {
    ...base,
    cart: {
      ...base.cart,
      items: [
        { id: 'cbc', kind: 'lab' as const, name: 'CBC', priceMinor: '600', currencyCode: 'USD' as const, qty: 1 },
        { id: 'tsh', kind: 'lab' as const, name: 'TSH', priceMinor: '800', currencyCode: 'USD' as const, qty: 1 },
      ],
    },
  };

  it('sums backend minor-unit strings without floating-point math', () => {
    const totals = cartTotals(priced.cart);
    expect(totals.subtotalMinor).toBe('1400');
    expect(totals.patientDueMinor).toBe('1400');
    expect(totals.currencyCode).toBe('USD');
  });

  it('handles paid-edit void vs supplemental', () => {
    const paid = {
      status: 'confirmed' as const,
      method: 'cash' as const,
      tendered: '30',
      changeMinor: '580',
      receiptId: 'R-1',
      confirmedAt: '09:00',
      amountMinor: '2420',
    };
    const voided = paymentAfterPaidEdit(paid, 'void');
    expect(voided.status).toBe('idle');
    expect(voided.voidedReceiptId).toBe('R-1');
    expect(voided.previousPaidAmountMinor).toBe('0');

    const supplemental = paymentAfterPaidEdit(paid, 'supplemental');
    expect(supplemental.supplementalDue).toBe(true);
    expect(supplemental.previousReceiptId).toBe('R-1');
    expect(supplemental.previousPaidAmountMinor).toBe('2420');
  });
});

describe('order attribution (ADR-0057)', () => {
  const prescribers = [
    { userId: 'a', name: 'Dr. A', workspaceMember: true, licence: 'verified' as const },
    { userId: 'b', name: 'Dr. B', workspaceMember: true, licence: 'expired' as const },
    { userId: 'c', name: 'Dr. C', workspaceMember: false, licence: 'verified' as const },
  ];
  const cart = (attributedPrescriberId?: string | null) => ({
    items: [{ id: 'cbc', kind: 'lab' as const, name: 'CBC', priceMinor: '600', currencyCode: 'USD' as const, qty: 1 }],
    payment: { status: 'idle' as const, method: null, tendered: '', changeMinor: '0', receiptId: null, confirmedAt: null, amountMinor: null },
    attributedPrescriberId,
  });

  it('only members with a live licence are eligible', () => {
    expect(eligiblePrescribers(prescribers).map((p) => p.userId)).toEqual(['a']);
  });

  it('accepts every backend-live licence state and rejects a new unverified doctor', () => {
    expect(
      eligiblePrescribers([
        { userId: 'expiring', name: 'Dr. E', workspaceMember: true, licence: 'expiring' },
        { userId: 'grace', name: 'Dr. G', workspaceMember: true, licence: 'in_grace' },
        { userId: 'new', name: 'Dr. N', workspaceMember: true, licence: 'none' },
      ]).map((p) => p.userId),
    ).toEqual(['expiring', 'grace']);
  });

  it('an empty cart has nothing to attribute', () => {
    expect(attributionBlocker({ ...cart(), items: [] }, prescribers)).toBeNull();
  });

  it('mirrors the server placement gate', () => {
    expect(attributionBlocker(cart(), prescribers)).toEqual({ kind: 'prescriber-required' });
    expect(attributionBlocker(cart('b'), prescribers)).toMatchObject({ kind: 'prescriber-ineligible' });
    expect(attributionBlocker(cart('a'), prescribers)).toBeNull();
    expect(
      attributionBlocker(cart('a'), prescribers.map((p) => ({ ...p, licence: 'expired' as const }))),
    ).toEqual({ kind: 'no-eligible-prescriber' });
  });
});

describe('acceptReprice', () => {
  it('applies server prices, keeps versions, clears the stale flag — never silently', () => {
    const cart = {
      items: [
        { id: 'hba1c', kind: 'lab' as const, name: 'HbA1c', priceMinor: '900', currencyCode: 'USD' as const, qty: 1 },
        { id: 'cbc', kind: 'lab' as const, name: 'CBC', priceMinor: '600', currencyCode: 'USD' as const, qty: 1 },
      ],
      payment: { status: 'idle' as const, method: null, tendered: '', changeMinor: '0', receiptId: null, confirmedAt: null, amountMinor: null },
      pricing: {
        catalogVersion: 'cat-1',
        pricingVersion: 'price-2',
        state: 'stale' as const,
        repricedLines: [{ itemId: 'hba1c', name: 'HbA1c', oldPriceMinor: '900', newPriceMinor: '1050' }],
      },
    };
    const next = acceptReprice(cart);
    expect(next.items.find((i) => i.id === 'hba1c')?.priceMinor).toBe('1050');
    expect(next.items.find((i) => i.id === 'cbc')?.priceMinor).toBe('600');
    expect(next.pricing?.state).toBe('current');
    expect(next.pricing?.repricedLines).toBeUndefined();
  });

  it('is a no-op on a current quote', () => {
    const cart = {
      items: [],
      payment: { status: 'idle' as const, method: null, tendered: '', changeMinor: '0', receiptId: null, confirmedAt: null, amountMinor: null },
    };
    expect(acceptReprice(cart)).toBe(cart);
  });
});

describe('desk queue', () => {
  const visit = (overrides: object) => ({
    id: 'v',
    queueNumber: 1,
    patientName: 'A',
    arrivedLabel: '08:00',
    waitMinutes: 10,
    stage: 'arrived' as const,
    assurance: 'verified' as const,
    payment: 'pending' as const,
    ...overrides,
  });

  it('wait pressure warns over 30 and escalates over 60 minutes', () => {
    expect(waitTone(30)).toBe('normal');
    expect(waitTone(31)).toBe('warn');
    expect(waitTone(60)).toBe('warn');
    expect(waitTone(61)).toBe('escalate');
  });

  it('stops reception wait pressure after the visit is handed off', () => {
    expect(deskWaitIsActive(visit({ stage: 'arrived' }))).toBe(true);
    expect(deskWaitIsActive(visit({ stage: 'identity-resolved' }))).toBe(true);
    expect(
      deskWaitIsActive(visit({ stage: 'identity-resolved', queuedForDraw: true })),
    ).toBe(false);
    expect(deskWaitIsActive(visit({ stage: 'draw-complete' }))).toBe(false);
    expect(deskWaitIsActive(visit({ stage: 'completed' }))).toBe(false);
  });

  it('derives exactly one next action from independent axes', () => {
    expect(deskNextAction(visit({ resumeStep: 4 }))).toEqual({
      kind: 'resume',
      label: 'Resume check-in · Step 4',
    });
    expect(deskNextAction(visit({ stage: 'identity-resolved' }))).toEqual({
      kind: 'queue-draw',
      label: 'Queue for phlebotomy',
    });
    expect(deskNextAction(visit({ stage: 'identity-resolved', queuedForDraw: true }))).toBeNull();
    expect(deskNextAction(visit({ stage: 'draw-complete' }))).toBeNull();
    // Paid does NOT advance the visit axis — payment is never an arrival proxy.
    expect(deskNextAction(visit({ payment: 'collected' }))?.kind).toBe('resume');
  });

  it('keeps unfinished check-ins first, longest wait first within a stage', () => {
    const ordered = orderDeskVisits([
      visit({ id: 'done', stage: 'completed', waitMinutes: 99 }),
      visit({ id: 'short', waitMinutes: 5 }),
      visit({ id: 'long', waitMinutes: 50 }),
      visit({ id: 'ready', stage: 'identity-resolved', waitMinutes: 70 }),
    ]);
    expect(ordered.map((v) => v.id)).toEqual(['long', 'short', 'ready', 'done']);
  });

  it('keeps reception actions above handed-off visits', () => {
    const ordered = orderDeskVisits([
      visit({ id: 'handed-off', stage: 'identity-resolved', queuedForDraw: true, waitMinutes: 80 }),
      visit({ id: 'ready', stage: 'identity-resolved', waitMinutes: 20 }),
    ]);
    expect(ordered.map((v) => v.id)).toEqual(['ready', 'handed-off']);
  });
});

describe('order composition blockers', () => {
  const payment = { status: 'idle' as const, method: null, tendered: '', changeMinor: '0', receiptId: null, confirmedAt: null, amountMinor: null };
  const item = (id: string, currencyCode = 'USD') => {
    const entry = ORDER_CATALOG.find((candidate) => candidate.id === id)!;
    return { id, kind: entry.kind, name: entry.name, priceMinor: entry.priceMinor, currencyCode: currencyCode as 'USD', qty: 1 };
  };

  it('flags a panel overlapping a standalone analyte', () => {
    const blockers = orderBlockers({ items: [item('cmp'), item('glucose-f')], payment }, ORDER_CATALOG);
    expect(blockers).toEqual([
      { kind: 'analyte-overlap', panelName: 'CMP (metabolic panel)', itemName: 'Glucose (fasting)', analytes: ['glucose'] },
    ]);
    expect(orderBlockerMessage(blockers[0])).toContain('already includes glucose');
  });

  it('flags unsupported tests and mixed currencies', () => {
    const blockers = orderBlockers(
      { items: [item('lpa'), { ...item('cbc'), currencyCode: 'KHR' as never }], payment },
      ORDER_CATALOG,
    );
    expect(blockers.map((b) => b.kind)).toEqual(['unsupported-test', 'mixed-currency']);
  });

  it('a clean cart has no blockers', () => {
    expect(orderBlockers({ items: [item('cbc'), item('lipid')], payment }, ORDER_CATALOG)).toEqual([]);
  });
});

describe('identity trust + duplicate override', () => {
  it('names the evidence without sex modifiers', () => {
    expect(matchedOnLabel(['idMatch', 'phoneMatch', 'sexMatch'])).toBe(
      'Matched on National ID + Phone',
    );
    expect(matchedOnLabel(['sexMismatch'])).toBeNull();
  });

  it('supervisor PIN needs at least four digits', () => {
    expect(collisionOverridePinValid('1234')).toBe(true);
    expect(collisionOverridePinValid(' 123456 ')).toBe(true);
    expect(collisionOverridePinValid('123')).toBe(false);
    expect(collisionOverridePinValid('12a4')).toBe(false);
  });

  it('editing any identity field re-arms acknowledged duplicates', () => {
    const base = blankWalkIn('t-rearm', 1);
    expect(identityEditClearsAcks(base, { ...base })).toBe(false);
    expect(identityEditClearsAcks(base, { ...base, name: 'Sokha' })).toBe(true);
    expect(identityEditClearsAcks(base, { ...base, idNumber: 'KH-1' })).toBe(true);
    expect(identityEditClearsAcks(base, { ...base, phoneNumber: '9' })).toBe(true);
  });

  it('trust signals: recency tones, unverified fallback, cross-PSC origin', () => {
    const record = {
      id: 'r',
      name: 'A',
      sexAtBirth: '' as const,
      assurance: 'verified' as const,
      registeredHere: true,
    };
    expect(trustSignalsFor({ ...record, phoneVerifiedMonthsAgo: 6 })[0]).toEqual({
      label: 'Phone verified 6 months ago',
      tone: 'success',
    });
    expect(trustSignalsFor({ ...record, phoneVerifiedMonthsAgo: 14 })[0].tone).toBe('warning');
    expect(
      trustSignalsFor({ ...record, assurance: 'unverified', phone: '012' })[0],
    ).toEqual({ label: 'Phone on file · unverified', tone: 'neutral' });
    expect(trustSignalsFor({ ...record, assurance: 'unverified' })[0].tone).toBe('danger');
    expect(
      trustSignalsFor({ ...record, registeredHere: false }).map((signal) => signal.tone),
    ).toContain('info');
  });
});

describe('consent chains', () => {
  const imaging = { id: 'xray-chest', kind: 'imaging' as const, name: 'Chest X-ray' };
  const sensitive = { id: 'hiv-ag-ab', kind: 'lab' as const, name: 'HIV Ag/Ab combo' };
  const plain = { id: 'cbc', kind: 'lab' as const, name: 'CBC' };

  it('requires consent for imaging and sensitive tests only', () => {
    expect(consentRequirement(imaging, ORDER_CATALOG)).toBe('imaging');
    expect(consentRequirement(sensitive, ORDER_CATALOG)).toBe('sensitive');
    expect(consentRequirement(plain, ORDER_CATALOG)).toBeNull();
  });

  it('resolves only on signed or verbal', () => {
    expect(consentResolved(undefined)).toBe(false);
    expect(consentResolved({ state: 'needed' })).toBe(false);
    expect(consentResolved({ state: 'sent', atLabel: 'now' })).toBe(false);
    expect(consentResolved({ state: 'signed', atLabel: 'now' })).toBe(true);
    expect(consentResolved({ state: 'verbal', byLabel: 'LN', atLabel: 'now' })).toBe(true);
  });

  it('blocks payment while a consent chain is open', () => {
    const item = (extra: object) => ({
      id: 'xray-chest',
      kind: 'imaging' as const,
      name: 'Chest X-ray',
      priceMinor: '1800',
      currencyCode: 'USD' as const,
      qty: 1,
      ...extra,
    });
    const payment = {
      status: 'idle' as const,
      method: null,
      tendered: '',
      changeMinor: '0',
      receiptId: null,
      confirmedAt: null,
      amountMinor: null,
    };
    expect(consentBlockers({ items: [item({ consent: { state: 'needed' } })], payment }, ORDER_CATALOG)).toHaveLength(1);
    expect(
      consentBlockers(
        { items: [item({ consent: { state: 'signed', atLabel: 'now' } })], payment },
        ORDER_CATALOG,
      ),
    ).toHaveLength(0);
  });

  it('pregnancy gate applies only to imaging for Female patients', () => {
    expect(pregnancyGateApplies({ kind: 'imaging' }, { sexAtBirth: 'Female' })).toBe(true);
    expect(pregnancyGateApplies({ kind: 'imaging' }, { sexAtBirth: 'Male' })).toBe(false);
    expect(pregnancyGateApplies({ kind: 'lab' }, { sexAtBirth: 'Female' })).toBe(false);
  });

  it('verbal consent needs a recorder; sensitive also needs a witness PIN', () => {
    expect(verbalConsentValid({ requirement: 'imaging', recordedBy: 'Linh' })).toBe(true);
    expect(verbalConsentValid({ requirement: 'imaging', recordedBy: ' ' })).toBe(false);
    expect(verbalConsentValid({ requirement: 'sensitive', recordedBy: 'Linh' })).toBe(false);
    expect(
      verbalConsentValid({ requirement: 'sensitive', recordedBy: 'Linh', witnessPin: '4821' }),
    ).toBe(true);
  });
});

describe('split cash + KHQR', () => {
  it('cash portion must be strictly between zero and the due amount', () => {
    expect(splitCashPortionValid('0', '1500')).toBe(false);
    expect(splitCashPortionValid('1500', '1500')).toBe(false);
    expect(splitCashPortionValid('1000', '1500')).toBe(true);
    expect(splitCashPortionValid('abc', '1500')).toBe(false);
  });

  it('remainder floors at zero', () => {
    expect(splitRemainderMinor('1500', '1000')).toBe('500');
    expect(splitRemainderMinor('1000', '1500')).toBe('0');
  });
});

describe('teleconsult TAT coupling', () => {
  const item = (id: string) => ({
    id,
    kind: 'lab' as const,
    name: id,
    priceMinor: '100',
    currencyCode: 'USD' as const,
    qty: 1,
  });

  it('specialty follows the ordered tests, desk can override later', () => {
    expect(teleconsultSpecialtyFor([item('hba1c')])).toBe('Endocrinology');
    expect(teleconsultSpecialtyFor([item('lipid')])).toBe('Cardiology');
    expect(teleconsultSpecialtyFor([item('cbc')])).toBe('Internal Medicine');
    expect(teleconsultSpecialtyFor([])).toBe('General Practice');
  });

  it('max TAT drives the earliest bookable day', () => {
    expect(maxTatHours([item('cbc'), item('hba1c')], ORDER_CATALOG)).toBe(24);
    expect(maxTatHours([], ORDER_CATALOG)).toBe(0);
    expect(tatDayOffset(0)).toBe(0);
    expect(tatDayOffset(4)).toBe(1);
    expect(tatDayOffset(48)).toBe(2);
  });
});

describe('promo engine (item → fixed → percent on the running remainder)', () => {
  const payment = blankWalkIn('promo', 1).cart.payment;
  const items = [
    { id: 'cbc', kind: 'lab' as const, name: 'CBC', priceMinor: '600', currencyCode: 'USD' as const, qty: 1 },
    { id: 'lipid', kind: 'lab' as const, name: 'Lipid panel', priceMinor: '1200', currencyCode: 'USD' as const, qty: 1 },
  ];

  it('applies in money order regardless of entry order', () => {
    const lines = promoLines({
      items,
      payment,
      promos: [
        { code: 'PCT10', label: '10% off', kind: 'percent', percentOff: 10 },
        { code: 'FLAT5', label: '$5 off', kind: 'fixed', amountMinor: '500' },
        { code: 'CBC50', label: 'CBC half price', kind: 'item', itemId: 'cbc', percentOff: 50 },
      ],
    });
    // item: 300 → remainder 1500; fixed: 500 → remainder 1000; percent: 100.
    expect(lines.map((line) => [line.code, line.amountMinor])).toEqual([
      ['CBC50', '300'],
      ['FLAT5', '500'],
      ['PCT10', '100'],
    ]);
  });

  it('never discounts below zero and reflects into cartTotals', () => {
    const cart = {
      items,
      payment,
      promos: [{ code: 'BIG', label: 'Huge', kind: 'fixed' as const, amountMinor: '99999' }],
    };
    expect(promoLines(cart)[0].amountMinor).toBe('1800');
    const totals = cartTotals(cart);
    expect(totals.discountMinor).toBe('1800');
    expect(totals.patientDueMinor).toBe('0');
  });

  it('a cart without promos has zero discount', () => {
    const totals = cartTotals({ items, payment });
    expect(totals.discountMinor).toBe('0');
    expect(totals.patientDueMinor).toBe('1800');
  });
});

describe('intake status machine', () => {
  const base = blankWalkIn('intake', 1);
  const maleNoSensitive = { ...base, sexAtBirth: 'Male' as const };

  it('walks not-started → waiting → in-progress → complete', () => {
    expect(intakeStatus(maleNoSensitive, [])).toBe('not-started');
    expect(intakeStatus({ ...maleNoSensitive, intakeSentAtLabel: 'just now' }, [])).toBe('waiting');
    expect(
      intakeStatus(
        { ...maleNoSensitive, intake: { ...base.intake, medications: 'Metformin' } },
        [],
      ),
    ).toBe('in-progress');
    expect(
      intakeStatus(
        {
          ...maleNoSensitive,
          visitReason: ['Follow-up'],
          intake: {
            chiefComplaint: 'Fatigue',
            preTestPrep: 'Fasted 10h',
            medications: 'Metformin',
            womensHealth: '',
            recentEvents: 'None',
            lifestyle: 'Non-smoker',
            sampleComfort: 'Faints easily',
            sensitiveConsent: '',
          },
        },
        [],
      ),
    ).toBe('complete');
  });

  it('a recorded skip wins and auto-filled sections alone are not progress', () => {
    expect(
      intakeStatus(
        { ...maleNoSensitive, intakeSkipped: { code: 'patient-declined' } },
        [],
      ),
    ).toBe('skipped');
    // Male + no sensitive tests auto-fills two sections — still not started.
    expect(intakeStatus(maleNoSensitive, [])).toBe('not-started');
  });
});

describe('check-in terminal outcome', () => {
  const paid = {
    ...blankWalkIn('done', 27),
    name: 'Sok Phearom',
    arrivedLabel: '08:24 · 12 min ago',
    otpVerified: true,
  };

  it('maps the cart payment onto the desk payment fact', () => {
    expect(visitPaymentFact({ ...paid.cart.payment, status: 'confirmed' })).toBe('collected');
    expect(visitPaymentFact({ ...paid.cart.payment, status: 'no-charge' })).toBe('collected');
    expect(visitPaymentFact({ ...paid.cart.payment, status: 'deferred' })).toBe('deferred');
    expect(visitPaymentFact({ ...paid.cart.payment, status: 'pending-claim' })).toBe('deferred');
    expect(visitPaymentFact({ ...paid.cart.payment, status: 'waiting' })).toBe('waiting');
    expect(visitPaymentFact(paid.cart.payment)).toBe('pending');
  });

  it('produces an identity-resolved desk visit with independent axes', () => {
    const visit = checkedInVisit(paid);
    expect(visit.stage).toBe('identity-resolved');
    expect(visit.queueNumber).toBe(27);
    expect(visit.arrivedLabel).toBe('08:24');
    expect(visit.assurance).toBe('verified');
    expect(visit.payment).toBe('pending');
  });

  it('spawns the next blank slot number after check-in', () => {
    expect(nextQueueNumber([27, 28, 25])).toBe(29);
    expect(nextQueueNumber([])).toBe(1);
  });
});

describe('an open check-in survives leaving the wizard', () => {
  const touched = {
    ...blankWalkIn('open', 14),
    name: 'Sok Phearom',
    arrivedLabel: '08:24 · 12 min ago',
    identity: { source: 'manual' as const, lockedFields: [] },
  };

  it('a blank slot is not a visit', () => {
    expect(inProgressVisit(blankWalkIn('blank', 14))).toBeNull();
  });

  it('carries the step the desk resumes at', () => {
    const visit = inProgressVisit(touched)!;
    expect(visit.stage).toBe('arrived');
    // Identity captured, details not yet — resume at Review.
    expect(visit.resumeStep).toBe(2);
    expect(deskNextAction(visit)).toEqual({
      kind: 'resume',
      label: 'Resume check-in · Step 2',
    });
  });

  it('moves the resume point forward as the wizard progresses', () => {
    const contactable = {
      ...touched,
      dob: '1974-03-15',
      sexAtBirth: 'Male' as const,
      otpVerified: true,
      insuranceAcked: true,
    };
    expect(inProgressVisit(contactable)?.resumeStep).toBe(4);
  });

  it('stops being an open check-in once it is ready to finish', () => {
    const ready = {
      ...touched,
      dob: '1974-03-15',
      sexAtBirth: 'Male' as const,
      otpVerified: true,
      insuranceAcked: true,
      cart: {
        ...touched.cart,
        items: [
          { id: 'cbc', kind: 'lab' as const, name: 'CBC', priceMinor: '600', currencyCode: 'USD' as const, qty: 1 },
        ],
        payment: { ...touched.cart.payment, status: 'deferred' as const },
      },
    };
    expect(wizardGate(ready).isReadyToCheckIn).toBe(true);
    expect(inProgressVisit(ready)).toBeNull();
  });
});
