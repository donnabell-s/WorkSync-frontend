import { useEffect } from "react";
import { useRooms } from "../../../context/RoomContext";

interface RoomDetailsFormProps {
  roomCode: string | null;
}

const getImageSrc = (size?: string, imageUrl?: string) => {
  if ((imageUrl || '').trim() !== '') return imageUrl as string;
  switch ((size || '').toLowerCase()) {
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
          src={`${getImageSrc(currentRoom.sizeLabel, currentRoom.imageUrl)}`}
          alt={currentRoom.name}
          className="w-auto max-w-full h-40 object-cover rounded-md"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-start gap-1">
            <p className="w-full sm:w-50 min-w-0 font-semibold truncate">Size:</p>
            <p className="flex-1 min-w-0 truncate">{currentRoom.sizeLabel}</p>
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
          {/* Operating Hours styled as requested */}
          {currentRoom.operatingHours && (() => {
            try {
              const hours = JSON.parse(currentRoom.operatingHours);
              const formatTime = (t: string) => {
                if (!t) return "";
                const [h, m] = t.split(":");
                let hour = parseInt(h, 10);
                const min = m;
                let ampm = "AM";
                if (hour >= 12) ampm = "PM";
                if (hour > 12) hour -= 12;
                if (hour === 0) hour = 12;
                return `${hour}:${min}${ampm}`;
              };
              return (
                <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <p className="w-full sm:w-50 min-w-0 font-semibold truncate">Operating Hours:</p>
                  <div className="flex-1 min-w-0 truncate flex flex-col">
                    <span>Weekday: {formatTime(hours.Weekdays?.Open)} - {formatTime(hours.Weekdays?.Close)}</span>
                    <span>Weekend: {formatTime(hours.Weekends?.Open)} - {formatTime(hours.Weekends?.Close)}</span>
                  </div>
                </div>
              );
            } catch {
              return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsForm;
