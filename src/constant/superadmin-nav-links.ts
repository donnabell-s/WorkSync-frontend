import React from 'react';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { FaBookBookmark, FaUser } from "react-icons/fa6";
import { FaUserCog } from 'react-icons/fa';

export const navLinks: Record<string, Record<string, { label: string; icon: React.ReactNode }>> = {
    superadmin: {
        dashboard: {
            label: 'Dashboard',
            icon: React.createElement(RiDashboardHorizontalFill, { className: 'size-5' }),
        },
        notifications: {
            label: 'Notifications',
            icon: React.createElement(IoNotifications, { className: 'size-5' }),
        },
    },
    room_mgnt: {
        rooms: {
            label: 'View Rooms',
            icon: React.createElement(MdMeetingRoom, { className: 'size-5' }),
        },
    },
    booking_mgnt: {
        bookings: {
            label: 'View Bookings',
            icon: React.createElement(FaBookBookmark, { className: 'size-5' }),
        },
    },
    logs: {
        room: {
            label: 'Room Logs',
            icon: React.createElement(MdMeetingRoom, { className: 'size-5' }),
        },
        booking: {
            label: 'Booking Logs',
            icon: React.createElement(FaBookBookmark, { className: 'size-5' }),
        },
    },
    admins: {
        admins: {
            label: 'View Admins',
            icon: React.createElement(FaUserCog, { className: 'size-5' }),
        },
    },
    users: {
        users: {
            label: 'View Users',
            icon: React.createElement(FaUser, { className: 'size-5' }),
        },
    },
}