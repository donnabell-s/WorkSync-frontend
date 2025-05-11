import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';

interface AdminBackLinkProps {
    label: string;
    backPath: string;
}

const AdminBackLink: React.FC<AdminBackLinkProps> = ({ label, backPath }) => {
    return (
        <div className='w-fit'>
            <a href={backPath} className='flex items-center gap-2 text-[#2563EB] text-md font-medium cursor-pointer hover:underline'>
                <IoIosArrowBack className='size-5' />
                {label}
            </a>
        </div>
    )
}

export default AdminBackLink