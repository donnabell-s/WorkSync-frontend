import { useEffect } from "react";
import { useRooms } from "../../../context/RoomContext";

interface RoomDetailsFormProps {
  roomCode: string | null;
}

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

const RoomDetailsForm: React.FC<RoomDetailsFormProps> = ({ roomCode }) => {
  const { getRoomById, currentRoom } = useRooms();

  useEffect(() => {
    if (roomCode) {
      getRoomById(roomCode);
    }
  }, [roomCode, getRoomById]);

  if (!currentRoom) return null;

  return (
    <div className="flex flex-col gap-5 w-1/2 text-[#1F2937]">
      <div className="border-b border-b-[#4B5563] pb-3 px-2 font-semibold">
        <p>Room Details</p>
      </div>
      <div className="flex flex-col gap-2 px-2">
        <img
          src={`${getImageSrc(currentRoom.size)}`}
          alt={currentRoom.name}
          className="w-auto max-w-full h-40 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-start gap-1">
            <p className="w-full sm:w-50 min-w-0 font-semibold truncate">Size:</p>
            <p className="flex-1 min-w-0 truncate">{currentRoom.size}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-1">
            <p className="w-full sm:w-50 min-w-0 font-semibold truncate">No. of Seats:</p>
            <p className="flex-1 min-w-0 truncate">{currentRoom.seats}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-1">
            <p className="w-full sm:w-50 min-w-0 font-semibold truncate">Additional Facilities:</p>
            <p className="flex-1 min-w-0 truncate">
              {currentRoom.amenities?.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsForm;
