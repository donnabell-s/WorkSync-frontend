import { MdEmail, MdLock } from 'react-icons/md';
import userBrandLogo from '../../../assets/user-brand-logo.svg';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen min-h-screen min-w-screen flex items-stretch bg-cover bg-center overflow-hidden font-sans bg-[url('/src/assets/login-bg2.png')]"
    >
      {/* Left Side */}
       <div
        className="flex-1 flex flex-col justify-center items-center relative min-h-screen rounded-tl-3xl rounded-bl-3xl bg-[url('/src/assets/login-bg2.png')] bg-cover bg-center shadow-xl"
      >
        {/* Subtle white overlay for readability */}
        <div className="absolute inset-0 bg-white/10 rounded-tl-3xl rounded-bl-3xl pointer-events-none z-0" />
    
        <div className="absolute top-8 left-8">
          <img src={userBrandLogo} alt="WorkSync Logo" className="w-14 h-14" />
        </div>
        <section className="w-full flex flex-col items-center px-2 z-10">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-gray-800 w-[320px]">Sign In to WorkSync</h2>
          <p className="text-gray-500 text-center mb-8 text-base w-[320px]">Book. Meet. Repeat.</p>
          <div className="w-[320px] flex flex-col items-center">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-[260px]">
              <MdEmail className="text-gray-400 mr-2 text-xl" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm w-[260px]">
              <MdLock className="text-gray-400 mr-2 text-xl" />
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
              />
            </div>
            <div className="w-full flex justify-center mt-2 mb-6">
              <button
                type="button"
                className="text-sm text-gray-500 hover:underline bg-transparent border-none p-0 m-0"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot your password?

              </button>
            </div>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md mb-6 transition-colors text-base shadow-md w-[140px] mx-auto"
            >
              SIGN IN
            </button>
            <p className="text-gray-500 text-sm w-[260px] text-center">
              Don't have an account?{' '}
              <button
                type="button"
                className="text-teal-600 font-semibold hover:underline bg-transparent border-none p-0 m-0"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </button>
            </p>
          </div>
        </section>
      </div>


      {/* Right Side */}
      <div
        className="flex-1 flex flex-col justify-center items-center relative min-h-screen p-4 rounded-tr-3xl rounded-br-3xl bg-white/0 shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-tr-3xl rounded-br-3xl z-0 bg-[url('/src/assets/login-bg1.png')]"
        />
        <div className="w-full max-w-[420px] flex flex-col items-center justify-center mx-auto z-10 relative h-full">
          <h3 className="text-2xl font-semibold mb-4 mt-2 text-white text-center w-full">Welcome to</h3>
          <h1 className="text-6xl font-extrabold mb-4 font-montserrat tracking-tighter leading-tight text-white text-center w-full mx-auto block w-max">WorkSync</h1>
          <p className="text-lg font-medium italic text-left max-w-fit block ml-8 text-white/85">
            Sync Your Space.<br />
            Simplify Your Schedule.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;