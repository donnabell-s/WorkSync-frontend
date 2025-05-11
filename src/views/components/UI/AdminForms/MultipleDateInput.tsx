import React, { useState } from 'react'
import InputLabel from './InputLabel';
import { MdCalendarToday } from "react-icons/md";

interface MultipleDateInputProps {
    className?: string;
}

const MultipleDateInput: React.FC<MultipleDateInputProps> = ({ className }) => {
    const [filled, setFilled] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [showDatePicker, setShowDatePicker] = useState(true);
    const [showDayPicker, setShowDayPicker] = useState(false);
    const [showSelector, setShowSelector] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleActiveTabChange = (tab: number) => {
        setActiveTab(tab);
        setShowDatePicker(!showDatePicker);
        setShowDayPicker(!showDayPicker);
    }

    return (
        <div className='flex flex-col gap-2 flex-wrap'>
            <InputLabel label='On' filled={filled} />
            <button
                className='w-full max-h-max flex flex-grow gap-7 text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer text-left items-center'
                onClick={(event) => {
                    event.preventDefault();
                    setShowSelector(true);
                }}
            >
                Select Date
                <span>
                    <MdCalendarToday className='size-3.5 right-3 top-2 text-black' />
                </span>
            </button>
            {showSelector && (
                <div className='absolute z-10 bg-white border border-zinc-300 rounded-md shadow-md p-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between items-center'>
                            <div className={`flex p-2 items-center text-sm cursor-pointer ${activeTab === 0 ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-zinc-500'}`} onClick={() => handleActiveTabChange(0)}>
                                <p>Date Selection</p>
                            </div>
                            <div className={`flex p-2 items-center text-sm cursor-pointer ${activeTab === 1 ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-zinc-500'}`} onClick={() => handleActiveTabChange(1)}>
                                <p>Day Selection</p>
                            </div>
                        </div>
                        {showDatePicker ?
                            <div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-sm font-medium'>
                                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                                    </span>
                                    <div className='flex gap-2'>
                                        <button
                                            className='font-bold text-md text-zinc-500 hover:text-zinc-700 cursor-pointer'
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCurrentDate((prevDate) => {
                                                    const newDate = new Date(prevDate);
                                                    newDate.setMonth(newDate.getMonth() - 1);
                                                    return newDate;
                                                });
                                            }}
                                        >
                                            &lt;
                                        </button>
                                        <button
                                            className='font-bold text-md text-zinc-500 hover:text-zinc-700 cursor-pointer'
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCurrentDate((prevDate) => {
                                                    const newDate = new Date(prevDate);
                                                    newDate.setMonth(newDate.getMonth() + 1);
                                                    return newDate;
                                                });
                                            }}
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                                <div className='grid grid-cols-7 gap-1'>
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <span key={day} className='text-xs text-center text-zinc-500'>
                                            {day}
                                        </span>
                                    ))}
                                    {(() => {
                                        const daysInMonth = new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth() + 1,
                                            0
                                        ).getDate();
                                        const firstDayOfMonth = new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            1
                                        ).getDay();
                                        const lastDayOfMonth = new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            daysInMonth
                                        ).getDay();
                                        const prevMonthDays = new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            0
                                        ).getDate();
                                        const days = [];

                                        // Add days from the previous month
                                        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                                            days.push(
                                                <span
                                                    key={`prev-${i}`}
                                                    className='text-sm p-1 rounded text-zinc-400 cursor-pointer'
                                                >
                                                    {prevMonthDays - i}
                                                </span>
                                            );
                                        }

                                        // Add actual days of the current month
                                        for (let day = 1; day <= daysInMonth; day++) {
                                            days.push(
                                                <button
                                                    key={day}
                                                    className='text-sm p-1 rounded hover:bg-zinc-200 cursor-pointer'
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        console.log(`Selected date: ${day}`);
                                                        setShowSelector(false);
                                                    }}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        }

                                        // Add days from the next month
                                        for (let i = 1; i < 7 - lastDayOfMonth; i++) {
                                            days.push(
                                                <span
                                                    key={`next-${i}`}
                                                    className='text-sm p-1 rounded text-zinc-400 cursor-pointer'
                                                >
                                                    {i}
                                                </span>
                                            );
                                        }

                                        return days;
                                    })()}
                                </div>
                            </div>
                            :
                            <div className=''>
                                {
                                    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                                        <div className='flex items-center gap-2 text-sm' key={index}>
                                            <input type='checkbox' id={day} className='cursor-pointer' />
                                            <label htmlFor={day}>{day}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        <div className='flex gap-2'>
                            <button className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-900 transform transition-all duration-200 cursor-pointer'>
                                Confirm
                            </button>
                            <button className='bg-zinc-500 text-white rounded-md p-2 hover:bg-zinc-700 transform transition-all duration-200 cursor-pointer'>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MultipleDateInput