import { useEffect, useState } from "react";
import { meetingRooms } from "./RoomListInterface";

interface RoomDetailsFormProps {
  roomCode: string | null;
}

const RoomDetailsForm: React.FC<RoomDetailsFormProps> = ({ roomCode }) => {
  const [selectedRoom, setSelectedRoom] = useState<typeof meetingRooms[0] | null>(null);

  useEffect(() => {
    if (roomCode) {
      const room = meetingRooms.find((r) => r.roomCode === roomCode);
      setSelectedRoom(room || null);
    } else {
      setSelectedRoom(null);
    }
  }, [roomCode]);

  if (!selectedRoom) return null;

  return (
    <div className="flex flex-col gap-5 w-1/2 text-[#1F2937]">
      <div className="border-b border-b-[#4B5563] pb-3 px-2 font-semibold">
        <p>Room Details</p>
      </div>
      <div className="flex flex-col gap-2 px-2">
        <img
          src={`/meetingroom/${selectedRoom.imageFile}`}
          alt={selectedRoom.roomName}
          className="w-auto max-w-full h-40 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-start gap-1">
            <p className="w-full sm:w-50 min-w-0 font-semibold truncate">Size:</p>
            <p className="flex-1 min-w-0 truncate">{selectedRoom.size}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-1">
            <p className="w-full sm:w-50 min-w-0 font-semibold truncate">No. of Seats:</p>
            <p className="flex-1 min-w-0 truncate">{selectedRoom.numberOfSeats}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-1">
            <p className="w-full sm:w-50 min-w-0 font-semibold truncate">Additional Facilities:</p>
            <p className="flex-1 min-w-0 truncate">{selectedRoom.additionalFacilities.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsForm;
