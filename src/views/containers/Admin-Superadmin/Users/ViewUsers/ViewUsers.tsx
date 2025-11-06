import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DataTable, DataTableColumn } from '../../../../components/UI';
import { FaSearch } from 'react-icons/fa';
import { useBookings } from '../../../../../context/BookingContext';
import { LuPencilLine } from "react-icons/lu";

const ViewUser = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'Name' | 'Status'>('Name');
  const [currentPage, setCurrentPage] = useState(1);
  const { users, getAllUsers, getUserById, currentUser } = useAuth();
  const { bookings } = useBookings();
  const [editUser, setEditUser] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = users
    .filter((user) =>
      `${user.fname} ${user.lname}`.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
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

  const usersPerPage = 8;

  const handleClick = async (id: string) => {
    localStorage.setItem('selectedRoomId', id);
    try {
      setEditUser(true);
      await getUserById(id);
    } catch (error) {
      console.error('Failed to get user by ID:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getAllUsers();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser && editUser) {
      navigate('/admin/users/edit');
      setEditUser(false);
    }
  }, [currentUser, navigate, editUser]);

  return (
    <div className="px-7 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">USER MANAGEMENT</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-80 pr-9 pl-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-700 whitespace-nowrap">Sort by:</div>
            <select
              className="border border-gray-300 rounded px-3 py-2 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'Name' | 'Status')}
            >
              <option value="Name">Name</option>
              <option value="Status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={([
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'bookings', header: 'Booking', align: 'right' },
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
        rows={filteredUsers.map((u) => ({
          id: u.id,
          name: `${u.fname} ${u.lname}`,
          email: u.email,
          bookings: bookings.filter((b) => String(b.userId) === String(u.id)).length || 0,
          isActive: u.isActive,
        }))}
        emptyMessage="No users found."
        getRowKey={(row) => row.id}
        className="text-base"
        itemsPerPage={usersPerPage}
        page={currentPage}
        onPageChange={setCurrentPage}
        actionButtonLabel="Add User"
        onActionButtonClick={() => navigate('/admin/users/add')}
      />
    </div>
  );
};

export default ViewUser;
