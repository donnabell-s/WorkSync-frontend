import React from 'react'

interface AdminFilterProps {
  onChange: (filter: string) => void;
  filters: string[];
}

const AdminFilter: React.FC<AdminFilterProps> = ({ onChange, filters }) => {
  return (
    <div className='flex gap-5 text-sm w-full items-center'>
        <p>Filter by:</p>
        <select className="w-30 border border-gray-300 rounded-md p-2 cursor-pointer focus:ring-slate-300 focus:ring-2"
            onChange={(event) => onChange(event.target.value)}
        >
            <option value="">All</option>
            {filters.map((filter, index) => (
                <option key={index} value={filter}>{filter}</option>
            ))}
        </select>
    </div>
  )
}

export default AdminFilter