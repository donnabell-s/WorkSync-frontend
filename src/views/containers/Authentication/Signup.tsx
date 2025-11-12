import React, { useState } from 'react'
import { MdEmail, MdLock } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import AuthLayout from '../../components/Layout/AuthLayout';
import type { AxiosError } from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signup(formData.firstName, formData.lastName, formData.email, formData.password);
      // After successful signup, redirect to login
      navigate('/login');
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      left={
        <section className="w-full flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-gray-800 w-[320px]">Create Account</h2>
          <p className="text-gray-500 text-center mb-8 text-base w-[320px]">Your Perfect Meeting Starts Here.</p>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md w-full max-w-[320px] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-[320px] flex flex-col items-center">
            <div className='w-full flex gap-3'>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
                <FaUser className="text-gray-400 mr-2 text-xl" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
                  required
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
                <FaUser className="text-gray-400 mr-2 text-xl" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
                  required
                />
              </div>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
              <MdEmail className="text-gray-400 mr-2 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
                required
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
              <MdLock className="text-gray-400 mr-2 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
                required
                minLength={6}
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-8 w-full">
              <MdLock className="text-gray-400 mr-2 text-xl" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md mb-6 transition-colors text-base shadow-md w-[140px] mx-auto"
              disabled={loading}
            >
              {loading ? "LOADING..." : "SIGN UP"}
            </button>
            <p className="text-gray-500 text-sm w-full text-center">
              Already have an account?{' '}
              <button
                type="button"
                className="text-teal-600 font-semibold hover:underline bg-transparent border-none p-0 m-0"
                onClick={() => navigate('/login')}>
                Sign in
              </button>
            </p>
          </form>
        </section>
      }
      right={
        <>
          <h3 className="text-3xl font-extrabold text-white text-left w-full mb-2">Hey, there!</h3>
          <p className="text-lg text-white text-left w-full mb-2">Join us in</p>
          <h1 className="text-5xl font-extrabold font-montserrat tracking-tighter leading-tight text-white text-left w-full mb-4">WorkSync</h1>
          <p className="text-base font-medium italic text-left w-full text-white/80">Where Teams and Rooms Align.</p>
        </>
      }
    />
  );
};

export default Signup;