import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset link sent! Check your email.');
        } catch (err: any) {
            console.error(err);
            setError('Failed to send reset email. Please check the email address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <Card className="border-gray-200 shadow-xl">
                    <CardContent className="pt-8 pb-8 px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Forgot your password</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Please enter the email address you'd like your password reset information sent to
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Enter email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="student@example.com"
                                className="h-12"
                            />

                            {message && (
                                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium h-12 text-base shadow-lg"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Request reset link'}
                            </Button>

                            <div className="text-center mt-6">
                                <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                    Back To Login
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
