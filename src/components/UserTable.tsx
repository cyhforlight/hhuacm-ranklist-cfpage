import type { CSSProperties } from 'react';
import { getUserRowKey, useRanklistTable } from '../hooks/useRanklistTable';
import { RankUser, SortableCodeforcesField } from '../types';
import { formatRelativeTime, formatFullDate, isDormant } from '../utils/dateUtils';
import { getRatingColorClass } from '../utils/cfUtils';

interface UserTableProps {
  initialUsers: RankUser[];
}

interface TableColumn {
  label: string;
  sortKey?: SortableCodeforcesField;
  className?: string;
  style?: CSSProperties;
}

const TABLE_COLUMNS: TableColumn[] = [
  { label: '序号', className: 'py-3 px-4 text-center', style: { width: '60px' } },
  { label: '姓名', className: 'py-3 px-4 text-center' },
  { label: '年级', className: 'py-3 px-4 text-center' },
  { label: '专业', className: 'py-3 px-4 text-center' },
  { label: 'CF账号', className: 'py-3 px-4 text-center' },
  { label: 'Rating', sortKey: 'rating', className: 'py-3 px-4 text-center' },
  { label: '历史最高Rating', sortKey: 'maxrating', className: 'py-3 px-4 text-center' },
  { label: 'AC题数', sortKey: 'acceptedProblemCount', className: 'py-3 px-4 text-center' },
  { label: '1个月内AC题数', sortKey: 'acceptedProblemCountinMonth', className: 'py-3 px-4 text-center' },
  { label: '最近活跃时间', sortKey: 'lastOnlineTimeSeconds', className: 'py-3 px-4 text-center' },
];

export default function UserTable({ initialUsers }: UserTableProps) {
  const {
    availableGrades,
    displayedUsers,
    hasMoreUsers,
    loadMore,
    getSortClass,
    resetFilters,
    selectedGrades,
    sortBy,
    toggleGradeFilter,
  } = useRanklistTable(initialUsers);

  return (
    <>
      {initialUsers.length > 0 && availableGrades.length > 0 && (
        <div className="filter-container mb-16">
          <div className="flex flex-wrap justify-between items-center ">
            <div className="flex flex-wrap gap-2 items-center ">
              <span className="filter-label mr-3">年级筛选：</span>
              {availableGrades.map(grade => (
                <button
                  key={grade}
                  onClick={() => toggleGradeFilter(grade)}
                  className={`filter-btn ${
                    selectedGrades.includes(grade)
                      ? 'active'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}
                >
                  {grade}
                </button>
              ))}
              {selectedGrades.length > 0 && (
                <button
                  onClick={resetFilters}
                  className="filter-btn bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300"
                >
                  重置
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {initialUsers.length > 0 && (
        <table className="ranklist-table w-full table-auto">
          <thead>
            <tr>
              {TABLE_COLUMNS.map(column => {
                const sortKey = column.sortKey;

                return (
                  <th
                    key={column.label}
                    className={`${column.className ?? ''} ${
                      sortKey ? `cursor-pointer ${getSortClass(sortKey)}` : ''
                    }`}
                    onClick={sortKey ? () => sortBy(sortKey) : undefined}
                    style={column.style}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={getUserRowKey(user, index)} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                <td className="py-3 px-4 font-medium text-center">{index + 1}</td>
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.grade || '—'}</td>
                <td className="py-3 px-4">{user.major || '—'}</td>
                <td className="py-3 px-4">
                  {user.CFHandle ? (
                    <a
                      href={`https://codeforces.com/profile/${user.CFHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${getRatingColorClass(user.CFinfo?.rating)} no-underline hover:opacity-80 transition-all mono-text font-semibold`}
                    >
                      {user.CFHandle}
                    </a>
                  ) : '—'}
                </td>
                <td className={`py-3 px-4 ${getRatingColorClass(user.CFinfo?.rating)} font-semibold mono-text`}>
                  {user.CFinfo?.rating ?? '—'}
                </td>
                <td className={`py-3 px-4 ${getRatingColorClass(user.CFinfo?.maxrating)} font-semibold mono-text`}>
                  {user.CFinfo?.maxrating ?? '—'}
                </td>
                <td className="py-3 px-4 data-value">
                  {user.CFinfo?.acceptedProblemCount ?? '—'}
                </td>
                <td className="py-3 px-4 data-value">
                  {user.CFinfo?.acceptedProblemCountinMonth ?? '—'}
                </td>
                <td className="py-3 px-4">
                  {user.CFinfo?.lastOnlineTimeSeconds ? (
                    <span 
                      title={formatFullDate(user.CFinfo.lastOnlineTimeSeconds)}
                      className={`${isDormant(user.CFinfo.lastOnlineTimeSeconds) ? 'dormant-user' : ''}`}
                    >
                      {formatRelativeTime(user.CFinfo.lastOnlineTimeSeconds)}
                    </span>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {hasMoreUsers && (
        <div className="text-center mt-6 mb-8">
          <button
            onClick={loadMore}
            className="filter-btn bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
          >
            加载更多数据
          </button>
        </div>
      )}
    </>
  );
}
