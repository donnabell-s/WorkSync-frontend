import React, { useState } from 'react'
import { MdEmail, MdLock } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import userBrandLogo from '../../../assets/user-brand-logo.svg';
import { useNavigate } from 'react-router';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen min-h-screen min-w-screen flex items-stretch bg-cover bg-center overflow-hidden font-sans bg-[url('/src/assets/login-bg2.png')]"
    >
      <div className="basis-[55%] flex flex-col justify-center items-center relative min-h-screen rounded-tl-3xl rounded-bl-3xl bg-[url('/src/assets/login-bg2.png')] bg-cover bg-center shadow-xl">
      
        <div className="absolute inset-0 bg-white/10 rounded-tl-3xl rounded-bl-3xl pointer-events-none z-0" />
      
        <div className="absolute top-8 left-8">
          <img src={userBrandLogo} alt="WorkSync Logo" className="w-14 h-14" />
        </div>
        <section className="w-full flex flex-col items-center px-2 z-10">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-gray-800 w-[320px]">Create Account</h2>
          <p className="text-gray-500 text-center mb-8 text-base w-[320px]">Your Perfect Meeting Starts Here.</p>
          <form className="w-[320px] flex flex-col items-center">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
              <FaUser className="text-gray-400 mr-2 text-xl" />
             
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
              />

            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
              <MdEmail className="text-gray-400 mr-2 text-xl" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
              <MdLock className="text-gray-400 mr-2 text-xl" />
              <input
                type="password"
                placeholder="Create Password"
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-8 w-full">
              <MdLock className="text-gray-400 mr-2 text-xl" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md mb-6 transition-colors text-base shadow-md w-[140px] mx-auto"
            >
              SIGN UP
            </button>
            <p className="text-gray-500 text-sm w-full text-center">
              Already have an account?{' '}
              <button
                type="button"
                className="text-teal-600 font-semibold hover:underline bg-transparent border-none p-0 m-0"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
            </p>
          </form>
        </section>
      </div>
      
      {/* Right Side */}
      <div className="basis-[45%] flex flex-col justify-center items-center relative min-h-screen p-4 rounded-tr-3xl rounded-br-3xl bg-white/0 shadow-xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center rounded-tr-3xl rounded-br-3xl z-0 bg-[url('/src/assets/login-bg1.png')]" />
        <div className="w-full max-w-[420px] flex flex-col items-center justify-center mx-auto z-10 relative h-full">
          <h3 className="text-2xl font-extrabold mb-4 mt-2 text-white text-left w-full">Hey, there!</h3>
          <p className="text-xl font-medium text-white text-left w-full mb-2">Join us in</p>
          <h1 className="text-5xl font-extrabold mb-4 font-montserrat tracking-tighter leading-tight text-white text-left w-full mx-auto block w-max">WorkSync</h1>
          <p className="text-lg font-medium italic text-left max-w-fit block ml-8 text-white/85">
            Where Teams and Rooms Align.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup