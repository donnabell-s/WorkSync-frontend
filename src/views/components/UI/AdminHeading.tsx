import React from 'react'

interface AdminHeadingProps{
    label: String
}



const AdminHeading:React.FC<AdminHeadingProps> = ({label}) => {
    
    return(
        <div className='text-xl font-bold text-[#1F2937]'>
            {label}
        </div>
    )
}

export default AdminHeading;