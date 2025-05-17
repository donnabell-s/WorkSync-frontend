import React, { useState } from 'react'
import InputLabel from './InputLabel';

interface SchedInputProps {
    label: string;
    className?: string;
    value1?: string;
    value2?: string;
}

const SchedInput: React.FC<SchedInputProps> = ({ label, className, value1, value2 }) => {
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
                    <input
                        type="date"
                        className={`w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer`}
                        value={(value1 || value2) && (() => {
                            const start = new Date();
                            start.setFullYear(start.getFullYear() - 1);
                            const end = new Date();
                            const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                            return randomDate.toISOString().split('T')[0];
                        })()} />
                </div>
                <div className='flex gap-6 items-center'>
                    <label htmlFor="">Time</label>
                    <select name="" id="" className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'>
                        <option value="">{value1 ? '16' : (value2 ? '18' : 'Select Hour')}</option>
                    </select>
                    <p>:</p>
                    <select name="" id="" className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'>
                        <option value="">{value1 ? '00' : (value2 ? '30' : 'Select Minute/s')}</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default SchedInput