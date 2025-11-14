import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface SideCalendarProps {
  currentMonth?: Date;
  onMonthChange?: (next: Date) => void;
}

const SideCalendar: React.FC<SideCalendarProps> = ({ currentMonth, onMonthChange }) => {
  const today = new Date();
  const [internalMonth, setInternalMonth] = React.useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const activeMonth = React.useMemo(() => {
    if (currentMonth) {
      return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    }
    return internalMonth;
  }, [currentMonth, internalMonth]);

  const currentYear = activeMonth.getFullYear();
  const currentMonthIndex = activeMonth.getMonth();

  const setMonth = React.useCallback((date: Date) => {
    if (onMonthChange) {
      onMonthChange(date);
    } else {
      setInternalMonth(date);
    }
  }, [onMonthChange, setInternalMonth]);

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const prevMonthLastDay = new Date(year, month, 0);
    const days = [];

    const daysFromPrevMonth = firstDay.getDay();
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay.getDate() - i));
    }

    const lastDay = new Date(year, month + 1, 0);
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentYear, currentMonthIndex);

  const prevMonth = () => {
    const prev = new Date(currentYear, currentMonthIndex - 1, 1);
    setMonth(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentYear, currentMonthIndex + 1, 1);
    setMonth(next);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#1F2937]">
          {monthNames[currentMonthIndex]} {currentYear}
        </h2>
        <button
          onClick={prevMonth}
          className="text-[#4B5563] hover:text-gray-700 transition duration-300 cursor-pointer"
          aria-label="Previous Month"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextMonth}
          className="text-[#4B5563] hover:text-gray-700 transition duration-300 cursor-pointer"
          aria-label="Next Month"
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-[#4B5563] mb-2 select-none">
        {DAYS.map((day, idx) => (
          <div key={`${day}-${idx}`}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2.5 text-center text-xs text-[#1F2937]">
        {days.map((date, index) => (
          <div
            key={index}
            className={`flex justify-center items-center w-6 h-6 rounded-full cursor-pointer transition duration-200
              ${
                date.getMonth() === currentMonthIndex
                  ? date.toDateString() === today.toDateString()
                    ? 'bg-[#0D9488] text-white font-semibold'
                    : 'hover:bg-blue-100'
                  : 'text-gray-400 hover:bg-gray-100'
              }
            `}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideCalendar;
