import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', pill = true, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-opacity-90 active:scale-95 transition-all',
      secondary: 'bg-canvas text-ink shadow-level-1 hover:bg-canvas-soft active:scale-95 transition-all',
      ghost: 'bg-transparent text-body hover:bg-canvas-soft active:scale-95 transition-all',
      outline: 'bg-transparent text-ink border border-hairline hover:bg-canvas-soft active:scale-95 transition-all',
    };

    const sizes = {
      sm: 'h-7 px-xs text-[14px] font-medium leading-5',
      md: 'h-10 px-md text-[14px] font-medium leading-5',
      lg: 'h-12 px-lg text-[16px] font-medium leading-6',
    };

    const rounded = pill ? 'rounded-pill' : 'rounded-sm';

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap outline-hidden focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          rounded,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
