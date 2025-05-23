import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomFormLayout from '../../../../../components/Layout/RoomFormLayout/RoomFormLayout';
import { meetingRooms } from "../../../../../components/Feature";
import AdminButton from '../../../../../components/UI/AdminButton';

const DeleteRoom: React.FC = () => {
    const navigate = useNavigate();

    const room = meetingRooms.find(r => r.roomCode === 'CR-102A');

    const formData = {
        roomName: room?.roomName || '',
        roomNumber: room?.roomCode || '',
        location: room?.location.split(',')[0] || '',
        floor: room?.location.split(',')[1]?.trim().replace('Level ', '') || '',
        size: room?.size || '',
        seats: room?.numberOfSeats.toString() || '',
        status: room?.status || 'Available',
        facilities: room?.additionalFacilities || [],
        image: null,
        imagePreview: room?.imageFile ? `/meetingroom/${room.imageFile}` : 'https://via.placeholder.com/150',
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    };

    const handleSubmit = () => {
        console.log('Room Deleted:', formData);
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
                        <h2 className="text-4xl font-bold mb-6">DELETE ROOM</h2>
                        <RoomFormLayout
                            mode="delete"
                            formData={formData}
                            onInputChange={handleInputChange}
                            onImageChange={handleImageChange}
                            onSubmit={handleSubmit}
                            onCancel={() => navigate('/admin/room-management')}
                            readOnly={true}
                        >
                            <button
                                onClick={handleSubmit}
                                className="w-32 bg-red-600 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-red-700"
                            >
                                DELETE
                            </button>
                            <button
                                className="w-32 bg-gray-400 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-gray-500"
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

export default DeleteRoom;