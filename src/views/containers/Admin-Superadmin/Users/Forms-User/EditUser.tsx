import React, { useState } from 'react';

const EditDeleteUserForm: React.FC = () => {
  type Mode = 'edit' | 'delete';

  const mode: Mode = 'edit'; // or 'delete' statically set here

  const user = {
    id: '1',
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    number: '09123456789',
    status: 'Active',
    password: 'password123',
  };

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    number: user.number,
    status: user.status,
    password: user.password,
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
    console.log(`${mode === 'edit' ? 'Saving changes' : 'Deleting user'}`, {
      id: user.id,
      updatedData: formData,
    });
    alert(`${mode === 'edit' ? 'User info updated' : 'User deleted'}`);
  };

  const handleClose = () => {
    alert('Modal closed');
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          {mode === 'edit' ? 'EDIT USER INFORMATION' : 'Delete User'}
        </h2>

        {mode === 'edit' ? (
          <form className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Number</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Account Security</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </form>
        ) : (
          <p className="text-red-600 text-lg">
            Are you sure you want to <strong>delete</strong> user:{' '}
            <strong>{user.name}</strong>?
          </p>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded bg-gray-600 text-white"
          >
            Cancel
          </button>
          {mode === 'edit' ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded bg-purple-600 text-white"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded bg-red-600 text-white"
            >
              Confirm Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDeleteUserForm;