import { useState } from "react";
import SideContainer from "../../../components/Layout/UserLayout/SideContainer";
import UserSearch from "../../../components/UI/UserSearch";
import UserHeading from '../../../components/UI/UserHeading';
import UserBookingList from "../../../components/Feature/UserBookingList";
import { CiFilter } from "react-icons/ci";

const MyBookings = () => {
  const [dateOrder, setDateOrder] = useState<'asc' | 'desc' | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'Completed' | 'Upcoming' | 'Cancelled' | 'See All'>('See All');
  const [searchQuery, setSearchQuery] = useState('');  // State for search query

  // Temporary state for the form
  const [pendingDateOrder, setPendingDateOrder] = useState(dateOrder);
  const [pendingStatusFilter, setPendingStatusFilter] = useState(statusFilter);

  const applyFilters = () => {
    setDateOrder(pendingDateOrder);
    setStatusFilter(pendingStatusFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <SideContainer>
        <div className="flex flex-col gap-5 text-[#4B5563]">
          <h1 className="text-lg font-semibold mb-2 flex flex-row items-center gap-1"><CiFilter size={23}/>Filter</h1>

          {/* Date Filter */}
          <div className="mb-4">
            <h2 className="text-md font-medium mb-2">Date</h2>
            <div className="flex gap-3 flex-col pl-6">
              {['asc', 'desc', 'all'].map((order) => (
                <button
                  key={order}
                  className="transition font-medium text-left text-sm"
                  onClick={() => setPendingDateOrder(order as typeof pendingDateOrder)}
                >
                  <span
                    className={`pb-1 border-b-2 ${
                      pendingDateOrder === order
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {order === 'asc' ? 'Ascending' : order === 'desc' ? 'Descending' : 'See All'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="mb-6">
            <h2 className="text-md font-medium mb-2">Status</h2>
            <div className="flex gap-3 flex-wrap flex-col pl-6">
              {['Completed', 'Upcoming', 'Cancelled', 'See All'].map((status) => (
                <button
                  key={status}
                  className="transition font-medium text-left text-sm"
                  onClick={() => setPendingStatusFilter(status as typeof pendingStatusFilter)}
                >
                  <span
                    className={`pb-1 border-b-2 ${
                      pendingStatusFilter === status
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    {status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full bg-[#0D9488] uppercase text-white text-sm py-1.5 px-4 rounded hover:bg-emerald-600 transition"
            onClick={applyFilters}
          >
            Apply All
          </button>
        </div>
      </SideContainer>

      <div className="ml-67 p-10 flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <UserHeading label="My Bookings" />
          <UserSearch value={searchQuery} onChange={handleSearchChange} />
        </div>
        <UserBookingList
          dateOrder={dateOrder}
          statusFilter={statusFilter}
          searchQuery={searchQuery}  // Pass the search query to the booking list
        />
      </div>
    </div>
  );
};

export default MyBookings;
