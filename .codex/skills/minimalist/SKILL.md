---
name: minimalist
description: Mandatory clarity gate for every piece of Kura content and UI design. Use before writing or changing any user-facing text, component, story, docs page, empty state, error, dialog, table, form, or screen so every element and every word earns its place.
---

# Minimalist

Kura's repository-wide clarity law. Every content change and every UI design change passes this gate before it is considered done.

This skill decides what stays. `design-kura-ui` decides how what stays is built and finished. When they appear to disagree, minimalism removes; it never overrides clinical safety, backend truth, icon authority, or Storybook ownership.

## Scope

The gate applies to:

- UI copy: labels, buttons, headings, helper text, placeholders, tooltips, empty states, errors, confirmations, toasts, accessibility names.
- UI design: every visible element, container, divider, badge, icon, column, metric, and state.
- Storybook: story names, story descriptions, docs prose, governance pages, demo fixtures, panel copy.
- Repository documentation and agent-authored instructions.

## Core rules

- Keep only what directly helps the user move forward.
- Give every element and every word a clear reason to exist.
- Remove anything that does not improve clarity, decision making, confidence, or task completion.
- Check for redundancy before adding anything new.
- Prefer plain human language over clever, vague, robotic, or corporate wording.
- Make every sentence shorter, clearer, and easier to understand.
- Remove UI before adding UI. Reuse an existing pattern before creating a new one.

## Review workflow

1. Name the user's immediate task and the decision they need to make.
2. Audit each visible element and each line of text against the core rules.
3. Remove duplicate, decorative, explanatory, or low-value content.
4. Keep hierarchy simple: one clear primary action, necessary context, visible state, restrained secondary actions.
5. Rewrite the remaining copy shorter, warmer, more specific, more direct.
6. Verify the screen still gives enough context to act with confidence.

## Three-second clarity checklist

Run before and after every simplification:

- What does the user come to this screen to do?
- Is the main action obvious within three seconds?
- Does any element fail to help the user understand, decide, feel confident, or complete the task?
- Are too many buttons competing as primary actions?
- Are primary and secondary information clearly different?
- Does spacing group the right content together?
- Are any borders, cards, shadows, or dividers unnecessary?
- Does the copy sound like a real person?
- Are there technical terms the user does not need to know?
- Should any information move behind progressive disclosure?
- Is color carrying meaning, or is it only decoration?
- Are error, empty, loading, and success states clear?
- Can the UI be scanned quickly without reading every word?
- Would removing twenty percent of the elements make the flow worse?
- Does the user know the next step?

## Copy standards

- Use concrete nouns and active verbs.
- Use labels that describe the action or state clearly.
- Cut filler such as "seamlessly", "effortlessly", "robust", "leverage", "empower", "streamline", "comprehensive", "powerful", "unified", "end-to-end", "at a glance", "one-stop", and "next-generation" unless the word is truly necessary.
- Avoid explaining the interface when the interface can be made clearer.
- Prefer one useful sentence over several soft paragraphs.
- Keep empty states, errors, confirmations, and helper text calm and specific.
- Use sentence case unless a medical or technical convention requires otherwise.
- Write in English unless the user explicitly requests another language.

## What minimalism must never remove

Preserve, even when it costs words or pixels:

- Clinical safety context: patient identity, abnormal and critical findings, allergies, units, reference ranges, amendment and stale-data notices.
- Authority and permission context: who may act, what is blocked, and why.
- Money and legal context: amounts, obligations, consent, audit trail.
- Operational truth: real system state, failure reasons, and honest readiness or prototype disclosure.

If simplification would hide any of these, change the composition instead of deleting the information.

## Related in-repo authority

- Phrasing rules for validation, banners, confirmations, toasts, and safety copy live in `src/components/foundations/content-grammar-reference.tsx`, rendered at `Design System/Foundations`. This gate decides what stays; that page decides how it is phrased. Follow both.
- The ship gate carries a `Minimalist gate passed` row in `src/components/foundations/definition-of-done-reference.tsx`.

## Storybook obligations

- Story descriptions state what the story proves, in one sentence. No feature marketing.
- Docs and governance pages carry decisions and rules, not restated component prose.
- Demo fixtures use realistic clinical content, not filler that hides layout problems.
- A duplicate story that proves nothing new is removed, not renamed.

## Definition of done

A content or UI change is done only when:

- Every remaining element and word survives the core rules.
- The primary action is obvious within three seconds.
- No copy repeats what an adjacent element already says.
- Empty, loading, error, and success states are specific.
- Nothing in the "never remove" list was lost.
- The reduction is verified in rendered output, not only in source.
