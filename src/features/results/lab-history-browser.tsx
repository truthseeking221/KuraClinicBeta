"use client";

import { Fragment, useMemo, useState } from "react";

import { useT } from "../../components/foundations/i18n";
import type { Translate } from "../../components/foundations/i18n";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from "../../components/shared/empty-state";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible";
import {
  CollapseIcon,
  ExpandIcon,
  RefreshIcon,
  SearchIcon,
  WarningIcon,
  WifiErrorIcon,
} from "../../components/ui/icons";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  flagFor,
  formatMonthShort,
  formatValue,
  parseLabTimestamp,
  rangeDisplay,
  resultSeries,
} from "./logic";
import { LabSparkline } from "./lab-sparkline";
import type { LabAnalyteResult, LabFlag, LabResultPoint } from "./types";
import styles from "./lab-history-browser.module.css";

export type LabHistoryItem = {
  /** Primary analyte shown in the clinical-system view. */
  result: LabAnalyteResult;
  /** Report constituents available in the raw table without inflating the primary count. */
  children?: LabAnalyteResult[];
};

export type LabHistorySection = {
  code: string;
  title: string;
  items: LabHistoryItem[];
};

export type LabHistoryView = "all" | "overview" | "table";
export type LabHistorySignal =
  "out" | "watch" | "resolved" | "stale" | "noref" | "ok";
export type LabHistoryDataState =
  "ready" | "loading" | "empty" | "error" | "offline";

export type LabHistoryBrowserProps = {
  sections: LabHistorySection[];
  latestDrawAt: string;
  state?: LabHistoryDataState;
  initialView?: LabHistoryView;
  initialQuery?: string;
  initialSignal?: LabHistorySignal | "all";
  initialLatestOnly?: boolean;
  onRetry?: () => void;
};

const SIGNAL_OPTIONS = [
  { value: "all", label: "All results" },
  { value: "out", label: "Needs review" },
  { value: "watch", label: "Follow up due" },
  { value: "resolved", label: "Recently resolved" },
  { value: "stale", label: "Not in this draw" },
  { value: "noref", label: "No reference" },
] as const;

const SIGNAL_LABELS: Record<Exclude<LabHistorySignal, "ok">, string> = {
  out: "Needs review",
  watch: "Follow up due",
  resolved: "Recently resolved",
  stale: "Not in this draw",
  noref: "No reference",
};

function dateKey(value: string | null | undefined) {
  return value?.slice(0, 10) ?? null;
}

function pointOnDate(result: LabAnalyteResult, date: string) {
  return (
    resultSeries(result).find(
      (point) => dateKey(point.date) === dateKey(date),
    ) ?? null
  );
}

function flagForPoint(
  result: LabAnalyteResult,
  point: LabResultPoint | null,
): LabFlag | null {
  if (!point || point.value.kind === "missing") return null;
  return flagFor({ ...result, value: point.value });
}

function latestMeasuredPoint(result: LabAnalyteResult) {
  return (
    [...resultSeries(result)]
      .filter((point) => point.value.kind !== "missing")
      .sort(
        (a, b) =>
          (parseLabTimestamp(b.date) ?? Number.NEGATIVE_INFINITY) -
          (parseLabTimestamp(a.date) ?? Number.NEGATIVE_INFINITY),
      )[0] ?? null
  );
}

function signalFor(
  result: LabAnalyteResult,
  latestDrawAt: string,
): LabHistorySignal {
  const latest = pointOnDate(result, latestDrawAt);
  if (!latest || latest.value.kind === "missing") {
    const measured = latestMeasuredPoint(result);
    const measuredFlag = flagForPoint(result, measured);
    return measuredFlag?.severity === "abnormal" ||
      measuredFlag?.severity === "critical"
      ? "watch"
      : "stale";
  }

  if (!result.range) return "noref";
  const currentFlag = flagForPoint(result, latest);
  if (
    currentFlag?.severity === "abnormal" ||
    currentFlag?.severity === "critical"
  )
    return "out";

  const earlierFlag = resultSeries(result).some((point) => {
    if (dateKey(point.date) === dateKey(latestDrawAt)) return false;
    const flag = flagForPoint(result, point);
    return flag?.severity === "abnormal" || flag?.severity === "critical";
  });
  return earlierFlag ? "resolved" : "ok";
}

