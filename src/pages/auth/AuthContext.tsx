import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
    name: string;
    studentId: string;
    email: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    role: 'admin' | 'user' | null;
    userData: UserData | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, userData: null, loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<'admin' | 'user' | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
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
                        setUserData({
                            name: currentUser.displayName || 'Admin',
                            studentId: 'ADMIN',
                            email: currentUser.email,
                            role: 'admin'
                        });
                    } else {
                        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                        if (userDoc.exists()) {
                            const data = userDoc.data() as UserData;
                            setRole(data.role);
                            setUserData(data);
                        } else {
                            setRole('user');
                            setUserData(null);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setRole('user');
                    setUserData(null);
                }
            } else {
                setRole(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, userData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
