import { Button } from '@/components/ui/Button';
import { FilterBar } from '@/components/ranklist/FilterBar';
import { RanklistTable } from '@/components/ranklist/RanklistTable';
import { RANKLIST_COLUMNS } from '@/components/ranklist/ranklistColumns';
import { useRanklistTable } from '@/hooks/useRanklistTable';
import type { RankUser } from '@/types';

interface UserTableProps {
  initialUsers: RankUser[];
}

export default function UserTable({ initialUsers }: UserTableProps) {
  const {
    availableGrades,
    displayedUsers,
    getSortOrder,
    hasMoreUsers,
    loadMore,
    resetFilters,
    selectedGrades,
    sortBy,
    toggleGradeFilter,
  } = useRanklistTable(initialUsers);

  return (
    <>
      <FilterBar
        availableGrades={availableGrades}
        onReset={resetFilters}
        onToggleGrade={toggleGradeFilter}
        selectedGrades={selectedGrades}
      />

      <div className="overflow-x-auto">
        <RanklistTable
          columns={RANKLIST_COLUMNS}
          getSortOrder={getSortOrder}
          onSort={sortBy}
          users={displayedUsers}
        />
      </div>

      {hasMoreUsers && (
        <div className="text-center mt-6 mb-8">
          <Button onClick={loadMore} size="md" variant="subtle">
            加载更多数据
          </Button>
        </div>
      )}
    </>
  );
}
