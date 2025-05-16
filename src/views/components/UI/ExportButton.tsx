import React from 'react'

interface ExportButtonProps {
    label: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ label }) => {
  return (
    <button className='bg-[#059669] hover:bg-[#037362] text-white font-medium rounded-md text-xs p-1 px-3'>{label}</button>
  )
}

export default ExportButton