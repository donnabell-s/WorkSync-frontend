/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Booking } from '../../../../../types';
import { useAuth } from '../../../../../context/AuthContext';
import { useRooms } from '../../../../../context/RoomContext';
import { useBookings } from '../../../../../context/BookingContext';
import AdminBackLink from '../../../../components/UI/AdminBackLink';

interface ViewBookingProps {
  mode?: 'view' | 'approved' | 'declined';
  onApprove?: () => void;
  onCancel?: () => void;
  onDecline?: () => void;
}

const ViewBooking: React.FC<ViewBookingProps> = ({
  mode = 'view',
  onApprove,
  onDecline,
}) => {
  const location = useLocation();
  const booking = (location.state as { booking: Booking })?.booking;
  const { users, getAllUsers } = useAuth();
  const { rooms, fetchRooms } = useRooms();
  const { bookings, currentBooking, getBookingById, approveBooking, declineBooking } = useBookings();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/bookings/cancel', { state: { booking } });
  };

  const handleEdit = (booking: Booking) => {
    navigate('/admin/bookings/edit', { state: { booking } });
  }

  const handleApproveClick = async () => {
    if (!booking) return;
    await approveBooking(String(booking.bookingId));
    onApprove?.();
  };

  const handleDeclineClick = async () => {
    if (!booking) return;
    await declineBooking(String(booking.bookingId));
    onDecline?.();
  };

  // Ensure organizer/room data is available and fetch latest booking
  React.useEffect(() => {
    if (booking?.userRefId && (!users || users.length === 0)) {
      void getAllUsers().catch(() => {});
    }
    if (!rooms || rooms.length === 0) {
      void fetchRooms().catch(() => {});
    }
    if (booking?.bookingId) {
      void getBookingById(Number(booking.bookingId), { force: true }).catch(() => {});
    }
  }, [booking?.userRefId, booking?.bookingId]);

  // Prefer the latest booking from context
  const effectiveBooking = React.useMemo(() => {
    const id = booking?.bookingId;
    if (!id) return booking;
    if (currentBooking && Number(currentBooking.bookingId) === Number(id)) return currentBooking;
    const inList = bookings.find(b => Number(b.bookingId) === Number(id));
    return inList ?? booking;
  }, [booking, bookings, currentBooking]);

  // Derive organizer and room info
  const organizer = React.useMemo(() => {
    if (!effectiveBooking?.userRefId) return undefined;
    const u = users.find((u) => Number(u.id) === Number(effectiveBooking.userRefId));
    if (!u) return undefined;
    const full = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim();
    return full || u.email || String(u.id);
  }, [users, effectiveBooking]);

  const room = React.useMemo(() => {
    return effectiveBooking?.room ?? rooms.find((r) => String(r.roomId) === String(effectiveBooking?.roomId));
  }, [effectiveBooking, rooms]);

  const roomName = room?.name ?? '—';
  const roomCode = room?.code ?? '—';
  const backendStatus = effectiveBooking?.status ?? '—';
  const statusText = mode === 'approved' ? 'Approved' : mode === 'declined' ? 'Declined' : backendStatus;
  const isFinalized = (statusText?.toLowerCase?.() === 'approved') || (statusText?.toLowerCase?.() === 'declined');

  const formatDate = (iso: string | undefined) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };
  const formatDay = (iso: string | undefined) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'long' });
  };
  const formatTime = (iso: string | undefined) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  };
  // Recurrence parsing
  const recurrence = React.useMemo(() => {
    const raw = (effectiveBooking as any)?.recurrence;
    let v: any = raw;
    for (let i = 0; i < 2; i++) {
      if (typeof v === 'string') {
        try { v = JSON.parse(v); continue; } catch { break; }
      }
      break;
    }
    return (v && typeof v === 'object') ? v : null;
  }, [effectiveBooking]);

  // Recurrence summary (pattern, interval, days, end)
  const recurrenceSummary = React.useMemo(() => {
    const rec = recurrence;
    if (!rec || !rec.isRecurring) return null;
    const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
    const patt = cap(String(rec.pattern || ''));
    const n = Number(rec.interval) || 1;
    const unit = (rec.pattern || '').toLowerCase() === 'monthly' ? (n === 1 ? 'month' : 'months')
      : (rec.pattern || '').toLowerCase() === 'weekly' ? (n === 1 ? 'week' : 'weeks')
      : (n === 1 ? 'day' : 'days');
    let daysText = '';
    if ((rec.pattern || '').toLowerCase() === 'weekly') {
      const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const days: number[] = Array.isArray(rec.daysOfWeek) ? rec.daysOfWeek.slice().sort((a: number,b: number)=>a-b) : [];
      if (days.length) daysText = ` on ${days.map(d => names[d]).join(', ')}`;
    }
    let endStr = '';
    let endDate: Date | null = null;
    if (rec.endDate) {
      const e = new Date(rec.endDate);
      if (!Number.isNaN(e.getTime())) endDate = e;
    }
    if (!endDate && effectiveBooking?.endDatetime) {
      const e2 = new Date(effectiveBooking.endDatetime);
      if (!Number.isNaN(e2.getTime())) endDate = e2;
    }
    if (endDate) {
      endStr = ` — ends ${endDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`;
    }
    return `${patt} for ${n} ${unit}${daysText}${endStr}`;
  }, [recurrence, effectiveBooking]);

  if (!booking) return <div>No booking data found.</div>;

  return (
    <div className="w-full p-0 m-0 flex flex-col">
      <div className="mb-6 ml-4 md:ml-0">
        <AdminBackLink label='Back to View Bookings' backPath='/admin/bookings/view' />
      </div>
      <div className="bg-white rounded-xl shadow p-0 overflow-hidden border border-[#E5E7EB] w-full mb-8">
        {/* Header with title left and Edit button at far right; no top grey divider */}
        <div className="flex justify-between items-center px-4 md:px-8 pt-8 pb-2">
          <h1 className="text-2xl font-bold text-[#2D2D2D]">BOOKING DETAILS</h1>
          {!isFinalized && (
            <button
              className="flex items-center gap-2 bg-[#FFC107] hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-5 rounded-md shadow transition"
              onClick={() => handleEdit((effectiveBooking ?? booking) as Booking)}
            >
              <FaEdit className="text-base" />
              Edit
            </button>
          )}
        </div>

        {/* Details, without the first grey divider */}
  <DetailRow label="Organizer" value={organizer ?? '—'} />
  <DetailRow label="User ID" value={String(effectiveBooking?.userRefId ?? '—')} />
  <Divider />
  <DetailRow label="Meeting/Event Title" value={effectiveBooking?.title ?? '—'} />
  <Divider />

        <DetailRow
          label="Start Date/Time"
          value={
            <div>
              <div>{formatDate(effectiveBooking?.startDatetime)}</div>
              <div>{formatDay(effectiveBooking?.startDatetime)}</div>
              <div>{`${formatTime(effectiveBooking?.startDatetime)} - ${formatTime(effectiveBooking?.endDatetime)}`}</div>
            </div>
          }
          multiLine
        />
        <Divider />
        <DetailRow
          label="Recurring"
          value={
            (!recurrence || !recurrence.isRecurring) ? 'No' : (
              <div>
                {recurrenceSummary && (
                  <div className="mb-1">{recurrenceSummary}</div>
                )}
              </div>
            )
          }
          multiLine
        />
        <Divider />
        <DetailRow label="Description" value={effectiveBooking?.description ?? '—'} />
        <Divider />
        <DetailRow label="Expected Attendees" value={effectiveBooking?.expectedAttendees ?? '—'} />
        <Divider />

        {/* Room details using grid so the value column aligns with other rows; image spans three rows on lg */}
        <div className="px-4 md:px-8 py-4">
          <div className="grid gap-x-4 gap-y-2 lg:grid-cols-[minmax(160px,33%)_1fr_420px] items-start">
            <div className="text-[#2D2D2D] text-sm font-semibold">Room Name</div>
            <div className="text-base text-[#333]">{roomName}</div>
            <div className="hidden lg:block lg:row-span-3 ml-auto w-full max-w-[420px] rounded border overflow-hidden">
              <img
                src={(function() {
                  const img = room?.imageUrl?.trim();
                  if (img) return img;
                  const size = (room?.sizeLabel || '').toLowerCase();
                  if (size === 'small') return '/meetingroom/small.jpg';
                  if (size === 'medium') return '/meetingroom/medium.jpg';
                  if (size === 'large') return '/meetingroom/large.jpg';
                  return '/meetingroom/default.jpg';
                })()}
                alt="Meeting Room"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-[#2D2D2D] text-sm font-semibold">Room Number</div>
            <div className="text-base text-[#333]">{roomCode}</div>

    <div className="text-[#2D2D2D] text-sm font-semibold">Status</div>
      <div className="text-base"><span className="font-bold text-[#28A745]">{statusText}</span></div>
          </div>
          {/* Mobile/tablet image below rows */}
          <div className="lg:hidden mt-4 w-full rounded border overflow-hidden">
            <img
              src={(function() {
                const img = room?.imageUrl?.trim();
                if (img) return img;
                const size = (room?.sizeLabel || '').toLowerCase();
                if (size === 'small') return '/meetingroom/small.jpg';
                if (size === 'medium') return '/meetingroom/medium.jpg';
                if (size === 'large') return '/meetingroom/large.jpg';
                return '/meetingroom/default.jpg';
              })()}
              alt="Meeting Room"
              className="w-full h-40 object-cover"
            />
          </div>
        </div>
        <Divider />

        {/* Action buttons */}
        {!isFinalized && (
          <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 py-6 bg-white mt-15">
            <button
              onClick={handleApproveClick}
              className="flex items-center justify-center gap-2 bg-[#28A745] hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition w-full sm:w-auto"
            >
              <FaCheck className="text-lg" />
              Approve
            </button>
            <button onClick={handleDeclineClick} className="flex items-center justify-center gap-2 bg-[#DC3545] hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition w-full sm:w-auto">
              <FaTimes className="text-lg" />
              Decline
            </button>
          </div>
        )}
        {statusText === 'Approved' && (
          <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 py-6 bg-white mt-15">
            <div className="flex items-center gap-2 text-[#28A745] font-bold text-base">
              <FaCheck className="text-lg" />
              APPROVED
            </div>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-[#DC3545] hover:bg-red-700 text-white font-semibold py-2 px-8 rounded-md shadow-md transition w-full sm:w-auto"
            >
              <FaTimes className="text-lg" />
              Cancel
            </button>
          </div>
        )}
        {statusText === 'Declined' && (
          <div className="flex flex-col sm:flex-row gap-4 px-4 md:px-8 py-6 bg-white mt-15">
            <div className="flex items-center gap-2 text-[#DC3545] font-bold text-base">
              <FaTimes className="text-lg" />
              DECLINED
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  multiLine?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, multiLine = false }) => (
  <div className={`flex ${multiLine ? 'items-start' : 'items-center'} px-4 md:px-8 py-4`}>
    <div className="w-full lg:w-1/3 min-w-[160px] text-[#2D2D2D] text-sm font-semibold">{label}</div>
    <div className={`flex-1 text-base text-[#333] ${multiLine ? 'space-y-0' : ''}`}>{value}</div>
  </div>
);

const Divider = () => <div className="border-t border-[#E5E7EB] mx-0" />;

export default ViewBooking;
