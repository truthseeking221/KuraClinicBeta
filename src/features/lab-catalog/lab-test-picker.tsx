"use client";

import { useId, useMemo, useState } from "react";

import {
  AddIcon,
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  FilterIcon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RefreshIcon,
  SearchIcon,
  TestTubeIcon,
  WarningIcon,
} from "../../components/ui";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from "../../components/shared/empty-state";
import { useT } from "../../components/foundations/i18n";

import { filterCatalogTests, groupCatalogTests, toggleSetValue } from "./logic";
import { LabTestDetailPreview } from "./lab-test-detail-preview";
import styles from "./lab-test-picker.module.css";
import type {
  LabCatalogCategory,
  LabCatalogFilterStrategy,
  LabCatalogPickerState,
  LabCatalogSelectionChange,
  LabCatalogTest,
} from "./types";

export type LabTestPickerProps = {
  tests: readonly LabCatalogTest[];
  categories: readonly LabCatalogCategory[];
  totalCount?: number;
  resultTotal?: number;
  state?: LabCatalogPickerState;
  errorMessage?: string;
  staleAt?: string;
  filterStrategy?: LabCatalogFilterStrategy;
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  selectedCategoryIds?: readonly string[];
  defaultSelectedCategoryIds?: readonly string[];
  onSelectedCategoryIdsChange?: (categoryIds: string[]) => void;
  selectedTestIds?: readonly string[];
  defaultSelectedTestIds?: readonly string[];
  onSelectedTestIdsChange?: (
    selectedTestIds: string[],
    change: LabCatalogSelectionChange,
  ) => void;
  readOnly?: boolean;
  disabled?: boolean;
  onRetry?: () => void;
  onSuggestMissingTest?: (query: string) => void;
  autoFocusSearch?: boolean;
  /** Lets an owning workspace provide the visible title without repeating it. */
  showResultSummary?: boolean;
  /** Keeps the toolbar fixed while the catalog body scrolls inside a bounded region. */
  scrollMode?: "page" | "contained";
  className?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function useControllableString(
  controlled: string | undefined,
  defaultValue: string,
  onChange?: (value: string) => void,
) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const setValue = (next: string) => {
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  };
  return [value, setValue] as const;
}

function useControllableSet(
  controlled: readonly string[] | undefined,
  defaultValue: readonly string[],
  onChange?: (value: string[]) => void,
) {
  const [internal, setInternal] = useState(() => new Set(defaultValue));
  const value = useMemo(
    () => (controlled ? new Set(controlled) : internal),
    [controlled, internal],
  );
  const setValue = (next: Set<string>) => {
    if (controlled === undefined) setInternal(next);
    onChange?.([...next]);
  };
  return [value, setValue] as const;
}

