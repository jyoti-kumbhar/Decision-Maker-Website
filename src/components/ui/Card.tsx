import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'marketing' | 'marketing-large' | 'soft' | 'outline';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'marketing', ...props }, ref) => {
    const variants = {
      marketing: 'bg-canvas shadow-level-3 rounded-md p-lg',
      'marketing-large': 'bg-canvas shadow-level-4 rounded-lg p-xl',
      soft: 'bg-canvas-soft rounded-md p-lg',
      outline: 'bg-transparent border border-hairline rounded-md p-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
