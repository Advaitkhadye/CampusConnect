import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { registerForEvent, checkUserRegistration, type Event } from '../../lib/db';
import { useAuth } from '../auth/AuthContext';
import { X } from 'lucide-react';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
    onSuccess: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, event, onSuccess }) => {
    const { user, userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: ''
    });

    // Auto-fill form data when modal opens or userData changes
    React.useEffect(() => {
        if (userData) {
            setFormData({
                studentName: userData.name || '',
                studentId: userData.studentId || ''
            });
        }
    }, [userData, isOpen]);

    if (!isOpen || !user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const isRegistered = await checkUserRegistration(user.uid, event.id!);
            if (isRegistered) {
                alert("Already registered for this event!");
                setLoading(false);
                return;
            }

            await registerForEvent({
                eventId: event.id!,
                userId: user.uid,
                studentName: formData.studentName,
                studentId: formData.studentId,
                studentEmail: user.email || ''
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error registering for event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900">Register for {event.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <Input
                        label="Full Name"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        required
                        placeholder="Enter your full Name"
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                    />

                    <Input
                        label="Student ID"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        required
                        placeholder="S12345678"
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/30 border-none">
                            {loading ? 'Registering...' : 'Confirm Registration'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
