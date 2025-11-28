import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

export const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const oobCode = searchParams.get('oobCode');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        if (!oobCode) {
            setError('Invalid password reset link.');
            setVerifying(false);
            return;
        }

        // Verify the code is valid
        verifyPasswordResetCode(auth, oobCode)
            .then(() => {
                setVerifying(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Invalid or expired password reset link.');
                setVerifying(false);
            });
    }, [oobCode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!oobCode) return;

        setLoading(true);
        setError('');

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            console.error(err);
            setError('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-gray-600">Verifying link...</div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <Card className="border-gray-200 shadow-xl">
                    <CardContent className="pt-8 pb-8 px-8">
                        <div className="flex flex-col items-center mb-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 text-white">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                                    CampusConnect
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Change Your Password</h2>
                            <p className="mt-2 text-sm text-gray-600 text-center">
                                Enter a new password below to change your password.
                            </p>
                        </div>

                        {success ? (
                            <div className="text-center space-y-4">
                                <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600">
                                    Password reset successfully! Redirecting to login...
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <Input
                                        label="New password*"
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="h-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <Input
                                        label="Confirm password"
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="h-12"
                                    />
                                </div>

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
                                    {loading ? 'Resetting...' : 'SAVE'}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
