import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DISPLAY_INCREMENT, INITIAL_DISPLAY_LIMIT } from '../config/ranklist';
import { RankUser, SortableCodeforcesField, SortOrder } from '../types';

interface RanklistSort {
  key: SortableCodeforcesField;
  order: SortOrder;
}

function compareNullableNumbers(
  aValue: number | null | undefined,
  bValue: number | null | undefined,
  order: SortOrder,
): number {
  const aIsEmpty = aValue === null || aValue === undefined;
  const bIsEmpty = bValue === null || bValue === undefined;

  if (aIsEmpty && bIsEmpty) return 0;
  if (aIsEmpty) return 1;
  if (bIsEmpty) return -1;

  if (aValue < bValue) return order === 'asc' ? -1 : 1;
  if (aValue > bValue) return order === 'asc' ? 1 : -1;
  return 0;
}

export function getUserRowKey(user: RankUser, index: number): string {
  return user.CFHandle ?? `${user.name}-${user.grade ?? 'unknown'}-${user.major ?? 'unknown'}-${index}`;
}

export function useRanklistTable(users: RankUser[]) {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [sort, setSort] = useState<RanklistSort>({
    key: 'rating',
    order: 'desc',
  });
  const [displayLimit, setDisplayLimit] = useState<number>(INITIAL_DISPLAY_LIMIT);
  const lastScrollLoadAt = useRef(0);

  const availableGrades = useMemo(
    () => Array.from(new Set(users.map(user => user.grade).filter((grade): grade is string => Boolean(grade)))).sort(),
    [users],
  );

  const filteredAndSortedUsers = useMemo(() => {
    const gradeSet = new Set(selectedGrades);
    const filteredUsers = gradeSet.size > 0 ? users.filter(user => user.grade && gradeSet.has(user.grade)) : users;

    return [...filteredUsers].sort((a, b) => {
      const aValue = a.CFinfo?.[sort.key];
      const bValue = b.CFinfo?.[sort.key];

      return compareNullableNumbers(aValue, bValue, sort.order);
    });
  }, [selectedGrades, sort.key, sort.order, users]);

  const displayedUsers = useMemo(
    () => filteredAndSortedUsers.slice(0, displayLimit),
    [displayLimit, filteredAndSortedUsers],
  );

  const hasMoreUsers = filteredAndSortedUsers.length > displayedUsers.length;

  const loadMore = useCallback(() => {
    setDisplayLimit(prevLimit => (
      prevLimit < filteredAndSortedUsers.length ? prevLimit + DISPLAY_INCREMENT : prevLimit
    ));
  }, [filteredAndSortedUsers.length]);

  useEffect(() => {
    const handleLoadMore = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (!isNearBottom) return;

      const now = Date.now();
      if (now - lastScrollLoadAt.current < 150) return;

      lastScrollLoadAt.current = now;
      loadMore();
    };

    window.addEventListener('scroll', handleLoadMore, { passive: true });
    return () => window.removeEventListener('scroll', handleLoadMore);
  }, [loadMore]);

  const sortBy = useCallback((key: SortableCodeforcesField) => {
    setSort(prev => ({
      key,
      order: prev.key === key && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  const getSortClass = useCallback(
    (key: SortableCodeforcesField) => {
      if (sort.key !== key) return '';

      return sort.order === 'asc' ? 'active-sort-asc' : 'active-sort-desc';
    },
    [sort.key, sort.order],
  );

  const resetFilters = useCallback(() => {
    setSelectedGrades([]);
  }, []);

  const toggleGradeFilter = useCallback((grade: string) => {
    setSelectedGrades(prev => (
      prev.includes(grade)
        ? prev.filter(selectedGrade => selectedGrade !== grade)
        : [...prev, grade]
    ));
  }, []);

  return {
    availableGrades,
    displayedUsers,
    getSortClass,
    hasMoreUsers,
    loadMore,
    resetFilters,
    selectedGrades,
    sortBy,
    toggleGradeFilter,
  };
}
