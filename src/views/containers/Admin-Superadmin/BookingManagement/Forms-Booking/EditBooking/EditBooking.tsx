import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import type { Booking } from '../../../../../../types';
import AdminHeading from '../../../../../components/UI/AdminHeading'
import AdminBackLink from '../../../../../components/UI/AdminBackLink'
import Input from '../../../../../components/UI/AdminForms/Input'
import SchedInput from '../../../../../components/UI/AdminForms/SchedInput'
import ToggleButton from '../../../../../components/UI/AdminForms/ToggleButton'
import TextAreaInput from '../../../../../components/UI/AdminForms/TextAreaInput'
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput'
import AdminButton from '../../../../../components/UI/AdminButton'
import RoomModal from '../../../../../components/UI/AdminForms/RoomModal'
import { RiNumber1 } from "react-icons/ri";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useBookings } from '../../../../../../context/BookingContext'
import { useRooms } from '../../../../../../context/RoomContext'

const EditBooking = () => {
  const location = useLocation();
  const booking = (location.state as { booking: Booking })?.booking;
  const navigate = useNavigate();
  const { updateBooking, currentBooking, bookings, getBookingById } = useBookings();
  const { rooms } = useRooms();
  const [toggle, setToggle] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>(''); // holds room code
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  // Recurrence state
  const [recurrenceType, setRecurrenceType] = useState<'' | 'daily' | 'weekly' | 'monthly'>('');
  const [interval, setInterval] = useState<number>(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const unitLabel = React.useMemo(() => {
    const n = Number(interval) || 0;
    const plural = n === 1 ? '' : 's';
    switch (recurrenceType) {
      case 'daily': return `day${plural}`;
      case 'weekly': return `week${plural}`;
      case 'monthly': return `month${plural}`;
      default: return `period${plural}`;
    }
  }, [recurrenceType, interval]);
  const effectiveBooking = useMemo(() => {
    const id = booking?.bookingId;
    if (!id) return booking;
    if (currentBooking && Number(currentBooking.bookingId) === Number(id)) return currentBooking as any as Booking;
    const inList = bookings.find(b => Number(b.bookingId) === Number(id));
    return (inList as any as Booking) ?? booking;
  }, [booking, currentBooking, bookings]);

  React.useEffect(() => {
    if (booking?.bookingId) {
      void getBookingById(Number(booking.bookingId), { force: true }).catch(() => {});
    }
  }, [booking?.bookingId]);

  const initial = useMemo(() => ({
    title: effectiveBooking?.title || '',
    attendees: effectiveBooking && typeof effectiveBooking.expectedAttendees !== 'undefined' ? String(effectiveBooking.expectedAttendees ?? '') : '',
    userRefId: effectiveBooking?.userRefId ? String(effectiveBooking.userRefId) : '',
    description: effectiveBooking?.description ?? '',
  }), [effectiveBooking]);
  const [form, setForm] = useState(initial);

  // Keep form in sync when effective booking updates (e.g., after save or refetch)
  React.useEffect(() => {
    setForm({
      title: effectiveBooking?.title || '',
      attendees: effectiveBooking && typeof effectiveBooking.expectedAttendees !== 'undefined' ? String(effectiveBooking.expectedAttendees ?? '') : '',
      userRefId: effectiveBooking?.userRefId ? String(effectiveBooking.userRefId) : '',
      description: effectiveBooking?.description ?? '',
    });
  }, [effectiveBooking?.title, effectiveBooking?.expectedAttendees, effectiveBooking?.userRefId, effectiveBooking?.description]);
  // Initialize recurrence state from existing booking
  React.useEffect(() => {
    try {
      const recRaw = (effectiveBooking as any)?.recurrence;
      // robust parse: handle double-encoded JSON strings
      const parseRec = (raw: any) => {
        let v: any = raw;
        for (let i = 0; i < 2; i++) {
          if (typeof v === 'string') {
            try { v = JSON.parse(v); continue; } catch { break; }
          }
          break;
        }
        return v;
      };
      const rec = parseRec(recRaw);
      if (rec?.isRecurring) {
        setToggle(false);
        if (rec.pattern) setRecurrenceType(rec.pattern);
        if (rec.interval) setInterval(rec.interval);
        if (Array.isArray(rec.daysOfWeek)) setSelectedDays(rec.daysOfWeek);
      } else {
        setToggle(true);
        setRecurrenceType('');
        setInterval(1);
        setSelectedDays([]);
      }
    } catch {}
  }, [effectiveBooking?.recurrence]);
  // Prevent editing finalized bookings
  React.useEffect(() => {
    const status = (booking as any)?.status as string | undefined;
    if (status && (status.toLowerCase() === 'approved' || status.toLowerCase() === 'declined')) {
      navigate('/admin/bookings/booking-detail', { state: { booking } });
    }
  }, [booking]);
  // Date/time defaults and restrictions
  const toLocalYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const todayDate = toLocalYMD(new Date());
  const [startDate, setStartDate] = useState<string>(todayDate);
  const [endDate, setEndDate] = useState<string>(todayDate);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  // Initialize date/time and room from effective booking
  React.useEffect(() => {
    if (!effectiveBooking) return;
    // init times
    const parseIsoToLocalParts = (iso?: string) => {
      if (!iso) return { d: todayDate, t: '' };
      const dt = new Date(iso);
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, '0');
      const day = String(dt.getDate()).padStart(2, '0');
      const hh = String(dt.getHours()).padStart(2, '0');
      const mm = String(dt.getMinutes()).padStart(2, '0');
      return { d: `${y}-${m}-${day}`, t: `${hh}:${mm}` };
    };
    const s = parseIsoToLocalParts(effectiveBooking.startDatetime);
    // Prefer recurrence endDate (last day of recurrence) to populate End Date if recurring
    let recEndDateStr: string | undefined;
    try {
      const recRaw = (effectiveBooking as any)?.recurrence;
      const rec = typeof recRaw === 'string' ? JSON.parse(recRaw) : recRaw;
      if (rec?.isRecurring && rec?.endDate) {
        recEndDateStr = parseIsoToLocalParts(rec.endDate).d;
      }
    } catch {}
    const e = parseIsoToLocalParts(effectiveBooking.endDatetime);
    setStartDate(s.d); setStartTime(s.t);
    setEndDate(recEndDateStr ?? e.d); setEndTime(e.t);

    // init room selection by code and id
    let code = (effectiveBooking as any)?.room?.code as string | undefined;
    if (!code && effectiveBooking.roomId && rooms && rooms.length) {
      const found = rooms.find(r => String(r.roomId) === String(effectiveBooking.roomId));
      if (found) {
        code = found.code;
      }
    }
    if (code) setSelectedRoom(code);
    let rid = (effectiveBooking as any)?.room?.roomId as string | undefined;
    if (!rid && effectiveBooking.roomId) rid = String(effectiveBooking.roomId);
    if (rid) setSelectedRoomId(String(rid));
  }, [effectiveBooking, rooms]);
  // Auto-adjust endDate for recurring bookings to reflect the LAST day of the recurrence window
  React.useEffect(() => {
    const isRecurring = !toggle;
    if (!isRecurring || !startDate || !recurrenceType || interval < 1) return;
    const start = new Date(startDate + 'T00:00:00');
    const last = new Date(start);
    const n = Math.max(1, Number(interval));
    if (recurrenceType === 'daily') {
      last.setDate(start.getDate() + (n - 1));
    } else if (recurrenceType === 'weekly') {
      const days = (selectedDays && selectedDays.length > 0) ? [...selectedDays].sort((a,b)=>a-b) : [start.getDay()];
      const maxDow = days[days.length - 1];
      const weekStart = new Date(start);
      weekStart.setDate(start.getDate() + 7 * (n - 1));
      const currentDow = weekStart.getDay();
      const diff = (maxDow - currentDow + 7) % 7;
      last.setTime(weekStart.getTime());
      last.setDate(weekStart.getDate() + diff);
    } else if (recurrenceType === 'monthly') {
      last.setMonth(start.getMonth() + (n - 1));
    }
    setEndDate(toLocalYMD(last));
  }, [toggle, startDate, recurrenceType, interval, selectedDays]);

  // When toggling back to One-Time, align end date to start date
  React.useEffect(() => {
    if (toggle) {
      if (startDate) setEndDate(startDate);
    }
  }, [toggle, startDate]);

  const nextHalfHourSlot = () => {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    if (m === 0) m = 30; else if (m <= 30) m = 30; else { m = 0; h += 1; }
    if (h < 8) { h = 8; m = 0; }
    if (h > 19 || (h === 19 && m > 0)) return '19:30';
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };
  const minStartTime = startDate === todayDate ? nextHalfHourSlot() : undefined;
  const nextSlotAfter = (time?: string) => {
    if (!time) return undefined;
    const [hStr, mStr] = time.split(':');
    let h = parseInt(hStr, 10);
    let m = parseInt(mStr, 10);
    if (m === 0) m = 30; else { m = 0; h += 1; }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const handleSelection = (event: React.MouseEvent<HTMLButtonElement>, room: string) => {
    event.preventDefault();
    setSelectedRoom(room); // room is the roomCode
    // resolve to roomId
    const found = rooms?.find(r => String(r.code) === String(room));
    setSelectedRoomId(found ? String(found.roomId) : '');
    setOpenModal(!openModal);
  }

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggle(!toggle);
    if (toggle) {
      if (!recurrenceType) setRecurrenceType('daily');
      if (!interval) setInterval(1);
      if (recurrenceType === 'weekly' && (!selectedDays || selectedDays.length === 0)) {
        const d = new Date(startDate + 'T00:00:00');
        setSelectedDays([d.getDay()]);
      }
    }
  }

  const handleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpenModal(!openModal);
  }

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/admin/bookings/booking-detail', { state: { booking } });
  }

  const toggleDay = (day: number) => {
    if (recurrenceType === 'weekly') {
      const start = new Date(startDate + 'T00:00:00');
      const weekStart = new Date(start);
      weekStart.setDate(start.getDate() - start.getDay());
      const target = new Date(weekStart);
      target.setDate(weekStart.getDate() + day);
      const today = new Date(todayDate + 'T00:00:00');
      if (target < today) {
        target.setDate(target.getDate() + 7);
      }
      setStartDate(toLocalYMD(target));
      setSelectedDays([day]);
    } else {
      setSelectedDays((prev) => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    }
  }

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!booking) return;
    const id = String(booking.bookingId);
    const partial: any = {
      title: form.title?.trim?.() ?? '',
      description: form.description?.trim?.() ?? '',
    };
    if (form.userRefId && !isNaN(Number(form.userRefId))) partial.userRefId = Number(form.userRefId);
    if (form.attendees && !isNaN(Number(form.attendees))) partial.expectedAttendees = Number(form.attendees);
    // compose start/end datetime if present; for recurring, endDatetime should be on the start date (first occurrence)
    if (startDate && startTime) partial.startDatetime = `${startDate}T${startTime}:00`;
    // map room selection
    if (selectedRoomId) partial.roomId = selectedRoomId;
    const isRecurring = !toggle;
    if (isRecurring) {
      if (endTime) partial.endDatetime = `${startDate}T${endTime}:00`;
    } else {
      if (endDate && endTime) partial.endDatetime = `${endDate}T${endTime}:00`;
    }
    partial.recurrence = isRecurring ? {
      isRecurring: true,
      pattern: recurrenceType,
      interval,
      endDate: `${endDate}T${(endTime || startTime || '00:00')}:00`,
      daysOfWeek: recurrenceType === 'weekly' ? selectedDays : undefined,
    } : { isRecurring: false };
    try {
      console.log('[EditBooking] Attempting PUT with patch:', partial);
      await updateBooking(id, partial);
    } catch (e) {
      const anyErr = e as any;
      console.error('[EditBooking] PUT failed', anyErr);
      let message = 'Failed to update booking.';
      const resp = anyErr?.response;
      const data = resp?.data;
      if (typeof data === 'string') message = data;
      else if (data?.message) message = data.message;
      else if (data?.errors && typeof data.errors === 'object') {
        try {
          const parts: string[] = [];
          for (const key of Object.keys(data.errors)) {
            const arr = data.errors[key];
            if (Array.isArray(arr)) parts.push(`${key}: ${arr.join(', ')}`);
          }
          if (parts.length) message = parts.join('\n');
        } catch {}
      }
      alert(message);
    }
    navigate('/admin/bookings/booking-detail', { state: { booking } });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  React.useEffect(() => {
    if (!toggle && recurrenceType === 'weekly' && startDate) {
      const dow = new Date(startDate + 'T00:00:00').getDay();
      setSelectedDays([dow]);
    }
  }, [startDate, recurrenceType, toggle]);

  return (
    <div className='h-full min-h-0 flex flex-col px-7 pt-6 pb-8 gap-4'>
      <AdminBackLink label='Back to Booking Detail' onBackClick={handleBack} />

      <div className='relative flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
        <AdminHeading label="EDIT BOOKING" />

        <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
          <Input name='title' label='Meeting/Event Title' type='text' placeholder='Enter Room Name' className='md:col-span-2' value={form.title} onChange={handleChange} />
          <div className='md:col-span-2 flex gap-4'>
            <SchedInput
              label='Start Date/Time'
              dateValue={startDate}
              timeValue={startTime}
              minDate={todayDate}
              minTime={minStartTime}
              onDateChange={(v) => {
                setStartDate(v);
                if (v > endDate) setEndDate(v);
              }}
              onTimeChange={(v) => {
                setStartTime(v);
                if (endTime && v && endTime <= v) setEndTime('');
              }}
            />
            <SchedInput
              label='End Date/Time'
              dateValue={endDate}
              timeValue={endTime}
              minDate={todayDate}
              minTime={nextSlotAfter(startTime) ?? minStartTime}
              onDateChange={(v) => {
                setEndDate(v);
                if (v < startDate) setStartDate(v);
              }}
              onTimeChange={(v) => setEndTime(v)}
            />
          </div>
          <div className={`flex gap-4 md:col-span-2 ${!toggle ? 'border-b-2 border-zinc-200 pb-4' : ''}`}>
            <div className='flex flex-col gap-2'>
              <p className='text-xs text-zinc-500'>Toggle Recurrence Type</p>
              {
                toggle ? (
                  <ToggleButton label='One-Time Booking' icon={<RiNumber1 className='size-5' />} className='text-green-400 border-green-400' onClick={handleToggle} />
                ) : (
                  <ToggleButton label='Recurring Booking' icon={<FaArrowRotateRight className='size-5' />} onClick={handleToggle} className='bg-green-400 border-green-400 text-white' />
                )
              }
            </div>
            {
              !toggle ? (
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center gap-3'>
                    <label className='text-sm text-zinc-700'>Recurrence</label>
                    <select
                      className='text-sm border-zinc-300 border-1 rounded-md p-2'
                      value={recurrenceType}
                      onChange={(e) => setRecurrenceType(e.target.value as any)}
                    >
                      <option value=''>Select</option>
                      <option value='daily'>Daily</option>
                      <option value='weekly'>Weekly</option>
                      <option value='monthly'>Monthly</option>
                    </select>
                    <span className='text-sm text-zinc-700'>for</span>
                    <input
                      type='number'
                      min={1}
                      className='w-20 text-sm border-zinc-300 border-1 rounded-md p-2'
                      value={interval}
                      onChange={(e) => setInterval(Math.max(1, Number(e.target.value)))}
                    />
                    <span className='text-sm text-zinc-700'>{unitLabel}</span>
                  </div>
                  {recurrenceType === 'weekly' && (
                    <div className='flex flex-wrap gap-2'>
                      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((lbl, idx) => (
                        <button
                          key={idx}
                          type='button'
                          onClick={() => toggleDay(idx)}
                          className={`px-3 py-1 rounded-md border text-sm ${selectedDays.includes(idx) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-black border-gray-300'}`}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : null
            }
          </div>

          <div className='flex flex-col gap-4'>
            <TextAreaInput label='Description' name='description' placeholder='Enter description' value={form.description} onChange={handleChange} />
          </div>

          <div className='flex flex-col gap-4'>
            <Input name='userRefId' label='User Ref ID' placeholder='Enter User Ref ID' type='number' value={form.userRefId} onChange={handleChange} />
            <Input name='attendees' label='Expected Attendees' placeholder='Enter number of expected attendees' type='number' value={form.attendees} onChange={handleChange} />
            <SelectInput name='room' label='Select Room' placeholder={selectedRoom === '' ? 'Select Room' : selectedRoom} type='rooms' onClick={handleModal} />

            {
              openModal ? (
                <RoomModal closeFunction={handleModal} value={selectedRoom} selectFunction={handleSelection} />
              ) : null
            }
          </div>

          <div className='flex gap-4 pt-5'>
            <AdminButton label='Save' variant='primary' onClick={(e) => { void handleSave(e); }} />
            <AdminButton label='Cancel' variant='secondary' onClick={handleBack} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBooking