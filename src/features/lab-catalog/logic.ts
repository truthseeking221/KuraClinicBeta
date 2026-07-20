import type { LabCatalogCategory, LabCatalogTest } from './types';

export function normalizeCatalogQuery(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function matchesCatalogQuery(test: LabCatalogTest, query: string): boolean {
  const normalized = normalizeCatalogQuery(query);
  if (!normalized) return true;

  return [
    test.displayName,
    test.code,
    test.abbrv ?? '',
    ...(test.keywords ?? []),
  ].some((value) => value.toLocaleLowerCase().includes(normalized));
}

export function filterCatalogTests(
  tests: readonly LabCatalogTest[],
  query: string,
  selectedCategoryIds: ReadonlySet<string>,
): LabCatalogTest[] {
  return tests.filter((test) => {
    const categoryMatches =
      selectedCategoryIds.size === 0 ||
      test.categoryIds.some((categoryId) => selectedCategoryIds.has(categoryId));

    return categoryMatches && matchesCatalogQuery(test, query);
  });
}

export type LabCatalogGroup = {
  category: LabCatalogCategory;
  tests: LabCatalogTest[];
};

export function groupCatalogTests(
  tests: readonly LabCatalogTest[],
  categories: readonly LabCatalogCategory[],
): LabCatalogGroup[] {
  const byCategory = new Map<string, LabCatalogTest[]>();

  for (const test of tests) {
    for (const categoryId of test.categoryIds) {
      const bucket = byCategory.get(categoryId) ?? [];
      bucket.push(test);
      byCategory.set(categoryId, bucket);
    }
  }

  return [...categories]
    .sort((left, right) => left.priority - right.priority)
    .flatMap((category) => {
      const categoryTests = byCategory.get(category.categoryId);
      return categoryTests?.length ? [{ category, tests: categoryTests }] : [];
    });
}

export function toggleSetValue(
  values: ReadonlySet<string>,
  value: string,
  enabled: boolean,
): Set<string> {
  const next = new Set(values);
  if (enabled) next.add(value);
  else next.delete(value);
  return next;
}
