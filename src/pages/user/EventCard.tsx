import React from 'react';
import type { Event } from '../../lib/db';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, MapPin, Users } from 'lucide-react';

interface EventCardProps {
    event: Event;
    onViewDetails: () => void;
    onRegister: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails, onRegister }) => {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative h-48 bg-gray-100">
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
                        <span className="text-lg font-medium text-gray-500">{event.category}</span>
                    </div>
                )}
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm">
                    <Users className="h-3 w-3" />
                    <span>120</span> {/* Mock attendee count */}
                </div>
            </div>
            <CardContent className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{event.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.description}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                            By <span className="font-medium text-primary-600">{event.organizer}</span>
                        </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Button variant="secondary" onClick={onViewDetails} className="flex-1 border-gray-200 hover:bg-gray-50 text-gray-900">View Details</Button>
                        <Button onClick={onRegister} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md">Register</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
