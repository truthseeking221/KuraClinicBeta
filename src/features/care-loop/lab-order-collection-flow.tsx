'use client';

import { useMemo, useState } from 'react';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Select,
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '../../components/ui';
import { DrawWorksheet } from '../collection/draw-worksheet';
import { ScanGate } from '../collection/scan-gate';
import type { Sample } from '../collection/types';
import {
  LAB_CATALOG_CATEGORIES,
  LAB_CATALOG_TESTS,
} from '../lab-catalog/demo-data';
import { LabTestPicker } from '../lab-catalog/lab-test-picker';
import { doctorWorkflow, receptionistWorkflow } from '../order-cart/demo-data';
import { OrderCart } from '../order-cart/order-cart';
import type {
  DoctorOrderCartWorkflow,
  ReceptionistOrderCartWorkflow,
} from '../order-cart/types';

import { CareLoopFrame } from './care-loop-frame';
import {
  CARE_LOOP_CART_ITEMS,
  CARE_LOOP_COLLECTION_PATIENT,
  CARE_LOOP_NOW,
  CARE_LOOP_OPERATOR,
  CARE_LOOP_PATIENT,
  CARE_LOOP_SELECTED_TEST_IDS,
  careLoopCart,
} from './demo-data';
import styles from './care-loop.module.css';

export type LabOrderCollectionStage =
  | 'ordering'
  | 'payment'
  | 'scan'
  | 'draw'
  | 'handoff'
  | 'ready-for-pickup'
  | 'awaiting-results';

const STAGES = [
  { label: 'Order tests', actor: 'Doctor' },
  { label: 'Collect payment', actor: 'Receptionist' },
  { label: 'Collect samples', actor: 'Nurse' },
  { label: 'Handoff', actor: 'Nurse' },
  { label: 'Await results', actor: 'Clinic' },
];

const PICKUP_ROUNDS = [
  { value: '10:30', label: '10:30 · Morning pickup' },
  { value: '14:00', label: '14:00 · Afternoon pickup' },
  { value: '17:30', label: '17:30 · Final pickup' },
];

function stepFor(stage: LabOrderCollectionStage) {
  if (stage === 'ordering') return 1;
  if (stage === 'payment') return 2;
  if (stage === 'scan' || stage === 'draw') return 3;
  if (stage === 'handoff' || stage === 'ready-for-pickup') return 4;
  return 5;
}

function actorFor(stage: LabOrderCollectionStage) {
  if (stage === 'ordering') return 'Doctor';
  if (stage === 'payment') return 'Receptionist';
  if (stage === 'scan' || stage === 'draw' || stage === 'handoff') return 'Nurse';
  if (stage === 'ready-for-pickup') return 'Nurse and courier';
  return 'Clinic';
}

function initialDoctorWorkflow(): DoctorOrderCartWorkflow {
  return doctorWorkflow({
    decisions: {
      collectBy: 'kura',
      drawSite: 'kura-psc',
      payment: 'pay-later-kura',
    },
    panel: 'summary',
  });
}

function initialReceptionWorkflow(): ReceptionistOrderCartWorkflow {
  return receptionistWorkflow({
    origin: 'doctor-order',
    permissions: { editClinicalItems: false, collectPayment: true, checkIn: true },
  });
}

