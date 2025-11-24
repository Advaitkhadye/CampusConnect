import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore, if not create one
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    role: 'user',
                    createdAt: new Date().toISOString()
                });
            }

            // Check role and navigate
            if (userDoc.exists() && userDoc.data().role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            console.error(err);
            setError('Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if user is admin (hardcoded for dev or from Firestore)
            if (user.email === 'admin@campusconnect.com') {
                navigate('/admin');
                return;
            }

            // Check Firestore for role
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            console.error(err);
            setError('Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Hero */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900 overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-800/90"></div>

                <div className="relative z-10 max-w-xl px-12 text-center text-white space-y-8">
                    <div className="flex justify-center">
                        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/20">
                            <Sparkles className="h-12 w-12 text-primary-200" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight">
                        Welcome to <br />
                        <span className="text-primary-200">CampusConnect</span>
                    </h1>
                    <p className="text-lg text-primary-100 leading-relaxed">
                        Join your campus community today. Discover events, connect with peers, and make the most of your university journey.
                    </p>
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
                <div className="w-full max-w-md space-y-8 animate-fade-in">
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-6">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white transition-transform group-hover:scale-110 shadow-lg shadow-primary-500/20">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                                    CampusConnect
                                </span>
                            </Link>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    <Card variant="glass" className="border-gray-200 shadow-xl">
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                                <div className="space-y-1">
                                    <Input
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                    />
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>
                                        <Link to="/forgot-password" className="text-xs font-medium text-primary-600 hover:text-primary-500">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                {error && (
                                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500 animate-slide-down">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full group bg-black text-white hover:bg-gray-800 shadow-lg" disabled={loading} size="lg">
                                    {loading ? 'Signing in...' : 'Sign In'}
                                    {!loading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                                </Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                >
                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    Sign in with Google
                                </Button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">New to CampusConnect?</span>
                                    </div>
                                </div>

                                <div className="mt-6 text-center">
                                    <Link to="/register">
                                        <Button variant="outline" className="w-full bg-white text-gray-900 border-gray-200 hover:bg-gray-50">
                                            Create an account
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