function CatalogSkeleton() {
  return (
    <div
      className={styles.skeleton}
      aria-hidden="true"
      data-testid="catalog-skeleton"
    >
      {[0, 1, 2].map((section) => (
        <div className={styles.skeletonSection} key={section}>
          <div className={styles.skeletonHeading} />
          <div className={styles.skeletonGrid}>
            {[0, 1, 2, 3].map((row) => (
              <div className={styles.skeletonRow} key={row} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type CatalogTestRowProps = {
  test: LabCatalogTest;
  checked: boolean;
  disabled: boolean;
  disabledReason?: string;
  previewOpen: boolean;
  onPreviewOpenChange: (open: boolean) => void;
  onCheckedChange: (checked: boolean) => void;
};

function CatalogTestRow({
  checked,
  disabled,
  disabledReason,
  onCheckedChange,
  onPreviewOpenChange,
  previewOpen,
  test,
}: CatalogTestRowProps) {
  const t = useT();
  const reasonId = useId();
  const unavailable = test.availability === "unavailable";
  const rowDisabled = disabled || unavailable;

  const changeSelection = (nextChecked: boolean) => {
    onCheckedChange(nextChecked);
    onPreviewOpenChange(false);
  };

  return (
    <LabTestDetailPreview
      actionDisabled={disabled}
      actionDisabledReason={disabledReason}
      onOpenChange={onPreviewOpenChange}
      onToggle={() => changeSelection(!checked)}
      open={previewOpen}
      selected={checked}
      test={test}
    >
      <div
        className={styles.testRow}
        data-checked={checked ? "true" : undefined}
        data-disabled={rowDisabled ? "true" : undefined}
        data-testid={`catalog-test-${test.testCatalogId}`}
      >
        <Checkbox
          aria-describedby={unavailable ? reasonId : undefined}
          checked={checked}
          className={styles.testCheckbox}
          disabled={rowDisabled}
          onCheckedChange={changeSelection}
        >
          <span className={styles.testLabel}>
            <span>{test.displayName}</span>
            {test.componentCount ? (
              <span className={styles.componentCount}>
                {t(
                  test.componentCount === 1 ? "{count} test" : "{count} tests",
                ).replace("{count}", String(test.componentCount))}
              </span>
            ) : null}
            {unavailable ? (
              <WarningIcon
                aria-hidden="true"
                className={styles.warningIcon}
                size={16}
              />
            ) : null}
          </span>
        </Checkbox>
        {unavailable ? (
          <span className={styles.unavailableReason} id={reasonId}>
            {t(test.unavailableReason ?? "Temporarily unavailable")}
          </span>
        ) : null}
      </div>
    </LabTestDetailPreview>
  );
}

type CategoryFilterMenuProps = {
  categories: readonly LabCatalogCategory[];
  selected: ReadonlySet<string>;
  disabled?: boolean;
  onChange: (next: Set<string>) => void;
};

function CategoryFilterMenu({
  categories,
  disabled = false,
  onChange,
  selected,
}: CategoryFilterMenuProps) {
  const t = useT();
  const selectedNames = categories
    .filter((category) => selected.has(category.categoryId))
    .map((category) => category.displayName);
  const triggerLabel =
    selectedNames.length === 0
      ? t("Category")
      : selectedNames.length === 1
        ? t("Category · {name}").replace("{name}", selectedNames[0])
        : t("Category · {name} +{count}")
            .replace("{name}", selectedNames[0])
            .replace("{count}", String(selectedNames.length - 1));

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            aria-label={
              selectedNames.length > 0
                ? t("Filter by category, {count} selected").replace(
                    "{count}",
                    String(selectedNames.length),
                  )
                : t("Filter by category")
            }
            className={styles.categoryTrigger}
            disabled={disabled}
            leadingIcon={<FilterIcon aria-hidden="true" />}
            size="md"
            variant="outline"
          >
            <span className={styles.categoryTriggerLabel}>{triggerLabel}</span>
          </Button>
        }
      />
      <PopoverContent
        aria-label={t("Filter by category")}
        className={styles.categoryMenu}
      >
        <div className={styles.categoryOptions}>
          {categories.map((category) => (
            <Checkbox
              checked={selected.has(category.categoryId)}
              key={category.categoryId}
              onCheckedChange={(checked) =>
                onChange(
                  toggleSetValue(
                    selected,
                    category.categoryId,
                    checked === true,
                  ),
                )
              }
            >
              <span className={styles.categoryOptionLabel}>
                <span className={styles.categoryOptionName}>
                  {category.displayName}
                </span>
                <span
                  aria-label={t("{count} tests").replace(
                    "{count}",
                    String(category.count),
                  )}
                  className={styles.categoryOptionCount}
                >
                  {category.count}
                </span>
              </span>
            </Checkbox>
          ))}
        </div>
        <div className={styles.categoryMenuFooter}>
          <Button
            disabled={selected.size === 0}
            onClick={() => onChange(new Set())}
            size="sm"
            variant="ghost"
          >
            {t("Clear categories")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function LabTestPicker({
  autoFocusSearch = false,
  categories,
  className,
  defaultQuery = "",
  defaultSelectedCategoryIds = [],
  defaultSelectedTestIds = [],
  disabled = false,
  errorMessage,
  filterStrategy = "client",
  onQueryChange,
  onRetry,
  onSelectedCategoryIdsChange,
  onSelectedTestIdsChange,
  onSuggestMissingTest,
  query: controlledQuery,
  readOnly = false,
  resultTotal,
  scrollMode = "page",
  selectedCategoryIds: controlledCategoryIds,
  selectedTestIds: controlledTestIds,
  showResultSummary = true,
  staleAt,
  state = "ready",
  tests,
  totalCount,
}: LabTestPickerProps) {
  const t = useT();
  const headingId = useId();
  const [query, setQuery] = useControllableString(
    controlledQuery,
    defaultQuery,
    onQueryChange,
  );
  const [selectedCategories, setSelectedCategories] = useControllableSet(
    controlledCategoryIds,
    defaultSelectedCategoryIds,
    onSelectedCategoryIdsChange,
  );
  const [selectedTests, setSelectedTests] = useControllableSet(
    controlledTestIds,
    defaultSelectedTestIds,
  );
  const [previewTestId, setPreviewTestId] = useState<string | null>(null);

  const visibleTests = useMemo(
    () =>
      filterStrategy === "client"
        ? filterCatalogTests(tests, query, selectedCategories)
        : [...tests],
    [filterStrategy, query, selectedCategories, tests],
  );
  const groups = useMemo(
    () => groupCatalogTests(visibleTests, categories),
    [categories, visibleTests],
  );
  const trimmedQuery = query.trim();
  const activeFilterCount = selectedCategories.size;
  const catalogTotal = totalCount ?? tests.length;
  const visibleTotal = resultTotal ?? visibleTests.length;
  const isLoading = state === "loading";
  const isError = state === "error" || state === "offline";
  const isPermissionRestricted = state === "permission";
  const selectionDisabled =
    disabled || readOnly || isPermissionRestricted || isLoading || isError;
  const selectionDisabledReason = disabled
    ? t("Catalog selection is disabled.")
    : readOnly
      ? t("This selection is read-only.")
      : isPermissionRestricted
        ? t("Your workspace permission allows catalog review only.")
        : undefined;
  const resultLabel = t(
    trimmedQuery
      ? "Search results"
      : activeFilterCount > 0
        ? "Filtered tests"
        : "All tests",
  );

  const handleTestChange = (test: LabCatalogTest, checked: boolean) => {
    const next = toggleSetValue(selectedTests, test.testCatalogId, checked);
    setSelectedTests(next);
    onSelectedTestIdsChange?.([...next], { test, checked });
  };

  return (
    <section
      aria-busy={isLoading || undefined}
      aria-label={showResultSummary ? undefined : t("Lab test catalog")}
      aria-labelledby={showResultSummary ? headingId : undefined}
      className={joinClasses(styles.root, className)}
      data-scroll-mode={scrollMode}
      data-slot="lab-test-picker"
    >
      <div className={styles.toolbar}>
        <div className={styles.toolbarHeader}>
          {showResultSummary ? (
            <div className={styles.titleGroup}>
              <h2 className={styles.title} id={headingId}>
                {resultLabel}
              </h2>
              <Badge
                aria-label={t("{count} tests").replace(
                  "{count}",
                  String(
                    trimmedQuery || activeFilterCount
                      ? visibleTotal
                      : catalogTotal,
                  ),
                )}
                size="sm"
              >
                {trimmedQuery || activeFilterCount
                  ? visibleTotal
                  : catalogTotal}
              </Badge>
            </div>
          ) : null}

          <CategoryFilterMenu
            categories={categories}
            disabled={disabled || isLoading}
            onChange={setSelectedCategories}
            selected={selectedCategories}
          />
        </div>
        <Input
          aria-label={t("Search tests, panels, or keywords")}
          autoFocus={autoFocusSearch}
          className={styles.search}
          disabled={disabled}
          maxLength={100}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder={t("Search tests, panels, or keywords…")}
          prefix={<SearchIcon size={16} />}
          size="md"
          type="search"
          value={query}
        />
      </div>

      <div className={styles.body} data-slot="lab-test-picker-scroll">
        <p
          aria-atomic="true"
          aria-live="polite"
          className={styles.srOnly}
          role="status"
        >
          {isLoading
            ? t("Loading lab tests")
            : t(
                visibleTotal === 1
                  ? "{count} test available in this view"
                  : "{count} tests available in this view",
              ).replace("{count}", String(visibleTotal))}
        </p>

        {isPermissionRestricted ? (
          <Alert icon={<WarningIcon />} tone="warning">
            <AlertTitle>{t("Browse-only catalog")}</AlertTitle>
            <AlertDescription>
              {t(
                "Your current workspace permission allows catalog review but not test selection.",
              )}
            </AlertDescription>
          </Alert>
        ) : null}

        {readOnly && !isPermissionRestricted ? (
          <Alert tone="info">
            <AlertTitle>{t("Read-only selection")}</AlertTitle>
            <AlertDescription>
              {t(
                "Tests already attached to this order are shown for review and cannot be changed here.",
              )}
            </AlertDescription>
          </Alert>
        ) : null}

        {staleAt ? (
          <Alert icon={<WarningIcon />} tone="warning">
            <AlertTitle>{t("Catalog snapshot may be out of date")}</AlertTitle>
            <AlertDescription>
              {t("Last refreshed {date}.").replace("{date}", staleAt)}{" "}
              {t("Refresh before relying on availability.")}
            </AlertDescription>
            {onRetry ? (
              <AlertAction>
                <Button
                  leadingIcon={<RefreshIcon aria-hidden="true" />}
                  onClick={onRetry}
                  size="sm"
                  variant="outline"
                >
                  {t("Refresh catalog")}
                </Button>
              </AlertAction>
            ) : null}
          </Alert>
        ) : null}

        {isLoading ? <CatalogSkeleton /> : null}

        {!isLoading && isError ? (
          <EmptyState surface="outlined">
            <EmptyStateMedia variant="icon">
              <WarningIcon />
            </EmptyStateMedia>
            <EmptyStateHeader>
              <EmptyStateTitle>
                {t(
                  state === "offline"
                    ? "Catalog unavailable offline"
                    : "Could not load tests",
                )}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {t(
                  errorMessage ??
                    (state === "offline"
                      ? "Reconnect to load current test availability and continue selecting."
                      : "The catalog service did not respond. Try again."),
                )}
              </EmptyStateDescription>
            </EmptyStateHeader>
            {onRetry ? (
              <EmptyStateContent>
                <Button
                  leadingIcon={<RefreshIcon aria-hidden="true" />}
                  onClick={onRetry}
                >
                  {t("Retry")}
                </Button>
              </EmptyStateContent>
            ) : null}
          </EmptyState>
        ) : null}

        {!isLoading && !isError && visibleTests.length === 0 ? (
          <EmptyState>
            <EmptyStateMedia variant="icon">
              <TestTubeIcon />
            </EmptyStateMedia>
            <EmptyStateHeader>
              <EmptyStateTitle>
                {trimmedQuery
                  ? t("No tests match “{query}”").replace(
                      "{query}",
                      trimmedQuery,
                    )
                  : t("No tests match these filters")}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {t("Try a broader search or submit a missing-test request.")}
              </EmptyStateDescription>
            </EmptyStateHeader>
            {onSuggestMissingTest ? (
              <EmptyStateContent>
                <Button
                  leadingIcon={<AddIcon aria-hidden="true" />}
                  onClick={() => onSuggestMissingTest(trimmedQuery)}
                  variant="outline"
                >
                  {t("Suggest a missing test")}
                </Button>
              </EmptyStateContent>
            ) : null}
          </EmptyState>
        ) : null}

        {!isLoading && !isError && groups.length > 0 ? (
          <div
            aria-label={t("Lab tests by category")}
            className={styles.groups}
            role="group"
          >
            {groups.map(({ category, tests: categoryTests }) => (
              <Collapsible defaultOpen inset="none" key={category.categoryId}>
                <CollapsibleTrigger
                  chevronPosition="leading"
                  className={styles.sectionTrigger}
                >
                  {category.displayName}
                </CollapsibleTrigger>
                <CollapsibleContent className={styles.sectionContent}>
                  <div className={styles.testGrid}>
                    {categoryTests.map((catalogTest) => (
                      <CatalogTestRow
                        checked={selectedTests.has(catalogTest.testCatalogId)}
                        disabled={selectionDisabled}
                        disabledReason={selectionDisabledReason}
                        key={catalogTest.testCatalogId}
                        onCheckedChange={(checked) =>
                          handleTestChange(catalogTest, checked)
                        }
                        onPreviewOpenChange={(open) =>
                          setPreviewTestId((current) =>
                            open
                              ? catalogTest.testCatalogId
                              : current === catalogTest.testCatalogId
                                ? null
                                : current,
                          )
                        }
                        previewOpen={
                          previewTestId === catalogTest.testCatalogId
                        }
                        test={catalogTest}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
