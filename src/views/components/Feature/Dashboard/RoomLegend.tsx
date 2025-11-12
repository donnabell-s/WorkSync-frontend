import React, { useState } from 'react';

interface Room {
  color: string;
  name: string;
}

interface RoomLegendProps {
  rooms?: Room[];
}

const RoomLegend: React.FC<RoomLegendProps> = ({ 
  rooms = [
    { color: '#2563EB', name: 'Conference Room' },
    { color: '#10B981', name: 'Skyline Room' },
    { color: '#F59E0B', name: 'Training Room' },
    { color: '#EF4444', name: 'Grand Hall' },
    { color: '#1E40AF', name: 'Sky Hall' },
  ]
}) => {
  const ROOMS_PER_PAGE = 5;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(rooms.length / ROOMS_PER_PAGE);
  const paginatedRooms = rooms.slice(page * ROOMS_PER_PAGE, (page + 1) * ROOMS_PER_PAGE);

  return (
    <div className='w-full col-span-3 flex flex-col bg-[#F3F4F6] rounded-md p-2'>
      <div className="flex-1 flex flex-col justify-between">
        {paginatedRooms.map(room => (
          <div className='flex gap-2 items-center' key={room.name}>
            <div className='w-5 h-5 rounded-full' style={{ backgroundColor: room.color }}></div>
            <h6 className='text-[#1F2937] text-xs font-bold'>{room.name}</h6>
          </div>
        ))}
        <div className="flex justify-between mt-2">
          <span className="text-xs">{page + 1} / {totalPages}</span>
          <div className='flex gap-2'>
            <button
              className="text-xs px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
              onClick={() => setPage(p => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              &lt;
            </button>
            <button
              className="text-xs px-2 py-1 rounded bg-gray-200 disabled:opacity-50"
              onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomLegend;