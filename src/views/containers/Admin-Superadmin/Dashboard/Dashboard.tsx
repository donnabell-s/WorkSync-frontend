import AdminDashboardCard from '@/views/components/UI/AdminDashboardCard';
import { BookingsPerRoom, PeakUsageTimes } from '@/views/components/Feature/Dashboard/';
import { useAdminDashboard } from '@/context/AdminDashboardContext';
import { useMemo } from 'react';
import { MdMeetingRoom } from "react-icons/md";
import { PiWrenchFill } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { IoPeopleCircle } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa";
import { LuTrendingUpDown } from "react-icons/lu";

const Dashboard = () => {
  const { dashboardSummary, isLoading, error } = useAdminDashboard();

  // Loading state
  if (isLoading) {
    return (
      <div className='w-full h-[calc(100vh-4rem)] flex items-center justify-center'>
        <div className="text-center">
          <div className="text-lg font-medium text-gray-600">Loading Dashboard...</div>
          <div className="text-sm text-gray-500">Fetching latest metrics</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='w-full h-[calc(100vh-4rem)] flex items-center justify-center'>
        <div className="text-center">
          <div className="text-lg font-medium text-red-600">Error loading dashboard</div>
          <div className="text-sm text-gray-500">{error}</div>
        </div>
      </div>
    );
  }

  // Default values if data is not available (memoized for performance)
  const summary = useMemo(() => {
    return dashboardSummary || {
      availableRooms: 0,
      roomsUnderMaintenance: 0,
      todaysBookings: 0,
      ongoingBookings: 0,
      bookingsCompletedToday: 0,
      utilizationRateToday: 0
    };
  }, [dashboardSummary]);

  // Memoize formatted utilization rate
  const formattedUtilizationRate = useMemo(() => {
    return `${summary.utilizationRateToday.toFixed(1)}%`;
  }, [summary.utilizationRateToday]);

  return (
    <div className='w-full h-[calc(100vh-4rem)] flex flex-col gap-5 p-4'>
      <div className='max-h-max grid grid-cols-5 gap-4'>
        <AdminDashboardCard 
          label='Available Rooms' 
          icon={<MdMeetingRoom className='size-10 text-blue-600' />} 
          value={summary.availableRooms} 
        />
        <AdminDashboardCard 
          label='Rooms Under Maintenance' 
          icon={<PiWrenchFill className='size-10 text-red-600' />} 
          value={summary.roomsUnderMaintenance} 
        />
        <AdminDashboardCard
          variant='multiple'
          span={2}
          label={["Today's Bookings", "Ongoing Bookings", "Completed Today"]}
          icon={[
            <FaBookBookmark className='size-7 text-emerald-800' />, 
            <IoPeopleCircle className='size-8 text-amber-400' />,
            <FaClipboardCheck className='size-8 text-emerald-400' />
          ]}
          value={[summary.todaysBookings, summary.ongoingBookings, summary.bookingsCompletedToday]} 
        />
        <AdminDashboardCard 
          label='Utilization Rate (Today)' 
          icon={<LuTrendingUpDown className='size-10 text-blue-600' />} 
          value={formattedUtilizationRate} 
        />
      </div>

      <div className='w-full h-full grid grid-cols-2 gap-4'>
        <div className='w-full h-full bg-white shadow-md rounded-lg p-4'>
          <BookingsPerRoom />
        </div>
        <div className='w-full h-full bg-white shadow-md rounded-lg p-4'>
          <PeakUsageTimes />
        </div>
      </div>
    </div>
  )
}

export default Dashboard