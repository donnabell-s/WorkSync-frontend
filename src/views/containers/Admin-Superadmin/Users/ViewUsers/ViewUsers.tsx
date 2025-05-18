import React, { useState } from 'react';

interface User {
  name: string;
  email: string;
  booking: number;
  status: 'ACTIVE' | 'INACTIVE';
}

const ViewUser = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'Name' | 'Status'>('Name');
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="flex flex-col px-10 pt-10 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">USER MANAGEMENT</h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-700 whitespace-nowrap">Sort by:</div>
          <select
            className="border border-gray-300 rounded px-40 py-2.5 w-full"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'Name' | 'Status')}
          >
            <option value="Name">Name</option>
            <option value="Status">Status</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow text-base">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Booking</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.booking}</td>
                  <td className={`px-6 py-4 font-medium ${
                    user.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {user.status}
                  </td>
                  <td className="px-6 py-4">
                    <button className="border px-3 py-1 rounded-md bg-white-400 hover:bg-blue-400">
                      EDIT
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        {/* Showing text */}
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * usersPerPage + 1}–{Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage(prev =>
                prev * usersPerPage < filteredUsers.length ? prev + 1 : prev
              )
            }
            disabled={currentPage * usersPerPage >= filteredUsers.length}
            className="px-2 py-1 border rounded disabled:opacity-50"
          > 
            &gt;
          </button>
        </div>

        {/* Add User button */}
        <button 
          className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default ViewUser;