import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface Event {
    id?: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
    organizer: string;
    imageUrl?: string;
}

export interface Registration {
    id?: string;
    eventId: string;
    userId: string;
    studentName: string;
    studentId: string;
    timestamp: Timestamp;
}

// Event Operations
export const getEvents = async () => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
};

export const createEvent = async (event: Event) => {
    return await addDoc(collection(db, 'events'), event);
};

export const updateEvent = async (id: string, event: Partial<Event>) => {
    const docRef = doc(db, 'events', id);
    return await updateDoc(docRef, event);
};

export const deleteEvent = async (id: string) => {
    const docRef = doc(db, 'events', id);
    return await deleteDoc(docRef);
};

// Registration Operations
export const registerForEvent = async (registration: Omit<Registration, 'id' | 'timestamp'>) => {
    return await addDoc(collection(db, 'registrations'), {
        ...registration,
        timestamp: Timestamp.now()
    });
};

export const getEventRegistrations = async (eventId: string) => {
    const q = query(collection(db, 'registrations'), where('eventId', '==', eventId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration));
};

export const getUserRegistrations = async (userId: string) => {
    const q = query(collection(db, 'registrations'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Registration));
};

export const checkUserRegistration = async (userId: string, eventId: string) => {
    const q = query(
        collection(db, 'registrations'),
        where('userId', '==', userId),
        where('eventId', '==', eventId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
};

export const deleteRegistration = async (id: string) => {
    const docRef = doc(db, 'registrations', id);
    return await deleteDoc(docRef);
};

// Stats (Admin Only)
export const getDashboardStats = async () => {
    const eventsSnapshot = await getDocs(collection(db, 'events'));
    const registrationsSnapshot = await getDocs(collection(db, 'registrations'));

    // Calculate average rating (mocked for now as we don't have feedback yet)
    const avgRating = 4.5;

    // Calculate growth (mocked)
    const growth = 12;

    return {
        totalEvents: eventsSnapshot.size,
        totalAttendees: registrationsSnapshot.size,
        avgRating,
        growth
    };
};
