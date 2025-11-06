import { FiSearch } from "react-icons/fi";


interface AdminSearchProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminSearch = ({ value, onChange }: AdminSearchProps) => {
  return (
    <div className="relative w-full md:flex hidden flex-1 max-w-md">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="w-full border border-slate-200 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-300 bg-[#F3F4F6] text-sm text-[#888E96] placeholder-[#888E96]"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default AdminSearch;
