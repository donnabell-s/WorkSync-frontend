import React, { useState } from 'react';

const permissionsList = [
  'View Audit Logs',
  'View & Edit Rooms',
  'Manage Bookings',
  'Manage Admins',
  'Manage Users',
  'System Settings',
];

const roles = ['Admin', 'Superadmin'];
const statuses = ['Active', 'Inactive'];

const EditAdmin = () => {
  const [form, setForm] = useState({
    name: 'John',
    email: 'john@bookings.com',
    role: 'Admin',
    status: 'Active',
    permissions: ['View Audit Logs', 'View & Edit Rooms', 'Manage Bookings'],
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (perm: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  return (
    <div className="flex flex-col w-full h-full bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-2">EDIT ADMIN INFORMATION</h2>
      <p className="text-sm text-gray-500 mb-6">Admins / John / Edit</p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Name</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Role</label>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Status</label>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </form>
      <div className="mt-8">
        <h3 className="font-semibold mb-2">PERMISSIONS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {permissionsList.map((perm) => (
            <label key={perm} className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={form.permissions.includes(perm)}
                onChange={() => handlePermissionChange(perm)}
                className="accent-blue-600"
              />
              {perm}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mt-10 justify-end">
        <button
          type="button"
          className="px-6 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-medium"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-medium"
        >
          Save
        </button>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h4 className="text-lg font-semibold mb-2">Confirm Delete</h4>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this admin?</p>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="dont-show" className="mr-2" />
              <label htmlFor="dont-show" className="text-sm text-gray-500">Do not show anymore</label>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-medium"
                onClick={() => setShowDeleteModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditDeleteAdmin = EditAdmin;
export default EditDeleteAdmin;