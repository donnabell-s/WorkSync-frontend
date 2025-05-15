import React, { useState } from 'react';

const Account: React.FC = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Alliyana Rose',
    lastName: 'Garcia',
    email: 'alliyanarose.garcia.22@usjr.edu.ph',
    phone: '+63 999 999 9999',
  });

  const [addressInfo, setAddressInfo] = useState({
    country: 'Philippines',
    city: 'Cebu, Cebu City',
  });

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePhoto(url);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md mt-6">
      <h1 className="text-2xl font-bold border-b pb-4 mb-4">Account</h1>

      {/* Profile Picture */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={profilePhoto || '/default-avatar.png'}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <input type="file" accept="image/*" onChange={handleProfileUpload} />
            {profilePhoto && (
              <button
                onClick={() => setProfilePhoto(null)}
                className="text-red-500 text-sm ml-2"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <button className="border px-4 py-2 rounded-md text-sm">Change Password</button>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <button
            onClick={() => setIsEditingPersonal(!isEditingPersonal)}
            className="text-sm text-blue-600"
          >
            {isEditingPersonal ? 'Save Changes' : 'Edit'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['firstName', 'lastName', 'email', 'phone'].map((field, i) => (
            <div key={i}>
              <label className="block text-sm text-gray-600 capitalize">
                {field === 'firstName'
                  ? 'First Name'
                  : field === 'lastName'
                  ? 'Last Name'
                  : field === 'email'
                  ? 'Email Address'
                  : 'Phone'}
              </label>
              {isEditingPersonal ? (
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  value={personalInfo[field as keyof typeof personalInfo]}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, [field]: e.target.value })
                  }
                />
              ) : (
                <p>{personalInfo[field as keyof typeof personalInfo]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Address */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Address</h2>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-sm text-blue-600"
          >
            {isEditingAddress ? 'Save Changes' : 'Edit'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['country', 'city'].map((field, i) => (
            <div key={i}>
              <label className="block text-sm text-gray-600 capitalize">
                {field === 'city' ? 'City/State' : 'Country'}
              </label>
              {isEditingAddress ? (
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  value={addressInfo[field as keyof typeof addressInfo]}
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, [field]: e.target.value })
                  }
                />
              ) : (
                <p>{addressInfo[field as keyof typeof addressInfo]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;