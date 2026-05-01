import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { getRatingColorClass } from '@/utils/cfUtils';
import { EmptyValue } from './EmptyValue';

interface RatingTextProps {
  rating: number | null | undefined;
  children?: ReactNode;
  className?: string;
}

export function RatingText({ rating, children, className }: RatingTextProps) {
  return (
    <span className={cn(getRatingColorClass(rating), 'mono-text font-semibold', className)}>
      {children ?? rating ?? <EmptyValue />}
    </span>
  );
}
