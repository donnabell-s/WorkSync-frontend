import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';
import Input from '../../../../../components/UI/AdminForms/Input';
import { useRooms } from '../../../../../../context/RoomContext';
import type { Room } from '../../../../../../types';


const DeleteRoom: React.FC = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const statuses = ['Active', 'Occupied', 'Under Maintenance'];
    const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'];
    const navigate = useNavigate();
    const { currentRoom, deleteRoom, fetchRooms } = useRooms();

    const [formData, setFormData] = useState<Omit<Room, 'roomId' | 'createdAt' | 'updatedAt'>>({
        name: '',
        code: '',
        location: '',
        level: '',
        sizeLabel: sizes[0],
        seats: 0,
        operatingHours: '',
        status: statuses[0],
        amenities: [],
    });

    useEffect(() => {
        if (currentRoom) {
            setFormData({
                name: currentRoom.name,
                code: currentRoom.code,
                location: currentRoom.location,
                level: String(currentRoom.level ?? ''),
                sizeLabel: currentRoom.sizeLabel,
                seats: currentRoom.seats,
                operatingHours: typeof currentRoom.operatingHours === 'string' ? currentRoom.operatingHours : JSON.stringify(currentRoom.operatingHours ?? {}),
                status: currentRoom.status === 'Available' ? 'Active' : currentRoom.status,
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
    deleteRoom(currentRoom.roomId)
            .then(() => {
                console.log('Room updated successfully');
                return fetchRooms(); // Fetch updated rooms after updating
            })
            .then(() => {
                navigate('/admin/rooms/view'); // After deletion, go back to list
            })
            .catch((error) => {
                console.error('Error updating room:', error);
            });
    };

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/admin/rooms/room-detail'); // Navigate back to room detail
    };

    useEffect(() => {
        if (!currentRoom) {
            navigate('/admin/rooms/view');
        }
    }, [currentRoom, navigate]);

    return (
        <div className='max-h-max flex p-3 px-7 pb-5 flex-col gap-4'>
            <AdminBackLink label='Back to Room Detail' backPath='/admin/rooms/room-detail' />

            <div className='relative max-h-max flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
                <AdminHeading label="DELETE ROOM" />

                <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div className='flex flex-col gap-4'>
                        <Input label='Room Name' name='name' type='text' className='md:col-span-2' value={formData.name} readType='delete' />
                        <Input label='Room Number' name='code' type='text' className='md:col-span-2' value={formData.code} readType='delete' />
                        <Input label='Location' name='location' type='text' className='md:col-span-2' value={formData.location} readType='delete' />
                        <Input label='Floor/Level' name='level' type='number' className='md:col-span-2' value={formData.level.toString()} readType='delete' />
                        <SelectInput label='Size' name='sizeLabel' value={formData.sizeLabel} options={sizes} readType='delete' />
                        <Input label='Seats' name='seats' type='number' className='md:col-span-2' value={(formData.seats ?? 0).toString()} readType='delete' />
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