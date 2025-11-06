import React from 'react';

const SideContainer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="fixed bg-[#FFFFFF] w-67 h-full flex flex-col mt-1 p-10 hidden xl:flex shadow-[4px_0_6px_-1px_rgba(212,212,216,0.7),2px_0_4px_-2px_rgba(212,212,216,0.6)]">
            {children}
        </div>
    )
}

export default SideContainer;