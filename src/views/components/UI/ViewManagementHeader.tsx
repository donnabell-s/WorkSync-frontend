import React, { useEffect, useState } from 'react'
import AdminSearch from './AdminSearch'
import AdminButton from './AdminButton'
import { IoAddOutline } from 'react-icons/io5'
// import { rooms } from "./../Feature/RoomListInterface"
import { useRooms } from '../../../context/RoomContext'
import { useBookings } from '../../../context/BookingContext'
import type { Booking as ApiBooking } from '../../../types'
import { useNavigate } from 'react-router'

interface ViewManagementHeaderProps {
    view: 'rooms' | 'bookings';
    setFunction?: React.Dispatch<React.SetStateAction<any[]>>;
}


const ViewManagementHeader: React.FC<ViewManagementHeaderProps> = ({ view, setFunction }) => {

    const navigate = useNavigate();
    const { rooms } = useRooms();
    const bookingsCtx = useBookings();
    // Updated room filters per request
    const roomTabs: string[] = ["All", "Active", "Inactive", "Under Maintenance"];
    const bookingTabs: string[] = ["All", "Approved", "Pending", "Declined"];
    const bookingTabs2: string[] = ["All", "Recurring", "Non-Recurring"];
    const initTab: string = view === "rooms" ? roomTabs[0] : bookingTabs[0];
    const initTab2: string = view === "bookings" ? bookingTabs2[0] : '';
    const [activeTab, setActiveTab] = useState<string>(initTab);
    const [activeTab2, setActiveTab2] = useState<string>(initTab2);
    const [searchQuery, setSearchQuery] = useState<string>('');


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        handleFilter(tab);
        setSearchQuery('');
    }

    const handleTab2Click = (tab: string) => {
        setActiveTab2(tab);
        handleFilter(tab);
        setSearchQuery('');
    }

    const handleFilter = (tab: string) => {
        if (view === "rooms") {
            let filteredRooms = rooms;
            if (tab !== "All" && roomTabs.includes(tab)) {
                const t = tab.toLowerCase();
                if (t === 'active') {
                    // Show rooms that are available (backend value), UI label is Active
                    filteredRooms = rooms.filter(room => String(room.status).toLowerCase() === 'available');
                } else if (t === 'inactive') {
                    filteredRooms = rooms.filter(room => String(room.status).toLowerCase() === 'inactive');
                } else if (t === 'under maintenance') {
                    filteredRooms = rooms.filter(room => String(room.status).toLowerCase() === 'under maintenance');
                }
            }
            setFunction?.(filteredRooms);
        } else {
            const allBookings = bookingsCtx.bookings as ApiBooking[];
            let filteredBookings: ApiBooking[] = allBookings;
            if (tab !== "All") {
                if (bookingTabs.includes(tab)) {
                    filteredBookings = allBookings.filter(b => String(b.status).toLowerCase() === tab.toLowerCase());
                }
                if (bookingTabs2.includes(tab)) {
                    const isRecurring = tab.toLowerCase() === 'recurring';
                    filteredBookings = filteredBookings.filter(b => Boolean(b.recurrence) === isRecurring);
                }
            }
            setFunction?.(filteredBookings as any[]);
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        if (view === "rooms") {
            let filteredRooms = rooms;
            if (value !== "") {
                filteredRooms = rooms.filter(room => {
                    const roomDetails = `${room.code} ${room.name} ${room.location}`.toLowerCase();
                    return roomDetails.includes(value.toLowerCase());
                });
            }
            setFunction?.(filteredRooms);
        } else {
            const allBookings = bookingsCtx.bookings as ApiBooking[];
            let filteredBookings: ApiBooking[] = allBookings;
            if (value !== "") {
                filteredBookings = allBookings.filter(booking => {
                    const bookingDetails = `${booking.bookingId} ${booking.title} ${(booking.room?.location ?? '')}`.toLowerCase();
                    return bookingDetails.includes(value.toLowerCase());
                });
            }
            setFunction?.(filteredBookings as any[]);
        }
    }

    const handleAddBooking = () => {
        navigate('/admin/bookings/add');
    }

    const handleAddRoom = () => {
        navigate('/admin/rooms/add');
    }

    useEffect(() => {
        if (!setFunction) return;
        if (view === 'rooms') {
            setFunction(rooms);
        } else if (view === 'bookings') {
            setFunction(bookingsCtx.bookings as any[]);
        }
    }, [rooms, bookingsCtx.bookings, setFunction, view]);

    return (
        <div className='divide-y-1 divide-[#D2D4D8]'>
            <div className={`p-3 ${view === 'bookings' ? 'flex gap-5' : ''}`}>
                <div className='bg-[#F3F4F6] p-1 rounded-md flex flex-wrap gap-2 max-w-max'>
                    {
                        view === 'rooms' ? roomTabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`px-5 py-2 rounded-md text-sm font-semibold cursor-pointer ${activeTab === tab ? 'bg-white text-[#2563EB]' : 'text-[#374151] hover:bg-[#E5E7EB]'}`}
                                onClick={() => handleTabClick(tab)}>
                                {tab}
                            </button>
                        )) : bookingTabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`px-5 py-2 rounded-md text-sm font-semibold cursor-pointer ${activeTab === tab ? 'bg-white text-[#2563EB]' : 'text-[#374151] hover:bg-[#E5E7EB]'}`}
                                onClick={() => handleTabClick(tab)}>
                                {tab}
                            </button>
                        ))
                    }
                </div>
                {
                    view === 'bookings' ? <div className='bg-[#F3F4F6] p-1 rounded-md flex flex-wrap gap-2 max-w-max'>
                        {
                            bookingTabs2.map((tab, index) => (
                                <button
                                    key={index}
                                    className={`px-5 py-2 rounded-md text-sm font-semibold cursor-pointer ${activeTab2 === tab ? 'bg-white text-[#2563EB]' : 'text-[#374151] hover:bg-[#E5E7EB]'}`}
                                    onClick={() => handleTab2Click(tab)}>
                                    {tab}
                                </button>
                            ))
                        }
                    </div> : null
                }
            </div>
            <div className='flex sm:flex-row flex-col p-3 justify-between gap-3'>
                <div className='flex md:flex-row flex-col gap-4 items-center flex-1 w-full'>
                    <AdminSearch value={searchQuery} onChange={handleSearchChange} />
                </div>
                                {
                                        view === "rooms" ?
                                                <AdminButton
                                                    label="Add Room"
                                                    icon={<IoAddOutline className='size-5 font-bold' />}
                                                    variant='primary'
                                                    onClick={handleAddRoom}
                                                /> :
                                                <AdminButton
                                                    label="Create Booking"
                                                    icon={<IoAddOutline className='size-5 font-bold' />}
                                                    variant='primary'
                                                    onClick={handleAddBooking}
                                                />
                                }
            </div>
        </div>
    )
}

export default ViewManagementHeader