import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomFormLayout from '../../../../../components/Layout/RoomFormLayout/RoomFormLayout';

const AddRoom: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        roomName: '',
        roomNumber: '',
        location: '',
        floor: '',
        size: '',
        seats: '',
        status: 'Available',
        facilities: [] as string[],
        image: null as File | null,
        imagePreview: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'facilities') {
            const target = e.target as HTMLSelectElement;
            const selectedFacilities = Array.from(
                target.selectedOptions,
                option => option.value
            );
            setFormData({ ...formData, [name]: selectedFacilities });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0],
                imagePreview: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSubmit = () => {
        console.log('New Room Data:', formData);
        navigate('/admin/room-management');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1">
                <div className="p-6">
                    <div className="text-blue-600 font-bold cursor-pointer mb-4" onClick={() => navigate('/admin/rooms/view')}>
                        {'<  Back to View Rooms'}
                    </div>
                    <div className="bg-white p-10 rounded-lg shadow-md mt-4">
                        <h2 className="text-4xl font-bold mb-6">ADD ROOM</h2>
                        <RoomFormLayout
                            mode="add"
                            formData={formData}
                            onInputChange={handleInputChange}
                            onImageChange={handleImageChange}
                            onSubmit={handleSubmit}
                            onCancel={() => navigate('/admin/room-management')}
                            readOnly={false}
                        >
                            <button
                                onClick={handleSubmit}
                                className="w-32 bg-blue-600 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-blue-700 !min-w-[128px] !h-12"
                            >
                                SAVE
                            </button>
                            <button
                                className="w-32 bg-gray-400 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-gray-500 !min-w-[128px] !h-12"
                                onClick={() => navigate('/admin/room-management')}
                            >
                                CANCEL
                            </button>
                        </RoomFormLayout>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRoom;