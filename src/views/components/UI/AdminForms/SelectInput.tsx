import React, { useEffect, useRef, useState } from 'react'
import InputLabel from './InputLabel';

interface SelectInputProps {
  label: string;
  type?: 'rooms';
  placeholder?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  options?: string[];
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  readType?: 'delete' | null;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, placeholder, className, name, type, onClick, options, onChange, readType, value }) => {
  const [filled, setFilled] = useState(false);

  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setFilled(Boolean(value && value !== ''));
  }, [value]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <InputLabel label={label} filled={filled} />
      {
        type === 'rooms' ? (
          <button className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer' onClick={handleClick}>
            <span className='text-zinc-500'>{placeholder}</span>
          </button>
        ) : (
            readType === 'delete' ? (
            <div className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 bg-zinc-100 text-zinc-700'>
              {value || 'No value selected'}
            </div>
            ) : (
            <select
              ref={inputRef}
              id='input'
              name={name}
              value={value ?? ''}
              onChange={(e) => {
                setFilled(e.target.value !== '');
                onChange?.(e);
              }}
              className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'
            >
              <option value="" disabled hidden>
                {placeholder || 'Select an option'}
              </option>
              {options &&
                options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            )
        )
      }
    </div>
  );
}

export default SelectInput