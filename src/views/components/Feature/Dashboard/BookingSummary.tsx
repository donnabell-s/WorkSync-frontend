import React, { useState } from 'react'
import { bookingSummaryList } from '../BookingListInterface'

const BookingSummary: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage] = useState<number>(5);

    return (
        <div className='w-full h-full bg-white shadow-md rounded-lg py-4 flex flex-col text-[#4B5563]'>
            <div className="grid grid-cols-5 gap-2 pb-3 px-4 font-bold text-sm flex-none border-b-1 border-zinc-200">
                <div>Room</div>
                <div>User</div>
                <div>Date</div>
                <div>Time</div>
                <div>Status</div>
            </div>
            <div className="flex-1 flex flex-col">
                {bookingSummaryList
                    .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)
                    .map((booking, index) => {
                        const [datePart, timePart] = booking.period.split(' ');
                        const [startTime, endTime] = booking.period.split(' ').slice(1).join(' ').split(' - ');
                        return (
                            <div
                                key={index + currentPage * rowsPerPage}
                                className={`grid grid-cols-5 gap-2 px-4 last:border-b-0 text-sm flex-1 items-center ${index % 2 === 1 ? 'bg-[#F9FAFB]' : ''
                                    }`}
                                style={{ minHeight: 0 }}
                            >
                                <div>{booking.roomCode}</div>
                                <div>{booking.user}</div>
                                <div>{datePart}</div>
                                <div>{`${startTime} - ${endTime}`}</div>
                                <div
                                    className={
                                        booking.status.toLowerCase() === 'upcoming'
                                            ? 'text-[#1EBD88] font-bold'
                                            : booking.status.toLowerCase() === 'completed'
                                                ? 'text-[#F59E0B] font-bold'
                                                : booking.status.toLowerCase() === 'cancelled'
                                                    ? 'text-[#EF4444] font-bold'
                                                    : ''
                                    }
                                >
                                    {booking.status.toUpperCase()}
                                </div>
                            </div>
                        );
                    })}
            </div>
            
            <div className="flex justify-end items-center gap-10 text-sm flex-none mt-2 px-4">
                <span>
                    Page {currentPage + 1} of {Math.ceil(bookingSummaryList.length / rowsPerPage)}
                </span>
                <div className='flex gap-4'>
                    <button
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        aria-label="Previous Page"
                    >
                        &lt;
                    </button>
                    <button
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                prev < Math.ceil(bookingSummaryList.length / rowsPerPage) - 1 ? prev + 1 : prev
                            )
                        }
                        disabled={currentPage >= Math.ceil(bookingSummaryList.length / rowsPerPage) - 1}
                        aria-label="Next Page"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingSummary