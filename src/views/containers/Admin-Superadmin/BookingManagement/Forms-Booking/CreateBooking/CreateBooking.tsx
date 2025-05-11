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

const CreateBooking = () => {
  const [toggle, setToggle] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');

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

  return (
    <div className='max-h-max flex p-3 px-7 pb-5 flex-col gap-4'>
      <AdminBackLink label='Back to View Bookings' backPath='/admin/bookings/view' />

      <div className='relative max-h-max flex flex-col p-5 bg-white rounded-md shadow-sm gap-4'>
        <AdminHeading label="CREATE BOOKING" />

        <form action="" className='grid md:grid-cols-2 gap-4 grid-cols-1'>
          <Input label='Meeting/Event Title' type='text' placeholder='Enter Room Name' className='md:col-span-2' />
          <div className='md:col-span-2 flex gap-4'>
            <SchedInput label='Start Date/Time' />
            <SchedInput label='End Date/Time' />
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
            <TextAreaInput label='Description' placeholder='Enter description' />
          </div>

          <div className='flex flex-col gap-4'>
            <Input label='Expected Attendees' placeholder='Enter number of expected attendees' type='number' />
            <SelectInput label='Select Room' placeholder={selectedRoom === '' ? 'Select Room' : selectedRoom} type='rooms' onClick={handleModal} />

            {
              openModal ? (
                <RoomModal closeFunction={handleModal} value={selectedRoom} selectFunction={handleSelection} />
              ) : null
            }
          </div>

          <div className='flex gap-4 pt-5'>
            <AdminButton label='Save' variant='primary' />
            <AdminButton label='Cancel' variant='secondary' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBooking