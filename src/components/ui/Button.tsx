import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'subtle' | 'danger';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-gradient-to-br from-primary-dark to-primary text-white shadow-[0_4px_8px_-2px_rgba(49,130,206,0.4)]',
  subtle: 'border-transparent bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300',
  danger: 'border-red-500/20 bg-red-50/90 text-red-700 hover:border-red-500/30 hover:bg-red-50 dark:bg-red-900/30 dark:text-red-300',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-5 py-2 text-sm',
};

export function Button({
  className,
  type = 'button',
  variant = 'subtle',
  size = 'sm',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full border font-medium tracking-normal shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-all duration-200 before:absolute before:inset-y-0 before:-left-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500 before:content-[''] hover:before:left-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
