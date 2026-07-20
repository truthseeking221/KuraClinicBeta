# Intake record — Untitled UI React Dropdowns

Date: 2026-07-16 · Source: <https://www.untitledui.com/react/components/dropdowns> · Owner: `src/components/ui`

## Decision

**REUSE** the canonical `DropdownMenu` component and its existing Storybook
family at `Design System/Components/Dropdown Menu`.

The source was inspected in Chrome together with its public component source
directory. Its 15 examples and complete compound API duplicate Kura's anchored
menu contract rather than establish a new component need. No Untitled UI code,
CSS, icons, or dependency is promoted into the repository.

## Kura use case

Clinic staff and workspace administrators use a short, anchored menu to reveal
secondary contextual actions or a small preference set without losing the
current record or workspace context. The primary action is one clearly labelled
menu choice. The owning workflow supplies the authorised actions, enabled state,
selection state, confirmations, audit event, and recovery path.

High-consequence actions (clinical completion, identity or access changes,
deletion, sign-out, and irreversible exports) must transition to their owning
confirmation flow; they are never completed by the primitive itself.

## Fresh Kura evidence

| Evidence | Result |
| --- | --- |
| Canonical owner and public barrel | `src/components/ui/dropdown-menu.tsx` is exported from `src/components/ui/index.ts`. |
| Storybook | `src/components/ui/dropdown-menu.stories.tsx` owns the canonical `Design System/Components/Dropdown Menu` entry, including keyboard, disabled, nested, selection, long-content, mobile, and density scenarios. |
| Product use | `DataGrid` uses it for column visibility. `AppShell` composes it for workspace, mode, shift, and account menus. |
| Interaction and accessibility | Radix Dropdown Menu provides menu semantics, roving focus, keyboard navigation, Escape dismissal, focus restoration, disabled-item handling, and collision-aware positioning. |
| Kura binding | The existing CSS module uses Kura semantic surface, border, focus, elevation, radius, typography, density, and touch-target tokens, plus canonical Kura icons. |

## Untitled UI family mapping

| Untitled UI capability | Kura decision and canonical replacement |
| --- | --- |
| Button simple, advanced, link | **REUSE** `DropdownMenu` with the canonical `Button`; trigger styling belongs to `Button`, not a menu variant. |
| Icon simple and advanced | **REUSE** `DropdownMenu` with `IconButton` and a required accessible name. |
| Icons, keyboard add-ons, labels, sections, separators | **REUSE** `DropdownMenuItem`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuLabel`, and `DropdownMenuSeparator`. |
| Nested menu | **REUSE** `DropdownMenuSub`, `DropdownMenuSubTrigger`, and `DropdownMenuSubContent`. |
| Checkmark, checkbox, and radio selection | **REUSE** the canonical checkbox and radio menu items. Selection state remains workflow-owned. |
| Popover placement and viewport collision | **REUSE** `DropdownMenuContent`'s Radix `side` and `align` API; the Kura content surface clamps to the available viewport and scrolls internally. |
| Keyboard navigation, focus management, Escape, and disabled items | **REUSE** the canonical Radix-backed component and its interaction stories. |
| Search simple and advanced | **REJECT as a dropdown variant**. Search changes the task to authoritative query and selection; use canonical `Autocomplete` or `Combobox`. |
| Integrations | **FEATURE-OWN when required**. It needs authorised integration data, loading, empty, error, and permission rules; there is no generic menu contract to add. |
| Account button, avatar, account-card (xs/sm/md), account breadcrumb | **DOMAIN-ADAPT / REUSE** in `AppShell`. Identity, licence status, workspace context, settings, and sign-out are already workflow-owned there; `Avatar` remains the canonical identity primitive. |
| Unstyled item escape hatch | **REJECT**. It would bypass Kura visual binding and create unsupported local menu styles. |
| Toggle-shaped selection indicator | **REJECT**. The semantic binary preference is already represented by `DropdownMenuCheckboxItem`; a nested toggle would create an unnecessary second interaction model without a confirmed recurring workflow. |

## Responsive and safety contract

The mobile task remains choosing a short secondary action. The menu is fluid,
collision-safe, and internally scrollable from 320px; every item retains the
Kura minimum touch target. Long, searchable, or comparison-critical choices
stay in their owning workflow rather than being hidden in a menu. Stories cover
the canonical mobile reference, a long action list, long Vietnamese and English
content, disabled/permission states, and keyboard operation.

## Outcome

The imported visual family is already represented by the canonical Kura
implementation and Storybook stories. Reusing it avoids a duplicate component
or vendor namespace while preserving Kura ownership, accessibility, density,
mobile behaviour, and clinical-safety boundaries.
