import { useEffect, useState } from "react";
import { meetingRooms } from "./RoomListInterface";

const UserRoomForms = () => {
  const [selectedRoom, setSelectedRoom] = useState<typeof meetingRooms[0] | null>(null);

  useEffect(() => {
    const storedRoomCode = localStorage.getItem("selectedRoomId");
    if (storedRoomCode) {
      const room = meetingRooms.find((r) => r.roomCode === storedRoomCode);
      setSelectedRoom(room || null);
    }
  }, []);

  return (
    <div>
      <div></div>
      <div className="flex flex-row">
        <div>
            <div>
                <p>Meeting Details</p>
            </div>
            <div></div>
        </div>
        <div className="flex flex-col">
            <div>
                <p>Room Details</p>
            </div>
            {selectedRoom ? (
                <div className="bg-white rounded-md shadow-[0_0_4px_rgba(0,0,0,0.1)] p-4 flex flex-col">
                <img
                    src={`/meetingroom/${selectedRoom.imageFile}`}
                    alt={selectedRoom.roomName}
                    className="w-full h-40 object-cover rounded-md"
                />
                <div className="text-sm text-[#4B5563]">
                    <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
                    <p className="w-35 font-semibold">Size:</p>
                    <p>{selectedRoom.size}</p>
                    </div>
                    <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
                    <p className="w-35 font-semibold">Seats:</p>
                    <p>{selectedRoom.numberOfSeats}</p>
                    </div>
                    <div className="flex flex-row border-b border-b-[#D2D4D8] py-2">
                    <p className="min-w-35 font-semibold">Facilities:</p>
                    <p>{selectedRoom.additionalFacilities.join(", ")}</p>
                    </div>
                </div>
                </div>
            ) : (
                <p className="text-gray-500">No room selected.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserRoomForms;
