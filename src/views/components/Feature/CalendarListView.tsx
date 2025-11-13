// import { useBookings } from "../../../context/BookingContext";


// interface CalendarListViewProps {
//   search: string;
// }

// interface Booking {
//   id: number;
//   date: string;
//   title: string;
//   start_time: string;
//   end_time: string;
//   status: "cancelled" | "completed" | "upcoming";
// }

// const mockBookings: Booking[] = [
//   { id: 1, date: '2025-04-27', title: 'Team Meeting', start_time: '10:00 AM', end_time: '11:00 AM', status: 'cancelled' },
//   { id: 2, date: '2025-04-29', title: 'Team Meeting', start_time: '10:00 AM', end_time: '1:00 PM', status: 'completed' },
//   { id: 3, date: '2025-05-16', title: 'Client Call', start_time: '2:30 PM', end_time: '4:00 PM', status: 'upcoming' },
//   { id: 4, date: '2025-05-19', title: 'Project Review', start_time: '11:00 AM', end_time: '1:00 PM', status: 'cancelled' },
// ];

// const CalendarListView = ({ search }: CalendarListViewProps) => {
//   const {booking} = useBookings();
//   const filteredBookings = mockBookings.filter((booking) =>
//     booking.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "long" });
//     const year = date.getFullYear();
//     const dayOfWeek = date.toLocaleString("default", { weekday: "short" });

//     return {
//       day: day.toString(),
//       monthYear: `${month} ${year}`,
//       dayOfWeek: dayOfWeek,
//     };
//   };

//   return (
//     <div className="space-y-4">
//       <p className="text-lg font-medium text-gray-700">
//         Searching for:{" "}
//         <span className="font-semibold text-emerald-600">{search}</span>
//       </p>

//       {filteredBookings.length === 0 ? (
//         <p className="text-gray-500">No bookings found.</p>
//       ) : (
//         <ul className="space-y-2">
//           {filteredBookings.map((booking) => {
//             const formattedDate = formatDate(booking.date);

//             return (
//               <li
//                 key={booking.id}
//                 className="flex flex-row gap-3 rounded-md p-4 shadow-sm bg-white"
//               >
//                 <div className="flex flex-row items-center min-w-[50px] gap-3 w-35">
//                   <span className="text-xl font-semibold text-[#1F2937]">
//                     {formattedDate.day}
//                   </span>

//                   <span className="text-xs text-[#4B5563] uppercase">
//                     {formattedDate.monthYear}, {formattedDate.dayOfWeek}
//                   </span>
//                 </div>

//                 {/* Booking details */}
//                 <div className="flex flex-row items-center gap-3">
//                     <div
//                     className={`h-3 w-3 rounded-full ${
//                       booking.status === "upcoming"
//                         ? "bg-[#10B981]"
//                         : booking.status === "completed"
//                         ? "bg-[#F59E0B]"
//                         : "bg-[#EF4444]"
//                     }`}
//                   >
//                   </div>
//                   <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between">
//                     <div className="text-md  text-[#1F2937] w-70">
//                       {booking.start_time} – {booking.end_time}
//                     </div>
//                     <div className="text-md  text-[#1F2937]">
//                       {booking.title}
//                     </div>
//                   </div>

//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CalendarListView;


import React from "react";
import { useBookings } from "../../../context/BookingContext";
import type { Booking } from "../../../types";
import { expandOccurrences, parseRecurrence, toYMD } from "../../../utils/recurrence";

interface CalendarListViewProps {
  search: string;
}

// Using shared Booking type; fields: bookingId, startDatetime, endDatetime, status

