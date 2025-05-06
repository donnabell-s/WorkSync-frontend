import React from 'react';

const SideContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="fixed bg-[#FFFFFF] w-67 h-full flex flex-col mt-1 shadow-lg shadow-zinc-300 p-10">
            {children}
        </div>
    )
}

export default SideContainer;