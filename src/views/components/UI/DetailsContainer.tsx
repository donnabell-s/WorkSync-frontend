import React from 'react';

interface DetailsContainerProps {
    children: React.ReactNode; // For the fields (e.g., inputs, labels)
    actions: React.ReactNode; // For buttons (e.g., Close, Edit)
    readOnly?: boolean; // Optional prop to indicate read-only mode
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ children, actions, readOnly = false }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>
            <div className="mt-6 flex gap-4">
                {actions}
            </div>
        </div>
    );
};

export default DetailsContainer;