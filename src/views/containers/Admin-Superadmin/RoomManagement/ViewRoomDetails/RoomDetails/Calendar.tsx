import { useRooms } from "@/context/RoomContext";
import * as Components from "../../../../../components";


const Calendar = () => {
  const { currentRoom } = useRooms();

  return (
    <Components.MainCalendar isAdmin={true} selectedRoomId={currentRoom?.roomId} />
  )
}

export default Calendar