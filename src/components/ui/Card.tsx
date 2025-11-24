import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass';
}

export const Card: React.FC<CardProps> = ({ className, variant = 'default', ...props }) => {
    return (
        <div
            className={cn(
                'rounded-xl border transition-all duration-300',
                variant === 'default' && 'border-gray-200 bg-white text-gray-950 shadow-sm hover:shadow-md',
                variant === 'glass' && 'glass-card',
                className
            )}
            {...props}
        />
    );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => {
    return <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props} />;
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return <div className={cn('p-6 pt-0', className)} {...props} />;
};
