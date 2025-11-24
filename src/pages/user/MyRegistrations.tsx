import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getUserRegistrations, getEvents, deleteRegistration, type Event, type Registration } from '../../lib/db';
import { Card, CardContent } from '../../components/ui/Card';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const MyRegistrations: React.FC = () => {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [events, setEvents] = useState<Record<string, Event>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const [regs, allEvents] = await Promise.all([
                    getUserRegistrations(user.uid),
                    getEvents()
                ]);

                setRegistrations(regs);

                // Create a map of events for easy lookup
                const eventMap: Record<string, Event> = {};
                allEvents.forEach(event => {
                    if (event.id) eventMap[event.id] = event;
                });
                setEvents(eventMap);

            } catch (error) {
                console.error("Error fetching registrations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        fetchData();
    }, [user]);

    const handleWithdraw = async (registrationId: string, eventTitle: string) => {
        if (confirm(`Are you sure you want to withdraw from ${eventTitle}?`)) {
            try {
                await deleteRegistration(registrationId);
                // Refresh list
                setRegistrations(prev => prev.filter(r => r.id !== registrationId));
            } catch (error) {
                console.error("Error withdrawing:", error);
                alert("Failed to withdraw. Please try again.");
            }
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Registrations</h1>
                    <p className="mt-2 text-gray-600">Manage and view your upcoming event registrations</p>
                </div>

                {registrations.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900">No registrations yet</h3>
                        <p className="mt-2 text-gray-500">You haven't registered for any events yet.</p>
                        <div className="mt-6">
                            <Link to="/events">
                                <Button>Browse Events</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {registrations.map((reg) => {
                            const event = events[reg.eventId];
                            if (!event) return null;

                            return (
                                <Card key={reg.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-2 bg-primary-500" />
                                    <CardContent className="p-6">
                                        <div className="mb-4">
                                            <div className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 mb-2">
                                                {event.category}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{event.title}</h3>
                                        </div>

                                        <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex flex-col text-xs text-gray-500">
                                                <span>Registered on {reg.timestamp.toDate().toLocaleDateString()}</span>
                                                <span className="font-medium text-green-600 mt-1">Confirmed</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleWithdraw(reg.id!, event.title)}
                                            >
                                                Withdraw
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