const CalendarListView = ({ search }: CalendarListViewProps) => {
  const { bookings } = useBookings();

  // Filter bookings by title
  const filteredBookings = bookings.filter((booking: Booking) =>
    (booking.title || "").toLowerCase().includes(search.toLowerCase())
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
      dayOfWeek,
    };
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    // format time in "h:mm AM/PM"
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Map your backend booking status to UI status
  const mapStatus = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "declined" || s === "cancelled") return "cancelled";
    if (s === "completed") return "completed";
    // Pending/Approved/default treated as upcoming
    return "upcoming";
  };

  const parseRecurrence = (raw: any): any | null => {
    if (raw == null) return null;
    let cur: any = raw;
    for (let i = 0; i < 3 && typeof cur === 'string'; i++) {
      let s = cur.trim();
      if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
        s = s.slice(1, -1);
      }
      try { cur = JSON.parse(s); } catch {
        try { cur = JSON.parse(s.replace(/\\\"/g, '"')); } catch { break; }
      }
    }
    if (typeof cur === 'string') return null;
    // Normalize daysOfWeek if present (strings like "Mon"/"Monday" or numbers)
    const rawDays = cur?.daysOfWeek ?? cur?.DaysOfWeek;
    const normalizeDay = (d: any) => {
      if (typeof d === 'number') {
        if (d >= 0 && d <= 6) return d;
        if (d >= 1 && d <= 7) return d % 7; // 7 -> 0 (Sunday)
      }
      const name = String(d).toLowerCase();
      const map: Record<string, number> = {
        sun: 0, sunday: 0,
        mon: 1, monday: 1,
        tue: 2, tues: 2, tuesday: 2,
        wed: 3, weds: 3, wednesday: 3,
        thu: 4, thur: 4, thurs: 4, thursday: 4,
        fri: 5, friday: 5,
        sat: 6, saturday: 6,
      };
      return map[name];
    };
    const daysOfWeek = Array.isArray(rawDays)
      ? rawDays.map(normalizeDay).filter((v: any) => typeof v === 'number')
      : undefined;
    return cur ? {
      isRecurring: cur.isRecurring ?? cur.IsRecurring ?? false,
      dates: cur.dates ?? cur.Dates,
      daysOfWeek,
      pattern: (cur.pattern ?? cur.Pattern ?? '').toString().toLowerCase(),
      interval: cur.interval ?? cur.Interval ?? 1,
      endDate: cur.endDate ?? cur.EndDate,
    } : null;
  };

  const isRecurring = (booking: Booking) => {
    const rec = parseRecurrence((booking as any).recurrence as any);
    return Boolean(rec && rec.isRecurring);
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
          {(() => {
            const today = new Date();
            const windowEnd = new Date();
            windowEnd.setMonth(windowEnd.getMonth() + 3); // next 3 months
            const occurrenceItems = filteredBookings.flatMap((booking: Booking) => {
              const occs = expandOccurrences(booking, today, windowEnd);
              const uiStatus = mapStatus(booking.status);
              const recurring = isRecurring(booking);
              return occs.map((d) => ({ booking, occ: d, uiStatus, recurring }));
            });
            // Sort by occurrence date then time
            occurrenceItems.sort((a, b) => a.occ.getTime() - b.occ.getTime());

            if (occurrenceItems.length === 0) {
              return (
                <li className="text-gray-500">No upcoming occurrences found.</li>
              );
            }

            return occurrenceItems.map(({ booking, occ, uiStatus, recurring }) => {
              const formattedDate = formatDate(occ.toISOString());
              const startTime = formatTime(booking.startDatetime);
              const endTime = formatTime(booking.endDatetime);
              return (
                <li
                  key={`${booking.bookingId}-${toYMD(occ)}`}
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
                        uiStatus === "cancelled"
                          ? "bg-[#EF4444]"
                          : uiStatus === "completed"
                          ? "bg-[#F59E0B]"
                          : recurring
                          ? "bg-[#1E40AF]"
                          : "bg-[#10B981]"
                      }`}
                      title={recurring ? 'Recurring booking' : 'One-time booking'}
                    />
                    <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-md text-[#1F2937] w-70">
                        {startTime} – {endTime}
                      </div>
                      <div className="text-md text-[#1F2937]">{booking.title}</div>
                    </div>
                  </div>
                </li>
              );
            });
          })()}
        </ul>
      )}
    </div>
  );
};

export default CalendarListView;
