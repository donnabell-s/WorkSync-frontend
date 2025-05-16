import React, { useState } from "react";
import Account from "./account";
import Preferences from "./preferences";
import SideContainer from "../../../components/Layout/UserLayout/SideContainer";

const Settings: React.FC = () => {
  const [nav, setNav] = useState("account");

  const handleNavChange = (newNav: string) => {
    setNav(newNav);
  }

  return (
    <div className="p-4">
      <SideContainer>
        <div className="text-lg font-semibold mb-6">Settings</div>
        <ul className="space-y-4">
          <li className="text-purple-600 font-medium cursor-pointer" onClick={() => {handleNavChange("account")}}>Account</li>
          <li className="text-gray-600 hover:text-purple-600 cursor-pointer" onClick={() => {handleNavChange("preferences")}}>Preferences</li>
        </ul>
      </SideContainer>
      
      {
        nav === "account" ? (
          <Account />
        ) : (
          <Preferences />
        )
      }
    </div>
  );
};

export default Settings;