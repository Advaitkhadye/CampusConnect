import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
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
    studentEmail: string;
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

    const registrations = await Promise.all(snapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data() as Registration;
        const reg = { id: docSnapshot.id, ...data };

        // Backfill email if missing
        if (!reg.studentEmail && reg.userId) {
            try {
                const userDoc = await getDoc(doc(db, 'users', reg.userId));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.email) {
                        // Update the registration with the email for future
                        await updateDoc(doc(db, 'registrations', reg.id!), {
                            studentEmail: userData.email
                        });
                        reg.studentEmail = userData.email;
                    }
                }
            } catch (error) {
                console.error("Error backfilling email for registration:", reg.id, error);
            }
        }
        return reg;
    }));

    return registrations;
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
