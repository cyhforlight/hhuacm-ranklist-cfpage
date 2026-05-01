import { Button } from '@/components/ui/Button';

interface FilterChipProps {
  grade: string;
  isSelected: boolean;
  onToggle: (grade: string) => void;
}

export function FilterChip({ grade, isSelected, onToggle }: FilterChipProps) {
  return (
    <Button
      aria-pressed={isSelected}
      onClick={() => onToggle(grade)}
      variant={isSelected ? 'primary' : 'subtle'}
    >
      {grade}
    </Button>
  );
}
