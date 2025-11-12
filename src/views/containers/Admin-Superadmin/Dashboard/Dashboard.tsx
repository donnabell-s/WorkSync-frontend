import AdminDashboardCard from '@/views/components/UI/AdminDashboardCard';
import { BookingsPerRoom, PeakUsageTimes } from '@/views/components/Feature/Dashboard/';
import { MdMeetingRoom } from "react-icons/md";
import { PiWrenchFill } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { IoPeopleCircle } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa";
import { LuTrendingUpDown } from "react-icons/lu";

const Dashboard = () => {
  return (
    <div className='w-full h-[calc(100vh-4rem)] flex flex-col gap-5 p-4'>
      <div className='max-h-max grid grid-cols-5 gap-4'>
        <AdminDashboardCard label='Available Rooms' icon={<MdMeetingRoom className='size-10 text-blue-600' />} value={13} />
        <AdminDashboardCard label='Rooms Under Maintenance' icon={<PiWrenchFill className='size-10 text-red-600' />} value={2} />
        <AdminDashboardCard
          variant='multiple'
          span={2}
          label={["Today's Bookings", "Ongoing Bookings", "Completed Today"]}
          icon={[<FaBookBookmark className='size-7 text-emerald-800' />, <IoPeopleCircle className='size-8 text-amber-400' />,
          <FaClipboardCheck className='size-8 text-emerald-400' />]}
          value={[15, 13, 2]} />
        <AdminDashboardCard label='Utilization Rate (Today)' icon={<LuTrendingUpDown className='size-10 text-blue-600' />} value={`${13} %`} />
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