import React from 'react'

const AdminDashboardFilter = () => {
  return (
    <div className='flex gap-2 text-sm items-center text-[#1F2937]'>
        <p className='text-sm'>Filter by:</p>
        <select className="w-25 border border-gray-300 rounded-md p-1 cursor-pointer focus:ring-slate-300 focus:ring-2">
            <option value="">All</option>
        </select>
    </div>
  )
}

export default AdminDashboardFilter