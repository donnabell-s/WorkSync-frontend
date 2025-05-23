import React, { useEffect, useRef, useState } from 'react';
import InputLabel from './InputLabel';

interface MultiSelectInputProps {
    label: string;
    placeholder?: string;
    className?: string;
    name: string;
    options?: string[];
    value?: string[];  // Changed to expect array of strings
    onChange?: (selectedOptions: string[]) => void;  // Changed to return array directly
    readType?: 'delete' | null;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
    label,
    placeholder,
    className,
    name,
    options = [],
    value = [],
    onChange,
    readType
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(value);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Update internal state when external value changes
    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option: string) => {
        const newSelectedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);  // Notify parent of changes
    };

    const displayText = selectedOptions.length > 0
        ? selectedOptions.join(', ')
        : placeholder || 'Select options';

    return (
        <div className={`relative w-full flex flex-col gap-2 ${className}`} ref={dropdownRef}>
            <InputLabel label={label} filled={selectedOptions.length > 0} />
            <button
                type="button"
                className={`w-full flex-grow text-sm border-zinc-300 border rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer text-left flex items-center justify-between
                    ${readType === 'delete' ? 'bg-zinc-100 text-zinc-700' : 'bg-white text-black'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`${selectedOptions.length === 0 ? 'text-zinc-500' : 'text-black'}`}>
                    {displayText}
                </span>
                {
                    readType !== 'delete' ? (
                        <svg
                            className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    ) : null
                }
            </button>

            {!readType && isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-zinc-200 max-h-60 overflow-auto">
                    {options.map((option, index) => (
                        <label
                            key={index}
                            className="flex items-center px-4 py-2 hover:bg-zinc-100 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => toggleOption(option)}
                                className="rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 mr-2"
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectInput;