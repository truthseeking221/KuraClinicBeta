type StoryPlaceholderProps = {
  catalog: string;
  section: string;
};

export function StoryPlaceholder({
  catalog,
  section,
}: StoryPlaceholderProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground sm:p-10">
      <section className="w-full max-w-2xl rounded-[var(--radius-card-surface)] border bg-card p-7 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {catalog}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          {section}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Storybook structure is in place. This node is intentionally a
          placeholder until its workflow, fixtures, and states are defined.
        </p>
        <div className="mt-8 rounded-lg border bg-muted p-4 text-sm text-muted-foreground">
          Content deferred · taxonomy and ownership first
        </div>
      </section>
    </main>
  );
}
