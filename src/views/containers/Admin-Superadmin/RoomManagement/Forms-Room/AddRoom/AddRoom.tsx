import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import Input from '../../../../../components/UI/AdminForms/Input';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';
import OperatingHoursInput from '../../../../../components/UI/AdminForms/OperatingHoursInput';
import { useRooms } from '../../../../../../context/RoomContext';
// Local form type; service maps to backend shape (sizeLabel/status/etc.)
interface AddRoomForm {
    name: string;
    code: string;
    location: string;
    level: string; // stored as string; service normalizes as needed
    size: 'Small' | 'Medium' | 'Large';
    seats: number;
    status: 'Active' | 'Inactive' | 'Under Maintenance';
    amenities: string[];
    operatingHours: {
        weekdays: { open: string; close: string };
        weekends: { open: string; close: string };
    };
    imageUrl?: string;
}

const AddRoom: React.FC = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const statuses = ['Active', 'Inactive', 'Under Maintenance'];
    const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'];
    const { addRoom } = useRooms();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AddRoomForm>({
        name: '',
        code: '',
        location: '',
        level: '',
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

    // Image selection state for upload + preview
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [imageError, setImageError] = useState<string>("");

    const isValidImage = (file: File) => {
        const allowed = ['image/jpeg','image/png','image/gif','image/webp'];
        const max = 5 * 1024 * 1024; // 5MB
        return allowed.includes(file.type) && file.size <= max;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageError("");
        setImageFile(null);
        if (file) {
            if (!isValidImage(file)) {
                setImageError('Please select a JPG/PNG/GIF/WEBP up to 5 MB.');
                setImagePreview("");
                return;
            }
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        } else {
            setImagePreview("");
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name === 'seats') return { ...prev, seats: Number(value) || 0 };
            if (name === 'level') return { ...prev, level: value };
            if (name === 'name' || name === 'code' || name === 'location') {
                return { ...prev, [name]: value } as AddRoomForm;
            }
            return { ...prev, [name]: value } as AddRoomForm;
        });
    };

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value } as AddRoomForm));
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log('AddRoom submit:', formData, imageFile ? '(with file)' : '(no file)');
        addRoom(formData as any, imageFile)
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

                                                <OperatingHoursInput
                                                    value={formData.operatingHours as any}
                                                    onChange={(val) => setFormData(prev => ({ ...prev, operatingHours: val as any }))}
                                                />

                        <MultiSelectInput
                            label="Facilities"
                            name="amenities"
                            options={facilities}
                            value={formData.amenities}
                            onChange={(selected) => setFormData(prev => ({
                                ...prev,
                                amenities: selected
                            }))}
                            placeholder="Select facilities"
                        />

                        {/* Room Image */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-bold text-[#1F2937]'>
                                Room Image <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2'
                            />
                            {imageError && (<span className='text-xs text-red-600'>{imageError}</span>)}
                            {imagePreview && (
                                <div className='mt-2'>
                                    <img
                                        src={imagePreview}
                                        alt='Room Preview'
                                        className='w-40 h-40 object-cover rounded-md border'
                                    />
                                </div>
                            )}
                        </div>
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