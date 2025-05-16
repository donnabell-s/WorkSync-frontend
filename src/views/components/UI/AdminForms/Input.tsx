import React, { useEffect, useRef, useState } from 'react'
import InputLabel from './InputLabel';

interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, type, placeholder, className }) => {
  const [filled, setFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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
      <input ref={inputRef} id='input' type={type} placeholder={placeholder}
        className='w-full flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2' />
    </div>
  )
}

export default Input