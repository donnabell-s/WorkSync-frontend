import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewFormsLayout from '../../../../components/ViewFormsLayout/ViewFormsLayout';
import SuperAdminLayout from '../../../../components/Layouts';

const ViewUsers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalUsers = 20;
  const navigate = useNavigate();

  const users: { id: string; columns: string[]; status: "ACTIVE" | "INACTIVE"; }[] = [
    { id: '1', columns: ['Jenny', 'jenny@example.com', '2'], status: 'ACTIVE' },
    { id: '2', columns: ['Dom', 'dom@example.com', '1'], status: 'ACTIVE' },
    { id: '3', columns: ['Lovely', 'lovely@example.com', '1'], status: 'ACTIVE' },
    { id: '4', columns: ['Harley', 'harley@example.com', '4'], status: 'INACTIVE' },
    { id: '5', columns: ['Lei', 'lei@example.com', '1'], status: 'ACTIVE' },
    { id: '6', columns: ['Mai', 'mai@example.com', '6'], status: 'ACTIVE' },
    { id: '7', columns: ['Lim', 'lim@example.com', '2'], status: 'INACTIVE' },
    { id: '8', columns: ['Lan', 'lan@example.com', '8'], status: 'ACTIVE' },
  ];

  const handleEditUser = (id: string) => {
    console.log(`Edit user with id: ${id}`);
    navigate(`/superadmin/admins/users/edit/${id}`);
  };

  const handleAddUser = () => {
    console.log('Add new user');
    navigate('/superadmin/admins/users/add');
  };

  return (
    <SuperAdminLayout activeSection="users">
      <ViewFormsLayout
        title="USER MANAGEMENT"
        searchPlaceholder="Search by name or email..."
        items={users}
        columns={['Name', 'Email', 'Booking']}
        totalItems={totalUsers}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onAdd={handleAddUser}
        onEdit={handleEditUser}
      />
    </SuperAdminLayout>
  );
};

export default ViewUsers;