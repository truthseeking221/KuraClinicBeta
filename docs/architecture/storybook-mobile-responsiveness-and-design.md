# Storybook mobile responsiveness and mobile design

This policy follows the Storybook reuse and component intake policy. It makes
mobile responsiveness part of every reusable component contract rather than a
page-level patch or a late visual check.

The principles synthesize guidance from *Designing for Touch*, *Refactoring
UI*, *Laws of UX*, *Designing with the Mind in Mind*, *The Design of Everyday
Things*, *Universal Principles of Typography*, and *Design Systems*.

## Contents

1. [Core principle](#core-principle)
2. [Responsive contract and composition](#responsive-contract-and-composition)
3. [Touch and interaction](#touch-and-interaction)
4. [Forms, overlays, and dense data](#forms-overlays-and-dense-data)
5. [Content, accessibility, and layout resilience](#content-accessibility-and-layout-resilience)
6. [States, performance, Storybook, and testing](#states-performance-storybook-and-testing)
7. [Proactive clarification](#47-proactive-clarification)
8. [Required mobile component intake questions](#required-mobile-component-intake-questions)
9. [Mobile definition of done](#mobile-definition-of-done)
10. [Final rule](#final-rule)

## Core principle

Every reusable Kura Storybook component must be responsive, usable on mobile,
and safe for touch. Mobile responsiveness is part of the component contract.
It is not a page-level patch, later optimization, separate post-desktop
variant, consumer-only responsibility, or final visual check.

A component is incomplete when it works only on desktop. It must remain
understandable, operable, accessible, and visually coherent across every
supported width, input method, orientation, text size, and realistic content
condition.

## Responsive contract and composition

### 1. Mobile is not a smaller desktop

Do not proportionally shrink desktop composition. Preserve the task, but allow
information hierarchy, reading order, layout direction, action placement,
interaction pattern, disclosure, density, navigation, data presentation, and
confirmation flow to transform.

### 2. Design mobile first

Start around 390–400px. Define the primary mobile task, design the smallest
useful version, validate touch and realistic content, then expand. Introduce
columns only when they improve usability and verify that desktop additions do
not weaken mobile.

### 3. Start with the task, not the mobile shell

Determine what users must understand, decide, and do; what information the
action requires; what is secondary; and what must never be hidden. Only then
choose a drawer, sheet, card, toolbar, accordion, or other presentation.

### 4. Responsive behavior belongs to the component

Define minimum usable, preferred, and maximum useful width; wrapping,
stacking, alignment, priority, action movement, overflow, truncation,
expansion, and interaction transformation. A component that repeatedly needs
page-specific repair is not properly responsive.

### 5. Respond to available space, not device labels

Do not equate small with touch-only, wide with mouse-only, tablet with one
pixel width, mobile with portrait, or desktop with hover. Base decisions on
available component width, content pressure, input capability, interaction
context, and ergonomics.

### 6. Use content-based breakpoints

Introduce a breakpoint when content or behavior fails: ambiguous wrapping,
crowded actions, unusable columns, colliding targets, lost comparison,
detached labels, critical truncation, unclear reading order, overflow, or
collapsed hierarchy. Do not add breakpoints merely to match popular devices.

### 7. Reflow before shrinking

Prefer wrap, stack, reorder, group, move secondary actions, progressively
disclose, transform the pattern, or use controlled scrolling. Do not first
shrink body text, controls, touch areas, labels, spacing, or critical content.

### 8. Do not scale everything proportionally

Evaluate heading and body type, line height, padding, gaps, icons, controls,
images, and container width independently at each responsive state. Responsive
design is not browser zoom.

### 9. Preserve the primary task

Keep the main purpose, most important information, primary action, safety and
status information, and next step obvious at every width. Secondary content
may move or collapse; primary content may not disappear because space is
limited.

### 10. Use progressive disclosure deliberately

Show decision-critical information, current status, primary action, safety
information, and frequent supporting actions first. Use reversible disclosure
for secondary content. Never hide information that must be compared or any
clinical risk, allergy, interaction, abnormal result, critical status, patient
identity, or action consequence.

### 11. Protect visual hierarchy on mobile

Do not stack every desktop region with equal weight. Redesign the vertical
order to reveal what comes first, what belongs together, which values and
statuses matter, what action comes next, and what is supporting detail. Use
spacing, type, contrast, position, grouping, surfaces, and necessary dividers.

### 12. Use the Kura mobile spacing system

Do not invent tighter one-off values for mobile. Compact spacing must remain a
canonical token and preserve touch separation, readability, rhythm, grouping,
and error prevention. Inner spacing must remain smaller than spacing between
groups.

## Touch and interaction

### 13. Use a minimum 44×44px touch target

Every interactive hit area must be at least 44×44px. Give small icons invisible
padding, include checkbox and radio labels in their hit areas, and use larger
targets for critical actions when possible. Never reduce a hit area to preserve
a desktop layout.

### 14. Prevent accidental touches

Separate adjacent or high-consequence controls, especially destructive versus
primary actions. Use physical distance, larger targets, safer placement, undo,
confirmation, or deliberate friction according to risk.

### 15. Design for thumb reach

Place frequent actions within comfortable reach when platform and workflow
allow. Consider both hands, large phones, browser chrome, OS gesture zones,
safe areas, keyboard obstruction, action risk, and whether content must remain
visible. Do not place everything at the bottom by convention alone.

### 16. Keep content visible during touch

Do not let the finger obscure critical feedback, labels, previews, results, or
selected values. Show drag and slider feedback away from the touch point, keep
validation visible above the keyboard, and preserve visible cause and effect.

### 17. Never depend on hover

Hover may enhance but may not be the only way to discover an action, label,
information, menu, status, error, or required control. Provide an equivalent
tap, focus, visible-control, keyboard, and accessible-disclosure path.

### 18. Use familiar mobile conventions

Reuse established Kura and platform patterns for back and close behavior,
search, tabs, forms, dates, drawers, scrolling, selection, save, and cancel.
Do not invent gestures or navigation when a familiar pattern solves the task.

### 19. Give gestures visible alternatives

Essential functionality may not depend on an invisible gesture. Define its
discovery, visible control, keyboard and screen-reader path, platform conflict,
reversibility, and accidental-activation risk. Use gestures as accelerators.

## Forms, overlays, and dense data

### 20. Keep mobile forms ruthlessly focused

For every field, ask whether it is required, already known, defaultable,
selectable, autofillable, derivable, combinable, or deferrable. Do not make
users type information the system can supply safely.

### 21. Use the correct mobile input

Use appropriate input modes and controls for numbers, telephone, email, dates,
times, search, small ranges, short choices, and long searchable lists. Avoid
unnecessary keyboard switching and long dropdowns when typeahead or direct
selection is faster.

### 22. Use one-column mobile forms by default

Use multiple columns only for obvious compact pairs that remain readable,
touchable, keyboard-safe, and usable at the narrowest width. Do not place
unrelated fields side by side merely to shorten the page.

### 23. Make mobile dialogs fit the viewport

Choose a full-screen view, bottom sheet, drawer, inline expansion, or short
dialog according to the task. Respect the visible viewport, safe areas,
keyboard, scrolling, close path, focus trap and restoration, background
blocking, action visibility, and draft preservation. Never nest dialogs.

### 24. Give popovers a mobile transformation

Define a bottom sheet, drawer, full-screen selector, inline disclosure, or
collision-safe anchored menu. Preserve purpose, options, selection,
permissions, and outcome. Never render outside the viewport.

### 25. Keep essential information out of tooltips

Required instructions, definitions, safety details, and errors must be visible
or available through a clearly labeled accessible disclosure near the related
data. The component must remain understandable without its tooltip.

### 26. Define an explicit mobile table strategy

Do not automatically convert tables to cards. Determine whether users must
scan, compare, sort, select, review relationships, batch-act, or inspect one
record. Prioritize columns, disclose secondary fields, use detail views,
preserve identifiers and selection, or use controlled horizontal scrolling
when the tabular relationship matters. Never hide clinical data merely to
avoid scrolling.

### 27. Never truncate clinical data ambiguously

Protect medication names, dosage, allergies, diagnoses, result labels,
abnormal explanations, patient identifiers, warnings, follow-up instructions,
and notes. If truncation is unavoidable, preserve the distinguishing part,
show that truncation occurred, provide an immediate non-hover full view, and
keep the complete value accessible to assistive technology.

## Content, accessibility, and layout resilience

### 28. Wrap long and realistic content safely

Test long names and labels, multiple lines, Vietnamese diacritics, long English
words, large and small numeric values, multiple statuses, missing data, and
translations. Text may not escape, overlap actions or icons, break grouping,
become unreadably narrow, or cause hidden page overflow.

### 29. Design typography for mobile reading

Preserve legibility, hierarchy, line height, label/value distinction,
contrast, scanning, and zoom. Large headings may reduce more than body text;
small interface text must not become lighter merely to reduce emphasis.

### 30. Do not disable zoom

Never disable pinch zoom to preserve composition, hide defects, prevent
movement, or change interaction timing. Users must be able to magnify content.

### 31. Support text enlargement

At browser zoom and increased OS text size, text must wrap, controls may grow,
labels must stay connected, actions must remain reachable, and content may not
overlap or disappear. Ordinary text content must not create horizontal page
scrolling.

### 32. Avoid unnecessary fixed heights

Prefer minimum height, content-driven height, flexible padding, expandable
regions, and controlled maximum height only for intentional scroll areas. Use
fixed height only when the function requires a stable physical region.

### 33. Prevent uncontrolled horizontal overflow

The page must not scroll horizontally at mobile widths. Constrain intentional
horizontal scrolling to a visible, keyboard-accessible table, code block,
timeline, chart, comparison surface, or obvious horizontal list with a
task-based reason.

### 34. Keep mobile actions reachable

Long content, keyboard, browser controls, safe areas, internal scrolling,
sticky headers, overlays, and orientation must not block primary actions. A
sticky action region must respect browser chrome and safe-area insets, avoid
covering content and fields, and include sufficient bottom padding.

### 35. Preserve state during responsive transformation

Do not lose selection, drafts, scroll position, disclosure, filters, sorting,
tabs, validation, focus, or pending actions during resize, rotation, keyboard
open, or layout transformation. A responsive change is not a workflow restart.

### 36. Support portrait and landscape

Test both orientations. Account for reduced vertical space, keyboard
obstruction, toolbar crowding, wide lines, modal overflow, and sticky-region
conflicts. Landscape may require reduced chrome, different overlays, changed
scroll regions, or repositioned actions.

## States, performance, Storybook, and testing

### 37. Design all mobile states

Provide applicable mobile stories for default, loading, empty, error, warning,
critical, success, disabled, read-only, selected, expanded, long and missing
content, permission denial, offline, partial data, unsaved changes, keyboard
open, visible validation, multiple actions, and maximum item count.

### 38. Remove useless controls from responsive empty states

When no content exists, remove filters, sorting, pagination, selection, and
actions that cannot work. Explain why the area is empty, whether it is
expected, what users can do, the recommended action, and whether data is still
loading or unavailable.

### 39. Keep responsive motion fast and optional

Use motion only to explain reorder, expansion, drawer or overlay movement,
state change, and cause and effect. It must not delay access, block
interaction, cause sickness, stress hardware, hide instability, or repeatedly
animate routine content. Respect reduced motion.

### 40. Treat mobile performance as responsiveness

Optimize initial render, feedback, images, large lists, charts, animation,
fetching states, and input responsiveness. Acknowledge taps immediately even
when the underlying action takes longer.

### 41. Use real mobile content in Storybook

Use realistic Kura terminology, long patient, clinician, and clinic names,
diagnoses, medications, dosage, abnormal values, multiple statuses,
Vietnamese and English content, missing values, large numbers, small decimals,
and long timestamps. Short placeholders do not prove responsiveness.

### 42. Require official mobile stories

Every reusable component must include mobile default, narrow, long-content,
interactive, and relevant error or empty stories, plus tablet and desktop.
Complex components must also cover portrait, landscape, keyboard open, large
text, maximum data, touch, reduced motion, loading, permission restriction,
and clinical warning or critical states. Do not rely only on manual viewport
switching.

### 43. Test required responsive widths

Test at 320, 360, 390, 412, 480, 768, 1024px, and a standard desktop width.
Also drag continuously between widths to expose failures between presets.

### 44. Run mobile interaction tests

Verify tap access, no hover dependency, logical focus and keyboard operation,
screen-reader names, non-overlapping targets, safe scrolling and dragging,
safe overlay dismissal, protected destructive actions, keyboard visibility,
recoverable errors, stable loading, and state preservation through orientation
changes.

### 45. Run responsive visual tests

At every required width, verify no overlap, clipping, unexplained truncation,
page overflow, unreachable action, detached label, undersized target, lost
status, missing critical content, image distortion, false empty gap, sticky
coverage, broken radius or border, or clipped focus outline.

### 46. Document the responsive classification

Classify each complex component with one or more strategies and explain why:

- `FLUID`: scales within minimum and maximum constraints;
- `WRAPPING`: internal items wrap without losing order or meaning;
- `STACKING`: horizontal regions become vertical;
- `REORDERING`: mobile reading order changes by priority;
- `COLLAPSING`: secondary content becomes progressively disclosed;
- `TRANSFORMING`: the pattern changes, such as popover to sheet;
- `SCROLLING`: a defined region scrolls to preserve relationships;
- `FIXED`: dimensions remain stable because scaling would damage function.

A fixed component must still fit or provide a safe mobile alternative.

### 47. Proactive clarification

Ask focused questions when answers materially affect persistent visibility,
primary actions, data comparison, horizontal scrolling, table transformation,
progressive disclosure, sticky actions, clinical sensitivity, browser versus
native context, workflow parity, offline behavior, or one-handed use. Explain
why the answer changes structure or safety. Do not ask about ordinary spacing
or wrapping already governed by Kura tokens and patterns.

## Required mobile component intake questions

Before accepting a reusable component into Storybook, answer:

1. What is its primary mobile task?
2. What information must always remain visible?
3. What can be progressively disclosed?
4. What is the narrowest usable width?
5. How do internal elements wrap?
6. When does the layout stack?
7. Does the reading order change?
8. Where does the primary action move?
9. What happens when the keyboard opens?
10. Does any behavior depend on hover?
11. Are all targets at least 44×44px?
12. Can any action be triggered accidentally?
13. How does it handle long content?
14. How does it handle enlarged text?
15. How does it behave in landscape?
16. Does it create horizontal overflow?
17. How does it handle loading, empty, and error states?
18. What happens to focus and selection during resize?
19. Which official stories prove mobile quality?
20. Was it tested with realistic Kura content?

If these questions cannot be answered, the component is not ready for
Storybook.

## Mobile definition of done

A reusable component is mobile-complete only when:

1. it was designed mobile first;
2. purpose and hierarchy survive every supported width;
3. the primary action stays reachable;
4. safety and clinical information remain visible;
5. touch, keyboard, and assistive technology work;
6. no essential behavior depends on hover;
7. targets are at least 44×44px and safely separated;
8. realistic long content, enlargement, and zoom work;
9. portrait, landscape, and keyboard-open layouts work;
10. no unintended overflow, clipping, collision, or overlap remains;
11. state survives resize and orientation changes;
12. dialogs and overlays fit the viewport;
13. dense data has an explicit mobile strategy;
14. official mobile stories cover relevant states and real Kura content;
15. required width, visual, touch, accessibility, and performance tests pass;
16. unresolved material behavior has been clarified.

No reusable component may be marked complete, approved, or production-ready
until its official mobile stories and responsive tests pass.

## Final rule

Never ask:

> How can the desktop component be made to fit on mobile?

Always ask:

> What form should this component take so that the Kura user can complete the
> same task clearly, safely, and comfortably on a mobile device?
