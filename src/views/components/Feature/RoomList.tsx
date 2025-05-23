import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { LuCalendar1 } from "react-icons/lu";
import { Room } from "../../../../server/types";
import { useRooms } from "../../../context/RoomContext";

interface RoomListProps {
  role: "admin" | "user";
  rooms: Room[];
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

const getImageSrc = (size: string) => {
  switch (size.toLowerCase()) {
    case "small":
      return "/meetingroom/small.jpg";
    case "medium":
      return "/meetingroom/medium.jpg";
    case "large":
      return "/meetingroom/large.jpg";
    default:
      return "/meetingroom/default.jpg";
  }
}


const RoomList: React.FC<RoomListProps> = ({ role, rooms }) => {
  const navigate = useNavigate();
  const { currentRoom, getRoomById } = useRooms();

  const path = role === "admin" ? "/admin/rooms/room-detail" : "/user/book-room";
  const label = role === "admin" ? "View Room Details" : "Book Room";

  const handleClick = async (roomId: string) => {
    localStorage.setItem("selectedRoomId", roomId);

    if (role === "admin" && label === "View Room Details") {
      try {
        await getRoomById(roomId);
        console.log("Current Room:", currentRoom);
        if (currentRoom) {
          navigate(path);
        } else {
          console.error("Room not found");
        }
      } catch (error) {
        console.error("Failed to get room by ID:", error);
      }
    } else if (role === "user" && label === "Book Room") {
      navigate(path);
    }
  };


  useEffect(() => {
    if (role === "admin" && label === "View Room Details" && currentRoom) {
      navigate(path);
    }
  }, [currentRoom, role, label, path]);

  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="bg-white rounded-md  shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 flex flex-col"
        >
          <img
            src={`${getImageSrc(room.size)}`}
            alt={room.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="pt-4 pb-2">
            <h2 className="text-xl font-semibold text-[#1F2937]">
              {room.code} – {room.name}
            </h2>
            <p className="text-sm text-gray-600 font-semibold">{room.location} - Level {room.level}</p>
          </div>
          <div className="text-sm text-[#4B5563]">
            <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
              <p className="w-35 font-semibold">Size:</p>
              <p>{room.size}</p>
            </div>
            <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
              <p className="w-35 font-semibold">Seats:</p>
              <p>{room.seats}</p>
            </div>
            <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
              <p className="min-w-35 font-semibold">Facilities:</p>
              <p>{Array.isArray(room.amenities) ? room.amenities.join(", ") : ""}</p>
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
              onClick={() => handleClick(room.id)}
              className={`bg-[#10B981] py-1.5 text-sm text-white rounded-sm flex items-center justify-center gap-2 cursor-pointer ${role === "admin" ? "p-3" : "p-6"
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
