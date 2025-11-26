import React, { useEffect, useState } from 'react';
import { X, Loader2, User } from 'lucide-react';
import { getEventRegistrations, type Registration } from '../../lib/db';

interface RegistrationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
    eventTitle: string;
}

export const RegistrationsModal: React.FC<RegistrationsModalProps> = ({ isOpen, onClose, eventId, eventTitle }) => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && eventId) {
            fetchRegistrations();
        }
    }, [isOpen, eventId]);

    const fetchRegistrations = async () => {
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
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Registered Students</h2>
                        <p className="text-sm text-gray-500 mt-1">For event: {eventTitle}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-5 w-5" />
                    </button>
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
                            <h3 className="text-lg font-medium text-gray-900">No registrations yet</h3>
                            <p className="mt-1 text-gray-500">Students who register will appear here.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
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
                                        <tr key={reg.id} className="hover:bg-gray-50">
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
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
