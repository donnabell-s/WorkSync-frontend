import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../../components/Layout/AdminSuperAdminLayout/Header';
import SideNav from '../../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import RoomFormLayout from '../../../../../components/Layout/RoomFormLayout/RoomFormLayout';
import { meetingRooms } from "../../../../../components/Feature";

const EditRoom: React.FC = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const toggleNav = () => setNav(!nav);

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
        imagePreview: `/meetingroom/${room?.imageFile}` || '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFacilitiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFacilities = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, facilities: selectedFacilities });
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
                    <div className="text-blue-600 cursor-pointer mb-4" onClick={() => navigate('/admin/rooms/room-detail')}>
                        &lt; Back to Room Details
                    </div>
                    <RoomFormLayout
                        formData={formData}
                        onInputChange={handleInputChange}
                        onFacilitiesChange={handleFacilitiesChange}
                        onImageChange={handleImageChange}
                    >
                        <div onClick={handleSubmit}>
                            <AdminButton label="SAVE CHANGES" />
                        </div>
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

export default EditRoom;