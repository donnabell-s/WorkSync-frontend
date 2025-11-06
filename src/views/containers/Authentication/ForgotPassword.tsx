import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router';
import AuthLayout from '../../components/Layout/AuthLayout';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout
      left={
        <section className="w-full flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-gray-800 w-[320px]">Forgot your password?</h2>
          <p className="text-gray-500 text-center mb-8 text-base w-[320px]">Enter your email here and wait for the confirmation link.</p>
          <form className="w-[320px] flex flex-col items-center">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-6 w-full">
              <MdEmail className="text-gray-400 mr-2 text-xl" />
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md mb-4 transition-colors text-base shadow-md w-[140px] mx-auto"
            >
              Send Link
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
      }
      right={
        <>
          <h3 className="text-3xl font-extrabold text-white text-left w-full mb-2">Hey, there!</h3>
          <p className="text-lg text-white text-left w-full mb-2">Let's get you back in.</p>
          <h1 className="text-5xl font-extrabold font-montserrat tracking-tighter leading-tight text-white text-left w-full mb-4">WorkSync</h1>
        </>
      }
    />
  );
};

export default ForgotPassword;