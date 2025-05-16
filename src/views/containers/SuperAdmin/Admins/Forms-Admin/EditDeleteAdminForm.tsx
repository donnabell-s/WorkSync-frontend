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
  mode: Mode;
  admin: AdminData;
  onSubmit: (id: string, updatedData?: Partial<AdminData>) => void;
  onClose: () => void;
}

const EditDeleteAdminForm: React.FC<EditDeleteAdminFormProps> = ({
  mode,
  admin,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<AdminData>>({
    name: admin.name,
    email: admin.email,
    role: admin.role,
    status: admin.status,
    permissions: { ...admin.permissions },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...(prev.permissions ?? {
          viewAuditLogs: false,
          viewEditRooms: false,
          manageBookings: false,
          manageAdmins: false,
          manageUsers: false,
          systemSettings: false,
        }),
        [name]: checked,
      } as AdminData['permissions'],
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
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-content p-6 bg-white rounded shadow-md w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'edit' ? 'Edit Admin Information' : 'Delete Admin'}
        </h2>

        {mode === 'edit' ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border px-3 py-2 rounded-md"
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded-md"
                value={formData.email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="Admin">Admin</option>
                  <option value="Superadmin">Superadmin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Permissions</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'viewAuditLogs', label: 'View Audit Logs' },
                  { key: 'viewEditRooms', label: 'View & Edit Rooms' },
                  { key: 'manageBookings', label: 'Manage Bookings' },
                  { key: 'manageAdmins', label: 'Manage Admins' },
                  { key: 'manageUsers', label: 'Manage Users' },
                  { key: 'systemSettings', label: 'System Settings' },
                ].map((perm) => (
                  <label key={perm.key} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={perm.key}
                      checked={
                        formData.permissions?.[perm.key as keyof AdminData['permissions']] || false
                      }
                      onChange={handlePermissionChange}
                    />
                    <span>{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </form>
        ) : (
          <p className="text-red-600">
            Are you sure you want to <strong>delete</strong> admin:{" "}
            <strong>{admin?.name || 'N/A'}</strong>?
          </p>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-500 text-white">
            Cancel
          </button>
          {mode === 'edit' ? (
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-indigo-600 text-white">
              Save
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-red-600 text-white">
              Confirm Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDeleteAdminForm;