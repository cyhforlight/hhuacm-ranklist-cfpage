import { Button } from '@/components/ui/Button';
import { FilterChip } from './FilterChip';

interface FilterBarProps {
  availableGrades: string[];
  selectedGrades: string[];
  onReset: () => void;
  onToggleGrade: (grade: string) => void;
}

export function FilterBar({
  availableGrades,
  selectedGrades,
  onReset,
  onToggleGrade,
}: FilterBarProps) {
  if (availableGrades.length === 0) return null;

  return (
    <section
      className="mb-12 rounded-xl border border-border bg-[var(--card-bg)] px-5 py-3 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] backdrop-blur-md"
      aria-label="年级筛选"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="relative mr-3 pr-4 text-lg font-semibold tracking-normal text-foreground/85 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-[70%] after:rounded after:bg-primary-light after:opacity-50 after:content-['']">
          年级筛选：
        </span>
        {availableGrades.map(grade => (
          <FilterChip
            key={grade}
            grade={grade}
            isSelected={selectedGrades.includes(grade)}
            onToggle={onToggleGrade}
          />
        ))}
        {selectedGrades.length > 0 && (
          <Button onClick={onReset} variant="danger">
            重置
          </Button>
        )}
      </div>
    </section>
  );
}
