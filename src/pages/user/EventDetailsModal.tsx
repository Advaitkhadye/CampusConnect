import React from 'react';
import { X, Calendar, MapPin, Clock, User, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { Event } from '../../lib/db';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

interface EventDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
    onRegister: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event, onRegister }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-scale-in">
                <div className="relative h-64 bg-gray-100">
                    {event.imageUrl ? (
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className={`absolute inset-0 flex items-center justify-center text-gray-400 bg-gradient-to-br ${event.category === 'Technology' ? 'from-blue-50 to-blue-100' :
                            event.category === 'Cultural' ? 'from-pink-50 to-pink-100' :
                                'from-gray-50 to-gray-100'
                            }`}>
                            <span className="text-3xl font-bold text-gray-300">{event.category}</span>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-gray-600 hover:bg-white hover:text-gray-900 transition-colors shadow-sm"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <div className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 mb-2">
                                {event.category}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>120 attending</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Date</p>
                                    <p className="text-sm">{event.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Time</p>
                                    <p className="text-sm">{event.time}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Location</p>
                                    <p className="text-sm">{event.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Organizer</p>
                                    <p className="text-sm">{event.organizer}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Event</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <Button variant="secondary" onClick={onClose}>Close</Button>
                        <Button onClick={() => {
                            if (!user) {
                                alert("Please signin first");
                                navigate('/login');
                                return;
                            }
                            onClose();
                            onRegister();
                        }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-500/20">
                            Register Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
