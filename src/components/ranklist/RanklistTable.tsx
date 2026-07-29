import { cn } from '@/lib/cn';
import type { SortableCodeforcesField, SortOrder, RankUser } from '@/types';
import { SortableHeaderCell } from './SortableHeaderCell';
import type { RanklistColumn } from './ranklistColumns';

interface RanklistTableProps {
  columns: RanklistColumn[];
  getSortOrder: (key: SortableCodeforcesField) => SortOrder | null;
  onSort: (key: SortableCodeforcesField) => void;
  users: RankUser[];
}

function getUserRowKey(user: RankUser, index: number): string {
  return user.CFHandle ?? `${user.name}-${user.grade ?? 'unknown'}-${user.major ?? 'unknown'}-${index}`;
}

export function RanklistTable({
  columns,
  getSortOrder,
  onSort,
  users,
}: RanklistTableProps) {
  return (
    <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl border border-border bg-[var(--card-bg)] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] backdrop-blur-md">
      <thead className="sticky top-0 z-10 bg-[var(--header-bg)] backdrop-blur-md">
        <tr>
          {columns.map(column => (
            <SortableHeaderCell
              key={column.id}
              className={column.headerClassName}
              label={column.label}
              onSort={onSort}
              sortKey={column.sortKey}
              sortOrder={column.sortKey ? getSortOrder(column.sortKey) : null}
              style={column.style}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={getUserRowKey(user, index)}
            className="transition-colors even:bg-slate-100/[0.07] hover:bg-primary/5 dark:hover:bg-blue-900/10 [&:last-child>td]:border-b-0"
          >
            {columns.map(column => (
              <td
                key={column.id}
                className={cn(
                  'whitespace-nowrap border-b border-border px-3 py-4 text-center text-base',
                  column.cellClassName,
                )}
              >
                {column.render(user, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
