
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmins } from '../../../../../context/AdminContext';
import { EditAdmin } from '../Forms-Admin/EditAdmin';

const ViewAdmins: React.FC = () => {
  const { admins, currentAdmin, getAdminById } = useAdmins();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'Name' | 'Role' | 'Status'>('Name');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredAdmins = admins
    .filter(admin =>
      `${admin.fname} ${admin.lname}`.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Name') {
        const aFullName = `${a.fname} ${a.lname}`.toLowerCase();
        const bFullName = `${b.fname} ${b.lname}`.toLowerCase();
        return aFullName.localeCompare(bFullName);
      }
      if (sortBy === 'Status') {
        return Number(b.isActive) - Number(a.isActive);
      }
      return 0;
    });

  const adminsPerPage = 8;
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * adminsPerPage,
    currentPage * adminsPerPage
  );

  const handleClick = async (roomId: string) => {
    localStorage.setItem("selectedRoomId", roomId);
    try {
      await getAdminById(roomId);
    } catch (error) {
      console.error("Failed to get room by ID:", error);
    }
  };

  useEffect(() => {
    if (currentAdmin) {
      navigate('/admin/admins/edit');
    }
  }, [currentAdmin, navigate]);

  return (
    <div className="flex flex-col px-10 pt-10 min-h-screen bg-gray-100">
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
          <div className="text-sm text-gray-700 whitespace-nowrap">Sort by:</div>
          <select
            className="border border-gray-300 rounded px-40 py-2.5 w-full"
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
        <table className="min-w-full bg-white rounded-md shadow text-base">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
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
                  <td className="px-6 py-4">{admin.fname} {admin.lname}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">{admin.role}</td>
                  <td className={`px-6 py-4 font-medium ${admin.isActive ? 'text-green-600' : 'text-red-500'
                    }`}>
                    {admin.isActive}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleClick(admin.id)}
                      className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center mt-4">
        {/* Left: Showing text */}
        <div className="text-sm text-gray-700">
          Showing {(currentPage - 1) * adminsPerPage + 1}–{Math.min(currentPage * adminsPerPage, filteredAdmins.length)} of {filteredAdmins.length} admins
        </div>

        {/* Center: Pagination buttons */}
        <div className="flex-1 flex justify-center">
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
                )}
              className="px-2 py-1 border rounded"
            >
              &gt;
            </button>
          </div>
        </div>
        {/*Add Admin button */}
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Admin
        </button>
      </div>
    </div>
  );
};

export default ViewAdmins;
