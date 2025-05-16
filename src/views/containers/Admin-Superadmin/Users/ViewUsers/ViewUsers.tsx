import React, { useState } from 'react';
import SideNav from '../../../../components/Layout/AdminSuperAdminLayout/SideNav';

interface User {
  name: string;
  email: string;
  booking: number;
  status: 'ACTIVE' | 'INACTIVE';
}

const mockUsers: User[] = [
  { name: 'Jenny', email: 'jenny@example.com', booking: 2, status: 'ACTIVE' },
  { name: 'Dom', email: 'dom@example.com', booking: 1, status: 'ACTIVE' },
  { name: 'Lovely', email: 'lovely@example.com', booking: 1, status: 'ACTIVE' },
  { name: 'Harley', email: 'harley@example.com', booking: 4, status: 'INACTIVE' },
  { name: 'Lei', email: 'lei@example.com', booking: 1, status: 'ACTIVE' },
  { name: 'Mai', email: 'mai@example.com', booking: 6, status: 'ACTIVE' },
  { name: 'Lim', email: 'lim@example.com', booking: 2, status: 'INACTIVE' },
  { name: 'Lan', email: 'lan@example.com', booking: 8, status: 'ACTIVE' },
];

const ViewUser: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'Name' | 'Status'>('Name');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsers
    .filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      return a.status.localeCompare(b.status);
    });

  const usersPerPage = 8;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNav nav={true} />
      <main className="flex-1 ml-[270px] p-8">
        <h2 className="text-xl font-semibold mb-6">USER MANAGEMENT</h2>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-1/2 p-2 border border-gray-300 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Sort by:</span>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'Name' | 'Status')}
            >
              <option value="Name">Name</option>
              <option value="Status">Status</option>
            </select>
          </div>
        </div>

        <table className="w-full bg-white rounded-md shadow">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Booking</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.booking}</td>
                <td className={`px-4 py-2 font-medium ${user.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
                  {user.status}
                </td>
                <td className="px-4 py-2">
                  <button className="text-sm border px-3 py-1 rounded-md hover:bg-gray-200">
                    Edit ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <span>
            Showing {(currentPage - 1) * usersPerPage + 1}–{Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              &lt;
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev * usersPerPage < filteredUsers.length ? prev + 1 : prev
                )
              }
              className="px-2 py-1 border rounded"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Add User */}
        <div className="flex justify-end mt-4">
          <button className="bg-[#5B21B6] text-white px-4 py-2 rounded-md hover:bg-[#4C1D95]">
            Add User
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewUser;