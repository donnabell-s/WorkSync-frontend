import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/Layout/AdminSuperAdminLayout/Header';
import SideNav from '../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../components/UI/AdminHeading';
import AdminButton from '../../../../components/UI/AdminButton';
import SecondaryButton from '../../../../components/UI/SecondaryButton';
import DetailsContainer from '../../../../components/UI/DetailsContainer';
import { users } from "../../../../components/Feature";

const ViewUser: React.FC = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const toggleNav = () => setNav(!nav);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        department: '',
        status: '',
    });

    useEffect(() => {
        const user = users.find((u: typeof users[number]) => u.userId === userId);
        if (user) {
            setUserData({
                name: user.name,
                email: user.email,
                department: user.department,
                status: user.status,
            });
        }
    }, [userId]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideNav nav={nav} />
            <div className="flex-1">
                <Header nav={nav} toggleNav={toggleNav} />
                <div className="p-6">
                    <div className="text-blue-600 cursor-pointer mb-4" onClick={() => navigate('/admin/users')}>
                        &lt; Back to User List
                    </div>
                    <AdminHeading label="VIEW USER DETAILS" />
                    <DetailsContainer
                        actions={
                            <>
                                <AdminButton
                                    label="EDIT"
                                    onClick={() => navigate(`/admin/users/edit/${userId}`)}
                                />
                                <SecondaryButton
                                    label="CLOSE"
                                    onClick={() => navigate('/admin/users')}
                                />
                            </>
                        }
                        readOnly
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">NAME</label>
                            <input
                                type="text"
                                value={userData.name}
                                readOnly
                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                            <input
                                type="text"
                                value={userData.email}
                                readOnly
                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DEPARTMENT</label>
                            <input
                                type="text"
                                value={userData.department}
                                readOnly
                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">STATUS</label>
                            <input
                                type="text"
                                value={userData.status}
                                readOnly
                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                            />
                        </div>
                    </DetailsContainer>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;