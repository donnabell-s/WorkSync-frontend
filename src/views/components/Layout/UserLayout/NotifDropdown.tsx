import React, { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { CiCircleAlert, CiCircleCheck , CiCircleRemove  } from "react-icons/ci";

interface Notification {
  id: number;
  type: 'alert' | 'confirm' | 'cancel';
  header: string;
  body: string;
  timestamp: string;
}

const sampleNotifications: Notification[] = [
  { id: 1, type: 'alert', header: 'Upcoming Booking Reminder', body: 'Don’t forget! Your meeting in Creative Studio B starts tomorrow at 10:00 AM. Need to...', timestamp:"5m" }, 
  { id: 2, type: 'confirm', header: 'Booking Confirmed!', body: 'Your booking for Conference Room A on May 25, 2024, at 2:00 PM - 3:30 PM is confirmed...', timestamp: "3hr" },
  { id: 3, type: 'cancel', header: 'Booking Cancelled', body: 'Your booking for Lounge 3 on May 28, 2024 has been cancelled. Need a new slot?', timestamp: "2d" },
];

const NotifDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <CiCircleAlert className="text-red-600" size={36} />;
      case 'confirm':
        return <CiCircleCheck className="text-green-600" size={36} />;
      case 'cancel':
        return <CiCircleRemove  className="text-gray-600" size={36} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex items-center h-full" ref={dropdownRef}>
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
            <FaBell size={29} className="text-emerald-600 transition duration-200 hover:scale-110" />
        </button>
        <div
            className={`absolute right-0 top-full mt-1 w-96 bg-white rounded-md z-50 pb-4 transform transition-all duration-300 ease-out 
            ${open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
            shadow-[0_0_9px_rgba(0,0,0,0.1)]`}>
            <div className="px-4 pt-4 pb-2 text-lg font-semibold text-gray-600">Notifications</div>

            <ul className="max-h-80 overflow-y-auto px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {sampleNotifications.map((notif) => (
                    <li
                        key={notif.id}
                        className="px-3 py-3 flex items-start space-x-3 hover:bg-[#C3EDDF] cursor-pointer transition duration-150 text-gray-600 rounded-md"
                    >
                        <div className="flex items-center justify-center pt-1">{getIcon(notif.type)}</div>
                        <div>
                            <div className="text-md font-medium text-[#1F2937]">{notif.header}</div>
                            <div className="text-sm">{notif.body}</div>
                            <div className="text-xs">{notif.timestamp}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default NotifDropdown;
