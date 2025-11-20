import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useRooms } from '../../../../../context/RoomContext';

interface ViewRoomHeaderProps {
    activeTab: string;
    handleTabClick: (tab: string) => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    selectedWeek?: Date;
    onWeekChange?: (date: Date) => void;
    selectedStatus?: string;
    onStatusChange?: (status: string) => void;
}

const ViewRoomHeader: React.FC<ViewRoomHeaderProps> = ({
    activeTab,
    handleTabClick,
    searchQuery = '',
    onSearchChange,
    selectedWeek,
    onWeekChange,
    selectedStatus = 'all',
    onStatusChange
}) => {
    const navigate = useNavigate();
    const { currentRoom } = useRooms();

    // Generate week options (current week and previous 12 weeks)
    const generateWeekOptions = () => {
        const weeks = [];
        const today = new Date();
        for (let i = 0; i < 13; i++) {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - (today.getDay() + (i * 7)));
            weeks.push(weekStart);
        }
        return weeks;
    };

    const formatWeekRange = (date: Date) => {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(start.getDate() + 6);

        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    return (
        <div className='max-h-max flex flex-col items-center justify-between w-full bg-white divide-zinc-200 divide-y-2 border-b-2 border-zinc-200 rounded-tl-md rounded-tr-md text-[#1F2937]'>
            <div className='w-full flex lg:flex-row flex-col p-2.5 gap-4 max-h-max'>
                <div className='h-22 rounded-md shadow-sm bg-zinc-100 lg:w-2/6 w-full'>
                    {currentRoom ? (
                        <img
                            src={currentRoom.imageUrl && currentRoom.imageUrl.length > 0 ? currentRoom.imageUrl : (
                                currentRoom.sizeLabel === 'Small'
                                    ? '/meetingroom/small.jpg'
                                    : currentRoom.sizeLabel === 'Medium'
                                        ? '/meetingroom/medium.jpg'
                                        : currentRoom.sizeLabel === 'Large'
                                            ? '/meetingroom/large.jpg'
                                            : '/meetingroom/default.jpg')}
                            alt={currentRoom.name}
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No room selected</div>
                    )}
                </div>
                <div className='max-h-max rounded-md lg:w-3/6 w-full flex gap-8'>
                    <div className='flex flex-col text-sm gap-1'>
                        <div className='font-bold'>{currentRoom ? currentRoom.name : 'No room selected'}</div>
                        <div className='font-bold'>{currentRoom ? currentRoom.code : ''}</div>
                        <div className={`font-bold ${currentRoom && String(currentRoom.status).toLowerCase() === 'active' ? 'text-green-500' : (currentRoom && String(currentRoom.status).toLowerCase() === 'occupied' ? 'text-[#F59E0B]' : 'text-gray-500')}`}> 
                            {currentRoom ? (String(currentRoom.status).toLowerCase() === 'active' ? 'Active' : currentRoom.status) : ''}
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
                        <div>{currentRoom ? `${currentRoom.location}, Level ${currentRoom.level}` : ''}</div>
                        <div>{currentRoom ? currentRoom.sizeLabel : ''}</div>
                        <div>{currentRoom ? currentRoom.seats : ''}</div>
                        <div>
                            {currentRoom && currentRoom.amenities && currentRoom.amenities.length > 0
                                ? currentRoom.amenities.join(', ')
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

                <div className='h-full w-full flex gap-4 items-center'>
                    <div className='flex items-center border border-zinc-200 rounded-md p-2 bg-[#F3F4F6] focus-within:border-zinc-400'>
                        <input
                            type="text"
                            placeholder='Search by meeting name'
                            className='outline-none flex-grow text-sm bg-transparent w-50'
                            value={searchQuery}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                        />
                        <IoSearch className='text-gray-500 size-5' />
                    </div>

                    {activeTab === 'Calendar' ?
                        <div className='h-full xl:col-span-2 items-center flex gap-4 text-sm'></div> :
                        <div className='h-full w-full items-center flex gap-4 text-sm'>
                            <p className=''>Filter by:</p>

                            {/* Week Filter */}
                            <select
                                className='border border-zinc-200 rounded-md p-2 bg-[#F3F4F6] focus:border-zinc-400 px-6 cursor-pointer justify-start'
                                value={selectedWeek?.toISOString() || ''}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        onWeekChange?.(new Date(e.target.value) || undefined);
                                    }
                                }}
                            >
                                <option value="">All Time</option>
                                {generateWeekOptions().map((week, index) => (
                                    <option key={index} value={week.toISOString()}>
                                        {index === 0 ? 'This Week' : formatWeekRange(week)}
                                    </option>
                                ))}
                            </select>

                            {/* Status Filter (only for Reservations tab) */}
                            {activeTab === 'Reservations' && (
                                <select
                                    className='border border-zinc-200 rounded-md p-2 bg-[#F3F4F6] focus:border-zinc-400 px-6 cursor-pointer justify-start'
                                    value={selectedStatus}
                                    onChange={(e) => onStatusChange?.(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="declined">Declined</option>
                                </select>
                            )}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default ViewRoomHeader