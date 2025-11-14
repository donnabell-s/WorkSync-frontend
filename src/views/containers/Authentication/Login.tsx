import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import AuthLayout from "../../components/Layout/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loggedUser = await login(email, password);
      const r = String(loggedUser!.role || '').toLowerCase();
      if (r === "admin" || r === "superadmin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/home");
      }
    } catch (error: unknown) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      left={
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-gray-800 w-[320px]">
            Sign In to WorkSync
          </h2>
          <p className="text-gray-500 text-center mb-8 text-base w-[320px]">
            Book. Meet. Repeat.
          </p>

          {error && (
            <div className="mb-4 w-[260px] p-2 bg-red-100 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}

          <div className="w-[320px] flex flex-col items-center">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-[260px]">
              <MdEmail className="text-gray-400 mr-2 text-xl" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
                required
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm w-[260px]">
              <MdLock className="text-gray-400 mr-2 text-xl" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
                required
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
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-md mb-6 transition-colors text-base shadow-md w-[140px] mx-auto"
              disabled={loading}
            >
              {loading ? "LOADING..." : "SIGN IN"}
            </button>
            <p className="text-gray-500 text-sm w-[260px] text-center">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-teal-600 font-semibold hover:underline bg-transparent border-none p-0 m-0"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      }
      right={
        <>
          <h3 className="text-2xl font-semibold mb-4 mt-2 text-white text-center w-full">
            Welcome to
          </h3>
          <h1 className="text-6xl font-extrabold mb-4 font-montserrat tracking-tighter leading-tight text-white text-center w-full mx-auto block w-max">
            WorkSync
          </h1>
          <p className="text-lg font-medium italic text-left max-w-fit block ml-0 text-white/85">
            Sync Your Space.
            <br />
            Simplify Your Schedule.
          </p>
        </>
      }
    />
  );
};

export default Login;