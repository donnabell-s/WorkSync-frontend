import { useEffect, useState } from "react";
import { FiMapPin, FiBell } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { useRooms } from "../../../context/RoomContext";

interface MeetingDetailsFormProps {
  roomCode: string | null;
  readOnly?: boolean;
  description?: string;
  onDescriptionChange?: (val: string) => void;
  attendees?: number;
  onAttendeesChange?: (val: number) => void;
}
const MeetingDetailsForm: React.FC<MeetingDetailsFormProps> = ({
  roomCode,
  readOnly = false,
  description,
  onDescriptionChange,
  attendees,
  onAttendeesChange,
}) => {
  const [notifTime, setNotifTime] = useState<number>(10);
  const [notifUnit, setNotifUnit] = useState<"minutes" | "hours" | "days">("minutes");
  const [localDescription, setLocalDescription] = useState<string>("");
  const [localAttendees, setLocalAttendees] = useState<number>(1);

  const { getRoomById, currentRoom } = useRooms();

  useEffect(() => {
    if (roomCode) {
      getRoomById(roomCode);
    }
  }, [roomCode, getRoomById]);

  if (!currentRoom) return null;

  return (
    <div className="w-1/2 flex flex-col gap-5 text-[#1F2937]">
      <div className="border-b border-b-[#4B5563] pb-3 px-3 font-semibold">
        <p>Meeting Details</p>
      </div>
      <div className="flex flex-col gap-6 px-3">
        {/* Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium">Description</label>
          <textarea
            id="description"
            value={description !== undefined ? description : localDescription}
            onChange={(e) => {
              const val = e.target.value;
              if (onDescriptionChange) onDescriptionChange(val); else setLocalDescription(val);
            }}
            placeholder="Enter description"
            className="bg-[#F3F4F6] rounded px-4 py-2 w-full min-h-24 resize-y"
            disabled={readOnly}
            readOnly={readOnly}
          />
        </div>
        {/* Expected Attendees */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap w-full">
          <label htmlFor="attendees" className="whitespace-nowrap">Expected Attendees</label>
          <input
            id="attendees"
            type="number"
            min={1}
            value={attendees !== undefined ? attendees : localAttendees}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (onAttendeesChange) onAttendeesChange(n); else setLocalAttendees(n);
            }}
            className="bg-[#F3F4F6] rounded px-4 py-2 w-full md:w-20"
            disabled={readOnly}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-start gap-3">
          <FiMapPin className="text-xl mt-1" />
          <div className="flex-1 min-w-0">
            <p className="text-lg truncate">
              {currentRoom.code} ({currentRoom.name})
            </p>
            <p className="truncate">{currentRoom.location}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <FiBell className="text-xl mt-1" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap w-full">
            <label className="whitespace-nowrap">Notifications</label>
            <input
              type="number"
              min={1}
              value={notifTime}
              onChange={(e) => setNotifTime(Number(e.target.value))}
              className="bg-[#F3F4F6] rounded px-4 py-2 w-full md:w-20"
              disabled={readOnly}
            />
            <div className="relative w-full md:w-fit">
              <select
                className="appearance-none bg-[#F3F4F6] rounded px-4 py-2 pr-10 w-full"
                value={notifUnit}
                onChange={(e) =>
                  setNotifUnit(e.target.value as "minutes" | "hours" | "days")
                }
                disabled={readOnly}
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
