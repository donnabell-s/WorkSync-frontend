import React, { useEffect, useState } from 'react';
import RoomDetailsForm from '../../../../components/Feature/RoomDetailsForm';

const BookRoom = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);

  useEffect(() => {
    const storedRoomCode = localStorage.getItem("selectedRoomId");
    setRoomCode(storedRoomCode);
  }, []);

  return (
    <div className='p-10 h-full'>
      <div className='bg-white h-full flex flex-col'>
          <RoomDetailsForm roomCode={roomCode || ''} />
      </div>
    </div>
  );
};

export default BookRoom;
