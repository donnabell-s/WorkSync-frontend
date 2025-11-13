import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmins } from '../../../../../context/AdminContext';
import { DataTable, DataTableColumn } from '../../../../components/UI';
import { FaSearch } from 'react-icons/fa';
import { LuPencilLine } from "react-icons/lu";

const ViewAdmins: React.FC = () => {
  const { admins, currentAdmin, getAdminById } = useAdmins();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'Name' | 'Role' | 'Status'>('Name');
  const [currentPage, setCurrentPage] = useState(1);
  const [editAdmin, setEditAdmin] = useState(false);
  const navigate = useNavigate();

  const filteredAdmins = admins
    .filter((admin) =>
      `${admin.firstName ?? ''} ${admin.lastName ?? ''}`.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Name') {
        const aFull = `${a.firstName ?? ''} ${a.lastName ?? ''}`.toLowerCase();
        const bFull = `${b.firstName ?? ''} ${b.lastName ?? ''}`.toLowerCase();
        return aFull.localeCompare(bFull);
      }
      if (sortBy === 'Status') {
        return Number(b.isActive) - Number(a.isActive);
      }
      if (sortBy === 'Role') {
        return a.role.localeCompare(b.role);
      }
      return 0;
    });

  const adminsPerPage = 8;

  const handleClick = async (id: string) => {
    localStorage.setItem('selectedAdminId', id);
    try {
      setEditAdmin(true);
      await getAdminById(id);
    } catch (error) {
      console.error('Failed to get admin by ID:', error);
    }
  };

  useEffect(() => {
    if (currentAdmin && editAdmin) {
      navigate('/admin/admins/edit');
      setEditAdmin(false);
    }
  }, [currentAdmin, navigate, editAdmin]);

  return (
    <div className="px-7 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">ADMIN MANAGEMENT</h2>
          <div className="flex items-center gap-3">
            <div className="relative w-[18rem] md:w-[24rem] lg:w-[28rem]">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pr-9 pl-3 p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-700 whitespace-nowrap">Sort by:</div>
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-2 min-w-[9rem] md:min-w-[11rem] lg:min-w-[12rem]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'Name' | 'Role' | 'Status')}
            >
              <option value="Name">Name</option>
              <option value="Role">Role</option>
              <option value="Status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={([
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
          {
            key: 'status',
            header: 'Status',
            render: (row: any) => (
              <span className={`font-medium ${row.isActive ? 'text-green-600' : 'text-red-500'}`}>
                {row.isActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            ),
          },
          {
            key: 'action',
            header: 'Action',
            render: (row: any) => (
              <button
                onClick={() => handleClick(row.id)}
                className="text-[#777F8B] font-semibold px-3 py-1.5 rounded-full hover:bg-gray-200 border border-[#777F8B] border-1.5 flex items-center gap-1"
              >
                Edit<LuPencilLine/>
              </button>
            ),
          },
        ]) as unknown as DataTableColumn<any>[]}
        rows={filteredAdmins.map((a) => ({
          id: a.id,
          name: `${a.firstName ?? ''} ${a.lastName ?? ''}`,
          email: a.email,
          role: a.role,
          isActive: a.isActive,
        }))}
        emptyMessage="No admins found."
        getRowKey={(row) => row.id}
        className="text-base"
        itemsPerPage={adminsPerPage}
        page={currentPage}
        onPageChange={setCurrentPage}
        actionButtonLabel="Add Admin"
        onActionButtonClick={() => navigate('/admin/admins/add')}
      />
    </div>
  );
};

export default ViewAdmins;
