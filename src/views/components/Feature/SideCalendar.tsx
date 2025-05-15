import { useState } from 'react'
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa6";


const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const SideCalendar = () => {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())

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

  const days = getDaysInMonth(currentYear, currentMonth)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#1F2937]">
          {monthNames[currentMonth]} {currentYear}
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
        {DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2.5 text-center text-xs text-[#1F2937]">
        {days.map((date, index) => (
          <div
            key={index}
            className={`flex justify-center items-center w-6 h-6 rounded-full cursor-pointer transition duration-200
              ${
                date.getMonth() === currentMonth
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
  )
}

export default SideCalendar
