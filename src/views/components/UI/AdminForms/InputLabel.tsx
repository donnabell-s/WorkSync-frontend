import React from 'react'

interface InputLabelProps {
    label: string;
    filled: boolean;
}

const InputLabel: React.FC<InputLabelProps> = ({ label, filled }) => {
    return (
        <div className='text-sm font-bold text-[#1F2937]'>
            {label} {!filled && <span className='text-red-500'>*</span>}
        </div>
    )
}

export default InputLabel