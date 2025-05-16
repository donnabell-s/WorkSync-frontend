import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../../components/Layout/AdminSuperAdminLayout/Header';
import SideNav from '../../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import RoomFormLayout from '../../../../../components/Layout/RoomFormLayout/RoomFormLayout';
import { meetingRooms } from "../../../../../components/Feature";


const DeleteRoom: React.FC = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const toggleNav = () => setNav(!nav);

    // For this example, we'll use the room with roomCode "CR-102A" as shown in the screenshot
    const room = meetingRooms.find((r: typeof meetingRooms[number]) => r.roomCode === 'CR-102A');

    const formData = {
        roomName: room?.roomName || '',
        roomNumber: room?.roomCode || '',
        location: room?.location.split(',')[0] || '',
        floor: room?.location.split(',')[1]?.trim().replace('Level ', '') || '',
        size: room?.size || '',
        seats: room?.numberOfSeats.toString() || '',
        status: room?.status || 'Available',
        facilities: room?.additionalFacilities || [],
        image: null as File | null,
        imagePreview: `/meetingroom/${room?.imageFile}` || '',
    };

    const handleDelete = () => {
        // Handle room deletion (e.g., API call to delete the room)
        console.log('Room Deleted:', formData);
        navigate('/admin/room-management');
    };

    // Dummy handlers for read-only form
    const noop = () => {};

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1">
                <div className="p-6">
                    <div className="text-blue-600 cursor-pointer mb-4" onClick={() => navigate('/admin/room-management')}>
                        {'<'} Back to Room Details
                    </div>
                    <AdminHeading label="DELETE ROOM" />
                    <RoomFormLayout
                        formData={formData}
                        onInputChange={noop}
                        onFacilitiesChange={noop}
                        onImageChange={noop}
                        readOnly
                    >
                        <button
                            className="w-32 bg-red-600 p-3 text-white text-sm font-semibold rounded-md cursor-pointer hover:bg-red-700"
                            onClick={handleDelete}
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
    );
};

export default DeleteRoom;