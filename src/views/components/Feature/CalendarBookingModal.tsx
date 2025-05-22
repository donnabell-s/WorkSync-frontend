import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { LuClock } from "react-icons/lu";

interface CalendarBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
}

const CalendarBookingModal: React.FC<CalendarBookingModalProps> = ({ isOpen, onClose, date }) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateRangeText = `${formattedDate} - ${formattedDate}`;
  const repeatText = "Does not repeat";

  const handleBookRoom = () => {
    const payload = {
      title,
      date: date.toISOString(),
    };

    localStorage.setItem("tempBooking", JSON.stringify(payload));
    navigate("/user/room-explorer");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.26)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 pb-8 max-w-md w-full shadow-[0_0_10px_rgba(0,0,0,0.1)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross2
          className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200"
          size={21}
          onClick={onClose}
        />
        <input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-0 border-b border-[#4B5563] p-1 mt-3 w-[85%] text-xl min-w-0 focus:outline-none focus:border-black transition-colors duration-200"
        />

        <div className="flex items-center gap-3 mt-4">
          <div className="text-emerald-600">
            <LuClock size={20} />
          </div>
          <div className="flex flex-col text-gray-700">
            <span className="text-sm font-medium">{dateRangeText}</span>
            <span className="text-xs text-gray-500">{repeatText}</span>
          </div>
        </div>

        <div className="flex flex-row justify-end mt-10">
          <button
            className="bg-[#1E40AF] text-white py-1 px-6 rounded-full"
            onClick={handleBookRoom}
          >
            Book a Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarBookingModal;
