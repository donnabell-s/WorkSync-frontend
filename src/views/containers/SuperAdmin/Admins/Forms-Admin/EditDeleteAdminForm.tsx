import React, { useState } from 'react';

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

interface EditDeleteAdminFormProps {
  mode?: Mode;
  admin?: AdminData;
  onSubmit?: (id: string, updatedData?: Partial<AdminData>) => void;
  onClose?: () => void;
}

const EditDeleteAdminForm: React.FC<EditDeleteAdminFormProps> = ({
  mode,
  admin,
  onSubmit,
  onClose,
}) => {
  // Block direct route render
  if (!admin || !mode || !onSubmit || !onClose) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-semibold">
          This form must be opened from the Admin Dashboard.
        </p>
      </div>
    );
  }

  const [formData, setFormData] = useState<Partial<AdminData>>({
    name: admin.name,
    email: admin.email,
    role: admin.role,
    status: admin.status,
    permissions: { ...admin.permissions },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (mode === 'edit') {
      onSubmit(admin.id, formData);
    } else if (mode === 'delete') {
      onSubmit(admin.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Admin' : 'Delete Admin'}
        </h2>

        {mode === 'edit' ? (
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
            <select
              name="role"
              value={formData.role || 'Admin'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Admin">Admin</option>
              <option value="Superadmin">Superadmin</option>
            </select>
            <select
              name="status"
              value={formData.status || 'Active'}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        ) : (
          <p>Are you sure you want to delete this admin?</p>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded ${
              mode === 'edit' ? 'bg-blue-500' : 'bg-red-500'
            } text-white`}
          >
            {mode === 'edit' ? 'Save' : 'Delete'}
          </button>
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDeleteAdminForm;