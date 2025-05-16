import React, { useState } from 'react';
import EditDeleteAdminForm from './EditDeleteAdminForm';

type Mode = 'edit' | 'delete';

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Superadmin';
  status: 'Active' | 'Inactive';
  permissions: {
    viewAuditLogs: boolean;
    viewEditRooms: boolean;
    manageBookings: boolean;
    manageAdmins: boolean;
    manageUsers: boolean;
    systemSettings: boolean;
  };
}

const AdminDashboard: React.FC = () => {
  const [admins, setAdmins] = useState<AdminData[]>([
    {
      id: '1',
      name: 'John',
      email: 'john@faebookings.com',
      role: 'Admin',
      status: 'Active',
      permissions: {
        viewAuditLogs: true,
        viewEditRooms: true,
        manageBookings: true,
        manageAdmins: true,
        manageUsers: true,
        systemSettings: false,
      },
    },
    // Add more admins if needed
  ]);

  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  const openEditModal = (admin: AdminData) => {
    setSelectedAdmin(admin);
    setMode('edit');
  };

  const openDeleteModal = (admin: AdminData) => {
    setSelectedAdmin(admin);
    setMode('delete');
  };

  const closeModal = () => {
    setSelectedAdmin(null);
    setMode(null);
  };

  const handleSubmit = (id: string, updatedData?: Partial<AdminData>) => {
    if (mode === 'edit' && updatedData) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === id ? { ...admin, ...updatedData } : admin
        )
      );
    } else if (mode === 'delete') {
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admins</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="border px-4 py-2">{admin.name}</td>
              <td className="border px-4 py-2">{admin.email}</td>
              <td className="border px-4 py-2">{admin.role}</td>
              <td className="border px-4 py-2">{admin.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => openEditModal(admin)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(admin)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show modal if needed */}
      {selectedAdmin && mode && (
        <EditDeleteAdminForm
          mode={mode}
          admin={selectedAdmin}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;