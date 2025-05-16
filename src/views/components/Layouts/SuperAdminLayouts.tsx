import React from 'react';
import './SuperAdminLayout.css';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  activeSection: 'admins' | 'users';
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children, activeSection }) => {
  return (
    <>
      <div className="header">
        <div className="header-logo">WorkSync</div>
        <div className="header-right">
          <span className="header-bell">🔔</span>
          <div className="header-user">
            <span>John</span>
            <div className="header-user-icon"></div>
          </div>
        </div>
      </div>

      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-title">
            SuperAdmin View <span className="chevron">{'>'}</span>
          </div>
          <ul className="sidebar-menu">
            <li>
              <span className="sidebar-icon">🏢</span>
              <span className="menu-text">Room Management</span>
              <span className="chevron">{'>'}</span>
            </li>
            <li>
              <span className="sidebar-icon">📅</span>
              <span className="menu-text">Booking Management</span>
              <span className="chevron">{'>'}</span>
            </li>
            <li>
              <span className="sidebar-icon">📜</span>
              <span className="menu-text">Audit Logs</span>
              <span className="chevron">{'>'}</span>
            </li>
            <li className={activeSection === 'admins' ? 'active' : ''}>
              <span className="sidebar-icon">👤</span>
              <span className="menu-text">Admins</span>
              <span className="chevron">{activeSection === 'admins' ? '↓' : '>'}</span>
            </li>
            <ul className={`dropdown ${activeSection === 'admins' ? 'open' : ''}`}>
              <li className={activeSection === 'admins' ? 'active' : ''}>View Admins</li>
            </ul>
            <li className={activeSection === 'users' ? 'active' : ''}>
              <span className="sidebar-icon">👥</span>
              <span className="menu-text">Users</span>
              <span className="chevron">{activeSection === 'users' ? '↓' : '>'}</span>
            </li>
            <ul className={`dropdown ${activeSection === 'users' ? 'open' : ''}`}>
              <li className={activeSection === 'users' ? 'active' : ''}>View Users</li>
            </ul>
          </ul>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </>
  );
};

export default SuperAdminLayout;