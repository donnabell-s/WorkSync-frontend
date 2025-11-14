import { useState } from "react";
import * as Components from "../../../components";
import { AiOutlinePlus } from "react-icons/ai";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();
  const [insightsMonth, setInsightsMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCreateClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Components.SideContainer>
        <div className="flex flex-col gap-7 text-[#4B5563]">
          <div>
            <button
              onClick={handleCreateClick}
              className="border border-[#C7C9CD] flex flex-row items-center px-4 py-3.5 w-30 rounded-full gap-2 text-[#1F2937] shadow-sm hover:bg-[#F5F5F5] cursor-pointer"
            >
              <AiOutlinePlus className="text-[#059669] h-5 w-5" /> Create
            </button>
          </div>
          <Components.SideCalendar currentMonth={insightsMonth} onMonthChange={setInsightsMonth} />
          <Components.TimeInsights monthDate={insightsMonth} />
        </div>
      </Components.SideContainer>

      <div className="xl:ml-67 p-10 flex flex-col gap-6">
        <div className="flex flex-row justify-between">
          <Components.UserHeading label="Home" />
          <Components.UserSearch value={search} onChange={handleSearchChange} />
        </div>

        {search.trim() === "" ? (
          <Components.MainCalendar isAdmin={false} />
        ) : (
          <Components.CalendarListView search={search} />
        )}
      </div>

      {isModalOpen && selectedDate && (
        <Components.CalendarBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default Home;
