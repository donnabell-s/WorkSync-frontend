import React from 'react'

const AdminFilter: React.FC = () => {
  return (
    <div className='flex gap-5 text-sm w-full items-center'>
        <p>Filter by:</p>
        <select className="w-30 border border-gray-300 rounded-md p-2 cursor-pointer focus:ring-slate-300 focus:ring-2">
            <option value="">All</option>
        </select>
    </div>
  )
}

export default AdminFilter;