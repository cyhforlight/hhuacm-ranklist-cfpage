import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface StatusCardProps {
  children: ReactNode;
  className?: string;
}

export function StatusCard({ children, className }: StatusCardProps) {
  return (
    <div
      className={cn(
        'mt-12 overflow-hidden rounded-xl border border-border bg-[var(--card-bg)] px-6 py-16 text-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] backdrop-blur-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
