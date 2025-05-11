import React, { useState } from 'react'
import InputLabel from './InputLabel';

interface SchedInputProps {
    label: string;
    className?: string;
}

const SchedInput: React.FC<SchedInputProps> = ({ label, className }) => {
    const [filled, setFilled] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilled(event.target.value !== '');
    }

    return (
        <div className='w-full flex flex-col gap-2 flex-wrap'>
            <InputLabel label={label} filled={filled} />
            <div className='flex flex-col gap-2 text-sm'>
                <div className='flex gap-6 items-center'>
                    <label htmlFor="">Date</label>
                    <input type="date" className={`w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer`} />
                </div>
                <div className='flex gap-6 items-center'>
                    <label htmlFor="">Time</label>
                    <select name="" id="" className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'>
                        <option value="">Select Hour</option>
                    </select>
                    <p>:</p>
                    <select name="" id="" className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'>
                        <option value="">Select Minute/s</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SchedInput