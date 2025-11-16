import React from 'react';
import { useBookings } from '../../../context/BookingContext';
import { expandOccurrences } from '../../../utils/recurrence';

interface TimeInsightsProps {
  monthDate: Date;
}

const TimeInsights: React.FC<TimeInsightsProps> = ({ monthDate }) => {
  const { bookings } = useBookings();

  const windowStart = React.useMemo(() => new Date(monthDate.getFullYear(), monthDate.getMonth(), 1), [monthDate]);
  const windowEnd = React.useMemo(() => new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0), [monthDate]);

  const totalHours = React.useMemo(() => {
    const minutes = bookings.reduce((sum, booking) => {
      if (!booking) return sum;
      const status = String(booking.status || '').toLowerCase();
      if (status !== 'approved') return sum;

      const start = new Date(booking.startDatetime ?? (booking as any).startDateTime ?? 0);
      const end = new Date(booking.endDatetime ?? (booking as any).endDateTime ?? 0);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return sum;
      const durationMinutes = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
      if (durationMinutes === 0) return sum;

      const occurrences = expandOccurrences(booking, windowStart, windowEnd);
      if (!occurrences.length) return sum;

      return sum + durationMinutes * occurrences.length;
    }, 0);

    return (minutes / 60).toFixed(2);
  }, [bookings, windowStart, windowEnd]);

  const monthName = windowStart.toLocaleString(undefined, { month: 'long' }).toUpperCase();

  return (
    <div className="w-full flex flex-col text-[#1F2937] gap-2">
      <p className="font-semibold text-lg">Time Insights</p>
      <div className="flex flex-col gap-1 ml-1">
        <p className="font-semibold text-sm">{`${monthName} ${windowStart.getDate()} - ${monthName} ${windowEnd.getDate()}, ${windowStart.getFullYear()}`}</p>
        <p className="text-xs">{totalHours} hr in meetings</p>
      </div>
    </div>
  );
};

export default TimeInsights;
