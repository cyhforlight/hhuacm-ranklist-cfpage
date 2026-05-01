import { getUserRowKey } from '@/hooks/useRanklistTable';
import type { SortableCodeforcesField, SortOrder, RankUser } from '@/types';
import { SortableHeaderCell } from './SortableHeaderCell';
import { UserTableRow } from './UserTableRow';
import type { RanklistColumn } from './ranklistColumns';

interface RanklistTableProps {
  columns: RanklistColumn[];
  getSortOrder: (key: SortableCodeforcesField) => SortOrder | null;
  onSort: (key: SortableCodeforcesField) => void;
  users: RankUser[];
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
          <UserTableRow
            key={getUserRowKey(user, index)}
            columns={columns}
            index={index}
            user={user}
          />
        ))}
      </tbody>
    </table>
  );
}
