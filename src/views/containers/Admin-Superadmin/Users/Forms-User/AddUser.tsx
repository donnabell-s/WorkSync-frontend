import React, { useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminBackLink from '../../../../components/UI/AdminBackLink';

const roles = ['User', 'Admin'];
const statuses = ['Active', 'Inactive'];

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const { addUser, getAllUsers, user } = useAuth();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'User',
    isActive: true,
  });
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: form.role,
        isActive: status === 'Active',
      });
      await getAllUsers();
      navigate('/admin/users/view', { state: { refetch: true } });
    } catch (err: any) {
      setError(err?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/admin/users/view');
  };

  return (
    <div className="px-7 pt-6 pb-8">
      <div className="mb-4">
        <AdminBackLink label="Back to View Users" backPath="/admin/users/view" />
      </div>
      <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ADD USER</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Name</label>
            <div className="flex gap-2">
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
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
            <label className="font-medium">Password</label>
            <input
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Role</label>
            <input
              type="text"
              name="role"
              value="User"
              readOnly
              className="border border-gray-400 rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Status</label>
            <select
              className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
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
              type="submit"
              className="px-6 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 font-medium"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </div>
          {error && <div className="col-span-2 text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
