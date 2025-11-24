import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    role: 'admin' | 'user' | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<'admin' | 'user' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Check user role from Firestore 'users' collection
                try {
                    // Auto-promote specific email to admin for development/testing
                    if (currentUser.email === 'admin@campusconnect.com') {
                        setRole('admin');
                        // Optionally ensure this is saved in Firestore
                        // setDoc(doc(db, 'users', currentUser.uid), { role: 'admin' }, { merge: true });
                    } else {
                        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                        if (userDoc.exists()) {
                            setRole(userDoc.data().role as 'admin' | 'user');
                        } else {
                            setRole('user');
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setRole('user');
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
