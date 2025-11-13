import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminButton from '../../../../../components/UI/AdminButton';
import AdminBackLink from '../../../../../components/UI/AdminBackLink';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import Input from '../../../../../components/UI/AdminForms/Input';
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput';
import OperatingHoursInput from '../../../../../components/UI/AdminForms/OperatingHoursInput';
import MultiSelectInput from '../../../../../components/UI/AdminForms/MultiSelectInput';
import { useRooms } from '../../../../../../context/RoomContext';
import type { Room } from '../../../../../../types';

const EditRoom: React.FC = () => {
    const sizes = ['Small', 'Medium', 'Large'];
    const statuses = ['Active', 'Occupied', 'Under Maintenance', 'Inactive'];
    const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'];
    const navigate = useNavigate();
    const { currentRoom, updateRoom, getRoomById, fetchRooms } = useRooms();

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

    // Local state for image upload + preview
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

    useEffect(() => {
        if (currentRoom) {
            // Map backend 'Available' to UI 'Active'
            const mappedStatus = currentRoom.status === 'Available' ? 'Active' : currentRoom.status;
            setFormData({
                name: currentRoom.name,
                code: currentRoom.code,
                location: currentRoom.location,
                level: String(currentRoom.level ?? ''),
                sizeLabel: currentRoom.sizeLabel,
                seats: currentRoom.seats,
                operatingHours: typeof currentRoom.operatingHours === 'string' ? currentRoom.operatingHours : JSON.stringify(currentRoom.operatingHours ?? {}),
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
        console.log('EditRoom submit:', { id: currentRoom.roomId, formData }, imageFile ? '(with file)' : '(no file)');
    updateRoom(currentRoom.roomId, formData as any, imageFile)
            .then(() => {
                console.log('Room updated successfully');
                return fetchRooms(); // Fetch updated rooms after updating
            })
            .then(() => {
                return getRoomById(currentRoom.roomId); // Fetch the updated room details
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
        navigate('/admin/rooms/room-detail'); // Navigate back to room detail
    };

    useEffect(() => {
        if (!currentRoom) {
            navigate('/admin/rooms/view');
        }
    }, [currentRoom, navigate]);

    return (
        <div className='h-full min-h-0 flex flex-col px-7 pt-6 pb-8 gap-4'>
            <AdminBackLink label='Back to Room Detail' backPath='/admin/rooms/room-detail' />

            <div className='relative flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
                <AdminHeading label="EDIT ROOM" />

                <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                    <div className='flex flex-col gap-4'>
                        <Input label='Room Name' name='name' type='text' placeholder='Enter Room Name' value={formData.name} className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Room Number' name='code' type='text' placeholder='Enter Room Number' value={formData.code} className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Location' name='location' type='text' placeholder='Enter Location' value={formData.location} className='md:col-span-2' onChange={handleInputChange} />
                        <Input label='Floor/Level' name='level' type='text' placeholder='Enter Floor/Level' value={formData.level} className='md:col-span-2' onChange={handleInputChange} />
                        <SelectInput label='Size' name='sizeLabel' value={formData.sizeLabel} options={sizes} onChange={handleSelect} />
                        <Input label='Seats' name='seats' type='number' placeholder='Enter Number of Seats' value={(formData.seats ?? 0).toString()} className='md:col-span-2' onChange={handleInputChange} />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <SelectInput label='Status' name='status' value={formData.status} options={statuses} onChange={handleSelect} />

                                                                        <OperatingHoursInput
                                                                            value={formData.operatingHours}
                                                                            onChange={(val) => setFormData(prev => ({ ...prev, operatingHours: JSON.stringify(val) }))}
                                                                        />

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
                </div>
            </div>
        </div>
    );
};

export default EditRoom;
