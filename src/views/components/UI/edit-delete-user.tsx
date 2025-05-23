import React, { useState } from 'react';
import UserHeading from './UserHeading';

const statuses = ['Active', 'Inactive'];

const EditDeleteUser = () => {
  const [form, setForm] = useState({
    name: 'John',
    number: '099 456 7891',
    email: 'john@bookings.com',
    status: 'Active',
    password: '***************',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col w-full h-full bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
      <UserHeading label="EDIT USER INFORMATION" />
      <p className="text-sm text-gray-500 mb-6 mt-1">Users / Jenny / Edit</p>
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
          <label className="font-medium">Number</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="number"
            value={form.number}
            onChange={handleChange}
          />
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
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="font-medium">ACCOUNT SECURITY</label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            value={form.password}
            type="password"
            readOnly
          />
        </div>
      </form>
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
            <p className="text-gray-600 mb-4">Are you sure you want to delete user?</p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="dont-show"
                className="mr-2"
                checked={dontShow}
                onChange={() => setDontShow(!dontShow)}
              />
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

export default EditDeleteUser;
