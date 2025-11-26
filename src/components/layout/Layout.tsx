import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-grow w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};
