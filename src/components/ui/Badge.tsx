import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'secondary' | 'success' | 'warning' | 'error' | 'link-bg';
}

export const Badge = ({ className, variant = 'secondary', ...props }: BadgeProps) => {
  const variants = {
    secondary: 'bg-canvas-soft-2 text-body',
    success: 'bg-link-bg-soft text-link',
    warning: 'bg-warning-soft text-warning-deep',
    error: 'bg-error-soft text-error-deep',
    'link-bg': 'bg-link-bg-soft text-link',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-xxs py-0.5 text-[12px] font-medium leading-4',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
