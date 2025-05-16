import React from 'react'

interface AdminButtonProps {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void; 
}

const AdminButton: React.FC<AdminButtonProps> = ({ label, icon }) => {
    return (
        <button
            className='max-h-15 w-32 bg-[#2563EB] p-3 flex items-center text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-[#1E40AF] transform transform-all duration-200'>
            {icon && <span className='mr-2'>{icon}</span>}
            {label}
        </button>
    )
}

export default AdminButton;