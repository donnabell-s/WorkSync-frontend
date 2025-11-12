import React from 'react'

interface AdminButtonProps {
    className?: string;
    label: string;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' ;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | ((room: string) => void) | (() => void);
    disabled?: boolean;
}

const AdminButton: React.FC<AdminButtonProps> = ({ label, icon, variant, onClick, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`max-h-15 p-2.5 flex items-center text-white text-sm font-semibold rounded-md cursor-pointer transform transform-all duration-200
                ${variant === 'primary' ? 'bg-[#2563EB] hover:bg-[#1E40AF] w-40 justify-center' : (variant === 'secondary' ? 'bg-[#64748B] hover:bg-[#4C515B] w-44 justify-center' : 'bg-[#2563EB] hover:bg-[#1E40AF] max-w-max')}
                ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {icon && <span className='mr-2'>{icon}</span>}
            {label}
        </button>
    )
}

export default AdminButton;