import React from 'react'

interface AdminDashboardCardProps {
    label: string | string[];
    variant?: 'single' | 'multiple';
    value: string | string[] | number | number[];
    icon: React.ReactNode | React.ReactNode[];
    span?: number;
}

const AdminDashboardCard: React.FC<AdminDashboardCardProps> = ({ label, variant, value, icon, span }) => {
  return (
    variant === 'multiple' ? (
        <div className={`h-25 w-full bg-white divide-x divide-gray-300 rounded-md shadow-md flex items-center text-[#1F2937] col-span-${span}`}>
            {Array.isArray(label) && Array.isArray(value) && Array.isArray(icon) ? (
                label.map((lbl, index) => (
                    <div key={index} className='w-full h-full flex items-center justify-center gap-4 p-4'>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <h5 className='text-sm font-medium'>{lbl}</h5>
                            <span className='flex gap-3 justify-center items-center'>
                              {icon[index]}
                              <h1 className='text-2xl font-bold'>{value[index]}</h1>
                            </span>
                        </div>
                    </div>
                ))
            ) : null}
        </div>
    ) : (
    <div className='h-25 w-full bg-white rounded-md shadow-md flex flex-col justify-between items-center p-4 py-3 text-[#1F2937]'>
        <h5 className='font-medium'>{label}</h5>
        <div className='flex items-center gap-4'>
            {icon}
            <h1 className='text-2xl font-bold'>{value}</h1>
        </div>
    </div>
    )
  )
}

export default AdminDashboardCard