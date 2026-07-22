"use client";

import { useT } from "../../components/foundations/i18n";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Radio,
  RadioGroup,
} from "../../components/ui";
import { EditIcon, PrintIcon } from "../../components/ui/icons";

import { TUBE_CATALOG } from "./catalog";
import styles from "./tube-labeling.module.css";
import type { TubeLabelMethod, TubeLabelPhotoCheck } from "./types";

export type TubeLabelingProps = {
  /** Identity written on every tube, e.g. "SOKHA · F · 1974". */
  patientLabelLine: string;
  /** Tube keys drawn for this order, in catalog order. */
  tubeKeys: readonly string[];
  method: TubeLabelMethod;
  onMethodChange: (method: TubeLabelMethod) => void;
  /** Sticker route only: the photo evidence the courier will check against. */
  photoChecks: TubeLabelPhotoCheck;
  onPhotoChecksChange: (checks: TubeLabelPhotoCheck) => void;
  /** Doctor self-collection separates confirming the draw from confirming labels. */
  stage?: "collect" | "label";
  /** The doctor route verifies labels on a phone; staffed collection hands off directly. */
  verificationRequired?: boolean;
  onConfirm: () => void;
};

/**
 * Labelling the tubes after a draw.
 *
 * The two routes are not equivalent and the interface says so: a printed
 * Kura sticker carries the order identity a courier and the lab can both
 * read, while handwriting depends on whoever held the pen. Handwriting stays
 * available because a clinic without stickers still has to send blood, but it
 * is the second option and it names what the courier will check.
 */
export function TubeLabeling({
  method,
  onConfirm,
  onMethodChange,
  patientLabelLine,
  stage = "label",
  tubeKeys,
  verificationRequired = true,
}: TubeLabelingProps) {
  const t = useT();
  const tubes = tubeKeys
    .map((key) => TUBE_CATALOG.find((tube) => tube.key === key))
    .filter((tube): tube is (typeof TUBE_CATALOG)[number] => Boolean(tube));

  const canConfirm = tubes.length > 0;
  const title =
    stage === "collect" ? t("Required tubes") : t("Label the tubes");

  return (
    <Card as="section" aria-label={title} className={styles.card}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className={styles.subtitle}>
          {stage === "collect" ? (
            <>
              {tubes.length} {t(tubes.length === 1 ? "tube" : "tubes")}{" "}
              {t("for this order")}
            </>
          ) : (
            <>
              {tubes.length} {t(tubes.length === 1 ? "sample" : "samples")}{" "}
              {t("collected")}
            </>
          )}
        </p>
      </CardHeader>

      <CardContent className={styles.content}>
        <ul aria-label={t("Collected tubes")} className={styles.tubes}>
          {tubes.map((tube) => (
            <li className={styles.tube} key={tube.key}>
              <span aria-hidden="true" className={styles.tubeGlyph}>
                <span
                  className={styles.stopper}
                  style={{
                    background: tube.color,
                    borderColor: tube.stripeColor,
                  }}
                />
                <span className={styles.tubeBody} />
              </span>
              <span className={styles.tubeLabel}>{tube.stopperLabel}</span>
            </li>
          ))}
        </ul>

        <RadioGroup
          className={styles.methods}
          legend={t("How will you label them?")}
          onValueChange={(next) => onMethodChange(next as TubeLabelMethod)}
          value={method}
        >
          <Radio
            appearance="card"
            helpText={t(
              "The order identity stays machine-readable for the courier and the lab.",
            )}
            value="sticker"
          >
            <span className={styles.methodTitle}>
              <PrintIcon aria-hidden="true" size={18} />
              {t("Use the Kura sticker pad")}
              <Badge size="sm" variant="success">
                {t("Recommended")}
              </Badge>
            </span>
          </Radio>

          <Radio
            appearance="card"
            helpText={t(
              "Write clearly on every tube. The courier checks the labels before pickup, and an unreadable tube is rejected at the lab.",
            )}
            value="pen"
          >
            <span className={styles.methodTitle}>
              <EditIcon aria-hidden="true" size={18} />
              {t("Write with a pen")}
            </span>
          </Radio>
        </RadioGroup>

        {stage === "label" && method === "pen" ? (
          <div className={styles.penTemplate}>
            <p className={styles.templateCaption}>{t("Write on each tube")}</p>
            <p className={styles.templateLine}>{patientLabelLine}</p>
          </div>
        ) : null}
      </CardContent>

      <footer className={styles.footer}>
        {canConfirm ? null : (
          <p className={styles.blocked}>
            {t("No collection tube plan is available for these tests.")}
          </p>
        )}
        <Button disabled={!canConfirm} onClick={onConfirm}>
          {stage === "collect"
            ? tubes.length === 1
              ? t("I have collected the tube")
              : `${t("I have collected all")} ${tubes.length} ${t("tubes")}`
            : verificationRequired
              ? t("Next: Scan QR to verify labels")
              : tubes.length === 1
                ? t("I have labelled the tube")
                : `${t("I have labelled all")} ${tubes.length} ${t("tubes")}`}
        </Button>
      </footer>
    </Card>
  );
}
