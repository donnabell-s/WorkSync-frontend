import React from 'react';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { FaBookBookmark, FaUser } from "react-icons/fa6";

export const navLinks: Record<string, Record<string, { label: string; icon: React.ReactNode; path: string }>> = {
    superadmin: {
        dashboard: {
            label: 'Dashboard',
            icon: React.createElement(RiDashboardHorizontalFill, { className: 'size-5' }),
            path: '/admin/dashboard',
        },
        notifications: {
            label: 'Notifications',
            icon: React.createElement(IoNotifications, { className: 'size-5' }),
            path: '/admin/notifications',
        },
    },
    room_mgnt: {
        rooms: {
            label: 'View Rooms',
            icon: React.createElement(MdMeetingRoom, { className: 'size-5' }),
            path: '/admin/rooms/view',
        },
    },
    booking_mgnt: {
        bookings: {
            label: 'View Bookings',
            icon: React.createElement(FaBookBookmark, { className: 'size-5' }),
            path: '/admin/bookings/view',
        },
    },
    logs: {
        room: {
            label: 'Room Logs',
            icon: React.createElement(MdMeetingRoom, { className: 'size-5' }),
            path: '/admin/logs/rooms',
        },
        booking: {
            label: 'Booking Logs',
            icon: React.createElement(FaBookBookmark, { className: 'size-5' }),
            path: '/admin/logs/bookings',
        },
    },
    users: {
        users: {
            label: 'View Users',
            icon: React.createElement(FaUser, { className: 'size-5' }),
            path: '/admin/users/view',
        },
    },
}