export function LabOrderSampleCollectionFlow({
  initialStage = 'ordering',
}: {
  initialStage?: LabOrderCollectionStage;
}) {
  const [stage, setStage] = useState(initialStage);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([
    ...CARE_LOOP_SELECTED_TEST_IDS,
  ]);
  const [doctor, setDoctor] = useState<DoctorOrderCartWorkflow>(initialDoctorWorkflow);
  const [reception, setReception] =
    useState<ReceptionistOrderCartWorkflow>(initialReceptionWorkflow);
  const [samples, setSamples] = useState<Sample[]>(CARE_LOOP_COLLECTION_PATIENT.samples);
  const [patientLoaded, setPatientLoaded] = useState(
    initialStage === 'draw' ||
      initialStage === 'handoff' ||
      initialStage === 'ready-for-pickup' ||
      initialStage === 'awaiting-results',
  );
  const [pickupRound, setPickupRound] = useState('');
  const [labelsChecked, setLabelsChecked] = useState(false);
  const [countChecked, setCountChecked] = useState(false);
  const [bagSealed, setBagSealed] = useState(false);

  const selectedItems = useMemo(
    () => CARE_LOOP_CART_ITEMS.filter((item) => selectedTestIds.includes(item.id)),
    [selectedTestIds],
  );
  const cart = useMemo(() => careLoopCart(selectedItems), [selectedItems]);

  function restart() {
    setStage('ordering');
    setSelectedTestIds([...CARE_LOOP_SELECTED_TEST_IDS]);
    setDoctor(initialDoctorWorkflow());
    setReception(initialReceptionWorkflow());
    setSamples(CARE_LOOP_COLLECTION_PATIENT.samples);
    setPatientLoaded(false);
    setPickupRound('');
    setLabelsChecked(false);
    setCountChecked(false);
    setBagSealed(false);
  }

  const handoffComplete = Boolean(pickupRound && labelsChecked && countChecked && bagSealed);

  return (
    <CareLoopFrame
      actor={actorFor(stage)}
      currentStep={stepFor(stage)}
      onRestart={restart}
      patient={{
        name: CARE_LOOP_PATIENT.name,
        pid: CARE_LOOP_PATIENT.pid,
        detail: `${CARE_LOOP_PATIENT.orderId} · ${selectedItems.length} tests · 4 tubes`,
      }}
      stages={STAGES}
      title="Lab order and sample collection"
    >
      {stage === 'ordering' ? (
        <div className={styles.orderGrid}>
          <section aria-labelledby="test-picker-heading" className={styles.catalogPanel}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Doctor</p>
                <h2 id="test-picker-heading">Choose baseline tests</h2>
              </div>
              <Badge size="sm">{selectedItems.length} selected</Badge>
            </div>
            <LabTestPicker
              categories={LAB_CATALOG_CATEGORIES}
              onSelectedTestIdsChange={setSelectedTestIds}
              selectedTestIds={selectedTestIds}
              tests={LAB_CATALOG_TESTS}
              totalCount={67}
            />
          </section>
          <OrderCart
            cart={cart}
            onClear={() => setSelectedTestIds([])}
            onDecisionsChange={(decisions) =>
              setDoctor((current) => ({ ...current, decisions }))
            }
            onPanelChange={(panel) => setDoctor((current) => ({ ...current, panel }))}
            onPrimaryAction={() => setStage('payment')}
            onRemoveItem={(itemId) =>
              setSelectedTestIds((current) => current.filter((id) => id !== itemId))
            }
            workflow={doctor}
          />
        </div>
      ) : null}

      {stage === 'payment' ? (
        <div className={styles.singleRail}>
          <section className={styles.stageIntro}>
            <p className={styles.eyebrow}>Receptionist</p>
            <h2>Collect payment and check in</h2>
            <p>
              The doctor-authored tests are locked. Reception records the tender and confirms
              check-in without changing clinical intent.
            </p>
          </section>
          <OrderCart
            cart={cart}
            onAttestChange={(attested) =>
              setReception((current) => ({ ...current, attested }))
            }
            onMethodChange={(method) =>
              setReception((current) => ({ ...current, method }))
            }
            onPanelChange={(panel) =>
              setReception((current) => ({ ...current, panel }))
            }
            onPrimaryAction={() => setStage('scan')}
            workflow={reception}
          />
        </div>
      ) : null}

      {stage === 'scan' ? (
        patientLoaded ? (
          <Button onClick={() => setStage('draw')} variant="primary">
            Open draw worksheet
          </Button>
        ) : (
          <ScanGate
            onMatch={() => {
              setPatientLoaded(true);
              setStage('draw');
            }}
            queue={[CARE_LOOP_COLLECTION_PATIENT]}
            role="phlebotomy"
          />
        )
      ) : null}

      {stage === 'draw' ? (
        <DrawWorksheet
          now={CARE_LOOP_NOW}
          onMarkVitalsDone={() => {}}
          onSaveDraft={() => setStage('scan')}
          onSubmit={() => setStage('handoff')}
          onUpdateSamples={setSamples}
          operatorName={CARE_LOOP_OPERATOR}
          patient={CARE_LOOP_COLLECTION_PATIENT}
          samples={samples}
        />
      ) : null}

      {stage === 'handoff' ? (
        <Card className={styles.handoffCard} variant="outline">
          <CardHeader>
            <div>
              <Badge size="sm">Collection complete</Badge>
              <CardTitle>Prepare samples for pickup</CardTitle>
              <CardDescription>
                Match the physical specimens to {CARE_LOOP_PATIENT.orderId} before custody changes.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={styles.handoffContent}>
            <dl className={styles.metricGrid}>
              <div>
                <dt>Collected</dt>
                <dd>4 tubes</dd>
              </div>
              <div>
                <dt>Order</dt>
                <dd>{CARE_LOOP_PATIENT.orderId}</dd>
              </div>
              <div>
                <dt>Patient ID</dt>
                <dd>{CARE_LOOP_PATIENT.pid}</dd>
              </div>
            </dl>

            <Select
              label="Pickup round"
              onValueChange={(value) => setPickupRound(value ?? '')}
              options={PICKUP_ROUNDS}
              placeholder="Choose a pickup round"
              required
              value={pickupRound}
            />

            <div className={styles.checklist}>
              <Checkbox checked={labelsChecked} onCheckedChange={setLabelsChecked}>
                Tube labels match the patient and order.
              </Checkbox>
              <Checkbox checked={countChecked} onCheckedChange={setCountChecked}>
                Tube count matches the handoff summary.
              </Checkbox>
              <Checkbox checked={bagSealed} onCheckedChange={setBagSealed}>
                Specimen bag is sealed for transport.
              </Checkbox>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={!handoffComplete}
              onClick={() => setStage('ready-for-pickup')}
              variant="primary"
            >
              Mark samples ready
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {stage === 'ready-for-pickup' ? (
        <Alert tone="success">
          <AlertTitle>Samples ready for the {pickupRound} pickup</AlertTitle>
          <AlertDescription>
            Four sealed tubes are waiting at the collection handoff point. Custody remains with
            the clinic until pickup is recorded.
          </AlertDescription>
          <AlertAction>
            <Button onClick={() => setStage('awaiting-results')} size="sm" variant="primary">
              Record courier pickup
            </Button>
          </AlertAction>
        </Alert>
      ) : null}

      {stage === 'awaiting-results' ? (
        <Card className={styles.focusCard} variant="outline">
          <CardHeader>
            <div>
              <Badge size="sm" variant="info">
                Awaiting results
              </Badge>
              <CardTitle>Courier picked up the samples</CardTitle>
              <CardDescription>
                The order stays pending until the laboratory records receipt and releases results.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Timeline aria-label="Laboratory progress" value={2}>
              {[
                ['Picked up', '10:34'],
                ['Lab received', 'Waiting'],
                ['Processing', 'Not started'],
                ['Results', 'Not released'],
              ].map(([label, detail], index, items) => (
                <TimelineItem key={label} step={index + 1}>
                  <TimelineIndicator />
                  <TimelineHeader>
                    <TimelineTitle>{label}</TimelineTitle>
                  </TimelineHeader>
                  <TimelineContent>{detail}</TimelineContent>
                  {index < items.length - 1 ? <TimelineSeparator /> : null}
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      ) : null}
    </CareLoopFrame>
  );
}
