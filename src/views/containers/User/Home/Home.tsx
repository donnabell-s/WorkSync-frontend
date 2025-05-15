import { useState } from "react";
import * as Components from "../../../components";
import { AiOutlinePlus } from "react-icons/ai";

const Home = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Components.SideContainer>
        <div className="flex flex-col gap-7 text-[#4B5563]">
          <div>
            <button className="border border-[#C7C9CD] flex flex-row items-center px-4 py-3.5 w-30 rounded-full gap-2 text-[#1F2937]  shadow-sm hover:bg-[#F5F5F5] cursor-pointer">
              <AiOutlinePlus className="text-[#059669] h-5 w-5" /> Create
            </button>
          </div>
          <Components.SideCalendar />
          <Components.TimeInsights />
        </div>
      </Components.SideContainer>

      <div className="xl:ml-67 p-10 flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <Components.UserHeading label="Home" />
          <Components.UserSearch value={search} onChange={handleSearchChange} />
        </div>

        {search.trim() === "" ? (
          <Components.MainCalendar />
        ) : (
          <Components.CalendarListView search={search} />
        )}
      </div>
    </div>
  );
};

export default Home;
