"use client";

import { useEffect, useState } from "react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Radio,
  RadioGroup,
} from "../../components/ui";

import { AuthShell } from "./auth-shell";
import { initialBranchId, nextAfterWorkspace, resolveGateEntry } from "./logic";
import type { GateBranch, GateWorkspace } from "./logic";
import styles from "./workspace-gate.module.css";

export type WorkspaceGateStatus = "ready" | "loading" | "error";

export type WorkspaceGateProps = {
  workspaces: readonly GateWorkspace[];
  branches?: readonly GateBranch[];
  lastActiveWorkspaceId?: string | null;
  lastActiveBranchId?: string | null;
  status?: WorkspaceGateStatus;
  onEnter: (workspaceId: string, branchId?: string) => void;
  onCreateWorkspace: (name: string) => void;
  onRetry?: () => void;
  /** Story hook: render the list even for one workspace instead of auto-entering. */
  disableAutoEnter?: boolean;
};

type Stage =
  | { kind: "list" }
  | { kind: "create" }
  | { kind: "branches"; workspace: GateWorkspace };

/**
 * Post-auth workspace entry. Zero workspaces opens create; one enters
 * directly; several list with last-active first. Branch choice appears only
 * for workspaces that run branches. Switching context later reuses this
 * surface from the account menu.
 */
export function WorkspaceGate({
  branches = [],
  disableAutoEnter = false,
  lastActiveBranchId = null,
  lastActiveWorkspaceId = null,
  onCreateWorkspace,
  onEnter,
  onRetry,
  status = "ready",
  workspaces,
}: WorkspaceGateProps) {
  const entry = resolveGateEntry(workspaces, lastActiveWorkspaceId);
  const [stage, setStage] = useState<Stage>(() => {
    if (entry.kind === "create") return { kind: "create" };
    if (entry.kind === "auto" && !disableAutoEnter) {
      return nextAfterWorkspace(entry.workspace) === "branches"
        ? { kind: "branches", workspace: entry.workspace }
        : { kind: "list" };
    }
    return { kind: "list" };
  });
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(() =>
    initialBranchId(branches, lastActiveBranchId),
  );

  // A single branch-less workspace enters directly — the gate never shows.
  const autoEnterId =
    status === "ready" &&
    !disableAutoEnter &&
    entry.kind === "auto" &&
    nextAfterWorkspace(entry.workspace) === "enter"
      ? entry.workspace.workspaceId
      : null;

  useEffect(() => {
    if (autoEnterId) onEnter(autoEnterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per resolved target
  }, [autoEnterId]);

  function pickWorkspace(workspace: GateWorkspace) {
    if (nextAfterWorkspace(workspace) === "branches") {
      setBranchId(initialBranchId(branches, lastActiveBranchId));
      setStage({ kind: "branches", workspace });
    } else {
      onEnter(workspace.workspaceId);
    }
  }

  function submitCreate() {
    const trimmed = newName.trim();
    if (!trimmed) {
      setNameError("Name the workspace to continue.");
      return;
    }
    setNameError(null);
    onCreateWorkspace(trimmed);
  }

  return (
    <AuthShell width="md">
      <Card as="section" aria-label="Choose a workspace">
        <CardContent className={styles.body}>
          {status === "loading" ? (
            <p aria-live="polite" className={styles.pending} role="status">
              Loading your workspaces…
            </p>
          ) : null}

          {status === "error" ? (
            <Alert tone="danger">
              <AlertTitle>Couldn&apos;t load your workspaces</AlertTitle>
              <AlertDescription>
                Nothing was changed — try again.
              </AlertDescription>
              {onRetry ? (
                <AlertAction>
                  <Button onClick={onRetry} size="sm" variant="outline">
                    Retry
                  </Button>
                </AlertAction>
              ) : null}
            </Alert>
          ) : null}

          {status === "ready" && stage.kind === "list" ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.title}>Choose a workspace</h1>
                <p className={styles.subtitle}>
                  You belong to {workspaces.length}{" "}
                  {workspaces.length === 1 ? "workspace" : "workspaces"}.
                </p>
              </header>
              <ul className={styles.list}>
                {workspaces.map((workspace) => (
                  <li key={workspace.workspaceId}>
                    <button
                      className={styles.row}
                      onClick={() => pickWorkspace(workspace)}
                      type="button"
                    >
                      <span aria-hidden="true" className={styles.avatar}>
                        {workspace.name.slice(0, 1)}
                      </span>
                      <span className={styles.rowText}>
                        <span className={styles.rowName}>{workspace.name}</span>
                        <span className={styles.rowMeta}>
                          {workspace.memberCount}{" "}
                          {workspace.memberCount === 1 ? "member" : "members"} ·{" "}
                          {workspace.role}
                          {workspace.branchesEnabled ? " · Branches" : ""}
                        </span>
                      </span>
                      {workspace.workspaceId === lastActiveWorkspaceId ? (
                        <Badge variant="primary">Last active</Badge>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                className={styles.inlineStart}
                onClick={() => setStage({ kind: "create" })}
                variant="ghost"
              >
                Create a new workspace
              </Button>
            </>
          ) : null}

          {status === "ready" && stage.kind === "create" ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.title}>Create your workspace</h1>
                <p className={styles.subtitle}>
                  Patients, orders, and your team live inside it.
                </p>
              </header>
              <Input
                error={nameError}
                label="Workspace name"
                onChange={(event) => {
                  setNewName(event.target.value);
                  setNameError(null);
                }}
                placeholder="Sunrise Clinic"
                required
                value={newName}
              />
              <div className={styles.actionRow}>
                {workspaces.length > 0 ? (
                  <Button
                    onClick={() => setStage({ kind: "list" })}
                    variant="ghost"
                  >
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                <Button onClick={submitCreate} variant="primary">
                  Create workspace
                </Button>
              </div>
            </>
          ) : null}

          {status === "ready" && stage.kind === "branches" ? (
            <>
              <header className={styles.header}>
                <h1 className={styles.title}>{stage.workspace.name}</h1>
                <p className={styles.subtitle}>
                  Choose the branch you&apos;re working at.
                </p>
              </header>
              <RadioGroup
                legend="Branch"
                name="gate-branch"
                onValueChange={setBranchId}
                value={branchId ?? ""}
              >
                {branches.map((branch) => (
                  <Radio
                    helpText={branch.isDefault ? "Default branch" : undefined}
                    key={branch.branchId}
                    value={branch.branchId}
                  >
                    {branch.name}
                    {branch.branchId === lastActiveBranchId
                      ? " · last active"
                      : ""}
                  </Radio>
                ))}
              </RadioGroup>
              <div className={styles.actionRow}>
                {workspaces.length > 1 ? (
                  <Button
                    onClick={() => setStage({ kind: "list" })}
                    variant="ghost"
                  >
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                <Button
                  disabled={branchId === null}
                  onClick={() =>
                    branchId && onEnter(stage.workspace.workspaceId, branchId)
                  }
                  variant="primary"
                >
                  Enter workspace
                </Button>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </AuthShell>
  );
}
