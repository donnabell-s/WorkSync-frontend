import React, { useState, useEffect } from 'react';
import { useAdmins } from '../../../../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../../../../server/types';
import AdminBackLink from '../../../../components/UI/AdminBackLink';

const roles = ['Admin', 'Superadmin', 'User'];
const statuses = ['Active', 'Inactive'];

const EditAdmin = () => {
  const navigate = useNavigate();
  const { currentAdmin, fetchAdmins, updateAdmin, deleteAdmin } = useAdmins();

  // Add a local state for permissions and status
  const [form, setForm] = useState<Omit<User, 'id' | 'password' | 'createdAt' | 'updatedAt'>>({
    fname: '',
    lname: '',
    email: '',
    role: roles[0],
    isActive: true
  });
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (currentAdmin) {
      setForm(currentAdmin);
      setStatus(currentAdmin.isActive ? 'Active' : 'Inactive');
    }
  }, [currentAdmin]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentAdmin) {
      console.error('No current admin found');
      return;
    }

    const updatedAdmin = {
      ...form,
      isActive: status === 'Active',
      password: currentAdmin.password, // Add password back for update
    };

    console.log('Updated Admin:', updatedAdmin);
    // console.log('Current Admin:', currentAdmin);
    updateAdmin(currentAdmin.id, updatedAdmin)
      .then(() => {
        console.log('Admin updated successfully');
        return fetchAdmins(); // Fetch updated admins list
      })
      .then(() => navigate('/admin/admins/view'))
      .catch((error) => {
        console.error('Error updating admin:', error);
      });
  };

  const handleDelete = () => {
    if (currentAdmin!.id) {
      deleteAdmin(currentAdmin!.id);
      navigate('/admin/admins/view');
    }
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/admin/admins/view');
  };

  useEffect(() => {
    if (!currentAdmin) {
      navigate('/admin/admins/view');
    }
  }, [currentAdmin, navigate]);

  return (
    <div className="px-7 pt-6 pb-8">
      <div className="mb-4">
        <AdminBackLink label='Back to View Admins' backPath='/admin/admins/view' />
      </div>
      <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">EDIT ADMIN INFORMATION</h2>
        <p className="text-sm text-gray-500 mb-6">Admins / {form.fname} {form.lname} / Edit</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Name</label>
          <div className="flex gap-2">
            <input
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
              name="fname"
              placeholder="First Name"
              value={form.fname}
              onChange={handleChange}
              required
            />
            <input
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
              name="lname"
              placeholder="Last Name"
              value={form.lname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Role</label>
          <select
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Status</label>
          <select
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="isActive"
            value={form.isActive ? 'Active' : 'Inactive'}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

  <div className="flex gap-4 mt-25 pt-6 border-t border-gray-200 justify-start md:col-span-2">
          <button
            type="button"
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
            onClick={handleBack}
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
            onClick={handleSubmit}
            className="px-6 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-medium"
          >
            Save
          </button>
        </div>
      </form>
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
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-medium"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default EditAdmin;