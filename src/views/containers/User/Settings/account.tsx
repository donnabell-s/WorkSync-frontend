import React, { useState } from 'react';

const Account: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Default user information
  const [userInfo] = useState({
    firstName: 'Alliyana Rose',
    lastName: 'Garcia',
    email: 'alliyanarose.garcia.22@usjr.edu.ph',
    phone: '+63 999 999 9999',
    country: 'Philippines',
    cityState: 'Cebu, Cebu City',
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setProfilePicture(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Account</h2>
        <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 text-sm">
          Change Password
        </button>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-purple-600">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span>👤</span>
          )}
        </div>
        <div className="space-x-2">
          <label className="text-sm font-medium cursor-pointer text-white bg-green-500 px-3 py-1.5 rounded">
            Upload New Photo
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
          <button onClick={handleRemove} className="text-sm text-gray-700 border px-3 py-1.5 rounded hover:bg-gray-100">
            Remove
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 relative">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <button className="absolute top-6 right-6 text-sm text-gray-600 hover:underline">
          ✎ Edit
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">First Name</p>
            <p className="text-gray-900">{userInfo.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Last Name</p>
            <p className="text-gray-900">{userInfo.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email Address</p>
            <p className="text-gray-900">{userInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="text-gray-900">{userInfo.phone}</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg shadow p-6 relative">
        <h3 className="text-lg font-semibold mb-4">Address</h3>
        <button className="absolute top-6 right-6 text-sm text-gray-600 hover:underline">
          ✎ Edit
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Country</p>
            <p className="text-gray-900">{userInfo.country}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">City/State</p>
            <p className="text-gray-900">{userInfo.cityState}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;