import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../../components/Layout/AdminSuperAdminLayout/Header';
import SideNav from '../../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../../components/UI/AdminHeading';
import AdminButton from '../../../../../components/UI/AdminButton';
import RoomFormLayout from '../../../../../components/Layout/RoomFormLayout/RoomFormLayout';

const AddRoom: React.FC = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();

    const toggleNav = () => setNav(!nav);

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
        setFormData({ ...formData, [name]: value });
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

    const handleSave = () => {
        console.log('Form Data:', formData);
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
                        <div className="w-[100px] ml-auto"></div>
                        <RoomFormLayout
                            formData={formData}
                            onInputChange={handleInputChange}
                            onImageChange={handleImageChange}
                            mode="add"
                            onSubmit={handleSave}
                            onCancel={() => navigate('/admin/room-management')}
                        >
                            <div onClick={handleSave}>
                                <AdminButton label="SAVE" />
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
        </div>
    );
};

export default AddRoom;