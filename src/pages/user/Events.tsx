import React, { useEffect, useState } from 'react';
import { getEvents, type Event } from '../../lib/db';
import { EventCard } from './EventCard';
import { Search } from 'lucide-react';
import { EventDetailsModal } from './EventDetailsModal';
import { RegisterModal } from './RegisterModal';

export const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesFilter = filter === 'All' || event.category === filter;
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
            event.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const categories = ['All', 'Technology', 'Cultural', 'Business', 'Environment', 'Sports', 'Academic'];

    const handleViewDetails = (event: Event) => {
        setSelectedEvent(event);
        setIsDetailsOpen(true);
    };

    const handleRegister = (event: Event) => {
        setSelectedEvent(event);
        setIsRegisterOpen(true);
    };

    return (
        <div className="space-y-8 pt-20">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
                <p className="text-gray-600">Discover and join exciting events happening on campus</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${filter === cat
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading events...</div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onViewDetails={() => handleViewDetails(event)}
                            onRegister={() => handleRegister(event)}
                        />
                    ))}
                    {filteredEvents.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500">
                            No events found matching your criteria.
                        </div>
                    )}
                </div>
            )}

            {selectedEvent && (
                <>
                    <EventDetailsModal
                        isOpen={isDetailsOpen}
                        onClose={() => setIsDetailsOpen(false)}
                        event={selectedEvent}
                        onRegister={() => {
                            setIsDetailsOpen(false);
                            setIsRegisterOpen(true);
                        }}
                    />
                    <RegisterModal
                        isOpen={isRegisterOpen}
                        onClose={() => setIsRegisterOpen(false)}
                        event={selectedEvent}
                        onSuccess={() => {
                            // Optionally show success message
                            setIsRegisterOpen(false);
                        }}
                    />
                </>
            )}
        </div>
    );
};
