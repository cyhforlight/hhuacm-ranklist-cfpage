import { cn } from '@/lib/cn';
import type { RankUser } from '@/types';
import type { RanklistColumn } from './ranklistColumns';

interface UserTableRowProps {
  columns: RanklistColumn[];
  index: number;
  user: RankUser;
}

export function UserTableRow({ columns, index, user }: UserTableRowProps) {
  return (
    <tr className="transition-colors even:bg-slate-100/[0.07] hover:bg-primary/5 dark:hover:bg-blue-900/10 [&:last-child>td]:border-b-0">
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
  );
}
