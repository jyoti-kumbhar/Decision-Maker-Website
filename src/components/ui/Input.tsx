import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, sizeVariant = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'h-8 px-sm text-[14px]',
      md: 'h-10 px-sm text-[14px]',
      lg: 'h-12 px-sm text-[16px]',
    };

    return (
      <div className="flex flex-col gap-xs w-full">
        {label && (
          <label className="text-body text-[14px] font-medium leading-5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex w-full bg-canvas border border-hairline rounded-sm transition-colors focus:border-hairline-strong focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
            sizes[sizeVariant],
            error && 'border-error focus:border-error',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-error text-[12px] leading-4">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
