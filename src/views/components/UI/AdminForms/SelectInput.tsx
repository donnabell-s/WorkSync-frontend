import React, { useEffect, useRef, useState } from 'react'
import InputLabel from './InputLabel';

interface SelectInputProps {
  label: string;
//   type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, placeholder, className }) => {
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

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <InputLabel label={label} filled={filled} />
      <select ref={inputRef} id='input'
        className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2 cursor-pointer'>
        <option value="" disabled selected hidden>{placeholder || 'Select an option'}</option>
        {/* Add options here */}
      </select>
    </div>
  )
}

export default SelectInput