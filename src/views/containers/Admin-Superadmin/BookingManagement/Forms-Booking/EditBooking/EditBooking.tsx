import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import type { Booking } from '../../../../../../types';
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
import { useBookings } from '../../../../../../context/BookingContext'

const EditBooking = () => {
  const location = useLocation();
  const booking = (location.state as { booking: Booking })?.booking;
  const navigate = useNavigate();
  const { updateBooking, currentBooking, bookings, getBookingById } = useBookings();
  const [toggle, setToggle] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
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
    navigate('/admin/bookings/booking-detail', { state: { booking } });
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
    try {
      console.log('[EditBooking] Attempting PUT with patch:', partial);
      await updateBooking(id, partial);
    } catch (e) {
      // Soft-fail navigation; still go back to detail with merged state
      // Optionally, surface an alert here
    }
    navigate('/admin/bookings/booking-detail', { state: { booking } });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

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