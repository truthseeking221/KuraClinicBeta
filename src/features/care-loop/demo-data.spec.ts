import { describe, expect, it } from "vitest";

import { LAB_CATALOG_TESTS } from "../lab-catalog/demo-data";

import { CARE_LOOP_CART_ITEMS } from "./demo-data";

describe("care-loop catalog contract", () => {
  it("maps every selectable catalog test to a priced cart line", () => {
    const selectableTestIds = LAB_CATALOG_TESTS.filter(
      (test) => test.availability !== "unavailable",
    ).map((test) => test.testCatalogId);
    const cartItemIds = new Set(CARE_LOOP_CART_ITEMS.map((item) => item.id));

    expect(selectableTestIds.every((id) => cartItemIds.has(id))).toBe(true);
  });
});
