import React, { useEffect, useMemo, useState } from 'react'
import AdminSearch from '../AdminSearch';
import AdminFilter from '../AdminFilter';
import AdminButton from '../AdminButton';
import { meetingRooms, type MeetingRoom } from '../../Feature/RoomListInterface';
import RoomModalItem from '../../Feature/RoomModalItem';
import { useRooms } from '../../../../context/RoomContext';

interface RoomModalProps {
    closeFunction: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value: string;
    selectFunction: (event: React.MouseEvent<HTMLButtonElement>, room: string) => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ closeFunction, value, selectFunction }) => {
    const filters = ['Small', 'Medium', 'Large'];
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { rooms } = useRooms();
    // Map live rooms to MeetingRoom display shape and filter to active/available only
    const liveRooms: MeetingRoom[] = useMemo(() => {
        if (!rooms || rooms.length === 0) return [];
        return rooms
            .filter(r => String(r.status).toLowerCase() === 'available' || String(r.status).toLowerCase() === 'active')
            .map(r => ({
                roomCode: r.code,
                roomName: r.name,
                location: `${r.location}${r.level ? `, Level ${r.level}` : ''}`,
                size: (r.sizeLabel as any) ?? 'Medium',
                numberOfSeats: r.seats ?? 0,
                additionalFacilities: r.amenities ?? [],
                imageFile: r.sizeLabel?.toLowerCase() === 'small' ? 'small.jpg' : r.sizeLabel?.toLowerCase() === 'large' ? 'large.jpg' : 'medium.jpg',
                status: 'available',
            }));
    }, [rooms]);

    const [filteredRooms, setFilteredRooms] = useState<MeetingRoom[]>([]);
    const [selected, setSelected] = useState<string>('');

    const handleSelection = (room: string) => {
        setSelected(room);
    }

    const handleFilterRooms = (filter: string) => {
        let source = liveRooms.length > 0 ? liveRooms : meetingRooms;
        let filtered = source;
        if (filter === 'Small' || filter === 'Medium' || filter === 'Large') {
            filtered = source.filter(room => room.size === filter);
        }
        setFilteredRooms(filtered);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const q = event.target.value;
        setSearchQuery(q);
        const source = liveRooms.length > 0 ? liveRooms : meetingRooms;
        const filtered = source.filter(room => {
            const roomDetails = `${room.roomCode} ${room.roomName} ${room.location}`.toLowerCase();
            return roomDetails.includes(q.toLowerCase());
        });
        setFilteredRooms(filtered);
    }

    useEffect(() => {
        if (value !== '') {
            setSelected(value);
        }
        const source = liveRooms.length > 0 ? liveRooms : meetingRooms;
        const filtered = source.filter(room => {
            const roomDetails = `${room.roomCode} ${room.roomName} ${room.location}`.toLowerCase();
            return roomDetails.includes(searchQuery.toLowerCase());
        });
        setFilteredRooms(filtered);
    }, [searchQuery, value, liveRooms]);

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