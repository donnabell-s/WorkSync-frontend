import React, { useState } from 'react'
import InputLabel from './InputLabel';

interface SchedInputProps {
    label: string;
    className?: string;
    // Controlled props
    dateValue?: string;
    timeValue?: string;
    minDate?: string;
    minTime?: string;
    maxTime?: string;
    onDateChange?: (v: string) => void;
    onTimeChange?: (v: string) => void;
    // Legacy display-only props (fallback)
    value1?: string;
    value2?: string;
}

const SchedInput: React.FC<SchedInputProps> = ({ label, className, dateValue, timeValue, minDate, minTime, maxTime, onDateChange, onTimeChange, value1, value2 }) => {
    const [filled, setFilled] = useState(false);

    const timeOptions = React.useMemo(() => {
        // 08:00 to 19:30 at 30-minute intervals (same logic as user side)
        const options: string[] = [];
        for (let h = 8; h <= 19; h++) {
            for (let m of [0, 30]) {
                if (h === 19 && m === 30) {
                    options.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
                } else if (h < 19) {
                    options.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
                }
            }
        }
        return options;
    }, []);

    const filteredTimeOptions = React.useMemo(() => {
        return timeOptions.filter((t) => {
            if (minTime && t < minTime) return false;
            if (maxTime && t > maxTime) return false;
            return true;
        });
    }, [timeOptions, minTime, maxTime]);

    // Keep label filled state updated for controlled/uncontrolled usage
    React.useEffect(() => {
        if (onDateChange || onTimeChange) {
            setFilled(Boolean(dateValue) || Boolean(timeValue));
        } else {
            setFilled(Boolean(value1 || value2));
        }
    }, [dateValue, timeValue, value1, value2, onDateChange, onTimeChange]);

    // If not controlled, render a disabled display consistent with legacy usage
    const isControlled = Boolean(onDateChange || onTimeChange);

    return (
        <div className={`w-full flex flex-col gap-2 flex-wrap ${className ?? ''}`}>
            <InputLabel label={label} filled={filled} />
            <div className='flex flex-col gap-2 text-sm'>
                <div className='flex gap-6 items-center'>
                    <label>Date</label>
                    {isControlled ? (
                        <input
                            type="date"
                            min={minDate}
                            value={dateValue ?? ''}
                            onChange={(e) => onDateChange?.(e.target.value)}
                            className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'
                        />
                    ) : (
                        <input
                            type="date"
                            disabled
                            className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 bg-zinc-100 text-zinc-700'
                        />
                    )}
                </div>
                <div className='flex gap-6 items-center'>
                    <label>Time</label>
                    {isControlled ? (
                        <select
                            value={timeValue ?? ''}
                            onChange={(e) => onTimeChange?.(e.target.value)}
                            className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'
                        >
                            <option value="">Select time</option>
                            {filteredTimeOptions.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            disabled
                            className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 bg-zinc-100 text-zinc-700'
                            value={value1 ? '16:00' : (value2 ? '18:30' : '')}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SchedInput