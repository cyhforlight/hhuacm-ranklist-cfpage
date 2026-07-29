import type { CSSProperties, ReactNode } from 'react';
import { EmptyValue } from './EmptyValue';
import { RatingText } from './RatingText';
import type { RankUser, SortableCodeforcesField } from '@/types';
import { formatFullDate, formatRelativeTime, isDormant } from '@/utils/dateUtils';
import { cn } from '@/lib/cn';

export interface RanklistColumn {
  id: string;
  label: string;
  sortKey?: SortableCodeforcesField;
  headerClassName?: string;
  cellClassName?: string;
  style?: CSSProperties;
  render: (user: RankUser, index: number) => ReactNode;
}

function renderOptionalText(value: string | null) {
  return value || <EmptyValue />;
}

function renderDataValue(value: number | null | undefined) {
  return value ?? <EmptyValue />;
}

export const RANKLIST_COLUMNS: RanklistColumn[] = [
  {
    id: 'index',
    label: '序号',
    style: { width: '60px' },
    cellClassName: 'font-medium',
    render: (_user, index) => index + 1,
  },
  {
    id: 'name',
    label: '姓名',
    cellClassName: 'font-medium',
    render: user => user.name,
  },
  {
    id: 'grade',
    label: '年级',
    render: user => renderOptionalText(user.grade),
  },
  {
    id: 'major',
    label: '专业',
    render: user => renderOptionalText(user.major),
  },
  {
    id: 'cf-handle',
    label: 'CF账号',
    render: user => (
      user.cfHandle ? (
        <a
          className={cn(
            'mono-text font-semibold no-underline transition-opacity hover:opacity-80',
            user.codeforces?.rating === null || user.codeforces?.rating === undefined
              ? 'CF_text-gray'
              : undefined,
          )}
          href={`https://codeforces.com/profile/${user.cfHandle}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <RatingText rating={user.codeforces?.rating}>{user.cfHandle}</RatingText>
        </a>
      ) : <EmptyValue />
    ),
  },
  {
    id: 'rating',
    label: 'Rating',
    sortKey: 'rating',
    render: user => <RatingText rating={user.codeforces?.rating} />,
  },
  {
    id: 'max-rating',
    label: '历史最高Rating',
    sortKey: 'maxRating',
    render: user => <RatingText rating={user.codeforces?.maxRating} />,
  },
  {
    id: 'accepted',
    label: 'AC题数',
    sortKey: 'acceptedProblemCount',
    cellClassName: 'mono-text font-semibold',
    render: user => renderDataValue(user.codeforces?.acceptedProblemCount),
  },
  {
    id: 'accepted-month',
    label: '1个月内AC题数',
    sortKey: 'acceptedProblemCountInMonth',
    cellClassName: 'mono-text font-semibold',
    render: user => renderDataValue(user.codeforces?.acceptedProblemCountInMonth),
  },
  {
    id: 'last-online',
    label: '最近活跃时间',
    sortKey: 'lastOnlineTimeSeconds',
    render: user => {
      const lastOnlineTimeSeconds = user.codeforces?.lastOnlineTimeSeconds;
      if (!lastOnlineTimeSeconds) return <EmptyValue />;

      return (
        <span
          className={cn(
            isDormant(lastOnlineTimeSeconds) && 'font-medium text-red-400 dark:text-red-500 dark:opacity-90',
          )}
          title={formatFullDate(lastOnlineTimeSeconds)}
        >
          {formatRelativeTime(lastOnlineTimeSeconds)}
        </span>
      );
    },
  },
];
