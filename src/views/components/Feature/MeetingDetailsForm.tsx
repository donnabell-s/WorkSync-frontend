import { useEffect, useState } from "react";
import { meetingRooms } from "./RoomListInterface";
import { FiMapPin } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";

interface MeetingDetailsFormProps {
  roomCode: string | null;
}

const MeetingDetailsForm: React.FC<MeetingDetailsFormProps> = ({ roomCode }) => {
  const [selectedRoom, setSelectedRoom] = useState<typeof meetingRooms[0] | null>(null);
  const [notifTime, setNotifTime] = useState<number>(10);
  const [notifUnit, setNotifUnit] = useState<"minutes" | "hours" | "days">("minutes");

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
    <div className="w-1/2 flex flex-col gap-5 text-[#1F2937]">
      <div className="border-b border-b-[#4B5563] pb-3 px-3 font-semibold">
        <p>Meeting Details</p>
      </div>
      <div className="flex flex-col gap-6 px-3">
        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <FiMapPin className="text-xl mt-1" />
          <div className="flex-1 min-w-0">
            <p className="text-lg truncate">{selectedRoom.roomCode} ({selectedRoom.roomName})</p>
            <p className="truncate">{selectedRoom.location}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <FiBell className="text-xl mt-1" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap w-full">
            <label className="whitespace-nowrap">Notifications</label>
            <input
              type="number" min={1} value={notifTime} 
              onChange={(e) => setNotifTime(Number(e.target.value))} 
              className="bg-[#F3F4F6] rounded px-4 py-2 w-full md:w-20"
            />
            <div className="relative w-full md:w-fit">
              <select
                className="appearance-none bg-[#F3F4F6] rounded px-4 py-2 pr-10 w-full"
                value={notifUnit}
                onChange={(e) => setNotifUnit(e.target.value as "minutes" | "hours" | "days")}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#1F2937]">
                <FaCaretDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsForm;
