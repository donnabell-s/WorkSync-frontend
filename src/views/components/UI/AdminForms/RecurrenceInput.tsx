import React, { useState } from 'react'
import InputLabel from './InputLabel'

interface RecurrenceInputProps {

}

const RecurrenceInput: React.FC<RecurrenceInputProps> = ({ }) => {
    const types = ['Daily', 'Weekly', 'Monthly'];
    const [filled, setFilled] = useState(false);

    const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilled(!!event.target.value);
    };

    return (
        <div className='max-w-max flex flex-col gap-2 flex-wrap'>
            <InputLabel label='Recurrence' filled={filled} />
            <div className='flex flex-col gap-2 text-sm border-1 border-zinc-300 rounded-md p-2 px-5 pe-10'>
                {
                    types.map((type, index) => (
                        <div key={index} className='flex gap-3 items-center'>
                            <input
                                type="radio"
                                id={type}
                                name="recurrence"
                                value={type}
                                className='cursor-pointer'
                                onChange={handleSelection}
                            />
                            <label htmlFor={type} className='text-sm cursor-pointer'>{type}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecurrenceInput