import { MdLock } from 'react-icons/md';
import userBrandLogo from '../../../assets/user-brand-logo.svg';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen min-h-screen min-w-screen flex items-stretch bg-cover bg-center overflow-hidden font-sans bg-[url('/src/assets/login-bg2.png')]"
    >
      {/* Left Side */}
      <div className="basis-[55%] flex flex-col justify-center items-center relative min-h-screen rounded-tl-3xl rounded-bl-3xl bg-[url('/src/assets/login-bg2.png')] bg-cover bg-center shadow-xl">
      
        <div className="absolute inset-0 bg-white/10 rounded-tl-3xl rounded-bl-3xl pointer-events-none z-0" />
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <img src={userBrandLogo} alt="WorkSync Logo" className="w-14 h-14" />
        </div>
        <section className="w-full flex flex-col items-center px-2 z-10">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-gray-800 w-[320px]">Password Reset</h2>
          <p className="text-gray-500 text-center mb-8 text-base w-[320px]">Enter your new password and confirm.</p>
          <form className="w-[320px] flex flex-col items-center">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full">
              <MdLock className="text-gray-400 mr-2 text-xl" />
              <input
                type="password"
                placeholder="Create New Password"
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
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md mb-4 transition-colors text-base shadow-md w-[140px] mx-auto"
            >
              Confirm
            </button>
            <button
              type="button"
              className="text-teal-600 font-semibold hover:underline bg-transparent border-none p-0 m-0 text-sm"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </button>
          </form>
        </section>
      </div>
      {/* Right Side */}
      <div className="basis-[45%] flex flex-col justify-center items-center relative min-h-screen p-4 rounded-tr-3xl rounded-br-3xl bg-white/0 shadow-xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center rounded-tr-3xl rounded-br-3xl z-0 bg-[url('/src/assets/login-bg1.png')]" />
        <div className="w-full max-w-[420px] flex flex-col items-center justify-center mx-auto z-10 relative h-full">
          <h3 className="text-3xl font-extrabold text-white text-left w-full mb-2">Hey, there!</h3>
          <p className="text-lg text-white text-left w-full mb-2">Security first.<br />Meet again soon.</p>
          <h1 className="text-5xl font-extrabold font-montserrat tracking-tighter leading-tight text-white text-left w-full mb-4">WorkSync</h1>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;