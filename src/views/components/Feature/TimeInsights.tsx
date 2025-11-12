interface Booking {
  id: number;
  date: string;
  title: string;
  start_time: string;
  end_time: string;
  status: string;
}

const mockBookings: Booking[] = [
  { id: 1, date: '2025-04-27', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'cancelled' },
  { id: 2, date: '2025-04-29', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'completed' },
  { id: 3, date: '2025-05-16', title: 'Client Call', start_time: '2:30 PM', end_time: '4:00 PM', status: 'upcoming' },
  { id: 4, date: '2025-05-19', title: 'Project Review', start_time: '11:00 AM', end_time: '1:00 PM', status: 'cancelled' },
];

const parseTime = (timeStr: string) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return { hours, minutes };
};

const TimeInsights = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  const monthBookings = mockBookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    return bookingDate.getFullYear() === year && bookingDate.getMonth() === month;
  });

  let totalMinutes = 0;

  monthBookings.forEach((booking) => {
    const start = parseTime(booking.start_time);
    const end = parseTime(booking.end_time);
    const startTotal = start.hours * 60 + start.minutes;
    const endTotal = end.hours * 60 + end.minutes;
    const diff = endTotal - startTotal;

    if (diff > 0) totalMinutes += diff;
  });

  const totalHours = (totalMinutes / 60).toFixed(2);
  const monthName = monthStart.toLocaleString('default', { month: 'long' }).toUpperCase();

  return (
    <div className="w-full flex flex-col text-[#1F2937] gap-2">
        <p className=' font-semibold text-lg'>Time Insights</p>
        <div className='flex flex-col gap-1 ml-1'>
            <p className=' font-semibold text-sm '>{`${monthName} ${monthStart.getDate()} - ${monthName} ${monthEnd.getDate()}, ${year}`}</p>
            <p className='text-xs'>{totalHours} hr in meetings</p>
        </div>

    </div>
  );
};

export default TimeInsights;
