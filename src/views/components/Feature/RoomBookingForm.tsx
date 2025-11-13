import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { useRooms } from "../../../context/RoomContext";
import { useBookings } from "../../../context/BookingContext";
import type { CreateBookingPayload } from "../../../services/bookings.service";
import { useAuth } from "../../../context/AuthContext";

function generateRecurringDates(
  pattern: string,
  interval: number,
  startDate: Date,
  endDate: Date,
  daysOfWeek?: number[]
): Date[] {
  const dates: Date[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    if (pattern === "daily") {
      dates.push(new Date(current));
      current.setDate(current.getDate() + interval);
    } else if (pattern === "weekly") {
      if (daysOfWeek?.includes(current.getDay())) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    } else if (pattern === "monthly") {
      dates.push(new Date(current));
      current.setMonth(current.getMonth() + interval);
    }
  }

  return dates;
}

// Use backend-aligned create payload

interface RoomBookingFormProps {
  edit?: boolean;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({ edit = false }) => {
  const navigate = useNavigate();
  const { getRoomById, currentRoom } = useRooms();
  const { getBookingById, currentBooking, addBooking, updateBooking } = useBookings();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState("");
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  // Local YYYY-MM-DD helper
  const toLocalYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  const todayDate = toLocalYMD(new Date());

  const timeOptions = Array.from({ length: 23 }, (_, i) => {
    const hour = 8 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  });

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Compute next future half-hour slot (clamped within booking window)
  const nextHalfHourSlot = () => {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    if (m === 0) {
      m = 30;
    } else if (m <= 30) {
      m = 30;
    } else {
      m = 0;
      h += 1;
    }
    if (h < 8) { h = 8; m = 0; }
    if (h > 19 || (h === 19 && m > 0)) { return "19:30"; }
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const TimeSelect = ({
    value,
    onChange,
    minTime,
    maxTime,
  }: {
    value: string;
    onChange: (time: string) => void;
    minTime?: string;
    maxTime?: string;
  }) => {
    const filteredOptions = timeOptions.filter((time) => {
      if (minTime && time < minTime) return false;
      if (maxTime && time > maxTime) return false;
      return true;
    });
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
      >
        <option value="">Select time</option>
        {filteredOptions.map((time) => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>
    );
  };

  // Load draft from localStorage (calendar -> modal flow)
  useEffect(() => {
    const raw = localStorage.getItem("tempBooking");
    if (raw) {
      try {
        const temp = JSON.parse(raw);
        if (temp?.title && temp?.date) {
          setTitle(temp.title);
          const dateStr = String(temp.date);
          const ymdPattern = /^\d{4}-\d{2}-\d{2}$/;
            const normalized = ymdPattern.test(dateStr) ? dateStr : toLocalYMD(new Date(dateStr));
          setStartDate(normalized);
          setEndDate(normalized);
        }
      } catch (e) {
        console.error("Failed to parse tempBooking", e);
      } finally {
        localStorage.removeItem("tempBooking");
      }
    }
  }, []);

  // Fetch selected room (calendar flow). In edit mode, we'll fetch by booking's roomId below.
  useEffect(() => {
    const roomId = localStorage.getItem("selectedRoomId");
    if (roomId) getRoomById(roomId);
  }, [getRoomById]);

  // Editing existing booking
  useEffect(() => {
    if (edit) {
      const bookingIdStr = localStorage.getItem("selectedBookingId");
      if (bookingIdStr) {
        const bookingId = Number(bookingIdStr);
        if (!isNaN(bookingId)) {
          getBookingById(bookingId);
        }
      }
    }
  }, [edit, getBookingById]);

  useEffect(() => {
    if (edit && currentBooking) {
      setTitle(currentBooking.title);
      const parseToLocal = (iso?: string) => {
        if (!iso) return { d: todayDate, t: "" };
        const dt = new Date(iso);
        const y = dt.getFullYear();
        const m = String(dt.getMonth() + 1).padStart(2, "0");
        const day = String(dt.getDate()).padStart(2, "0");
        const hh = String(dt.getHours()).padStart(2, "0");
        const mm = String(dt.getMinutes()).padStart(2, "0");
        return { d: `${y}-${m}-${day}`, t: `${hh}:${mm}` };
      };
      const s = parseToLocal(currentBooking.startDatetime);
      const e = parseToLocal(currentBooking.endDatetime);
      let recEndDateStr: string | undefined;
      try {
        let rec: any = currentBooking.recurrence;
        for (let i = 0; i < 2; i++) {
          if (typeof rec === 'string') { try { rec = JSON.parse(rec); continue; } catch { break; } }
          break;
        }
        if (rec?.isRecurring && rec?.endDate) {
          const r = parseToLocal(rec.endDate);
          recEndDateStr = r.d;
          setIsRecurring(true);
          setRecurrenceType(rec.pattern || "");
          setInterval(rec.interval ?? 1);
          if (rec.pattern === "weekly" && Array.isArray(rec.daysOfWeek)) setSelectedDays(rec.daysOfWeek);
        } else {
          setIsRecurring(false);
          setRecurrenceType("");
          setInterval(1);
          setSelectedDays([]);
        }
      } catch {}
      setStartDate(s.d);
      setStartTime(s.t);
      setEndDate(recEndDateStr ?? e.d);
      setEndTime(e.t);
      // Ensure room details are available in edit mode
      getRoomById(String(currentBooking.roomId));
    }
  }, [edit, currentBooking, getRoomById, todayDate]);

  // Auto-extend end date for recurrence preview (replicates admin logic)
  useEffect(() => {
    if (!isRecurring || !startDate || !recurrenceType || interval < 1) return;
    const start = new Date(startDate + 'T00:00:00');
    const last = new Date(start);
    const n = Math.max(1, Number(interval));
    if (recurrenceType === 'daily') {
      last.setDate(start.getDate() + (n - 1));
    } else if (recurrenceType === 'weekly') {
      const days = (selectedDays && selectedDays.length > 0) ? [...selectedDays].sort((a,b)=>a-b) : [start.getDay()];
      const maxDow = days[days.length - 1];
      const weekStart = new Date(start);
      weekStart.setDate(start.getDate() + 7 * (n - 1));
      const currentDow = weekStart.getDay();
      const diff = (maxDow - currentDow + 7) % 7;
      last.setTime(weekStart.getTime());
      last.setDate(weekStart.getDate() + diff);
    } else if (recurrenceType === 'monthly') {
      last.setMonth(start.getMonth() + (n - 1));
    }
    setEndDate(toLocalYMD(last));
  }, [isRecurring, startDate, recurrenceType, interval, selectedDays]);


/* Removed duplicated effects and stray JSX */

  const calculateMinEndTime = (startTime: string) => {
    const index = timeOptions.indexOf(startTime);
    return index >= 0 && index + 1 < timeOptions.length
      ? timeOptions[index + 1]
      : "08:30";
  };

  // Restrict same-day start times to future slots
  const minStartTime = startDate === todayDate ? nextHalfHourSlot() : undefined;
  useEffect(() => {
    if (minStartTime && startTime && startTime < minStartTime) {
      setStartTime(minStartTime);
    }
  }, [minStartTime]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!startTime || !endTime) return alert("Please select both start and end times");

    const startLocal = `${startDate}T${startTime}:00`;
    const nonRecurringEndLocal = `${endDate}T${endTime}:00`;
    const recurringEndLocal = `${startDate}T${endTime}:00`;
    const startDateTime = new Date(startLocal);
    const endDateTime = new Date(nonRecurringEndLocal);
    const now = new Date();

    if (startDateTime < now) return alert("Start date and time must be in the future.");
    if (!isRecurring && endDateTime <= startDateTime) return alert("End time must be after start time.");
    if (isRecurring) {
      const occEnd = new Date(recurringEndLocal);
      if (occEnd <= startDateTime) return alert("For recurring bookings, end time must be after start time.");
    }

    const diffMinutes = (endDateTime.getTime() - startDateTime.getTime()) / 60000;
    if (!isRecurring && diffMinutes < 30) return alert("Booking must be at least 30 minutes.");

    const startHour = startDateTime.getHours();
    const endRef = isRecurring ? new Date(recurringEndLocal) : endDateTime;
    const endHour = endRef.getHours();
    if (startHour < 8 || endHour > 19 || (endHour === 19 && endRef.getMinutes() > 0)) {
      return alert("Bookings must be between 08:00 and 19:00.");
    }

    if (!user) return alert("Missing user info");
    const roomIdForPayload = edit && currentBooking ? currentBooking.roomId : currentRoom?.roomId;
    if (!roomIdForPayload) return alert("Missing room info");

    const parsedStart = new Date(startLocal);
    const parsedSeriesEnd = new Date(`${endDate}T00:00:00`);

    const recurrenceDates = isRecurring
      ? generateRecurringDates(
          recurrenceType,
          interval ?? 1,
          parsedStart,
          parsedSeriesEnd,
          selectedDays
        )
      : [];

    const payload: CreateBookingPayload = {
      userRefId: Number(user.id),
      roomId: String(roomIdForPayload),
      title,
      description: "Project sync",
      startDatetime: startLocal,
      endDatetime: isRecurring ? recurringEndLocal : nonRecurringEndLocal,
      recurrence: isRecurring
        ? {
            isRecurring: true,
            pattern: recurrenceType,
            interval,
            endDate: `${endDate}T${(endTime || startTime || '00:00')}:00`,
            daysOfWeek: recurrenceType === "weekly" ? selectedDays : undefined,
            dates: recurrenceDates,
          }
        : { isRecurring: false },
    };

    try {
      if (edit && currentBooking) {
        await updateBooking(String(currentBooking.bookingId), payload);
      } else {
        await addBooking(payload);
      }
      navigate("/user/my-bookings");
    } catch (err) {
      alert("Failed to save booking. Please try again.");
    }
  };

  // If start time is moved to or beyond the previously chosen end time, clear endTime so user must reselect.
  useEffect(() => {
    if (endTime && startTime && endTime <= startTime) {
      setEndTime("");
    }
  }, [startTime, endTime]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="relative w-full md:w-[75%]">
          <RxCross1
            className="absolute left-2 top-1/2 -translate-y-1/2 text-[#4B5563] cursor-pointer text-lg"
            onClick={() => navigate("/user/room-explorer")}
          />
          <input
            type="text"
            placeholder="Booking Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 border-b border-[#4B5563] px-9 py-1 w-full text-[25px] focus:outline-none focus:border-black transition-colors duration-200"
          />
        </div>
        <button
          disabled={!currentRoom && !edit}
          onClick={handleSave}
          className={`bg-[#1E40AF] text-white text-lg px-8 py-2 rounded-full transition-opacity duration-300 ${
            (!currentRoom && !edit) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {edit ? "Update" : "Save"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
        <input
          type="date"
          min={todayDate}
          value={startDate}
          onChange={(e) => {
            const val = e.target.value;
            setStartDate(val);
            if (!isRecurring) setEndDate(val);
          }}
          className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
        />
        {/* Start time: allow selecting any future slot; if it moves beyond existing endTime we'll reset endTime */}
        <TimeSelect value={startTime} onChange={setStartTime} minTime={minStartTime} />
        <p className="text-sm whitespace-nowrap">to</p>
        <input
          type="date"
          min={todayDate}
          value={endDate}
          onChange={(e) => {
            const val = e.target.value;
            setEndDate(val);
            if (!isRecurring) setStartDate(val);
          }}
          className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
        />
        <TimeSelect
          value={endTime}
          onChange={setEndTime}
          minTime={calculateMinEndTime(startTime)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <button
          onClick={() =>
            setIsRecurring((prev) => {
              const next = !prev;
              if (!next) {
                setRecurrenceType("");
                setInterval(1);
                setEndDate(startDate);
              } else {
                if (!recurrenceType) setRecurrenceType("daily");
                if (!interval) setInterval(1);
              }
              return next;
            })
          }
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 w-fit ${
            isRecurring
              ? "bg-[#10B981] text-white border-2 border-[#10B981]"
              : "bg-transparent border-2 border-[#10B981] text-[#10B981]"
          }`}
        >
          {isRecurring ? "Recurring" : "One-Time"}
        </button>

        {isRecurring && (
          <div className="flex flex-col sm:flex-row gap-2 pl-0 sm:pl-6 items-start sm:items-center flex-wrap">
            <div className="relative w-full sm:w-fit">
              <select
                value={recurrenceType}
                onChange={(e) => setRecurrenceType(e.target.value)}
                className="appearance-none bg-[#F3F4F6] rounded px-4 py-2 pr-10 w-full"
              >
                <option value="">Select Recurrence</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#1F2937]">
                <FaCaretDown />
              </div>
            </div>
            <p className="text-sm whitespace-nowrap">every</p>
            <input
              type="number"
              min="1"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
            />
            <p className="text-sm whitespace-nowrap">{recurrenceType || "interval"}</p>
            {recurrenceType === "weekly" && (
              <div className="flex flex-wrap gap-2 mt-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleDay(idx)}
                    className={`px-3 py-1 rounded-md border ${
                      selectedDays.includes(idx)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default RoomBookingForm;

