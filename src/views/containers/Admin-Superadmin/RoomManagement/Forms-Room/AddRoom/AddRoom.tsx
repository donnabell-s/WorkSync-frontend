import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import Input from '../../../../../components/UI/AdminForms/Input';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';
import { useRooms } from '../../../../../../context/RoomContext';
import { Room } from '../../../../../../../server/types';

const AddRoom: React.FC = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const statuses = ['Active', 'Inactive', 'Under Maintenance'];
    const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'];
    const { addRoom } = useRooms();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Omit<Room, 'id' | 'createdAt' | 'updatedAt'>>({
        name: '',
        code: '',
        location: '',
        level: 0,
        size: 'Small',
        seats: 0,
    status: 'Active',
        amenities: [],
        operatingHours: {
            weekdays: {
                open: '09:00',
                close: '17:00',
            },
            weekends: {
                open: '10:00',
                close: '16:00',
            },
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        addRoom(formData)
            .then(() => {
                console.log('Room added successfully');
                navigate('/admin/rooms/view');
            })
            .catch((error) => {
                console.error('Error adding room:', error);
            });
    }

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/admin/rooms/view');
    }

    return (
        <div className='min-h-0 flex flex-col px-7 pt-6 pb-8 gap-4'>
            <AdminBackLink label='Back to View Rooms' backPath='/admin/rooms/view' />

            <div className='relative flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
                <AdminHeading label="ADD ROOM" />

                <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div className='flex flex-col gap-4'>
                        <Input label='Room Name' name='name' type='text' placeholder='Enter Room Name' className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Room Number' name='code' type='text' placeholder='Enter Room Number' className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Location' name='location' type='text' placeholder='Enter Location' className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Floor/Level' name='level' type='text' placeholder='Enter Floor/Level' className='md:col-span-2' onChange={handleInputChange} />
                        <SelectInput label='Size' name='size' value={formData.size} options={sizes} onChange={handleSelect} />
                        <Input label='Seats' name='seats' type='number' placeholder='Enter Number of Seats' className='md:col-span-2' onChange={handleInputChange} />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <SelectInput label='Status' name='status' value={formData.status} options={statuses} onChange={handleSelect} />

                        <MultiSelectInput
                            label="amenities"
                            name="amenities"
                            options={facilities}
                            value={formData.amenities}
                            onChange={(selected) => setFormData(prev => ({
                                ...prev,
                                amenities: selected
                            }))}
                            placeholder="Select amenities"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <AdminButton label='Save' variant='primary' onClick={handleSubmit} />
                        <AdminButton label='Cancel' variant='secondary' onClick={handleBack} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRoom;