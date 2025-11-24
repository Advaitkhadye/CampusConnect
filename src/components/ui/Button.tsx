import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const variants = {
        primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg',
        secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
        outline: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
