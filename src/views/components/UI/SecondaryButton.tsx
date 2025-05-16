import React from 'react';

interface SecondaryButtonProps {
    label: string;
    onClick: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className="w-32 bg-gray-400 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-gray-500"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default SecondaryButton;