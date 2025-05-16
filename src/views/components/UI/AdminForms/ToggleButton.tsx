import React from 'react'

interface ToggleButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, icon, onClick, className }) => {
    return (
        <button className={`max-w-max p-2 pe-4 flex items-center gap-2 border-3 rounded-md cursor-pointer ${className}`} onClick={onClick}>
            <span className='w-7 flex items-center justify-center'>{icon}</span>
            <p className='text-sm font-bold'>{label}</p>
        </button>
    )
}

export default ToggleButton