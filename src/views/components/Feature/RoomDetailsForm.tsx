import { useEffect, useState } from "react";
import { meetingRooms } from "./RoomListInterface";

interface RoomDetailsFormProps {
  roomCode: string;
}

const RoomDetailsForm: React.FC<RoomDetailsFormProps> = ({ roomCode }) => {
  const [selectedRoom, setSelectedRoom] = useState<typeof meetingRooms[0] | null>(null);

  useEffect(() => {
    const room = meetingRooms.find((r) => r.roomCode === roomCode);
    setSelectedRoom(room || null);
  }, [roomCode]);

  return (
    <div>
        <div>
          <p>Room Details</p>
        </div>
        {selectedRoom ? (
          <div className="p-4 flex flex-col gap-2">
            <img
              src={`/meetingroom/${selectedRoom.imageFile}`}
              alt={selectedRoom.roomName}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="text-sm text-[#4B5563]">
              <div className="flex flex-row">
                <p className="w-35 font-semibold">Size:</p>
                <p>{selectedRoom.size}</p>
              </div>
              <div className="flex flex-row">
                <p className="w-35 font-semibold">Seats:</p>
                <p>{selectedRoom.numberOfSeats}</p>
              </div>
              <div className="flex flex-row">
                <p className="min-w-35 font-semibold">Facilities:</p>
                <p>{selectedRoom.additionalFacilities.join(", ")}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Invalid room code.</p>
        )}
    </div>
  );
};

export default RoomDetailsForm;
