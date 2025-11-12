import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SideNavLinkProps {
    label: string;
    icon: React.ReactNode;
    path: string;
}

const SideNavLink: React.FC<SideNavLinkProps> = ({ label, icon, path }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname.includes(path);

    const handleClick = () => {
        navigate(path);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex items-center justify-between p-3 hover:bg-[#F3F4F6] cursor-pointer rounded-md text-[#1F2937] text-md font-medium ${
                isActive ? 'bg-[#F3F4F6]' : ''
            }`}
        >
            <div className="flex items-center gap-4 pl-7">
                <span className="w-7 flex items-center justify-center">{icon}</span>
                <p>{label}</p>
            </div>
        </div>
    );
};

export default SideNavLink;
