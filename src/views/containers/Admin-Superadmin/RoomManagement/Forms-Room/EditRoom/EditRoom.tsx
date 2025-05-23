import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomFormLayout from '../../../../../components/Layout/RoomFormLayout/RoomFormLayout';
import { meetingRooms } from "../../../../../components/Feature";

const EditRoom: React.FC = () => {
    const navigate = useNavigate();

    const room = meetingRooms.find(r => r.roomCode === 'CR-102A');

    const [formData, setFormData] = useState({
        roomName: room?.roomName || '',
        roomNumber: room?.roomCode || '',
        location: room?.location.split(',')[0] || '',
        floor: room?.location.split(',')[1]?.trim().replace('Level ', '') || '',
        size: room?.size || '',
        seats: room?.numberOfSeats.toString() || '',
        status: room?.status || 'Available',
        facilities: room?.additionalFacilities || [],
        image: null as File | null,
        imagePreview: room?.imageFile ? `/meetingroom/${room.imageFile}` : 'https://via.placeholder.com/150',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'facilities') {
            if (e.target instanceof HTMLSelectElement) {
                const selectedFacilities = Array.from(
                    e.target.selectedOptions,
                    option => option.value
                );
                setFormData({ ...formData, [name]: selectedFacilities });
            }
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
        console.log('Updated Form Data:', formData);
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
                        <h2 className="text-4xl font-bold mb-6">EDIT ROOM</h2>
                        <RoomFormLayout
                            mode="edit"
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
                                SAVE CHANGES
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

export default EditRoom;