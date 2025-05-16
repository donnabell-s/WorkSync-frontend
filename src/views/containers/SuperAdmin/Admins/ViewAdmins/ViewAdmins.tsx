import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/Layout/AdminSuperAdminLayout/Header';
import SideNav from '../../../../components/Layout/AdminSuperAdminLayout/SideNav';
import AdminHeading from '../../../../components/UI/AdminHeading';
import AdminButton from '../../../../components/UI/AdminButton';
import SecondaryButton from '../../../../components/UI/SecondaryButton';
import DetailsContainer from '../../../../components/UI/DetailsContainer';
import { admins } from "../../../../components/Feature";

const ViewAdmin: React.FC = () => {
    const [nav, setNav] = useState(false);
    const navigate = useNavigate();
    const { adminId } = useParams<{ adminId: string }>();

    const toggleNav = () => setNav(!nav);

    const [adminData, setAdminData] = useState({
        name: '',
        email: '',
        role: '',
        status: '',
    });

    useEffect(() => {
        const admin = admins.find(a => a.adminId === adminId);
        if (admin) {
            setAdminData({
                name: admin.name,
                email: admin.email,
                role: admin.role,
                status: admin.status,
            });
        }
    }, [adminId]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideNav nav={nav} />
            <div className="flex-1">
                <Header nav={nav} toggleNav={toggleNav} />
                <div className="p-6">
                    <div className="text-blue-600 cursor-pointer mb-4" onClick={() => navigate('/admin/admins')}>
                        &lt; Back to Admin List
                    </div>
                    <AdminHeading label="VIEW ADMIN DETAILS" />
                    <DetailsContainer
                        actions={
                            <>
                                <AdminButton
                                    label="EDIT"
                                    onClick={() => navigate(`/admin/admins/edit/${adminId}`)}
                                />
                                <SecondaryButton
                                    label="CLOSE"
                                    onClick={() => navigate('/admin/admins')}
                                />
                            </>
                        }
                        readOnly
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">NAME</label>
                            <input
                                type="text"
                                value={adminData.name}
                                readOnly
                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                            <input
                                type="text"
                                value={adminData.email}
                                readOnly
                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ROLE</label>
                            <input
                                type="text"
                                value={adminData.role}
                                readOnly
                                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">STATUS</label>
                            <input
                                type="text"
                                value={adminData.status}
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

export default ViewAdmin;