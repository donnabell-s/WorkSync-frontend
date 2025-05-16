import React, { useEffect, useState } from 'react'
import AdminSearch from '../AdminSearch';
import AdminFilter from '../AdminFilter';
import AdminButton from '../AdminButton';
import { meetingRooms } from '../../Feature/RoomListInterface';
import RoomModalItem from '../../Feature/RoomModalItem';

interface RoomModalProps {
    closeFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value: string;
    selectFunction: (event: React.MouseEvent<HTMLButtonElement>, room: string) => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ closeFunction, value, selectFunction }) => {

    const filters = ['Small', 'Medium', 'Large'];
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredRooms, setFilteredRooms] = useState(meetingRooms);
    const [selected, setSelected] = useState<string>('');

    const handleSelection = (room: string) => {
        setSelected(room);
    }

    const handleFilterRooms = (filter: string) => {
        let filtered = meetingRooms;
        switch (filter) {
            case "Small":
                filtered = meetingRooms.filter(room => room.size === "Small");
                break;
            case "Medium":
                filtered = meetingRooms.filter(room => room.size === "Medium");
                break;
            case "Large":
                filtered = meetingRooms.filter(room => room.size === "Large");
                break;
            default:
                filtered = meetingRooms;
        }
        setFilteredRooms(filtered);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        const filtered = meetingRooms.filter(room => {
            const roomDetails = `${room.roomCode} ${room.roomName} ${room.location}`.toLowerCase();
            return roomDetails.includes(event.target.value.toLowerCase());
        });
        setFilteredRooms(filtered);
    }

    useEffect(() => {
        if (value !== '') {
            setSelected(value);
        }
        
        const filtered = meetingRooms.filter(room => {
            const roomDetails = `${room.roomCode} ${room.roomName} ${room.location}`.toLowerCase();
            return roomDetails.includes(searchQuery.toLowerCase());
        });
        setFilteredRooms(filtered);
    }, [searchQuery]);

    return (
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50 rounded-md'>
            <div className='bg-white rounded-md shadow-md w-[90%] relative'>
                <div>
                    <div className='flex gap-4 bg-white p-3 rounded-md'>
                        <AdminSearch value={searchQuery} onChange={handleSearchChange} />
                        <AdminFilter onChange={handleFilterRooms} filters={filters} />
                    </div>
                    <div className='h-90 bg-[#EAECEF] p-3 rounded-md overflow-y-auto'>
                        {
                            filteredRooms.length > 0 ? (
                                <div className='flex flex-col gap-4'>
                                    {
                                        filteredRooms.map((room, index) => (
                                            <RoomModalItem key={index} room={room} onClick={handleSelection} selected={selected} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className='text-center text-gray-500'>No rooms found</p>
                            )
                        }
                    </div>
                    <div className='flex gap-5 p-3'>
                        <AdminButton label='Confirm' variant='primary' onClick={(event) => {selectFunction(event, selected)}} />
                        <AdminButton label='Cancel' variant='secondary' onClick={closeFunction} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomModal