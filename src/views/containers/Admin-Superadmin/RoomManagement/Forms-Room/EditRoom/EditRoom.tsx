import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import Input from '../../../../../components/UI/AdminForms/Input';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';
import { useRooms } from '../../../../../../context/RoomContext';
import { Room } from '../../../../../../../server/types';

const EditRoom: React.FC = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const statuses = ['Active', 'Inactive', 'Under Maintenance'];
    const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'];
    const navigate = useNavigate();
    const { currentRoom, updateRoom, getRoomById, fetchRooms } = useRooms();

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
            // Normalize legacy statuses to new ones for the dropdown
            const legacy = String(currentRoom.status).toLowerCase();
            const mappedStatus = ['available', 'occupied', 'reserved', 'booked'].includes(legacy)
                ? 'Active'
                : legacy === 'under maintenance'
                    ? 'Under Maintenance'
                    : legacy === 'inactive'
                        ? 'Inactive'
                        : currentRoom.status;
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
                status: mappedStatus,
                amenities: currentRoom.amenities,
            });
        }
    }, [currentRoom]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!currentRoom) {
            console.error('No current room found');
            return;
        }
        updateRoom(currentRoom.id, formData)
            .then(() => {
                console.log('Room updated successfully');
                return fetchRooms(); // Fetch updated rooms after updating
            })
            .then(() => {
                return getRoomById(currentRoom.id); // Fetch the updated room details
            })
            .then(() => {
                navigate('/admin/rooms/room-detail'); // Navigate to room detail after fetching
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
        <div className='h-full min-h-0 flex flex-col px-7 pt-6 pb-8 gap-4'>
            <AdminBackLink label='Back to View Rooms' backPath='/admin/rooms/view' />

            <div className='relative flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
                <AdminHeading label="EDIT ROOM" />

                <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div className='flex flex-col gap-4'>
                        <Input label='Room Name' name='name' type='text' placeholder='Enter Room Name' value={formData.name} className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Room Number' name='code' type='text' placeholder='Enter Room Number' value={formData.code} className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Location' name='location' type='text' placeholder='Enter Location' value={formData.location} className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Floor/Level' name='level' type='number' placeholder='Enter Floor/Level' value={formData.level.toString()} className='md:col-span-2' onChange={handleInputChange} />
                        <SelectInput label='Size' name='size' value={formData.size} options={sizes} onChange={handleSelect} />
                        <Input label='Seats' name='seats' type='number' placeholder='Enter Number of Seats' value={formData.seats.toString()} className='md:col-span-2' onChange={handleInputChange} />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <SelectInput label='Status' name='status' value={formData.status} options={statuses} onChange={handleSelect} />

                        <MultiSelectInput
                            label="Facilities"
                            name="amenities"
                            options={facilities}
                            value={formData.amenities}
                            onChange={(selected) => setFormData(prev => ({
                                ...prev,
                                amenities: selected // Correctly update amenities
                            }))}
                            placeholder="Select facilities"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <AdminButton label='Save' variant='primary' onClick={handleSubmit} />
                        <AdminButton label='Cancel' variant='secondary' onClick={handleBack} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoom;
