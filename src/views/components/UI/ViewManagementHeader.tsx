import React, { useEffect, useState } from 'react'
import AdminSearch from './AdminSearch'
import AdminFilter from './AdminFilter'
import AdminButton from './AdminButton'
import { IoAddOutline } from 'react-icons/io5'
// import { rooms } from "./../Feature/RoomListInterface"
import { useRooms } from '../../../context/RoomContext'
import { sampleBookingList as bookings } from '../Feature/UserBookingListInterface'
import { useNavigate } from 'react-router'

interface ViewManagementHeaderProps {
    view: 'rooms' | 'bookings';
    setFunction?: React.Dispatch<React.SetStateAction<any[]>>;
}


const ViewManagementHeader: React.FC<ViewManagementHeaderProps> = ({ view, setFunction }) => {

    const navigate = useNavigate();
    const { rooms } = useRooms();
    const roomTabs: string[] = ["All", "Available", "Occupied", "Under Maintenance", "Reserved"];
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
        let filtered = view === "rooms" ? rooms : bookings;

        if (view === "rooms") {
            if (tab === "All") {
                filtered = rooms;
            } else {
                for (const roomTab of roomTabs) {
                    if (tab === roomTab) {
                        filtered = rooms.filter(room => room.status === roomTab.toLowerCase());
                        break;
                    }
                }
            }
        } else {
            for (const bookingTab of bookingTabs) {
                if (tab === "All") {
                    filtered = bookings;
                    break;
                }
                else if (tab === bookingTab) {
                    filtered = bookings.filter(booking => booking.status.toLowerCase() === bookingTab.toLowerCase());
                    break;
                }
            }

            for (const bookingTab of bookingTabs2) {
                if (tab === "All") {
                    filtered = filtered;
                }
                else if (tab === bookingTab) {
                    filtered = filtered.filter(booking => booking.recurrence.toLowerCase() === bookingTab.toLowerCase());
                    break;
                }
            }
        }

        if (setFunction) {
            setFunction(filtered);
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        let filtered = view === "rooms" ? rooms : bookings;
        if (view === "rooms") {
            if (event.target.value === "") {
                filtered = rooms;
            } else {
                filtered = rooms.filter(room => {
                    const roomDetails = `${room.code} ${room.name} ${room.location}`.toLowerCase();
                    return roomDetails.includes(event.target.value.toLowerCase());
                });
            }
        } else {
            filtered = bookings.filter(booking => {
                const bookingDetails = `${booking.id} ${booking.name} ${booking.location}`.toLowerCase();
                return bookingDetails.includes(event.target.value.toLowerCase());
            });
        }
        console.log('filter rooms: ' + filtered);
        if (setFunction) {
            setFunction(filtered);
        }
    }

    const handleAddBooking = () => {
        navigate('/admin/bookings/add');
    }

    const handleAddRoom = () => {
        navigate('/admin/rooms/add');
    }

    useEffect(() => {
        let filtered = view === "rooms" ? rooms : bookings;

        if (view === "rooms") {
            filtered = rooms.filter(room => {
                const roomDetails = `${room.code} ${room.name} ${room.location}`.toLowerCase();
                return roomDetails.includes(searchQuery.toLowerCase());
            });
        } else {
            filtered = bookings.filter(booking => {
                const bookingDetails = `${booking.id} ${booking.name} ${booking.location}`.toLowerCase();
                return bookingDetails.includes(searchQuery.toLowerCase());
            });
        }

        if (setFunction) {
            setFunction(filtered);
        }
    }, [searchQuery]);

    return (
        <div>
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
                <div className='flex md:flex-row flex-col gap-4 items-center'>
                    <AdminSearch value={searchQuery} onChange={handleSearchChange} />
                    <AdminFilter onChange={() => { }} filters={['All']} />
                </div>
                {
                    view === "rooms" ?
                        <AdminButton label="Add Room" icon={<IoAddOutline className='size-5 font-bold' />} onClick={handleAddRoom} /> :
                        <AdminButton label="Create Booking" icon={<IoAddOutline className='size-5 font-bold' onClick={handleAddBooking} />} />
                }
            </div>
        </div>
    )
}

export default ViewManagementHeader