import React, { useEffect, useState } from 'react';
import { X, Loader2, User, ChevronDown } from 'lucide-react';
import { getEventRegistrations, type Registration, type Event } from '../../lib/db';

interface AllRegistrationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: Event[];
}

export const AllRegistrationsModal: React.FC<AllRegistrationsModalProps> = ({ isOpen, onClose, events }) => {
    const [selectedEventId, setSelectedEventId] = useState<string>('');
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && events.length > 0 && !selectedEventId) {
            setSelectedEventId(events[0].id || '');
        }
    }, [isOpen, events, selectedEventId]);

    useEffect(() => {
        if (selectedEventId) {
            fetchRegistrations(selectedEventId);
        } else {
            setRegistrations([]);
        }
    }, [selectedEventId]);

    const fetchRegistrations = async (eventId: string) => {
        setLoading(true);
        try {
            const data = await getEventRegistrations(eventId);
            setRegistrations(data);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl max-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">All Registrations</h2>
                        <p className="text-sm text-gray-500 mt-1">Select an event to view registered students</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <label htmlFor="event-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Event
                    </label>
                    <div className="relative">
                        <select
                            id="event-select"
                            value={selectedEventId}
                            onChange={(e) => setSelectedEventId(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 shadow-sm appearance-none"
                        >
                            {events.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.title}
                                </option>
                            ))}
                            {events.length === 0 && <option value="">No events available</option>}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                        </div>
                    ) : registrations.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <User className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No registrations found</h3>
                            <p className="mt-1 text-gray-500">
                                {selectedEventId ? "No students have registered for this event yet." : "Please select an event."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Registered On
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registrations.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{reg.studentName}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{reg.studentId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{reg.studentEmail || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {reg.timestamp?.toDate().toLocaleDateString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-xl flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        Total Registrations: <span className="font-medium text-gray-900">{registrations.length}</span>
                    </span>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
