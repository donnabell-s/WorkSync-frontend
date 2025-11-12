import React, { useEffect, useRef, useState } from 'react'
import InputLabel from './InputLabel';

interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readType?: 'delete' | null;
}

const Input: React.FC<InputProps> = ({ label, type, name, placeholder, className, value, onChange, readType }) => {
  const [filled, setFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setFilled(target.value !== '');
        onChange && onChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
      };
      input.addEventListener('input', handleInput);
      return () => input.removeEventListener('input', handleInput);
    }
  }, []);

  return (
    readType === 'delete' ? (
      <div className={`flex flex-col gap-2 ${className}`}>
        <InputLabel label={label} filled={filled} />
        <div className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 bg-zinc-100 text-zinc-700'>
          {value || 'No value selected'}
        </div>
      </div>
    ) : (
      <div className={`flex flex-col gap-2 ${className}`}>
        <InputLabel label={label} filled={filled} />
        <input
          ref={inputRef}
          id='input'
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2'
        />
      </div>
    )
  )
}

export default Input