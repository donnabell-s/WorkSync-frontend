import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';

interface AdminBackLinkProps {
    label: string;
    backPath?: string;
    onBackClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AdminBackLink: React.FC<AdminBackLinkProps> = ({ label, backPath, onBackClick }) => {
    return (
        <div className='w-fit'>
            {backPath ?
                <a href={backPath} className='flex items-center gap-2 text-[#2563EB] text-md font-medium cursor-pointer hover:underline'>
                    <IoIosArrowBack className='size-5' />
                    {label}
                </a> :
                <button onClick={onBackClick} className='flex items-center gap-2 text-[#2563EB] text-md font-medium cursor-pointer hover:underline'>
                    <IoIosArrowBack className='size-5' />
                    {label}
                </button>
            }
        </div>
    )
}

export default AdminBackLink