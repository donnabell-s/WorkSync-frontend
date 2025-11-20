import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useBookings } from '../../../context/BookingContext';

export type BookingSlot = {
  startDateTime: string;
  endDateTime: string;
};

interface RoomDayScheduleModalProps {
  roomId: string;
  isOpen: boolean;
  onClose: () => void;
}

const START_HOUR = 8;
const END_HOUR = 20; // 8 PM
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => i + START_HOUR);
const MINUTES = [0, 30];
const SLOT_HEIGHT = 32; // px per 30 min slot

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getWeekDays(date: Date) {
  const start = new Date(date);
  start.setDate(date.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function getMinutesSinceMidnight(dt: string) {
  const d = new Date(dt);
  return d.getHours() * 60 + d.getMinutes();
}

export const RoomDayScheduleModal: React.FC<RoomDayScheduleModalProps> = ({ roomId, isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getBookingSlotsByRoomAndDate } = useBookings();
  useEffect(() => {
    if (slots && slots.length > 0) {
      // Debug: log slots to console
      // eslint-disable-next-line no-console
      console.log('RoomDayScheduleModal slots:', slots);
    }
  }, [slots]);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);
    getBookingSlotsByRoomAndDate(roomId, selectedDate)
      .then((data) => {
        // Debug: log raw API response
        // eslint-disable-next-line no-console
        console.log('API response for bookings:', data);
        // Always treat API response as BookingSlot[]
        const arr: BookingSlot[] = Array.isArray(data) ? data : [];
        const filtered = arr.filter((slot) => slot.startDateTime.slice(0, 10) === selectedDate);
        setSlots(filtered);
      })
      .catch((err) => {
        // Debug: log error
        // eslint-disable-next-line no-console
        console.error('API error for bookings:', err);
        setError("Failed to load bookings.");
      })
      .finally(() => setLoading(false));
  }, [roomId, selectedDate, isOpen, getBookingSlotsByRoomAndDate]);

  if (!isOpen) return null;

  const dateObj = new Date(selectedDate);
  const weekDays = getWeekDays(dateObj);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button type="button" onClick={onClose} className="p-2 text-gray-500 hover:text-black">
            <FaTimes size={20} />
          </button>
          <div className="flex-1 text-center font-semibold text-lg">
            {formatDate(dateObj)}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const prev = new Date(selectedDate);
                prev.setDate(prev.getDate() - 1);
                setSelectedDate(prev.toISOString().slice(0, 10));
              }}
              className="p-2 text-gray-500 hover:text-black"
              aria-label="Previous day"
            >
              <FaChevronLeft />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                const next = new Date(selectedDate);
                next.setDate(next.getDate() + 1);
                setSelectedDate(next.toISOString().slice(0, 10));
              }}
              className="p-2 text-gray-500 hover:text-black"
              aria-label="Next day"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        {/* Week strip */}
        <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
          {weekDays.map((d, i) => {
            const isSelected = d.toISOString().slice(0, 10) === selectedDate;
            return (
              <div
                key={i}
                className={`flex flex-col items-center w-8 ${isSelected ? "" : "text-gray-400"}`}
              >
                <span className="text-xs font-medium">{"SMTWTFS"[i]}</span>
                <span
                  className={`mt-1 w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                    isSelected ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {d.getDate()}
                </span>
              </div>
            );
          })}
        </div>
        {/* Body: Timeline */}
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-white">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="relative" style={{ height: HOURS.length * 2 * SLOT_HEIGHT }}>
              {/* Timeline slots */}
              {HOURS.map((hour, hourIdx) =>
                MINUTES.map((min, idx) => {
                  const timeLabel =
                    min === 0
                      ? `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}${hour < 12 ? " AM" : " PM"}`
                      : "";
                  const top = ((hour - START_HOUR) * 2 + idx) * SLOT_HEIGHT;
                  return (
                    <div
                      key={`${hour}:${min}`}
                      className="flex items-center"
                      style={{ position: "absolute", left: 0, right: 0, top, height: SLOT_HEIGHT }}
                    >
                      <div className="w-16 text-right pr-2 text-xs text-gray-400 select-none">
                        {timeLabel}
                      </div>
                      <div className="flex-1 border-t border-gray-200 h-0" />
                    </div>
                  );
                })
              )}
              {/* Booked slots */}
              {slots.length === 0 && (
                <div className="absolute left-20 right-4 text-gray-400 text-center" style={{top: 0}}>
                  No bookings for this day.
                </div>
              )}
              {slots.map((slot, i) => {
                // Only plot if slot is valid and matches selected date
                if (!slot.startDateTime || !slot.endDateTime) return null;
                const slotDate = slot.startDateTime.slice(0, 10);
                if (slotDate !== selectedDate) return null;
                const startMin = getMinutesSinceMidnight(slot.startDateTime);
                const endMin = getMinutesSinceMidnight(slot.endDateTime);
                // Only show slots within the visible range
                const visibleStartMin = Math.max(startMin, START_HOUR * 60);
                const visibleEndMin = Math.min(endMin, END_HOUR * 60);
                if (visibleEndMin <= visibleStartMin) return null;
                const top = ((visibleStartMin - START_HOUR * 60) / 30) * SLOT_HEIGHT;
                const height = ((visibleEndMin - visibleStartMin) / 30) * SLOT_HEIGHT;
                // Format time range for display
                function formatTime(dt: string) {
                  const d = new Date(dt);
                  let h = d.getHours();
                  const m = d.getMinutes();
                  const ampm = h >= 12 ? 'PM' : 'AM';
                  h = h % 12;
                  if (h === 0) h = 12;
                  return `${h}:${m.toString().padStart(2, '0')}${ampm}`;
                }
                const timeLabel = `${formatTime(slot.startDateTime)} - ${formatTime(slot.endDateTime)}`;
                return (
                  <div
                    key={i}
                    className="absolute left-20 right-4 flex items-center"
                    style={{ top, height }}
                  >
                        <div className="w-full bg-pink-500 rounded-lg shadow text-white flex items-center justify-center text-xs font-semibold" style={{ height: "100%" }}>
                      {timeLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDayScheduleModal;
