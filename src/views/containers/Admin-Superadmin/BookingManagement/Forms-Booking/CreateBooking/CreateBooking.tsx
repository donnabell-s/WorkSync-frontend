import React, { useState } from 'react'
import AdminHeading from '../../../../../components/UI/AdminHeading'
import AdminBackLink from '../../../../../components/UI/AdminBackLink'
import Input from '../../../../../components/UI/AdminForms/Input'
import SchedInput from '../../../../../components/UI/AdminForms/SchedInput'
import ToggleButton from '../../../../../components/UI/AdminForms/ToggleButton'
import RecurrenceInput from '../../../../../components/UI/AdminForms/RecurrenceInput'
import MultipleDateInput from '../../../../../components/UI/AdminForms/MultipleDateInput'
import TextAreaInput from '../../../../../components/UI/AdminForms/TextAreaInput'
import SelectInput from '../../../../../components/UI/AdminForms/SelectInput'
import AdminButton from '../../../../../components/UI/AdminButton'
import RoomModal from '../../../../../components/UI/AdminForms/RoomModal'
import { RiNumber1 } from "react-icons/ri";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useNavigate } from 'react-router'
import { useBookings } from '../../../../../../context/BookingContext'
import { useRooms } from '../../../../../../context/RoomContext'

const CreateBooking = () => {
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const { rooms } = useRooms();
  const [toggle, setToggle] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  // selectedRoom is a room code; resolve to room object
  const selectedRoomObj = React.useMemo(() => rooms.find(r => String(r.code) === String(selectedRoom)), [rooms, selectedRoom]);
  const [form, setForm] = useState({
    title: '',
    userRefId: '',
    attendees: '',
    description: '',
  });
  // Date/time state with defaults to today; prohibit past dates
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

  const nextHalfHourSlot = () => {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    if (m === 0) {
      m = 30;
    } else if (m <= 30) {
      m = 30;
    } else {
      m = 0;
      h += 1;
    }
    if (h < 8) { h = 8; m = 0; }
    if (h > 19 || (h === 19 && m > 0)) { return '19:30'; }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const minStartTime = startDate === todayDate ? nextHalfHourSlot() : undefined;
  const nextSlotAfter = (time: string | undefined) => {
    if (!time) return undefined;
    const [hStr, mStr] = time.split(':');
    let h = parseInt(hStr, 10);
    let m = parseInt(mStr, 10);
    if (m === 0) m = 30; else { m = 0; h += 1; }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };
  // Compute operating window from selected room and date
  const parseOperatingHours = (raw: any): { weekdays?: { open: string; close: string }, weekends?: { open: string; close: string } } | undefined => {
    if (!raw) return undefined;
    if (typeof raw === 'string') {
      try { const p = JSON.parse(raw); if (p && (p.weekdays || p.weekends)) return p; } catch {}
      return undefined;
    }
    if (typeof raw === 'object') return raw as any;
    return undefined;
  };
  const isWeekend = React.useMemo(() => {
    if (!startDate) return false;
    const d = new Date(startDate + 'T00:00:00');
    const day = d.getDay(); // 0 Sun, 6 Sat
    return day === 0 || day === 6;
  }, [startDate]);
  const { roomOpen, roomClose } = React.useMemo(() => {
    const oh = parseOperatingHours(selectedRoomObj?.operatingHours);
    const open = isWeekend ? oh?.weekends?.open : oh?.weekdays?.open;
    const close = isWeekend ? oh?.weekends?.close : oh?.weekdays?.close;
    return { roomOpen: open, roomClose: close } as { roomOpen?: string; roomClose?: string };
  }, [selectedRoomObj, isWeekend]);
  const combineMin = (a?: string, b?: string): string | undefined => {
    if (a && b) return a > b ? a : b;
    return a ?? b;
  };
  const startMinTimeFinal = combineMin(minStartTime, roomOpen);
  const startMaxTimeFinal = roomClose; // cap start at room close
  const endMinFromStart = nextSlotAfter(startTime) ?? startMinTimeFinal;
  const endMinTimeFinal = combineMin(endMinFromStart, roomOpen);
  const endMaxTimeFinal = roomClose;

  const handleSelection = (event: React.MouseEvent<HTMLButtonElement>, room: string) => {
    event.preventDefault();
    setSelectedRoom(room);
    setOpenModal(!openModal);
  }

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggle(!toggle);
  }

  const handleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpenModal(!openModal);
  }

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/admin/bookings/view');
  }

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Basic validation
    if (!form.title.trim()) return alert('Please enter a title.');
    if (!selectedRoom) return alert('Please select a room.');
    if (!startDate || !startTime || !endDate || !endTime) return alert('Please select start and end date/time.');
    if (!form.userRefId || isNaN(Number(form.userRefId))) return alert('User Ref ID is required and must be a number.');

    // Serialize as local datetime strings (no timezone) to match backend expectations
    const startLocal = `${startDate}T${startTime}:00`;
    const endLocal = `${endDate}T${endTime}:00`;
    if (new Date(endLocal) <= new Date(startLocal)) return alert('End time must be after start time.');
  // Validate against room operating hours if available
  if (roomOpen && startTime < roomOpen) return alert(`Start time is before room opening time (${roomOpen}).`);
  if (roomClose && endTime > roomClose) return alert(`End time is after room closing time (${roomClose}).`);
  if (roomOpen && roomClose && roomOpen === roomClose) return alert(`This room is closed on the selected day (${roomOpen} - ${roomClose}). Please choose another time or room.`);

    // Map selected room code to roomId
    const room = rooms.find(r => String(r.code) === String(selectedRoom));
    if (!room?.roomId) {
      return alert('Could not resolve the selected room. Please select a room from the list again.');
    }
    const roomId = room.roomId;

  const userRefIdNum = parseInt(form.userRefId, 10);
  const expectedAttendeesNum = form.attendees ? parseInt(form.attendees, 10) : undefined;

    try {
      const payload = {
        roomId,
        title: form.title.trim(),
        description: form.description.trim(),
        startDatetime: startLocal,
        endDatetime: endLocal,
        userRefId: userRefIdNum,
        expectedAttendees: expectedAttendeesNum,
      };
      console.log('[CreateBooking] Attempting POST /api/Bookings/Post with payload:', payload);
      if (!payload.description) {
        console.warn('[CreateBooking] Warning: description is empty or missing');
      }
      await addBooking(payload);
      navigate('/admin/bookings/view');
    } catch (err) {
      const anyErr = err as any;
      console.error('Failed to create booking:', anyErr);
      if (anyErr?.response) {
        console.error('Server responded with:', anyErr.response.status, anyErr.response.data);
      }
      // Extract meaningful server message for the user
      let message = 'Failed to create booking.';
      const resp = anyErr?.response;
      const data = resp?.data;
      if (typeof data === 'string') {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.errors && typeof data.errors === 'object') {
        try {
          const parts: string[] = [];
          for (const key of Object.keys(data.errors)) {
            const arr = data.errors[key];
            if (Array.isArray(arr)) parts.push(`${key}: ${arr.join(', ')}`);
          }
          if (parts.length) message = parts.join('\n');
        } catch {}
      } else if (anyErr?.message) {
        message = anyErr.message;
      }
      alert(message);
    }
  }

  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    void handleSave(event);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className='min-h-0 flex flex-col px-7 pt-6 pb-8 gap-4'>
      <AdminBackLink label='Back to View Bookings' backPath='/admin/bookings/view' />

      <div className='relative flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
        <AdminHeading label="CREATE BOOKING" />

        <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
          <Input label='Meeting/Event Title' name='title' type='text' placeholder='Enter Room Name' className='md:col-span-2' value={form.title} onChange={handleChange} />
          <div className='md:col-span-2 flex gap-4'>
            <SchedInput
              label='Start Date/Time'
              dateValue={startDate}
              timeValue={startTime}
              minDate={todayDate}
              minTime={startMinTimeFinal}
              maxTime={startMaxTimeFinal}
              onDateChange={(v) => {
                setStartDate(v);
                if (v > endDate) setEndDate(v);
              }}
              onTimeChange={(v) => {
                setStartTime(v);
                // If endTime is before/equal to new startTime, clear endTime
                if (endTime && v && endTime <= v) setEndTime('');
              }}
            />
            <SchedInput
              label='End Date/Time'
              dateValue={endDate}
              timeValue={endTime}
              minDate={todayDate}
              minTime={endMinTimeFinal}
              maxTime={endMaxTimeFinal}
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
              !toggle ?
                <div className='flex gap-4'>
                  <RecurrenceInput />
                  <MultipleDateInput />
                </div> : null
            }
          </div>

        <div className='flex flex-col gap-4'>
          <TextAreaInput label='Description' name='description' placeholder='Enter description' value={form.description} onChange={handleChange} />
        </div>

        <div className='flex flex-col gap-4'>
          <Input label='User Ref ID' name='userRefId' placeholder='Enter User Ref ID' type='number' value={form.userRefId} onChange={handleChange} />
          <Input label='Expected Attendees' name='attendees' placeholder='Enter number of expected attendees' type='number' value={form.attendees} onChange={handleChange} />
          <SelectInput label='Select Room' name='room' placeholder={selectedRoom === '' ? 'Select Room' : selectedRoom} type='rooms' onClick={handleModal} />

          {
            openModal ? (
              <RoomModal closeFunction={handleModal} value={selectedRoom} selectFunction={handleSelection} />
            ) : null
          }
        </div>

          <div className='flex gap-4 pt-5'>
            <AdminButton label='Save' variant='primary' onClick={handleSaveClick} />
            <AdminButton label='Cancel' variant='secondary' onClick={handleBack} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBooking