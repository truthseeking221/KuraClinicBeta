# Lab test picker — Figma intake and backend compatibility

## Intake decision

- Source: Kura Design Figma node `1253:106518`, “Lab catalog — test picker”.
- Primary decision: `FEATURE-OWN`.
- Canonical owner: `src/features/lab-catalog`.
- Reused owners: `Checkbox`, `Input`, `Button`, `Badge`, `Collapsible`,
  `Alert`, `EmptyState`, and Kura icons.
- Rejected alternatives: no existing Storybook component provides the domain
  grouping, selection, unavailable-test behavior, and catalog search states.
  A new shared primitive would duplicate existing controls and leak lab
  semantics into the generic layer.

## Figma state inventory

| State | Figma node | Kura story |
| --- | --- | --- |
| Default selected catalog | `1253:106516` | `Default` |
| New patient / empty selection | `1253:106517` | `NewPatient` |
| Searching for glucose | `1359:690` | `SearchResults` |
| No results for homocysteine | `1362:1006` | `NoResults` |

Additional product states are registered for selection/removal, hover,
filter-open, category filtering, collapsed sections, unavailable tests,
loading, error/retry, offline, stale data, permission restriction, read-only,
long content, density, theme, and responsive widths.

## Backend compatibility record

- Repository: `Kura-med/kura-platform`
- Ref: `be3152c972beabb3b32561aef49f1bda60f454fe`
- Persona: clinic doctor.
- Browser owner: clinic doctor catalog MFE.
- REST owner: `clinic-bff`.
- REST reads:
  - `GET /clinic/lab/catalog`
  - `GET /clinic/lab/facets`
- gRPC owner: `lab-ms`.
- gRPC reads:
  - `LabService.SearchTestCatalogs`
  - `LabService.GetCatalogFacets`
- Search filters: category UUIDs, specimen UUIDs, query, limit, offset.
- Search fields: code, display name, abbreviation.
- Catalog row fields used by this component: test catalog ID, code, display
  name, abbreviation, kind, active status, required pre-analytical fields,
  category IDs.
- Null/unavailable handling: BFF maps absent scalar fields to empty values and
  absent arrays to empty arrays. The picker treats unavailable capability as a
  separate composed fact because pricing/availability ownership is not the
  lab catalog row itself.
- Errors: invalid query is `400`, unauthenticated is `401`; unavailable/deadline
  failures are mapped by the shared BFF error layer. Stories expose failure,
  offline, and retry states without claiming an order mutation succeeded.
- Authorization: catalog browse is authenticated. Selection can be disabled
  for browse-only/read-only contexts; the picker does not place an order or
  bypass licence/medical-attribution gates.
- Pagination: BFF defaults to 50 and allows up to 100. A 67-test all-catalog
  presentation must request 100 or paginate; Storybook’s 67 rows are a
  complete fixture, not proof that a default API call returns every row.

Consulted paths:

- `README.md`
- `docs/INDEX.md`
- `docs/adr/INDEX.md`
- `docs/architecture/system-diagram.md`
- `docs/adr/ADR-0024-lab-ms-catalog-pricing-microservice.md`
- `docs/adr/ADR-0033-clinic-doctor-lab-catalog-browse.md`
- `docs/adr/ADR-0038-clinic-lab-catalog-order-flow-order-ms-booking-ms.md`
- `apps/bff/clinic-bff/src/app/lab/catalog.controller.ts`
- `apps/bff/clinic-bff/src/app/lab/catalog.service.ts`
- `apps/bff/clinic-bff/src/app/lab/dto/catalog-search-query.dto.ts`
- `apps/bff/clinic-bff/src/app/lab/dto/catalog.dto.ts`
- `apps/bff/clinic-bff/src/app/lab/lab-grpc-error.util.ts`
- `apps/clinic/clinic-doctor-catalog-mf/src/app/lib/use-catalog.ts`
- `apps/clinic/clinic-doctor-catalog-mf/src/app/components/catalog-results.tsx`
- `libs/contracts/proto/lab.proto`

## Visual binding map

| Figma decision | Kura binding |
| --- | --- |
| White catalog surface | `card` |
| Neutral dividers | `border` |
| Blue selected checkbox | canonical `Checkbox` / `primary` |
| Muted disabled row | `muted-foreground` + canonical disabled opacity |
| Warning unavailable marker | `status-warning-fg` + explicit reason text |
| 13px row labels | `type-sm` |
| 18px heading | `type-lg` |
| 8px controls | `radius-control` |
| Compact section rhythm | semantic Kura spacing variables |
| Search/filter icons | canonical Kura icon exports |
| Hover/focus | semantic muted hover + canonical control focus rings |
| Four-column desktop grid | responsive 1/2/3/4-column contract |

No raw Figma color, font, radius, shadow, icon, or fixed page-shell assumption
is retained.

## Mobile contract

- Minimum supported width: 320px.
- Toolbar stacks before controls become cramped.
- Filter and search remain reachable without hover.
- Test rows become one column at narrow widths and retain 44px targets.
- Category filters reflow from three to two to one column.
- Long names wrap; no clinical label is truncated.
- No nested horizontal scrolling is introduced.
