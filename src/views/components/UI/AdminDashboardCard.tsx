import React from 'react'

interface AdminDashboardCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
}

const AdminDashboardCard: React.FC<AdminDashboardCardProps> = ({ label, value, icon }) => {
  return (
    <div className='h-25 w-full bg-white rounded-md shadow-md flex flex-col justify-between items-center p-4 py-3 text-[#1F2937]'>
        <h5 className='font-medium'>{label}</h5>
        <div className='flex items-center gap-4'>
            {icon}
            <h1 className='text-2xl font-bold'>{value}</h1>
        </div>
    </div>
  )
}

export default AdminDashboardCard