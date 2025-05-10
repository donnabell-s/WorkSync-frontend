import React from "react";
import { meetingRooms } from "./RoomListInterface";
import { useNavigate } from "react-router";
import { LuCalendar1 } from "react-icons/lu";

interface RoomListProps {
  role: "admin" | "user";
  rooms: typeof meetingRooms;
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "available":
      return "text-[#10B981]";
    case "occupied":
      return "text-[#F59E0B]";
    default:
      return "text-gray-500";
  }
};


const RoomList: React.FC<RoomListProps> = ({ role, rooms }) => {
  const navigate = useNavigate();

  const path = role === "admin" ? "/admin/room-management" : "/user/book-room";
  const label = role === "admin" ? "View Room Details" : "Book Room";

  
  const handleClick = (roomId: string) => {
    localStorage.setItem("selectedRoomId", roomId);
    navigate(path);
  };
  

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="bg-white rounded-md  shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 flex flex-col"
        >
          <img
            src={`/meetingroom/${room.imageFile}`}
            alt={room.roomName}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="pt-4 pb-2">
            <h2 className="text-xl font-semibold text-[#1F2937]">
              {room.roomCode} – {room.roomName}
            </h2>
            <p className="text-sm text-gray-600 font-semibold">{room.location}</p>
          </div>
          <div className="text-sm text-[#4B5563]">
            <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
              <p className="w-35 font-semibold">Size:</p>
              <p>{room.size}</p>
            </div>
            <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
              <p className="w-35 font-semibold">Seats:</p>
              <p>{room.numberOfSeats}</p>
            </div>
            <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
              <p className="min-w-35 font-semibold">Facilities:</p>
              <p>{room.additionalFacilities.join(", ")}</p>
            </div>
            {role === "admin" && (
              <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
                <p className="w-35 font-semibold">Status:</p>
                <p className={`uppercase font-semibold ${getStatusClass(room.status)}`}>
                  {room.status}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-grow items-end mt-4">
            <button
            onClick={() => handleClick(room.roomCode)} // Assuming room has an `id` field
            className={`bg-[#10B981] py-1.5 text-sm text-white rounded-sm flex items-center justify-center gap-2 cursor-pointer ${
              role === "admin" ? "p-3" : "p-6"
            }`}
            >
                {role === "admin" && <LuCalendar1 className="text-base" />}
                {label}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
