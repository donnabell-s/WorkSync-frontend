import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';
import Input from '../../../../../components/UI/AdminForms/Input';
import { useRooms } from '../../../../../../context/RoomContext';
import { Room } from '../../../../../../../server/types';


const DeleteRoom: React.FC = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const statuses = ['Available', 'Occupied', 'Under Maintenance'];
    const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'];
    const navigate = useNavigate();
    const { currentRoom, deleteRoom, fetchRooms } = useRooms();

    const [formData, setFormData] = useState<Omit<Room, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        code: '',
        location: '',
        level: 0,
        size: sizes[0],
        seats: 0,
        operatingHours: {
            weekdays: {
                open: '',
                close: '',
            },
            weekends: {
                open: '',
                close: '',
            },
        },
        status: statuses[0],
        amenities: [],
    });

    useEffect(() => {
        if (currentRoom && currentRoom.operatingHours) {
            setFormData({
                name: currentRoom.name,
                code: currentRoom.code,
                location: currentRoom.location,
                level: currentRoom.level,
                size: currentRoom.size,
                seats: currentRoom.seats,
                operatingHours: {
                    weekdays: {
                        open: currentRoom.operatingHours.weekdays.open,
                        close: currentRoom.operatingHours.weekdays.close,
                    },
                    weekends: {
                        open: currentRoom.operatingHours.weekends.open,
                        close: currentRoom.operatingHours.weekends.close,
                    },
                },
                status: currentRoom.status,
                amenities: currentRoom.amenities,
            });
        }
    }, [currentRoom]);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!currentRoom) {
            console.error('No current room found');
            return;
        }
        deleteRoom(currentRoom.id)
            .then(() => {
                console.log('Room updated successfully');
                return fetchRooms(); // Fetch updated rooms after updating
            })
            .then(() => {
                navigate('/admin/rooms/view'); // Navigate to room detail after fetching
            })
            .catch((error) => {
                console.error('Error updating room:', error);
            });
    };

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/admin/rooms/view'); // Navigate back to view rooms
    };

    useEffect(() => {
        if (!currentRoom) {
            navigate('/admin/rooms/view');
        }
    }, [currentRoom, navigate]);

    return (
        <div className='max-h-max flex p-3 px-7 pb-5 flex-col gap-4'>
            <AdminBackLink label='Back to View Rooms' backPath='/admin/rooms/view' />

            <div className='relative max-h-max flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
                <AdminHeading label="DELETE ROOM" />

                <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div className='flex flex-col gap-4'>
                        <Input label='Room Name' name='name' type='text' className='md:col-span-2' value={formData.name} readType='delete' />
                        <Input label='Room Number' name='code' type='text' className='md:col-span-2' value={formData.code} readType='delete' />
                        <Input label='Location' name='location' type='text' className='md:col-span-2' value={formData.location} readType='delete' />
                        <Input label='Floor/Level' name='level' type='number' className='md:col-span-2' value={formData.level.toString()} readType='delete' />
                        <SelectInput label='Size' name='size' value={formData.size} options={sizes} readType='delete' />
                        <Input label='Seats' name='seats' type='number' className='md:col-span-2' value={formData.seats.toString()} readType='delete' />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <SelectInput label='Status' name='status' value={formData.status} options={statuses} readType='delete' />

                        <MultiSelectInput
                            label="Facilities"
                            name="amenities"
                            options={facilities}
                            value={formData.amenities}
                            readType='delete'
                        />
                    </div>

                    <div className='flex gap-4'>
                        <AdminButton label='Delete' variant='primary' onClick={handleSubmit} />
                        <AdminButton label='Cancel' variant='secondary' onClick={handleBack} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteRoom;