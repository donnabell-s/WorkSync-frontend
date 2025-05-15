
interface CalendarListViewProps {
  search: string;
}

interface Booking {
  id: number;
  date: string;
  title: string;
  start_time: string;
  end_time: string;
  status: "cancelled" | "completed" | "upcoming";
}

const mockBookings: Booking[] = [
  { id: 1, date: '2025-04-27', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'cancelled' },
  { id: 2, date: '2025-04-29', title: 'Team Meeting', start_time: '10:00 AM', end_time: '1:00 PM', status: 'completed' },
  { id: 3, date: '2025-05-16', title: 'Client Call', start_time: '2:30 PM', end_time: '4:00 PM', status: 'upcoming' },
  { id: 4, date: '2025-05-19', title: 'Project Review', start_time: '11:00 AM', end_time: '1:00 PM', status: 'cancelled' },
];

const CalendarListView = ({ search }: CalendarListViewProps) => {
  const filteredBookings = mockBookings.filter((booking) =>
    booking.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleString("default", { weekday: "short" });

    return {
      day: day.toString(),
      monthYear: `${month} ${year}`,
      dayOfWeek: dayOfWeek,
    };
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-gray-700">
        Searching for:{" "}
        <span className="font-semibold text-emerald-600">{search}</span>
      </p>

      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredBookings.map((booking) => {
            const formattedDate = formatDate(booking.date);

            return (
              <li
                key={booking.id}
                className="flex flex-row gap-3 rounded-md p-4 shadow-sm bg-white"
              >
                <div className="flex flex-row items-center min-w-[50px] gap-3 w-35">
                  <span className="text-xl font-semibold text-[#1F2937]">
                    {formattedDate.day}
                  </span>

                  <span className="text-xs text-[#4B5563] uppercase">
                    {formattedDate.monthYear}, {formattedDate.dayOfWeek}
                  </span>
                </div>

                {/* Booking details */}
                <div className="flex flex-row items-center gap-3">
                    <div
                    className={`h-3 w-3 rounded-full ${
                      booking.status === "upcoming"
                        ? "bg-[#10B981]"
                        : booking.status === "completed"
                        ? "bg-[#F59E0B]"
                        : "bg-[#EF4444]"
                    }`}
                  >
                  </div>
                  <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-md  text-[#1F2937] w-70">
                      {booking.start_time} – {booking.end_time}
                    </div>
                    <div className="text-md  text-[#1F2937]">
                      {booking.title}
                    </div>
                  </div>

                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CalendarListView;
