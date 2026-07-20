import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';

import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from './icons';
import styles from './pagination.module.css';

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export type PaginationProps = HTMLAttributes<HTMLElement> & { label?: string };
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { className, label = 'Pagination', ...props }, ref,
) {
  return <nav ref={ref} aria-label={label} className={joinClasses(styles.root, className)} {...props} />;
});

export type PaginationContentProps = HTMLAttributes<HTMLUListElement>;
export const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(function PaginationContent(
  { className, ...props }, ref,
) {
  return <ul ref={ref} className={joinClasses(styles.content, className)} {...props} />;
});

export type PaginationItemProps = LiHTMLAttributes<HTMLLIElement>;
export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(function PaginationItem(props, ref) {
  return <li ref={ref} {...props} />;
});

export type PaginationLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean };
export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(function PaginationLink(
  { active = false, className, ...props }, ref,
) {
  return <a ref={ref} aria-current={active ? 'page' : undefined} className={joinClasses(styles.link, className)} data-active={active ? 'true' : undefined} {...props} />;
});

export type PaginationPreviousProps = PaginationLinkProps & { label?: ReactNode };
export const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationPreviousProps>(function PaginationPrevious(
  { label = 'Previous', ...props }, ref,
) {
  return <PaginationLink ref={ref} aria-label="Go to previous page" {...props}><ChevronLeftIcon aria-hidden size={16} /><span className={styles.directionLabel}>{label}</span></PaginationLink>;
});

export type PaginationNextProps = PaginationLinkProps & { label?: ReactNode };
export const PaginationNext = forwardRef<HTMLAnchorElement, PaginationNextProps>(function PaginationNext(
  { label = 'Next', ...props }, ref,
) {
  return <PaginationLink ref={ref} aria-label="Go to next page" {...props}><span className={styles.directionLabel}>{label}</span><ChevronRightIcon aria-hidden size={16} /></PaginationLink>;
});

export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;
export function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return <span aria-hidden className={joinClasses(styles.ellipsis, className)} {...props}><MoreHorizontalIcon size={16} /></span>;
}
