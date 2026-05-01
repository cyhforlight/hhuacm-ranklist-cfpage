import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';
import type { SortableCodeforcesField, SortOrder } from '@/types';

type SortDirection = SortOrder | null;

interface SortableHeaderCellProps {
  label: string;
  sortKey?: SortableCodeforcesField;
  sortOrder: SortDirection;
  className?: string;
  style?: CSSProperties;
  onSort: (key: SortableCodeforcesField) => void;
}

function SortIcon({ sortOrder }: { sortOrder: SortDirection }) {
  const path = sortOrder === 'asc'
    ? 'M12 19V5M5 12l7-7 7 7'
    : 'M12 5v14M19 12l-7 7-7-7';

  return (
    <svg
      aria-hidden="true"
      className={cn('h-4 w-4 shrink-0 opacity-50', sortOrder && 'opacity-100')}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </svg>
  );
}

export function SortableHeaderCell({
  label,
  sortKey,
  sortOrder,
  className,
  style,
  onSort,
}: SortableHeaderCellProps) {
  const ariaSort = sortKey
    ? sortOrder === 'asc'
      ? 'ascending'
      : sortOrder === 'desc'
        ? 'descending'
        : 'none'
    : undefined;

  return (
    <th
      aria-sort={ariaSort}
      className={cn(
        'relative whitespace-nowrap border-b border-border px-3 py-4 text-center text-base font-medium text-text-light first:rounded-tl-xl last:rounded-tr-xl',
        sortOrder && 'bg-primary/15 text-foreground',
        className,
      )}
      scope="col"
      style={style}
    >
      {sortKey ? (
        <button
          className="inline-flex w-full items-center justify-center gap-2 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          onClick={() => onSort(sortKey)}
          type="button"
        >
          <span>{label}</span>
          <SortIcon sortOrder={sortOrder} />
        </button>
      ) : (
        label
      )}
    </th>
  );
}
