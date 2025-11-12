import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';

const Account: React.FC = () => {
  const { user: authUser } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({
    firstName: authUser?.firstName || '',
    lastName: authUser?.lastName || '',
    email: authUser?.email || '',
  });


  const [addressInfo, setAddressInfo] = useState({
    country: '',
    city: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>('/user-avatar.svg');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (!authUser) return;
    // Use current auth user until backend integration
    setPersonalInfo({
      firstName: authUser.firstName || '',
      lastName: authUser.lastName || '',
      email: authUser.email || '',
    });
    setAddressInfo({ country: '', city: '' });
    setProfilePhoto('/user-avatar.svg');
  }, [authUser]);


  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePhoto(url);
    }
  };

  const handleSavePersonalInfo = async () => {
    if (!authUser?.id) return;

    try {
      // TODO: integrate update API when backend endpoint is ready
      setIsEditingPersonal(false);
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to save changes. Please try again.');
    }
  };


  return (
    <div className="bg-white rounded-md shadow-md w-full h-full p-6">
      <h1 className="text-2xl font-semibold border-b border-[#8E939A] pb-4 mb-4">Account</h1>

      {/* Profile Picture */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={profilePhoto || '/default-avatar.png'}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <input type="file" accept="image/*" onChange={handleProfileUpload} className='bg-[#0D9488] text-white px-2 py-1 rounded-md'/>
            {profilePhoto && (
              <button
                onClick={() => setProfilePhoto(null)}
                className="text-[#0D9488] text-sm ml-2 border rounded-md px-2 py-1"
              >
                Remove
              </button>
            )}
          </div>
        </div>
  <button className="border border-[#78808A] text-[#78808A] hover:bg-[#78808A]/10 px-5 py-2 rounded-full text-sm font-semibold transition">Change Password</button>
      </div>

      {/* Personal Info */}
      <div className="mb-8">
        <div className="border-t border-[#8E939A] mb-3" />
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <button
            onClick={() => {
              if (isEditingPersonal) {
                handleSavePersonalInfo();
              } else {
                setIsEditingPersonal(true);
              }
            }}
            className="flex items-center gap-1 text-sm font-semibold border border-[#78808A] text-[#78808A] hover:bg-[#78808A]/10 px-3.5 py-2 rounded-full transition"
          >
            
            {isEditingPersonal ? 'Save Changes' : 'Edit'}
            <FaEdit className="text-base" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['firstName', 'lastName', 'email'].map((field, i) => (
            <div key={i}>
              <label className="block text-sm text-gray-600 capitalize">
                {field === 'firstName'
                  ? 'First Name'
                  : field === 'lastName'
                  ? 'Last Name'
                  : 'Email Address'}
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
        <div className="border-t border-[#8E939A] mb-3" />
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Address</h2>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="flex items-center gap-1 text-sm font-semibold border border-[#78808A] text-[#78808A] hover:bg-[#78808A]/10 px-3.5 py-2 rounded-full transition"
          >
            
            {isEditingAddress ? 'Save Changes' : 'Edit'}
            <FaEdit className="text-base" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
