import { useState } from 'react';
import * as Components from '../../components';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface MainCalendarProps {
  isAdmin: boolean;
}

const MainCalendar: React.FC<MainCalendarProps> = ({ isAdmin }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  

  const formatDayDisplay = (date: Date, currentMonth: number) => {
    return date.getDate() === 1 && date.getMonth() === currentMonth
      ? `${MONTH_NAMES[date.getMonth()].substring(0, 3)} ${date.getDate()}`
      : date.getDate().toString();
  };

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      const lastDateOfPrevMonth = new Date(year, month, 0);
      days.push(
        new Date(
          year,
          month - 1,
          lastDateOfPrevMonth.getDate() - (firstDay.getDay() - 1) + i
        )
      );
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const chunkDays = (arr: Date[], size: number) => {
    const chunks: Date[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(year => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(year => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const days = getDaysInMonth(currentYear, currentMonth);
  const weeks = chunkDays(days, 7);

  return (
    <div>
      <div className={`bg-white rounded-md ${!isAdmin ? 'shadow-[0_0_4px_rgba(0,0,0,0.1)]' : ''}`}>
        <div className="flex justify-start items-center p-6 gap-5">
          <button
            onClick={() => {
              const now = new Date();
              setCurrentYear(now.getFullYear());
              setCurrentMonth(now.getMonth());
            }}
            className="border border-[#D2D4D8] px-5 py-1 rounded-md text-[#1F2937] cursor-pointer hover:bg-[#F5F5F5] "
          >
            Today
          </button>

          <button
            onClick={prevMonth}
            className="text-[#4B5563] hover:text-[#4B5563] transition duration-300 cursor-pointer"
            aria-label="Previous Month"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextMonth}
            className="text-[#4B5563] hover:text-[#4B5563] transition duration-300 cursor-pointer"
            aria-label="Next Month"
          >
            <FaChevronRight />
          </button>
          <h2 className="text-xl font-semibold text-[#1F2937]">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h2>
        </div>

        <table className="w-full border-collapse table-fixed">
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, index) => (
                  <td
                    key={index}
                    className={`
                      px-0 h-35 w-1/7 border-t border-[#D2D4D8]
                      ${weekIndex === weeks.length - 1 ? 'border-b-0' : 'border-b border-[#D2D4D8]'}
                      ${index === 0 ? 'border-l-0' : 'border-l border-[#D2D4D8]'}
                      ${index === week.length - 1 ? 'border-r-0' : 'border-r border-[#D2D4D8]'}
                    `}
                  >
                    <button
                      onClick={() => handleDayClick(date)}
                      className="flex flex-col items-center justify-start w-full h-full cursor-pointer transition duration-200 focus:outline-none p-1.5"
                      type="button"
                      tabIndex={0}
                    >
                      {weekIndex === 0 && (
                        <div className="text-sm text-[#4B5563] font-semibold">
                          {DAYS[index].substring(0, 3)}
                        </div>
                      )}
                      <div
                        className={`
                          flex items-center justify-center min-w-[28px] h-7 rounded-full transition duration-200
                          ${
                            date.toDateString() === today.toDateString()
                              ? 'bg-[#0D9488] text-white'
                              : date.getMonth() !== currentMonth
                              ? 'text-gray-400'
                              : 'text-gray-700'
                          }
                        `}
                      >
                        {formatDayDisplay(date, currentMonth)}
                      </div>
                        <div className="w-full mt-1">
                          <Components.BookingListForDate date={date} />
                        </div>
                    </button>
                  </td>
                ))}

                {week.length < 7 &&
                  [...Array(7 - week.length)].map((_, idx) => (
                    <td
                      key={`empty-${idx}`}
                      className={`
                        px-0 py-1 h-16 w-1/7 border-t border-[#D2D4D8]
                        ${weekIndex === weeks.length - 1 ? 'border-b-0' : 'border-b border-[#D2D4D8]'}
                        ${(week.length + idx) === 0 ? 'border-l-0' : 'border-l border-[#D2D4D8]'}
                        ${(week.length + idx) === 6 ? 'border-r-0' : 'border-r border-[#D2D4D8]'}
                      `}
                    />
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedDate && (
        <Components.CalendarBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default MainCalendar;
