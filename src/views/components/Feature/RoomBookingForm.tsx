import React, { useState, useEffect } from "react";
import { FaRegTrashAlt, FaCaretDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";

interface BookingData {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    isRecurring: boolean;
    recurrenceType?: "daily" | "weekly" | "monthly";
    untilDate?: string;
}

interface RoomBookingFormProps {
    edit?: boolean;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({ edit = false }) => {
    const navigate = useNavigate();

    const mockData: BookingData = {
        title: "Team Sync",
        startDate: "2025-05-10",
        startTime: "10:00",
        endDate: "2025-05-10",
        endTime: "11:00",
        isRecurring: true,
        recurrenceType: "weekly",
        untilDate: "2025-06-10",
    };

    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceType, setRecurrenceType] = useState<
        "daily" | "weekly" | "monthly" | ""
    >("");
    const [untilDate, setUntilDate] = useState("");

    useEffect(() => {
        if (edit) {
        setTitle(mockData.title);
        setStartDate(mockData.startDate);
        setStartTime(mockData.startTime);
        setEndDate(mockData.endDate);
        setEndTime(mockData.endTime);
        setIsRecurring(mockData.isRecurring);
        setRecurrenceType(mockData.recurrenceType || "");
        setUntilDate(mockData.untilDate || "");
        }
    }, [edit]);

    return (
        <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="relative w-full md:w-[75%]">
                <RxCross1
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-[#4B5563] cursor-pointer text-lg"
                    onClick={() => navigate(edit ? "/user/my-bookings" : "/user/room-explorer")}
                />
                <input
                type="text"
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-0 border-b border-[#4B5563] px-9 py-1 w-full text-[25px] min-w-0 focus:outline-none focus:border-black transition-colors duration-200"
                />
            </div>
            <button className="bg-[#1E40AF] text-white text-lg px-8 py-2 rounded-full cursor-pointer "
                    onClick={() => navigate("/user/my-bookings")}>
            Save
            </button>
            {edit && (
            <button className="bg-[#DC2626] text-white w-11 h-11 flex items-center justify-center rounded-full">
                <FaRegTrashAlt className="text-lg" />
            </button>
            )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
            <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
            />
            <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
            />
            <p className="text-sm whitespace-nowrap">to</p>
            <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
            />
            <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
            />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
            <button
            type="button"
            onClick={() => setIsRecurring((p) => !p)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 w-fit ${
                isRecurring
                ? "bg-[#10B981] text-white border-2 border-[#10B981]"
                : "bg-transparent border-2 border-[#10B981] text-[#10B981]"
            }`}
            >
            {isRecurring ? "Recurring Booking" : "One-Time Booking"}
            </button>

            {isRecurring && (
            <div className="flex flex-col sm:flex-row gap-2 pl-0 sm:pl-6 items-start sm:items-center flex-wrap">
                <div className="relative w-full sm:w-fit">
                <select
                    value={recurrenceType}
                    onChange={(e) =>
                    setRecurrenceType(
                        e.target.value as "daily" | "weekly" | "monthly"
                    )
                    }
                    className="appearance-none bg-[#F3F4F6] rounded px-4 py-2 pr-10 w-full"
                >
                    <option value="">Select Recurrence</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#1F2937]">
                    <FaCaretDown />
                </div>
                </div>
                <p className="text-sm whitespace-nowrap">on</p>
                <input
                type="date"
                value={untilDate}
                onChange={(e) => setUntilDate(e.target.value)}
                className="bg-[#F3F4F6] rounded px-4 py-2 w-full sm:w-auto"
                />
            </div>
            )}
        </div>
        </div>
    );
};

export default RoomBookingForm;
