'use client';

import { useState, useEffect } from 'react';
import { User } from '../types';
import { formatRelativeTime, formatFullDate, isDormant } from '../utils/dateUtils';
import { getRatingColorClass } from '../utils/cfUtils';

interface UserTableProps {
  initialUsers: User[];
}

export default function UserTable({ initialUsers }: UserTableProps) {
  const [users] = useState<User[]>(initialUsers);
  const [filters, setFilters] = useState<{ grades: string[] }>({ grades: [] });
  const [sort, setSort] = useState<{ key: string; order: 'asc' | 'desc' }>({
    key: 'rating',
    order: 'desc'
  });
  const [displayLimit, setDisplayLimit] = useState<number>(50); // 增加显示限制状态

  // 应对显示更多数据
  useEffect(() => {
    const handleLoadMore = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setDisplayLimit(prev => prev + 50);
      }
    };

    window.addEventListener('scroll', handleLoadMore);
    return () => window.removeEventListener('scroll', handleLoadMore);
  }, []);

  // 排序
  const sortBy = (key: string) => {
    setSort(prev => ({
      key,
      order: prev.key === key && prev.order === 'desc' ? 'asc' : 'desc'
    }));
  };

  // 获取排序图标样式
  const getSortClass = (key: string) => {
    const isActive = sort.key === key;
    
    if (!isActive) return '';
    
    return sort.order === 'asc' ? 'active-sort-asc' : 'active-sort-desc';
  };

  // 重置筛选
  const resetFilters = () => {
    setFilters({ grades: [] });
  };

  // 切换年级筛选
  const toggleGradeFilter = (grade: string) => {
    setFilters(prev => {
      if (prev.grades.includes(grade)) {
        return { ...prev, grades: prev.grades.filter(g => g !== grade) };
      } else {
        return { ...prev, grades: [...prev.grades, grade] };
      }
    });
  };

  // 获取可用年级
  const availableGrades = Array.from(
    new Set(users.filter(user => user.grade && user.grade !== '—').map(user => user.grade as string))
  ).sort();

  // 筛选和排序用户
  const filteredAndSortedUsers = (() => {
    // 先筛选
    let result = [...users];
    if (filters.grades.length > 0) {
      result = result.filter(user => user.grade && filters.grades.includes(user.grade));
    }

    // 再排序
    if (sort.key) {
      const key = sort.key;
      const order = sort.order;

      result.sort((a, b) => {
        const aValue = a.CFinfo ? a.CFinfo[key as keyof typeof a.CFinfo] : null;
        const bValue = b.CFinfo ? b.CFinfo[key as keyof typeof b.CFinfo] : null;

        // 处理空值
        const aIsEmpty = aValue === null || aValue === '—' || aValue === undefined;
        const bIsEmpty = bValue === null || bValue === '—' || bValue === undefined;

        // 空值排到最后
        if (aIsEmpty && bIsEmpty) return 0;
        if (aIsEmpty) return 1;
        if (bIsEmpty) return -1;

        // 比较值
        if (aValue! < bValue!) return order === 'asc' ? -1 : 1;
        if (aValue! > bValue!) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  })();

  // 限制显示的用户数量
  const displayedUsers = filteredAndSortedUsers.slice(0, displayLimit);
  const hasMoreUsers = filteredAndSortedUsers.length > displayedUsers.length;

  return (
    <>
      {/* 筛选器组件 - 优化布局，左侧按钮，右侧统计 */}
      {users.length > 0 && availableGrades.length > 0 && (
        <div className="filter-container">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap gap-2 items-center">
              {availableGrades.map(grade => (
                <button
                  key={grade}
                  onClick={() => toggleGradeFilter(grade)}
                  className={`filter-btn ${
                    filters.grades.includes(grade)
                      ? 'active'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}
                >
                  {grade}
                </button>
              ))}
              {filters.grades.length > 0 && (
                <button
                  onClick={resetFilters}
                  className="filter-btn bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300"
                >
                  重置
                </button>
              )}
            </div>
            <div className="text-sm text-text-light">
              显示: {displayedUsers.length} / {filteredAndSortedUsers.length} 位成员
            </div>
          </div>
        </div>
      )}

      {/* 用户表格 - 直接显示表格，不带外层div */}
      {users.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="py-3 px-4 text-center">姓名</th>
              <th className="py-3 px-4 text-center">年级</th>
              <th className="py-3 px-4 text-center">专业</th>
              <th className="py-3 px-4 text-center">CF账号</th>
              <th 
                className={`cursor-pointer py-3 px-4 text-center ${getSortClass('rating')}`}
                onClick={() => sortBy('rating')}
              >
                Rating
              </th>
              <th 
                className={`cursor-pointer py-3 px-4 text-center ${getSortClass('maxrating')}`}
                onClick={() => sortBy('maxrating')}
              >
                历史最高Rating
              </th>
              <th 
                className={`cursor-pointer py-3 px-4 text-center ${getSortClass('acceptedProblemCount')}`}
                onClick={() => sortBy('acceptedProblemCount')}
              >
                AC题数
              </th>
              <th 
                className={`cursor-pointer py-3 px-4 text-center ${getSortClass('acceptedProblemCountinMonth')}`}
                onClick={() => sortBy('acceptedProblemCountinMonth')}
              >
                1个月内AC题数
              </th>
              <th 
                className={`cursor-pointer py-3 px-4 text-center ${getSortClass('lastOnlineTimeSeconds')}`}
                onClick={() => sortBy('lastOnlineTimeSeconds')}
              >
                最近活跃时间
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.grade || '—'}</td>
                <td className="py-3 px-4">{user.major || '—'}</td>
                <td className="py-3 px-4">
                  {user.CFHandle ? (
                    <a
                      href={`https://codeforces.com/profile/${user.CFHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${user.CFinfo && user.CFinfo.rating ? getRatingColorClass(user.CFinfo.rating) : 'text-primary'} no-underline hover:opacity-80 transition-all mono-text font-semibold`}
                    >
                      {user.CFHandle}
                    </a>
                  ) : '—'}
                </td>
                <td className={`py-3 px-4 ${user.CFinfo ? getRatingColorClass(user.CFinfo.rating) : ''} font-semibold mono-text`}>
                  {user.CFinfo?.rating ?? '—'}
                </td>
                <td className={`py-3 px-4 ${user.CFinfo ? getRatingColorClass(user.CFinfo.maxrating) : ''} font-semibold mono-text`}>
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
                      className={`${isDormant(user.CFinfo.lastOnlineTimeSeconds) ? 'text-red-500' : ''}`}
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

      {/* 加载更多按钮 */}
      {hasMoreUsers && (
        <div className="text-center mt-6 mb-8">
          <button 
            onClick={() => setDisplayLimit(prev => prev + 50)}
            className="filter-btn bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
          >
            加载更多数据
          </button>
          <p className="text-xs text-text-light mt-2">
            当前显示 {displayedUsers.length} / {filteredAndSortedUsers.length} 条记录
          </p>
        </div>
      )}
    </>
  );
}