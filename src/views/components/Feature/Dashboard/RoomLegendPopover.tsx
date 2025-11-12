import React, { useState, useRef, useEffect } from 'react';
import AdminButton from '../../UI/AdminButton';

interface Room {
  color: string;
  name: string;
}

interface RoomLegendPopoverProps {
  rooms?: Room[];
}

const RoomLegendPopover: React.FC<RoomLegendPopoverProps> = ({ 
  rooms = [
    { color: '#2563EB', name: 'Conference Room' },
    { color: '#10B981', name: 'Skyline Room' },
    { color: '#F59E0B', name: 'Training Room' },
    { color: '#EF4444', name: 'Grand Hall' },
    { color: '#1E40AF', name: 'Sky Hall' },
  ]
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={buttonRef}>
        <AdminButton
          label="Legend"
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
        >
          <div className="p-4">
            <h3 className="text-sm font-bold text-[#1F2937] mb-3">Room Legend</h3>
            <div className="space-y-2">
              {rooms.map((room) => (
                <div key={room.name} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: room.color }}
                  ></div>
                  <span className="text-sm text-[#1F2937] font-medium">
                    {room.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomLegendPopover;