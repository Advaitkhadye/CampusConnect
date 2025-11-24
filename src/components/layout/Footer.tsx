import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-xl">
                                CC
                            </div>
                            <span className="text-xl font-bold text-gray-900">CampusConnect</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            The ultimate platform for college clubs to create unforgettable events, build communities, and track engagement.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link to="/events" className="text-gray-600 hover:text-primary-600 text-sm">Browse Events</Link></li>
                            <li><Link to="/login" className="text-gray-600 hover:text-primary-600 text-sm">Organizers</Link></li>
                            <li><Link to="#" className="text-gray-600 hover:text-primary-600 text-sm">Success Stories</Link></li>
                            <li><Link to="#" className="text-gray-600 hover:text-primary-600 text-sm">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><Link to="#" className="text-gray-600 hover:text-primary-600 text-sm">Help Center</Link></li>
                            <li><Link to="#" className="text-gray-600 hover:text-primary-600 text-sm">Event Guides</Link></li>
                            <li><Link to="#" className="text-gray-600 hover:text-primary-600 text-sm">Community</Link></li>
                            <li><Link to="#" className="text-gray-600 hover:text-primary-600 text-sm">Developers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-gray-600 text-sm">
                                <MapPin className="h-5 w-5 text-primary-600 shrink-0" />
                                <span>123 Campus Drive, Student Center, Suite 400</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600 text-sm">
                                <Phone className="h-5 w-5 text-primary-600 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-600 text-sm">
                                <Mail className="h-5 w-5 text-primary-600 shrink-0" />
                                <span>support@campusconnect.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} CampusConnect. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link to="#" className="hover:text-gray-900">Privacy Policy</Link>
                        <Link to="#" className="hover:text-gray-900">Terms of Service</Link>
                        <Link to="#" className="hover:text-gray-900">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
