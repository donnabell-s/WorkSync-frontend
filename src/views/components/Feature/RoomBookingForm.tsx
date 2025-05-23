import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { useRooms } from "../../../context/RoomContext";
import { useBookings } from "../../../context/BookingContext";
import { useAuth } from "../../../context/AuthContext";
import { Room } from "../../../../server/types";

export interface NewBookingDto {
  userId: number;
  roomId: string;
  title: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  recurrence: {
    isRecurring: boolean;
    pattern?: string;
    interval?: number;
    endDate?: Date;
  };
  status: string;
}

interface RoomBookingFormProps {
  edit?: boolean;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({ edit = false }) => {
  const navigate = useNavigate();
  const { getRoomById } = useRooms();
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const { addBooking } = useBookings();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceType, setRecurrenceType] = useState("");
  const [interval, setInterval] = useState(1);

  const todayDate = new Date().toISOString().split("T")[0];

  const timeOptions = Array.from({ length: 23 }, (_, i) => {
    const hour = 8 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  });

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
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    );
  };

  useEffect(() => {
    const roomId = localStorage.getItem("selectedRoomId");
    if (roomId) {
      getRoomById(roomId);
    }
  }, []);

  useEffect(() => {
    console.log("Current room:", currentRoom);
  }, [currentRoom]);

  // useEffect(() => {
  //   if (rooms && !title && rooms.length > 0) {
  //     setTitle(`Book ${rooms[0].name}`);
  //   }
  // }, [rooms, title]);

  useEffect(() => {
    if (!isRecurring || !startDate || !recurrenceType || interval < 1) return;

    const start = new Date(startDate);
    const nextDate = new Date(start);

    switch (recurrenceType) {
      case "daily":
        nextDate.setDate(start.getDate() + interval);
        break;
      case "weekly":
        nextDate.setDate(start.getDate() + interval * 7);
        break;
      case "monthly":
        nextDate.setMonth(start.getMonth() + interval);
        break;
    }

    setEndDate(nextDate.toISOString().split("T")[0]);
  }, [isRecurring, startDate, recurrenceType, interval]);

  useEffect(() => {
    const draftData = localStorage.getItem("tempBooking");
    if (draftData) {
      try {
        const draft = JSON.parse(draftData);
        if (draft.title) setTitle(draft.title);
        if (draft.date) {
          const localDate = new Date(draft.date).toLocaleDateString("en-CA");
          setStartDate(localDate);
          setEndDate(localDate);
        }
      } catch {
        localStorage.removeItem("tempBooking");
      }
    }
  }, []);

  const calculateMinEndTime = (startTime: string) => {
    const index = timeOptions.indexOf(startTime);
    return index >= 0 && index + 1 < timeOptions.length
      ? timeOptions[index + 1]
      : "08:30";
  };

  const handleSave = async () => {
    if (!startTime || !endTime) return alert("Please select both start and end times");

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const now = new Date();

    if (startDateTime < now) return alert("Start date and time must be in the future.");
    if (endDateTime <= startDateTime) return alert("End time must be after start time.");

    const diffMinutes = (endDateTime.getTime() - startDateTime.getTime()) / 60000;
    if (diffMinutes < 30) return alert("Booking must be at least 30 minutes.");

    const startHour = startDateTime.getHours();
    const endHour = endDateTime.getHours();
    if (startHour < 8 || endHour > 19 || (endHour === 19 && endDateTime.getMinutes() > 0)) {
      return alert("Bookings must be between 08:00 and 19:00.");
    }

    if (!currentRoom || !user) return alert("Missing room or user info");

    const payload: NewBookingDto = {
      userId: parseInt(user.id, 10),
      roomId: currentRoom.id,
      title,
      description: "",
      startDateTime,
      endDateTime,
      recurrence: {
        isRecurring,
        pattern: recurrenceType,
        interval: isRecurring ? interval : undefined,
        endDate: isRecurring ? new Date(endDate) : undefined,
      },
      status: "confirmed",
    };

    try {
      await addBooking(payload);
      navigate("/user/my-bookings");
    } catch (err) {
      alert("Failed to save booking. Please try again.");
    }
  };

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
          disabled={!currentRoom}
          onClick={handleSave}
          className={`bg-[#1E40AF] text-white text-lg px-8 py-2 rounded-full transition-opacity duration-300 ${
            !currentRoom ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Save
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
        <TimeSelect value={startTime} onChange={setStartTime} maxTime={endTime} />
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
              if (!next && startDate !== endDate) setEndDate(startDate);
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
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomBookingForm;
