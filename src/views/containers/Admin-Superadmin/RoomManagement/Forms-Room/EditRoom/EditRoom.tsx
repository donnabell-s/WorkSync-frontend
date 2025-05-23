import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import Input from '../../../../../components/UI/AdminForms/Input';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';

const EditRoom: React.FC = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const statuses = ['Available', 'Occupied', 'Under Maintenance'];
    const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        roomName: '',
        roomNumber: '',
        location: '',
        floor: '',
        size: 'Small',
        seats: '',
        status: 'Available',
        facilities: [] as string[],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // navigate('/admin/bookings/view');
        console.log('Form Data:', formData);
    }

    return (
        <div className='max-h-max flex p-3 px-7 pb-5 flex-col gap-4'>
            <AdminBackLink label='Back to View Rooms' backPath='/admin/rooms/view' />

            <div className='relative max-h-max flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
                <AdminHeading label="EDIT ROOM" />

                <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div className='flex flex-col gap-4'>
                        <Input label='Room Name' name='roomName' type='text' placeholder='Enter Room Name' className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Room Number' name='roomNumber' type='text' placeholder='Enter Room Number' className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Location' name='location' type='text' placeholder='Enter Location' className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Floor/Level' name='floor' type='text' placeholder='Enter Floor/Level' className='md:col-span-2' onChange={handleInputChange} />
                        <SelectInput label='Size' name='size' value={formData.size} options={sizes} onChange={handleSelect} />
                        <Input label='Seats' name='seats' type='number' placeholder='Enter Number of Seats' className='md:col-span-2' onChange={handleInputChange} />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <SelectInput label='Status' name='status' value={formData.status} options={statuses} onChange={handleSelect} />

                        <MultiSelectInput
                            label="Facilities"
                            name="facilities"
                            options={facilities}
                            value={formData.facilities}
                            onChange={(selected) => setFormData(prev => ({
                                ...prev,
                                facilities: selected
                            }))}
                            placeholder="Select facilities"
                        />
                    </div>

                    <div className='flex gap-4'>
                        <AdminButton label='Save' variant='primary' onClick={handleBack} />
                        <AdminButton label='Cancel' variant='secondary' onClick={handleBack} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRoom;