import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../pages/auth/AuthContext';
import { Button } from '../ui/Button';
import { Sparkles, LogOut, Menu, X, User } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '../../components/ui/Button'; // Re-using cn utility

export const Navbar: React.FC = () => {
    const { user, role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive
                        ? "text-primary-600 font-semibold"
                        : "text-gray-600 hover:text-primary-600"
                )}
            >
                {children}
            </Link>
        );
    };

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled || isMenuOpen
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 text-white transition-transform group-hover:scale-110">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            CampusConnect
                        </span>
                    </Link>
                    {role === 'admin' && (
                        <span className="ml-2 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 border border-primary-200">
                            Admin
                        </span>
                    )}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-8">
                    {user ? (
                        <>
                            <div className="flex items-center gap-6">
                                {role === 'admin' ? null : (
                                    <>
                                        <NavLink to="/events">Browse Events</NavLink>
                                        <NavLink to="/my-registrations">My Registrations</NavLink>
                                    </>
                                )}
                            </div>

                            <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="hidden lg:inline-block">{user.email?.split('@')[0]}</span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-600 hover:bg-red-50 gap-2">
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline" size="sm" className="font-medium bg-white text-gray-900 border-gray-200 hover:bg-gray-50">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="outline" size="sm" className="bg-white text-gray-900 border-gray-200 hover:bg-gray-50 shadow-sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="space-y-1 bg-white px-4 pb-3 pt-2 shadow-lg border-b border-gray-100">
                    {user ? (
                        <>
                            {role === 'admin' ? (
                                <>
                                    <Link to="/admin" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                        Dashboard
                                    </Link>
                                    <Link to="/admin/events" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                        Manage Events
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/events" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                        Browse Events
                                    </Link>
                                    <Link to="/my-registrations" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                        My Registrations
                                    </Link>
                                </>
                            )}
                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <div className="flex items-center px-3 mb-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-900">{user.email}</div>
                                    </div>
                                </div>
                                <Button variant="danger" className="w-full justify-center" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-2 px-2 pb-3 pt-2">
                            <Link to="/login" className="block">
                                <Button variant="ghost" className="w-full justify-center">Sign In</Button>
                            </Link>
                            <Link to="/register" className="block">
                                <Button variant="ghost" className="w-full justify-center">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
