import React from "react";
import userBrandLogo from "../../../../assets/user-brand-logo.svg";

type AuthLayoutProps = {
  left: React.ReactNode;
  right?: React.ReactNode;
  showLogo?: boolean;
};

/**
 * AuthLayout
 * Consistent two-panel layout for authentication pages with unified backgrounds.
 * Left panel shows form/content with a subtle overlay; right panel shows branding/illustration.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ left, right, showLogo = true }) => {
  return (
  <div className="relative w-full h-screen min-h-screen md:h-dvh md:min-h-dvh overflow-hidden overflow-x-hidden overscroll-none font-sans grid grid-cols-12">
      {/* Left Side */}
      <div className="col-span-7 flex flex-col justify-center items-center relative h-full rounded-tl-3xl rounded-bl-3xl bg-[url('/src/assets/login-bg2.png')] bg-cover bg-center shadow-xl">
        {/* Subtle white overlay for readability */}
        <div className="absolute inset-0 bg-white/10 rounded-tl-3xl rounded-bl-3xl pointer-events-none z-0" />

        {showLogo && (
          <div className="absolute top-8 left-8">
            <img src={userBrandLogo} alt="WorkSync Logo" className="w-14 h-14" />
          </div>
        )}

        <div className="w-full flex flex-col items-center px-2 z-10">{left}</div>
      </div>

      {/* Right Side */}
      <div className="col-span-5 flex flex-col justify-center items-center relative h-full p-4 rounded-tr-3xl rounded-br-3xl bg-white/0 shadow-xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center rounded-tr-3xl rounded-br-3xl z-0 bg-[url('/src/assets/login-bg1.png')]" />
        <div className="w-full max-w-[420px] flex flex-col items-center justify-center mx-auto z-10 relative h-full">
          {right}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
