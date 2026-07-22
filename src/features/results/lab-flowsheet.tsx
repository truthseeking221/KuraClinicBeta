'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { useT } from '../../components/foundations/i18n';
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateTitle,
} from '../../components/shared/empty-state';
import { Badge } from '../../components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../components/ui/collapsible';
import {
  episodeProgress,
  episodeProgressLabel,
  sectionOutstandingLabel,
  visibleSections,
} from './logic';
import { LabResultRow, type LabResultRowMode } from './lab-result-row';
import type { LabAnalyteResult, LabResultSection } from './types';
import styles from './lab-flowsheet.module.css';

export type LabFlowsheetProps = Omit<ComponentPropsWithoutRef<'article'>, 'children' | 'title'> & {
  title: ReactNode;
  description?: ReactNode;
  sections: LabResultSection[];
  mode?: LabResultRowMode;
  locale?: string;
  showProgress?: boolean;
  renderRowTrailing?: (result: LabAnalyteResult) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function LabFlowsheet({
  className,
  description,
  emptyDescription = 'Released results appear here as soon as the lab makes them available.',
  emptyTitle = 'No reportable results yet',
  locale = 'en-US',
  mode = 'auto',
  renderRowTrailing,
  sections,
  showProgress,
  title,
  ...props
}: LabFlowsheetProps) {
  const t = useT();
  const allResults = sections.flatMap((section) => section.results);
  const renderedSections = visibleSections(sections);
  const progress = episodeProgress(allResults);
  const shouldShowProgress =
    showProgress ?? (progress.status !== 'completed' || progress.unavailable > 0);
  const progressVariant =
    progress.status === 'completed'
      ? progress.unavailable > 0
        ? 'warning'
        : 'success'
      : progress.status === 'cancelled'
        ? 'neutral'
        : 'info';

  return (
    <Card
      {...props}
      className={joinClasses(styles.flowsheet, className)}
      data-slot="lab-flowsheet"
      dividers
      variant="outline"
    >
      <CardHeader className={styles.header}>
        <CardTitle as="h2">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {shouldShowProgress ? (
          <div className={styles.progress} role="status" aria-live="polite">
            <Badge size="sm" variant={progressVariant}>
              {episodeProgressLabel(progress, t)}
            </Badge>
          </div>
        ) : null}
      </CardHeader>

      <div className={styles.body}>
        {renderedSections.map((section) => {
          const sectionProgress = episodeProgress(section.results);
          return (
            <Collapsible key={section.code} className={styles.section} defaultOpen inset="none">
              <CollapsibleTrigger
                className={styles.sectionTrigger}
                headingLevel={3}
                meta={sectionOutstandingLabel(sectionProgress, t)}
              >
                {section.title}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className={styles.rows} role="list">
                  {section.results.map((result) => (
                    <LabResultRow
                      key={`${result.testId}-${result.analyteCode}`}
                      result={result}
                      mode={mode}
                      locale={locale}
                      role="listitem"
                      trailing={renderRowTrailing?.(result)}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}

        {renderedSections.length === 0 ? (
          <EmptyState align="center" surface="plain" className={styles.empty}>
            <EmptyStateHeader>
              <EmptyStateTitle>{t(emptyTitle)}</EmptyStateTitle>
              <EmptyStateDescription>{t(emptyDescription)}</EmptyStateDescription>
            </EmptyStateHeader>
          </EmptyState>
        ) : null}
      </div>
    </Card>
  );
}
