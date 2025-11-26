import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, Users, Star, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import { getDashboardStats, getEvents, deleteEvent, type Event } from '../../lib/db';
import { EventModal } from './EventModal';
import { RegistrationsModal } from './RegistrationsModal';
import { AllRegistrationsModal } from './AllRegistrationsModal';
import { EventDetailsModal } from '../user/EventDetailsModal';

export const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalAttendees: 0,
        avgRating: 0,
        growth: 0
    });
    const [events, setEvents] = useState<Event[]>([]);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [viewingRegistrations, setViewingRegistrations] = useState<Event | null>(null);
    const [viewingEventDetails, setViewingEventDetails] = useState<Event | null>(null);
    const [isAllRegistrationsModalOpen, setIsAllRegistrationsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const [statsData, eventsData] = await Promise.all([
                getDashboardStats(),
                getEvents()
            ]);
            setStats(statsData);
            setEvents(eventsData);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            await deleteEvent(id);
            fetchData();
        }
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setIsEventModalOpen(true);
    };

    const handleCreate = () => {
        setEditingEvent(null);
        setIsEventModalOpen(true);
    };

    return (
        <div className="space-y-8 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-2 text-gray-600">Manage your events and track performance</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Button onClick={() => setIsAllRegistrationsModalOpen(true)} variant="outline" className="w-full sm:w-auto bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm order-1 sm:order-none">
                        <Users className="mr-2 h-4 w-4" />
                        View Registrations
                    </Button>
                    <Button onClick={handleCreate} className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 shadow-lg order-2 sm:order-none">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Events</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalEvents}</h3>
                            <p className="text-xs text-gray-500 mt-1">2 upcoming</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                            <Calendar className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Attendees</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalAttendees}</h3>
                            <p className="text-xs text-gray-500 mt-1">Across all events</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <Users className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Average Rating</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.avgRating}</h3>
                            <p className="text-xs text-gray-500 mt-1">From attendee feedback</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                            <Star className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Growth</p>
                            <h3 className="text-2xl font-bold text-gray-900">+{stats.growth}%</h3>
                            <p className="text-xs text-gray-500 mt-1">From last month</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Events Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Event Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto max-w-full">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                <tr>
                                    <th className="px-6 py-3">Event</th>
                                    <th className="hidden sm:table-cell px-6 py-3">Date</th>
                                    <th className="hidden md:table-cell px-6 py-3">Location</th>
                                    <th className="hidden lg:table-cell px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {events.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <button
                                                onClick={() => setViewingEventDetails(event)}
                                                className="hover:text-primary-600 hover:underline text-left focus:outline-none"
                                            >
                                                {event.title}
                                            </button>
                                        </td>
                                        <td className="hidden sm:table-cell px-6 py-4">{event.date}</td>
                                        <td className="hidden md:table-cell px-6 py-4">{event.location}</td>
                                        <td className="hidden lg:table-cell px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                Upcoming
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => setViewingRegistrations(event)} title="View Registrations">
                                                    <Users className="h-4 w-4 text-blue-600" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleEdit(event)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => event.id && handleDelete(event.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {events.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No events found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {isEventModalOpen && (
                <EventModal
                    isOpen={isEventModalOpen}
                    onClose={() => setIsEventModalOpen(false)}
                    onSuccess={fetchData}
                    initialData={editingEvent}
                />
            )}

            {viewingRegistrations && (
                <RegistrationsModal
                    isOpen={!!viewingRegistrations}
                    onClose={() => setViewingRegistrations(null)}
                    eventId={viewingRegistrations.id!}
                    eventTitle={viewingRegistrations.title}
                />
            )}

            {isAllRegistrationsModalOpen && (
                <AllRegistrationsModal
                    isOpen={isAllRegistrationsModalOpen}
                    onClose={() => setIsAllRegistrationsModalOpen(false)}
                    events={events}
                />
            )}

            {viewingEventDetails && (
                <EventDetailsModal
                    isOpen={!!viewingEventDetails}
                    onClose={() => setViewingEventDetails(null)}
                    event={viewingEventDetails}
                    onRegister={() => { }} // Admin doesn't register
                />
            )}
        </div>
    );
};
