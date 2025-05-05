import React, { useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

interface ViewRoomHeaderProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
}

const ViewRoomHeader: React.FC<ViewRoomHeaderProps> = ({ activeTab, handleTabClick }) => {

    return (
        <div className='flex flex-col items-center justify-between w-full bg-white divide-zinc-200 divide-y-2 border-b-2 border-zinc-200 rounded-tl-md rounded-tr-md text-[#1F2937]'>
            <div className='w-full flex p-2.5 gap-4'>
                <div className='h-22 rounded-md shadow-sm bg-zinc-100 w-2/6'>
                    <img src="" alt="" />
                </div>
                <div className='h-22 rounded-md w-3/6 flex gap-8'>
                    <div className='flex flex-col text-sm gap-1'>
                        <div className='font-bold'>Executive Boardroom</div>
                        <div className='font-bold'>CR-102A</div>
                        <div className='font-bold text-green-500'>Available</div>
                        <div></div>
                    </div>
                    <div className='flex flex-col text-sm gap-1'>
                        <div className='font-medium'>Location</div>
                        <div className='font-medium'>Size</div>
                        <div className='font-medium'>No. of Seats</div>
                        <div className='font-medium'>Facilities</div>
                    </div>
                    <div className='flex flex-col text-sm gap-1'>
                        <div>North Tower, Level 12</div>
                        <div>Medium</div>
                        <div>12</div>
                        <div>Projector, Video Conferencing, Whiteboard</div>
                    </div>
                </div>
                <div className='h-22 rounded-md w-1/6 flex flex-col gap-2 items-end'>
                    <button className='text-white text-sm bg-[#F59E0B] hover:bg-[#f5740b] flex gap-4 p-2 rounded-md items-center w-25 justify-center transform transition-all duration-300 cursor-pointer'>
                        <MdEdit className='size-5 text-white' />
                        Edit
                    </button>
                    <button className='text-white text-sm bg-[#DC2626] hover:bg-[#b71e1e] flex gap-4 p-2 rounded-md items-center w-25 justify-center transform transition-all duration-300 cursor-pointer'>
                        <MdDelete className='size-5 text-white' />
                        Delete
                    </button>
                </div>
            </div>
            <div className='w-full h-full flex flex-wrap justify-start gap-5 p-2'>
                <div className='md:h-12 h-full text-sm items-center justify-start text-[#acb3b9] font-medium flex flex-wrap'>
                    <div className={`px-6 p-2 cursor-pointer ${activeTab === 'Calendar' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`} onClick={() => handleTabClick('Calendar')}>
                        <p className='w-full text-center'>Calendar</p>
                    </div>
                    <div className={`px-6 p-2 cursor-pointer ${activeTab === 'History' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`} onClick={() => handleTabClick('History')}>
                        <p className='w-full text-center'>Booking History</p>
                    </div>
                    <div className={`px-6 p-2 cursor-pointer ${activeTab === 'Reservations' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`} onClick={() => handleTabClick('Reservations')}>
                        <p className='w-full text-center'>Current/Pending Reservations</p>
                    </div>
                </div>

                <div className='h-12 lg:flex w-full lg:w-70 items-center hidden'>
                    <div className='w-full flex items-center border border-zinc-200 rounded-md p-2 bg-[#F3F4F6] focus-within:border-zinc-400'>
                        <input type="text" placeholder='Search' className='outline-none flex-grow text-sm' />
                        <IoSearch className='text-gray-500 size-5' />
                    </div>
                </div>

                {activeTab === 'Calendar' ?
                    <div className='h-12 items-center flex gap-4 text-sm'></div> :
                    <div className='h-12 items-center lg:flex gap-4 text-sm flex-wrap hidden'>
                        <p className=''>Filter by:</p>
                        <select name="" id="" className='border border-zinc-200 rounded-md p-2 bg-[#F3F4F6] focus:border-zinc-400 px-6 cursor-pointer justify-start'>
                            <option value="">This Week</option>
                        </select>
                    </div>}
            </div>
        </div>
    )
}

export default ViewRoomHeader