import React, { useEffect, useRef, useState } from 'react'
import InputLabel from './InputLabel';

interface TextAreaInputProps {
  label: string;
  placeholder?: string;
  className?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, placeholder, className }) => {
  const [filled, setFilled] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      <textarea ref={inputRef} id='input' placeholder={placeholder}
        className='w-full h-30 flex-grow text-sm border-zinc-300 border-1 rounded-md p-2 focus:outline-zinc-300 focus:outline-2' />
    </div>
  )
}

export default TextAreaInput