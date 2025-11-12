import React, { useEffect, useState } from 'react'
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
  const [filled, setFilled] = useState<boolean>(Boolean(value && value !== ''));

  useEffect(() => {
    setFilled(Boolean(value && value !== ''));
  }, [value]);

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
          id='input'
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setFilled(e.target.value !== '');
            onChange?.(e);
          }}
          readOnly={!onChange}
          className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2'
        />
      </div>
    )
  )
}

export default Input