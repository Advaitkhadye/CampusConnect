import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ className, label, error, ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200',
                    'placeholder:text-gray-500',
                    'focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
                    className
                )}
                {...props}
            />
            {error && <p className="text-sm text-red-500 animate-slide-down">{error}</p>}
        </div>
    );
};
