import React from 'react';

interface RoomInfoDisplayProps {
  currentRooms: string[];
}

const RoomInfoDisplay: React.FC<RoomInfoDisplayProps> = ({ currentRooms }) => {
  return (
    <div className="text-start">
      <span className="text-xs text-[#6B7280]">
        Showing rooms: <br /> 
        {currentRooms.join(', ')}
      </span>
    </div>
  );
};

export default RoomInfoDisplay;