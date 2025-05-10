import React from 'react'

interface UserHeadingProps{
    label: String
}



const UserHeading:React.FC<UserHeadingProps> = ({label}) => {
    
    return(
        <div className='text-4xl font-semibold text-[#1F2937]'>
            {label}
        </div>
    )
}

export default UserHeading;