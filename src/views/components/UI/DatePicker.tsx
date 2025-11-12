import React, { useState, useRef, useEffect } from 'react';
import AdminButton from './AdminButton';

interface DatePickerProps {
  variant: 'days' | 'weeks';
  onDateChange: (date: Date) => void;
  initialDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  variant, 
  onDateChange, 
  initialDate = new Date() 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current && 
        !pickerRef.current.contains(event.target as Node) &&
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

  const formatButtonLabel = (date: Date): string => {
    if (variant === 'days') {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } else {
      // For weeks, show week start - week end
      const weekStart = getWeekStart(date);
      const weekEnd = getWeekEnd(date);
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  };

  const getWeekStart = (date: Date): Date => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.getFullYear(), d.getMonth(), diff);
  };

  const getWeekEnd = (date: Date): Date => {
    const weekStart = getWeekStart(date);
    return new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
  };

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
    setSelectedDate(date);
    onDateChange(date);
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days: Date[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getCalendarDays = (): Date[] => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = daysInMonth[0];
    const startOfWeek = firstDay.getDay();
    
    const calendarDays: Date[] = [];
    
    // Add previous month's days to fill the week
    for (let i = startOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(firstDay.getDate() - i - 1);
      calendarDays.push(prevDate);
    }
    
    // Add current month's days
    calendarDays.push(...daysInMonth);
    
    // Add next month's days to complete the grid
    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - calendarDays.length;
    const lastDay = daysInMonth[daysInMonth.length - 1];
    
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(lastDay);
      nextDate.setDate(lastDay.getDate() + i);
      calendarDays.push(nextDate);
    }
    
    return calendarDays;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const isDateInCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth() && 
           date.getFullYear() === currentMonth.getFullYear();
  };

  const isDateSelected = (date: Date): boolean => {
    if (variant === 'days') {
      return date.toDateString() === selectedDate.toDateString();
    } else {
      // For weeks, check if date is in the same week as selected date
      const weekStart = getWeekStart(selectedDate);
      const weekEnd = getWeekEnd(selectedDate);
      return date >= weekStart && date <= weekEnd;
    }
  };

  const handleWeekClick = (date: Date) => {
    if (variant === 'weeks') {
      const weekStart = getWeekStart(date);
      handleDateSelect(weekStart);
    } else {
      handleDateSelect(date);
    }
  };

  const handleDayClick = (date: Date) => {
    handleDateSelect(date);
  };

  const calendarDays = getCalendarDays();
  const weeks: Date[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className="relative">
      <div ref={buttonRef}>
        <AdminButton
          label={formatButtonLabel(selectedDate)}
          onClick={() => setIsOpen(!isOpen)}
          className='px-5 bg-blue-800 hover:bg-blue-700'
        />
      </div>
      
      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50 p-4"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => navigateMonth('prev')}
            >
              <span className="text-gray-600">←</span>
            </button>
            <h3 className="text-lg font-semibold text-[#1F2937]">
              {currentMonth.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h3>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => navigateMonth('next')}
            >
              <span className="text-gray-600">→</span>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          {variant === 'days' ? (
            <div className="grid grid-cols-7 gap-1">
              {weeks.map((week, weekIndex) => 
                week.map((date, dayIndex) => {
                  const isCurrentMonth = isDateInCurrentMonth(date);
                  const isSelected = isDateSelected(date);
                  const isToday = date.toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}`}
                      className={`
                        p-2 text-sm rounded hover:bg-gray-100 transition-colors
                        ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                        ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                        ${isToday && !isSelected ? 'bg-gray-200' : ''}
                      `}
                      onClick={() => handleDayClick(date)}
                    >
                      {date.getDate()}
                    </button>
                  );
                })
              )}
            </div>
          ) : (
            <table className="w-full">
              <tbody>
                {weeks.map((week, weekIndex) => {
                  const weekStart = getWeekStart(week[0]);
                  const isSelectedWeek = variant === 'weeks' && 
                    selectedDate && 
                    getWeekStart(selectedDate).getTime() === weekStart.getTime();

                  return (
                    <tr 
                      key={weekIndex} 
                      className={`cursor-pointer transition-colors ${
                        isSelectedWeek ? 'bg-blue-100' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleWeekClick(week[0])}
                    >
                      {week.map((date, dayIndex) => {
                        const isCurrentMonth = isDateInCurrentMonth(date);
                        const isToday = date.toDateString() === new Date().toDateString();
                        
                        return (
                          <td key={dayIndex} className="p-2 text-center">
                            <span 
                              className={`inline-block w-full h-8 leading-8 rounded text-sm ${
                                isToday ? 'bg-blue-500 text-white' : 
                                !isCurrentMonth ? 'text-gray-400' : 
                                'text-gray-700'
                              }`}
                            >
                              {date.getDate()}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <div className="mt-4 text-xs text-gray-500 text-center">
            {variant === 'days' ? 'Select a day' : 'Select any day in the week'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;