# Latency, Loading, Pending, and Optimistic UI

## 1. Latency is part of interaction

User does not know network, queue or server. They only know whether the product responds or not.

Model:

```text
input
→ acknowledgement
→ processing evidence
→ authoritative result
```

If a step is missing, the user may repeat the action, abandon or misunderstand the state.

## 2. Time bands

The bands below are cognitive orientations, not absolute SLA:

### 0–100ms

Response is felt almost instantaneously. Used for pressed state, local echo, selection.

### 100–400ms

Still feels seamless if acknowledgment is clear.

### 400ms–1s

User begins to notice delay. May need light busy cue.

### 1–10s

Need progress or stage. Keep the user informed and cancel if appropriate.

### Over 10 seconds

Consider background, notification, estimated completion, pause/cancel and where to track.

## 3. Acknowledge before result

Button can be pressed/busy immediately, but cannot be success-confirmed until the source of truth confirms.

For example:

```text
Place order
→ Placing order…
→ Order placed
```

No:

```text
Place order
→ Order placed
→ request fails silently
```

## 4. Loading pattern selection

### Local state change

Do not loader if result is almost instantaneous. Update objects directly.

### Inline busy

Used when a control or section is processing. Do not block the entire page.

### Skeleton

Used when the content structure is known in advance. Skeletons should be close to the actual layout to avoid shifting.

### Determinate progress

Use when total measurement is reliable.

### Stage progress

Used when discrete steps are available.

### Background job

Used when the user can leave. Need job center, notification or persistent status.

### Full-page blocking

Only if the entire context cannot be used safely. State the reason.

## 5. Skeleton principles

* Reflects the real structure, not too strong decorative waves.
* Do not create false content hierarchy.
* Do not repeat distracting animations.
* When content arrives, transition slightly.
* Error replacing skeleton with recovery, no permanent spinner.
* Reduced motion using static skeleton.

## 6. Progress honesty

Do not display 73% if no data is available.

Can be used:

* “Uploading 3 of 8 files.”
* “Validating sample labels.”
* “Waiting for laboratory confirmation.”

Stage-based feedback is more reliable than fake percentage.

## 7. Optimistic UI decision framework

Optimistic update is allowed when:

* Failure rare.
* Action reversible.
* Low Consequence.
* Conflict is easy to resolve.
* User benefit from large instant response.
* UI still shows pending if needed.

Should not be used when:

* Clinical, financial or legal commitment.
* Inventory, booking or high concurrency.
* Permission uncertain.
* Failure causes the user to act based on the wrong state.
* Side effect sent externally.

## 8. Optimistic state vocabulary

Visual distinction:

```text
optimistic-local
syncing
confirmed
failed-to-sync
conflict
```

Favorite low-risk example:

* Icon changed immediately.
* If failed, revert and give a short report.

Example high-risk order:

* Button busy.
* Record pending.
* Only displays placed when the server confirms.

## 9. Autosave

Autosave contract:

```text
dirty
→ debounce
→ saving
→ saved-confirmed
```

Need:

* Dirty state if user leaves before saving.
* Coalesce changes.
* Out-of-order response protection.
* Visible status during high-value work.
* Failure keeps local content.
* Retry.
* Conflict resolution.
* Version or timestamp when relevant.

Don't let "Saved" get stale when the new change is dirty.

## 10. Duplicate actions

Prevent double submission by:

* Immediate busy state.
* Idempotent request if possible.
* Coalesce duplicate events.
* Do not delete the label so the user does not know what action is running.
* Don't ignore silence.

## 11. Cancellation

Long operation should be canceled when:

* Cancel safely.
* User can change his mind.
* Large resource cost.
* Wait is not bounded.

Need to distinguish:

* Cancel request local.
* Request cancellation accepted.
* Operation is too far gone to cancel.

Do not promise to cancel if the backend does not support it.

## 12. Retry

Retry right:

* Hold input.
* Do not create duplicates.
* Indicates the affected object.
* There is backoff when repeated failure.
* Provides an alternative when the error persists.

## 13. Offline

Design:

* Detect and display offline.
* Distinguish between local saved vs synced.
* Queue only if semantics allow.
* Show pending operations.
* Resolve conflicts when reconnecting.
* Don't display final success without syncing.

## 14. Out-of-order responses

Search, autosave and filter may return responses in the wrong order.

Solution:

* Request IDs/version.
* Ignore stale response.
* Cancel previous requests when possible.
* UI state based on latest intent.

## 15. Perceived performance

Improved by:

* Acknowledge ngay.
* Render partial content early.
* Correct Skeleton structure.
* Reasonable preload.
* Preserve previous data during refetch.
* Optimistic only when safe.
* Do not use long animations to hide real latency.

## 16. Acceptance tests

1. Acknowledgement in the appropriate band.
2. Pending is not the same as confirmed.
3. Slow network has progress.
4. Double submit does not create duplicates.
5. Out-of-order response does not overwrite latest intent.
6. Offline status is clear.
7. Autosave failure keeps content.
8. Cancel semantics are actually correct.
9. R3–R4 are not optimistic-final.
10. Background job has a place to track.
