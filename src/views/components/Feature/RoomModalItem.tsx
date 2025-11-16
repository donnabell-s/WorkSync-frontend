import React from 'react'
import { MeetingRoom } from './RoomListInterface'

interface RoomModalItemProps {
  room: MeetingRoom;
  onClick?: (room: string) => void;
  selected?: string;
}

const RoomModalItem: React.FC<RoomModalItemProps> = ({ room, onClick, selected }) => {

  return (
    <div className={`flex flex-wrap sm:gap-10 gap-5 bg-white rounded-md shadow-sm text-sm text-[#1F2937] p-2 items-center cursor-pointer
      ${selected === room.roomCode ? 'border-3 border-green-400' : ''}`}
      onClick={() => onClick && onClick(room.roomCode)}>
      <div className='w-35 h-18 rounded-md'>
        <img
          src={room.imageUrl && room.imageUrl.length > 0 ? room.imageUrl : `/meetingroom/${room.imageFile}`}
          alt={room.roomName}
          className='w-full h-full rounded-md'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-bold'>{room.roomName}</p>
        <p className='font-bold'>{room.roomCode}</p>
        <p>{room.location}</p>
      </div>
      <div className='flex flex-col gap-2 font-medium'>
        <p>Size</p>
        <p>No. of Seats</p>
        <p>Facilities</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p>{room.size}</p>
        <p>{room.numberOfSeats}</p>
        <p>{room.additionalFacilities}</p>
      </div>
    </div>
  )
}

export default RoomModalItem