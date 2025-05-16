import React from 'react'

interface AdminButtonProps {
    label: string;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | ((room: string) => void) | (() => void);
}

const AdminButton: React.FC<AdminButtonProps> = ({ label, icon, variant, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`max-h-15 p-3 flex items-center text-white text-sm font-semibold rounded-md cursor-pointer transform transform-all duration-200
                ${variant === 'primary' ? 'bg-[#2563EB] hover:bg-[#1E40AF] w-25 justify-center' : (variant === 'secondary' ? 'bg-[#64748B] hover:bg-[#4C515B] w-25 justify-center' : 'bg-[#2563EB] hover:bg-[#1E40AF] max-w-max')}
            `}
        >
            {icon && <span className='mr-2'>{icon}</span>}
            {label}
        </button>
    )
}

export default AdminButton