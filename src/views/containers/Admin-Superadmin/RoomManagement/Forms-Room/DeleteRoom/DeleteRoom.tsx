import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';
import Input from '../../../../../components/UI/AdminForms/Input';


const DeleteRoom: React.FC = () => {
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

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // navigate('/admin/bookings/view');
        console.log('Form Data:', formData);
    }

    return (
        <div className='max-h-max flex p-3 px-7 pb-5 flex-col gap-4'>
            <AdminBackLink label='Back to View Bookings' backPath='/admin/bookings/view' />

            <div className='relative max-h-max flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
                <AdminHeading label="DELETE ROOM" />

                <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div className='flex flex-col gap-4'>
                        <Input label='Room Name' name='roomName' type='text' className='md:col-span-2' readType='delete' />
                        <Input label='Room Number' name='roomNumber' type='text' className='md:col-span-2' readType='delete' />
                        <Input label='Location' name='location' type='text' className='md:col-span-2' readType='delete' />
                        <Input label='Floor/Level' name='floor' type='text' className='md:col-span-2' readType='delete' />
                        <SelectInput label='Size' name='size' value={formData.size} options={sizes} readType='delete' />
                        <Input label='Seats' name='seats' type='number' className='md:col-span-2' readType='delete' />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <SelectInput label='Status' name='status' value={formData.status} options={statuses} readType='delete' />

                        <MultiSelectInput
                            label="Facilities"
                            name="facilities"
                            options={facilities}
                            value={formData.facilities}
                             readType='delete'
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

export default DeleteRoom;