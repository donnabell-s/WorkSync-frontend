import React, { useState } from "react";
import Account from "./account";
import Preferences from "./preferences";
import SideContainer from "../../../components/Layout/UserLayout/SideContainer";
import UserHeading from "../../../components/UI/UserHeading";

const NAV_ITEMS = [
  { key: "account", label: "Account" },
  { key: "preferences", label: "Preferences" }
];

const Settings: React.FC = () => {
  const [nav, setNav] = useState<string>("account");

  return (
    <div>
      <SideContainer>
        <div className="flex flex-col gap-5 text-[#4B5563]">
          <h1 className="text-lg font-semibold mb-2">Settings</h1>
          <div className="flex flex-col gap-3 pl-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setNav(item.key)}
                className="transition font-medium text-left text-sm"
              >
                <span
                  className={`pb-1 border-b-2 ${
                    nav === item.key
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-600 hover:text-emerald-600"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </SideContainer>

      <div className="xl:ml-67 p-10 flex flex-col gap-6 text-[#1F2937]">
        {nav === "account" ? <Account /> : <Preferences />}
      </div>
    </div>
  );
};

export default Settings;