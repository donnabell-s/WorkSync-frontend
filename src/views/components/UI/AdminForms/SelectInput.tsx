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
}

const SelectInput: React.FC<SelectInputProps> = ({ label, placeholder, className, type, onClick, options }) => {
  const [filled, setFilled] = useState(false);

  const inputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const handleInput = () => setFilled(input.value !== '');
      input.addEventListener('input', handleInput);
      return () => input.removeEventListener('input', handleInput);
    }
  }, []);

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
          <select ref={inputRef} id='input'
            className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'>
            <option value="" disabled selected hidden>{placeholder || 'Select an option'}</option>
            {
              options && options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))
            }
          </select>
        )
      }
    </div>
  )
}

export default SelectInput