import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { createEvent, updateEvent, type Event } from '../../lib/db';
import { X } from 'lucide-react';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: Event | null;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSuccess, initialData }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Event>({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        category: 'Technology',
        organizer: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                date: '',
                time: '',
                location: '',
                description: '',
                category: 'Technology',
                organizer: '',
                imageUrl: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (initialData && initialData.id) {
                await updateEvent(initialData.id, formData);
            } else {
                await createEvent(formData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {initialData ? 'Edit Event' : 'Create New Event'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <Input
                        label="Event Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="e.g., Annual Tech Symposium"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                        <Input
                            label="Time"
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        placeholder="e.g., Main Auditorium"
                    />

                    <Input
                        label="Organizer"
                        value={formData.organizer}
                        onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                        required
                        placeholder="e.g., Computer Science Club"
                    />

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
                        <select
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Technology">Technology</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Business">Business</option>
                            <option value="Sports">Sports</option>
                            <option value="Academic">Academic</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            placeholder="Describe your event..."
                        />
                    </div>

                    <Input
                        label="Event Image URL"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-gray-800 shadow-lg">
                            {loading ? 'Saving...' : (initialData ? 'Update Event' : 'Create Event')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
