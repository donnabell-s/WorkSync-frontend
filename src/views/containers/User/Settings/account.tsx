import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { usersApi } from '../../../../api/client';
import { User } from '../../../../types';

const Account: React.FC = () => {
  const { user: authUser } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({
    fname: authUser?.fname || '',
    lname: authUser?.lname || '',
    email: authUser?.email || '',
    phone: authUser?.phone || '',
  });

  const [addressInfo, setAddressInfo] = useState({
    country: '',
    city: '',
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>('/user-avatar.svg');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (!authUser?.id) return;
      try {
        const response = await usersApi.getUserById(String(authUser.id));
        const freshUser: User = response.data;
        setPersonalInfo({
          fname: freshUser.fname,
          lname: freshUser.lname,
          email: freshUser.email,
          phone: freshUser.phone || '',
        });
        setAddressInfo({
          country: '',
          city: '',
        });
        setProfilePhoto('/user-avatar.svg');
      } catch (err) {
        console.error('Failed to fetch fresh user data:', err);
      }
    }
    fetchUser();
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
      // Assuming your usersApi has an updateUser method that accepts (id, updatedData)
      await usersApi.updateUser(String(authUser.id), {
        fname: personalInfo.fname,
        lname: personalInfo.lname,
        email: personalInfo.email,
      });

      // Optionally refetch fresh data or just disable editing after save
      setIsEditingPersonal(false);
      // You may want to also update authUser context or refetch user data here

    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to save changes. Please try again.');
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}

      <div className="p-6 max-w-4xl mx-auto bg-white rounded-md shadow-md mt-6 ml-auto xl:ml-[270px] w-full">
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

        <div className="mb-8">
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
              className="text-sm text-blue-600"
            >
              {isEditingPersonal ? 'Save Changes' : 'Edit'}
            </button>

          </div>
          <div className="grid grid-cols-2 gap-4">
            {['fname', 'lname', 'email', 'phone'].map((field, i) => (
              <div key={i}>
                <label className="block text-sm text-gray-600 capitalize">
                  {field === 'fname'
                    ? 'First Name'
                    : field === 'lname'
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
    </div>
  );
};

export default Account;
