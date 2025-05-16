import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewFormsLayout from '../../../../components/ViewFormsLayout/ViewFormsLayout';
import SuperAdminLayout from '../../../../components/Layouts';

const ViewAdmins: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalAdmins = 20;
  const navigate = useNavigate();

  const admins: { id: string; columns: string[]; status: "ACTIVE" | "INACTIVE"; }[] = [
    { id: '1', columns: ['John', 'john@faebookings.com', 'Admin'], status: 'ACTIVE' },
    { id: '2', columns: ['Mark', 'mark@faebookings.com', 'Admin'], status: 'ACTIVE' },
    { id: '3', columns: ['Jam', 'jam@faebookings.com', 'Admin'], status: 'ACTIVE' },
    { id: '4', columns: ['Bob', 'bob@faebookings.com', 'Admin'], status: 'INACTIVE' },
    { id: '5', columns: ['Steve', 'steve@faebookings.com', 'Admin'], status: 'ACTIVE' },
    { id: '6', columns: ['Max', 'max@faebookings.com', 'Admin'], status: 'ACTIVE' },
    { id: '7', columns: ['Xyuo', 'xyuo@faebookings.com', 'Admin'], status: 'INACTIVE' },
    { id: '8', columns: ['Harry', 'harry@faebookings.com', 'Admin'], status: 'ACTIVE' },
  ];

  const handleEditAdmin = (id: string) => {
    console.log(`Edit admin with id: ${id}`);
    navigate(`/superadmin/admins/edit/${id}`);
  };

  const handleAddAdmin = () => {
    console.log('Add new admin');
    navigate('/superadmin/admins/add');
  };

  return (
    <SuperAdminLayout activeSection="admins">
      <ViewFormsLayout
        title="ADMIN MANAGEMENT"
        searchPlaceholder="Search by name or email..."
        items={admins}
        columns={['Name', 'Email', 'Role']}
        totalItems={totalAdmins}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onAdd={handleAddAdmin}
        onEdit={handleEditAdmin}
      />
    </SuperAdminLayout>
  );
};

export default ViewAdmins;