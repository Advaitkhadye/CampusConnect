import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    onClose,
    title = "Success!",
    message = "Operation completed successfully."
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl overflow-hidden animate-scale-in">
                <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="mb-6 text-gray-600">{message}</p>
                    <Button
                        onClick={onClose}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-500/30 border-none"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};
