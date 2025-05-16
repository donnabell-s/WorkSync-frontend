import React, { useState } from 'react';
import SideNav from '../../../../components/Layout/AdminSuperAdminLayout/SideNav';

interface Admin {
  name: string;
  email: string;
  role: 'Admin' | 'Superadmin';
  status: 'ACTIVE' | 'INACTIVE';
}

const mockAdmins: Admin[] = [
  { name: 'John', email: 'john@fabookings.com', role: 'Admin', status: 'ACTIVE' },
  { name: 'Mark', email: 'mark@fabookings.com', role: 'Admin', status: 'ACTIVE' },
  { name: 'Jam', email: 'jam@fabookings.com', role: 'Admin', status: 'ACTIVE' },
  { name: 'Bob', email: 'bob@fabookings.com', role: 'Admin', status: 'INACTIVE' },
  { name: 'Steve', email: 'steve@fabookings.com', role: 'Admin', status: 'ACTIVE' },
  { name: 'Max', email: 'max@fabookings.com', role: 'Admin', status: 'ACTIVE' },
  { name: 'Xyuo', email: 'xyuo@fabookings.com', role: 'Admin', status: 'INACTIVE' },
  { name: 'Harry', email: 'harry@fabookings.com', role: 'Admin', status: 'ACTIVE' },
];

const ViewAdmins: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'Name' | 'Role' | 'Status'>('Name');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAdmins = mockAdmins
    .filter(admin =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Name') return a.name.localeCompare(b.name);
      if (sortBy === 'Role') return a.role.localeCompare(b.role);
      return a.status.localeCompare(b.status);
    });

  const adminsPerPage = 8;
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNav nav={true} />
      <main className="flex-1 ml-[270px] p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">ADMIN MANAGEMENT</h2>

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
            <span className="text-sm text-gray-700">Sort by:</span>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'Name' | 'Role' | 'Status')}
            >
              <option value="Name">Name</option>
              <option value="Role">Role</option>
              <option value="Status">Status</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No admins found.
                  </td>
                </tr>
              ) : (
                paginatedAdmins.map((admin, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{admin.name}</td>
                    <td className="px-4 py-2">{admin.email}</td>
                    <td className="px-4 py-2">{admin.role}</td>
                    <td className={`px-4 py-2 font-medium ${
                      admin.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {admin.status}
                    </td>
                    <td className="px-4 py-2">
                      <button className="border px-3 py-1 rounded-md hover:bg-gray-200">
                        Edit ✏️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <span>
            Showing {(currentPage - 1) * adminsPerPage + 1}–{Math.min(currentPage * adminsPerPage, filteredAdmins.length)} of {filteredAdmins.length} admins
          </span>
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
                  prev * adminsPerPage < filteredAdmins.length ? prev + 1 : prev
                )
              }
              className="px-2 py-1 border rounded"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Add Admin Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800">
            Add Admin
          </button>
        </div>
      </main>
    </div>
  );
};

export default ViewAdmins;