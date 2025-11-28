import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-full h-64">
            <div className="atom-spinner">
                <div className="spinner-inner">
                    <div className="spinner-line"></div>
                    <div className="spinner-line"></div>
                    <div className="spinner-line"></div>
                    <div className="spinner-circle">
                        &#9679;
                    </div>
                </div>
            </div>
        </div>
    );
};
