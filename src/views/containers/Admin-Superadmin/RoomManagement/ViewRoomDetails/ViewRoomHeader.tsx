import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';
import { useRooms } from '../../../../../context/RoomContext';

interface ViewRoomHeaderProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
}

const ViewRoomHeader: React.FC<ViewRoomHeaderProps> = ({ activeTab, handleTabClick }) => {
    const navigate = useNavigate();
    const { currentRoom } = useRooms();

    return (
        <div className='max-h-max flex flex-col items-center justify-between w-full bg-white divide-zinc-200 divide-y-2 border-b-2 border-zinc-200 rounded-tl-md rounded-tr-md text-[#1F2937]'>
            <div className='w-full flex lg:flex-row flex-col p-2.5 gap-4 max-h-max'>
                <div className='h-22 rounded-md shadow-sm bg-zinc-100 lg:w-2/6 w-full'>
                    <img
                        src={
                            currentRoom!.sizeLabel === 'Small'
                                ? '/meetingroom/small.jpg'
                                : currentRoom!.sizeLabel === 'Medium'
                                    ? '/meetingroom/medium.jpg'
                                    : currentRoom!.sizeLabel === 'Large'
                                        ? '/meetingroom/large.jpg'
                                        : '/meetingroom/default.jpg'
                        }
                        alt={currentRoom!.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className='max-h-max rounded-md lg:w-3/6 w-full flex gap-8'>
                    <div className='flex flex-col text-sm gap-1'>
                        <div className='font-bold'>{currentRoom!.name}</div>
                        <div className='font-bold'>{currentRoom!.code}</div>
                        <div className={`font-bold ${String(currentRoom!.status).toLowerCase() === 'available' ? 'text-green-500' : (String(currentRoom!.status).toLowerCase() === 'occupied' ? 'text-[#F59E0B]' : 'text-gray-500')}`}>
                            {String(currentRoom!.status).toLowerCase() === 'available' ? 'Active' : currentRoom!.status}
                        </div>
                        <div></div>
                    </div>
                    <div className='flex flex-col text-sm gap-1'>
                        <div className='font-medium'>Location</div>
                        <div className='font-medium'>Size</div>
                        <div className='font-medium'>No. of Seats</div>
                        <div className='font-medium'>Facilities</div>
                    </div>
                    <div className='flex flex-col text-sm gap-1'>
                        <div>{currentRoom!.location}, Level {currentRoom!.level}</div>
                        <div>{currentRoom!.sizeLabel}</div>
                        <div>{currentRoom!.seats}</div>
                        <div>
                            {currentRoom!.amenities && currentRoom!.amenities.length > 0
                                ? currentRoom!.amenities.join(', ')
                                : 'No amenities'}
                        </div>
                    </div>
                </div>
                <div className='max-h-max rounded-md lg:w-1/6 w-full flex lg:flex-col flex-row gap-2 items-end'>
                    <button className='text-white text-sm bg-[#F59E0B] hover:bg-[#f5740b] flex gap-4 p-2 rounded-md items-center w-25 justify-center transform transition-all duration-300 cursor-pointer' 
                    onClick={() => navigate('/admin/rooms/edit')}>
                        <MdEdit className='size-5 text-white' />
                        Edit
                    </button>
                    <button className='text-white text-sm bg-[#DC2626] hover:bg-[#b71e1e] flex gap-4 p-2 rounded-md items-center w-25 justify-center transform transition-all duration-300 cursor-pointer' 
                    onClick={() => navigate('/admin/rooms/delete')}>
                        <MdDelete className='size-5 text-white' />
                        Delete
                    </button>
                </div>
            </div>
            <div className='w-full max-h-max grid flex-wrap justify-start gap-5 p-2 xl:grid-cols-7 lg:grid-cols-3 grid-cols-1'>
                <div className='h-full lg:col-span-3 flex text-sm items-center justify-start text-[#acb3b9] font-medium'>
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

                <div className='h-full xl:col-span-2 flex w-70 items-center'>
                    <div className='w-full flex items-center border border-zinc-200 rounded-md p-2 bg-[#F3F4F6] focus-within:border-zinc-400'>
                        <input type="text" placeholder='Search' className='outline-none flex-grow text-sm' />
                        <IoSearch className='text-gray-500 size-5' />
                    </div>
                </div>

                {activeTab === 'Calendar' ?
                    <div className='h-full xl:col-span-2 items-center flex gap-4 text-sm'></div> :
                    <div className='h-full xl:col-span-2 items-center flex gap-4 text-sm'>
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