function rowFlag(item: LabHistoryItem, latestDrawAt: string) {
  const latest = pointOnDate(item.result, latestDrawAt);
  const measured =
    !latest || latest.value.kind === "missing"
      ? latestMeasuredPoint(item.result)
      : latest;
  return flagForPoint(item.result, measured);
}

function resultDateCopy(
  result: LabAnalyteResult,
  latestDrawAt: string,
  signal: LabHistorySignal,
  t: Translate,
) {
  const latest = pointOnDate(result, latestDrawAt);
  const measured =
    latest?.value.kind !== "missing" ? latest : latestMeasuredPoint(result);
  const measuredLabel = measured?.date
    ? formatMonthShort(measured.date, "en-US", t)
    : t("date unavailable");

  if (signal === "watch")
    return t("Not repeated · last abnormal {date}").replace(
      "{date}",
      measuredLabel,
    );
  if (signal === "resolved")
    return t("Resolved {date} · earlier result was outside range").replace(
      "{date}",
      measuredLabel,
    );
  if (signal === "stale")
    return t("Not in this draw · last measured {date}").replace(
      "{date}",
      measuredLabel,
    );
  if (signal === "noref") return t("No structured reference");
  return "";
}

function resultMatches(item: LabHistoryItem, query: string) {
  const searchable = [
    item.result.name,
    item.result.analyteCode,
    item.result.panelName,
    ...(item.children?.flatMap((child) => [child.name, child.analyteCode]) ??
      []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
  return query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => searchable.includes(token));
}

function ResultRow({
  item,
  latestDrawAt,
}: {
  item: LabHistoryItem;
  latestDrawAt: string;
}) {
  const t = useT();
  const { result } = item;
  const signal = signalFor(result, latestDrawAt);
  const flag = rowFlag(item, latestDrawAt);
  const reference = rangeDisplay(result.range);
  const tone =
    flag?.severity === "critical"
      ? "danger"
      : signal === "out" || signal === "watch"
        ? "warning"
        : signal === "ok" || signal === "resolved"
          ? "success"
          : "neutral";
  const secondary = resultDateCopy(result, latestDrawAt, signal, t);
  const hasTrend =
    resultSeries(result).filter((point) => point.value.kind === "numeric")
      .length > 1;

  return (
    <li
      className={styles.resultRow}
      data-severity={flag?.severity ?? undefined}
      data-signal={signal}
    >
      <div className={styles.resultIdentity}>
        <span className={styles.resultName}>{result.name}</span>
        {secondary ? (
          <span className={styles.resultSecondary}>{secondary}</span>
        ) : null}
      </div>
      <div className={styles.resultReading}>
        <div className={styles.resultValueLine}>
          <span className={styles.resultValue} data-tone={tone}>
            {formatValue(result.value)}
          </span>
          {result.unit ? (
            <span className={styles.resultUnit}>{result.unit}</span>
          ) : null}
          {flag && flag.severity !== "normal" ? (
            <Badge
              size="sm"
              variant={flag.severity === "critical" ? "danger" : "warning"}
            >
              {flag.label}
            </Badge>
          ) : null}
        </div>
        <span className={styles.resultReference}>
          {reference
            ? t("Reference {range}").replace("{range}", reference)
            : t("No applicable reference")}
        </span>
      </div>
      <div className={styles.resultTrend}>
        {hasTrend ? <LabSparkline result={result} /> : null}
        {signal === "watch" ? (
          <span className={styles.dueCopy}>{t("Follow up due")}</span>
        ) : null}
      </div>
    </li>
  );
}

function ResultRows({
  items,
  latestDrawAt,
}: {
  items: LabHistoryItem[];
  latestDrawAt: string;
}) {
  const t = useT();
  return (
    <ul className={styles.resultList}>
      {items.map((item, index) => {
        const panelName = item.result.panelName;
        const showPanel = Boolean(
          panelName && panelName !== items[index - 1]?.result.panelName,
        );
        return (
          <Fragment key={item.result.testId}>
            {showPanel ? (
              <li className={styles.panelHeader}>
                <span>{panelName}</span>
                <span>
                  {t("{count} results").replace(
                    "{count}",
                    String(
                      items.filter(
                        (candidate) => candidate.result.panelName === panelName,
                      ).length,
                    ),
                  )}
                </span>
              </li>
            ) : null}
            <ResultRow item={item} latestDrawAt={latestDrawAt} />
          </Fragment>
        );
      })}
    </ul>
  );
}

function TableView({ items }: { items: LabHistoryItem[] }) {
  const t = useT();
  const results = items.flatMap((item) => [
    item.result,
    ...(item.children ?? []),
  ]);
  const dates = [
    ...new Set(
      results.flatMap((result) =>
        resultSeries(result).map((point) => dateKey(point.date)),
      ),
    ),
  ]
    .filter((date): date is string => Boolean(date))
    .sort((a, b) => (parseLabTimestamp(b) ?? 0) - (parseLabTimestamp(a) ?? 0))
    .slice(0, 5);

  return (
    <div
      className={styles.tableRegion}
      role="region"
      aria-label={t("Lab history table")}
      tabIndex={0}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{t("Test")}</th>
            <th scope="col">{t("Reference")}</th>
            {dates.map((date) => (
              <th key={date} scope="col">
                {formatMonthShort(date, "en-US", t)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.testId}>
              <th scope="row">
                <span>{result.name}</span>
                {result.unit ? <small>{result.unit}</small> : null}
              </th>
              <td>{rangeDisplay(result.range) ?? "—"}</td>
              {dates.map((date) => {
                const point = pointOnDate(result, date);
                return (
                  <td key={date}>{point ? formatValue(point.value) : "—"}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LabHistoryBrowser({
  initialLatestOnly = false,
  initialQuery = "",
  initialSignal = "all",
  initialView = "all",
  latestDrawAt,
  onRetry,
  sections,
  state = "ready",
}: LabHistoryBrowserProps) {
  const t = useT();
  const [view, setView] = useState<LabHistoryView>(initialView);
  const [query, setQuery] = useState(initialQuery);
  const [signal, setSignal] = useState<LabHistorySignal | "all">(initialSignal);
  const [latestOnly, setLatestOnly] = useState(initialLatestOnly);
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
  const primaryItems = sections.flatMap((section) => section.items);
  const tableCount = primaryItems.reduce(
    (count, item) => count + 1 + (item.children?.length ?? 0),
    0,
  );
  const overviewCount = primaryItems.filter(
    (item) => signalFor(item.result, latestDrawAt) === "out",
  ).length;

  const visibleSections = useMemo(
    () =>
      sections
        .map((section) => ({
          ...section,
          items: section.items
            .filter((item) => {
              const itemSignal = signalFor(item.result, latestDrawAt);
              return (
                resultMatches(item, query) &&
                (signal === "all" || itemSignal === signal) &&
                (!latestOnly ||
                  pointOnDate(item.result, latestDrawAt)?.value.kind !==
                    "missing")
              );
            })
            .sort((a, b) => {
              const rank: Record<LabHistorySignal, number> = {
                out: 0,
                watch: 1,
                resolved: 2,
                stale: 3,
                noref: 4,
                ok: 5,
              };
              const signalRank =
                rank[signalFor(a.result, latestDrawAt)] -
                rank[signalFor(b.result, latestDrawAt)];
              if (signalRank !== 0) return signalRank;
              return a.result.name.localeCompare(b.result.name);
            }),
        }))
        .filter((section) => section.items.length > 0),
    [latestDrawAt, latestOnly, query, sections, signal],
  );
  const visibleItems = visibleSections.flatMap((section) => section.items);
  const overviewGroups = (
    Object.keys(SIGNAL_LABELS) as Array<Exclude<LabHistorySignal, "ok">>
  )
    .map((signalKey) => ({
      code: signalKey,
      title: t(SIGNAL_LABELS[signalKey]),
      items: visibleItems.filter(
        (item) => signalFor(item.result, latestDrawAt) === signalKey,
      ),
    }))
    .filter((group) => group.items.length > 0);
  const allVisibleCollapsed =
    visibleSections.length > 0 &&
    visibleSections.every((section) => collapsed.has(section.code));
  const filtered = query.trim().length > 0 || signal !== "all" || latestOnly;
  const heading = t(
    view === "all" ? "All tests" : view === "overview" ? "Overview" : "Table",
  );
  const headingCount =
    view === "all"
      ? visibleItems.length
      : view === "overview"
        ? overviewCount
        : tableCount;

  const toggleAll = () => {
    setCollapsed((current) => {
      const next = new Set(current);
      visibleSections.forEach((section) => {
        if (allVisibleCollapsed) next.delete(section.code);
        else next.add(section.code);
      });
      return next;
    });
  };

  if (state === "loading") {
    return (
      <section className={styles.browser} aria-label={t("Lab result history")}>
        <Alert tone="info" role="status">
          <AlertTitle>{t("Loading lab history")}</AlertTitle>
          <AlertDescription>
            {t("Results will remain grouped by clinical system.")}
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section className={styles.browser} aria-label={t("Lab result history")}>
        <Alert tone="danger" icon={<WarningIcon size={18} />}>
          <AlertTitle>{t("Lab history could not be loaded")}</AlertTitle>
          <AlertDescription>
            {t("No result is inferred from this failure.")}
          </AlertDescription>
          {onRetry ? (
            <AlertAction>
              <Button
                size="sm"
                variant="outline"
                leadingIcon={<RefreshIcon size={16} />}
                onClick={onRetry}
              >
                {t("Retry")}
              </Button>
            </AlertAction>
          ) : null}
        </Alert>
      </section>
    );
  }

  if (state === "empty" || primaryItems.length === 0) {
    return (
      <section className={styles.browser} aria-label={t("Lab result history")}>
        <EmptyState align="center" surface="plain" className={styles.empty}>
          <EmptyStateHeader>
            <EmptyStateTitle>{t("No lab results yet")}</EmptyStateTitle>
            <EmptyStateDescription>
              {t("Released results will appear here by clinical system.")}
            </EmptyStateDescription>
          </EmptyStateHeader>
        </EmptyState>
      </section>
    );
  }

  return (
    <section
      className={styles.browser}
      aria-label={t("Lab result history")}
      data-slot="lab-history-browser"
    >
      {state === "offline" ? (
        <Alert tone="warning" icon={<WifiErrorIcon size={18} />}>
          <AlertTitle>{t("Offline — showing cached lab history")}</AlertTitle>
          <AlertDescription>
            {t("Values may be stale. Refresh when the connection returns.")}
          </AlertDescription>
        </Alert>
      ) : null}

      <Tabs
        value={view}
        onValueChange={(nextView) => setView(nextView as LabHistoryView)}
      >
        <div className={styles.topbar}>
          <div className={styles.headingRow}>
            <h2>{heading}</h2>
            <span className={styles.headingCount}>{headingCount}</span>
            {view === "all" && visibleSections.length > 0 ? (
              <Button
                aria-expanded={!allVisibleCollapsed}
                className={styles.collapseAll}
                size="compact"
                variant="ghost"
                leadingIcon={
                  allVisibleCollapsed ? (
                    <ExpandIcon size={15} />
                  ) : (
                    <CollapseIcon size={15} />
                  )
                }
                onClick={toggleAll}
              >
                {t(allVisibleCollapsed ? "Expand all" : "Collapse all")}
              </Button>
            ) : null}
          </div>
          <TabsList className={styles.tabs} aria-label={t("Lab result view")}>
            <TabsTrigger value="all" count={primaryItems.length}>
              {t("All tests")}
            </TabsTrigger>
            <TabsTrigger value="overview" count={overviewCount}>
              {t("Overview")}
            </TabsTrigger>
            <TabsTrigger value="table" count={tableCount}>
              {t("Table")}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className={styles.controls}>
          <Input
            aria-label={t("Search lab results")}
            className={styles.search}
            placeholder={t("Search lab results")}
            prefix={<SearchIcon size={18} />}
            size="sm"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
          <Select
            aria-label={t("Filter lab results")}
            className={styles.filter}
            options={SIGNAL_OPTIONS.map((option) => ({
              ...option,
              label: t(option.label),
            }))}
            value={signal}
            onValueChange={(nextSignal) =>
              setSignal((nextSignal ?? "all") as LabHistorySignal | "all")
            }
          />
          <Switch
            checked={latestOnly}
            className={styles.latest}
            size="sm"
            onCheckedChange={setLatestOnly}
          >
            {t("Latest only")}
          </Switch>
        </div>

        {filtered ? (
          <p className={styles.filterStatus} role="status" aria-live="polite">
            {t("Showing {visible} of {total} primary analytes.")
              .replace("{visible}", String(visibleItems.length))
              .replace("{total}", String(primaryItems.length))}
          </p>
        ) : null}

        <TabsContent value="all" className={styles.content}>
          {visibleSections.length > 0 ? (
            visibleSections.map((section) => {
              const flagged = section.items.filter((item) => {
                const itemSignal = signalFor(item.result, latestDrawAt);
                return itemSignal === "out" || itemSignal === "watch";
              }).length;
              const open = !collapsed.has(section.code);
              return (
                <Collapsible
                  className={styles.section}
                  key={section.code}
                  open={open}
                  onOpenChange={() =>
                    setCollapsed((current) => {
                      const next = new Set(current);
                      if (next.has(section.code)) next.delete(section.code);
                      else next.add(section.code);
                      return next;
                    })
                  }
                >
                  <h3 className={styles.sectionHeading}>
                    <CollapsibleTrigger
                      className={styles.sectionTrigger}
                      meta={`${t(
                        section.items.length === 1
                          ? "{count} test"
                          : "{count} tests",
                      ).replace("{count}", String(section.items.length))}${
                        flagged
                          ? ` · ${t("{count} flagged").replace("{count}", String(flagged))}`
                          : ""
                      }`}
                    >
                      {section.title}
                    </CollapsibleTrigger>
                  </h3>
                  <CollapsibleContent>
                    <ResultRows
                      items={section.items}
                      latestDrawAt={latestDrawAt}
                    />
                  </CollapsibleContent>
                </Collapsible>
              );
            })
          ) : (
            <EmptyState align="center" surface="plain" className={styles.empty}>
              <EmptyStateHeader>
                <EmptyStateTitle>
                  {t("No results match these controls")}
                </EmptyStateTitle>
                <EmptyStateDescription>
                  {t("Change the search or result filter.")}
                </EmptyStateDescription>
              </EmptyStateHeader>
            </EmptyState>
          )}
        </TabsContent>

        <TabsContent value="overview" className={styles.content}>
          {overviewGroups.length > 0 ? (
            overviewGroups.map((group) => (
              <section className={styles.overviewGroup} key={group.code}>
                <div className={styles.overviewHeading}>
                  <h3>{group.title}</h3>
                  <span>{group.items.length}</span>
                </div>
                <ResultRows items={group.items} latestDrawAt={latestDrawAt} />
              </section>
            ))
          ) : (
            <EmptyState align="center" surface="plain" className={styles.empty}>
              <EmptyStateHeader>
                <EmptyStateTitle>
                  {t("No flagged results in this view")}
                </EmptyStateTitle>
                <EmptyStateDescription>
                  {t("Change the filter to review other lab history.")}
                </EmptyStateDescription>
              </EmptyStateHeader>
            </EmptyState>
          )}
        </TabsContent>

        <TabsContent value="table" className={styles.content}>
          <TableView items={visibleItems} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
