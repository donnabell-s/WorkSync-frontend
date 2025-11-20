import React from "react";
import { FaCalendarCheck } from "react-icons/fa6";

interface RoomScheduleButtonProps {
  onClick: () => void;
  disabled?: boolean;
  size?: number;
  className?: string;
}

const RoomScheduleButton: React.FC<RoomScheduleButtonProps> = ({
  onClick,
  disabled = false,
  size = 30,
  className = "pl-1 text-emerald-600 focus:outline-none cursor-pointer",
}) => (
  <button
    type="button"
    className={className}
    onClick={onClick}
    aria-label="Show room day schedule"
    disabled={disabled}
  >
    <FaCalendarCheck size={size} />
  </button>
);

export default RoomScheduleButton;
