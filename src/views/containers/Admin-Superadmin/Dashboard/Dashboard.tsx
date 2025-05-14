import React, { useState } from 'react';
import AdminDashboardCard from '../../../components/UI/AdminDashboardCard';
import AdminDashboardFilter from '../../../components/UI/AdminDashboardFilter';
import ExportButton from '../../../components/UI/ExportButton';
import BookingSummary from '../../../components/Feature/BookingSummary';
import BookingsPerRoom from '../../../components/Feature/BookingsPerRoom';
import PeakUsageTimes from '../../../components/Feature/PeakUsageTimes';
import { MdMeetingRoom } from "react-icons/md";
import { PiWrenchFill } from "react-icons/pi";
import { FaBookBookmark } from "react-icons/fa6";
import { IoPeopleCircle } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa";

const Dashboard = () => {
  const rooms = [
    { color: '#2563EB', name: 'Conference Room' },
    { color: '#10B981', name: 'Skyline Room' },
    { color: '#F59E0B', name: 'Training Room' },
    { color: '#EF4444', name: 'Grand Hall' },
    { color: '#1E40AF', name: 'Sky Hall' },
    // Add more rooms here if needed
  ];

  const ROOMS_PER_PAGE = 5;

  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(rooms.length / ROOMS_PER_PAGE);
  const paginatedRooms = rooms.slice(page * ROOMS_PER_PAGE, (page + 1) * ROOMS_PER_PAGE);

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='max-h-max grid grid-cols-5 gap-4 p-4'>
        <AdminDashboardCard label='Active Rooms' icon={<MdMeetingRoom className='size-10 text-blue-600' />} value={13} />
        <AdminDashboardCard label='Rooms Under Maintenance' icon={<PiWrenchFill className='size-10 text-red-600' />} value={2} />
        <AdminDashboardCard label={"Today's Bookings"} icon={<FaBookBookmark className='size-9 text-emerald-800' />} value={15} />
        <AdminDashboardCard label='Ongoing Bookings' icon={<IoPeopleCircle className='size-10 text-amber-400' />} value={13} />
        <AdminDashboardCard label='Finished Bookings' icon={<FaClipboardCheck className='size-10 text-emerald-400' />} value={2} />
      </div>
      <div className='w-full h-full grid grid-cols-2 gap-4 px-4 pb-4'>
        <div className='w-full h-full bg-white shadow-md rounded-lg pb-4 flex flex-col gap-2'>
          <div className='w-full flex gap-2 py-2 text-[#1F2937] border-b-1 border-zinc-200'>
            <h5 className='font-bold p-3'>Booking Summary</h5>
            <AdminDashboardFilter />
          </div>

          <div className='flex gap-2 px-4'>
            <ExportButton label='Export CSV' />
            <ExportButton label='Export PDF' />
          </div>

          <div className='h-full px-4'>
            <BookingSummary />
          </div>
        </div>

        <div className='max-w-max flex flex-col gap-4'>
          <div className='max-w-max h-full bg-white shadow-md rounded-lg p-4'>
            <BookingsPerRoom />
          </div>
          <div className='max-w-max h-full bg-white shadow-md rounded-lg p-4 flex gap-2'>
            <PeakUsageTimes />

            <div className='w-38 flex-1 flex flex-col bg-[#F3F4F6] rounded-md p-2'>
              <div className="flex-1 flex flex-col justify-between">
                {paginatedRooms.map(room => (
                    <div className='flex gap-2 items-center' key={room.name}>
                      <div className='w-5 h-5 rounded-full' style={{ backgroundColor: room.color }}></div>
                      <h6 className='text-[#1F2937] text-xs font-bold'>{room.name}</h6>
                    </div>
                  ))}
                <div className="flex justify-between mt-2">
                  <span className="text-xs">{page + 1} / {totalPages}</span>
                  <div className='flex gap-2'></div>
                  <button
                    className="text-xs px-2 py-1 rounded bg-gray-200"
                    onClick={() => setPage(p => Math.max(p - 1, 0))}
                    disabled={page === 0}
                  >
                    &lt;
                  </button>
                  <button
                    className="text-xs px-2 py-1 rounded bg-gray-200"
                    onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
                    disabled={page === totalPages - 1}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard