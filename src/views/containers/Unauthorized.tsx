import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/login" className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700">
            Go to Login
          </Link>
          <Link to="/" className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
