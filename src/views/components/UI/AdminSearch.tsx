import { FiSearch } from "react-icons/fi";


interface AdminSearchProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminSearch = ({ value, onChange }: AdminSearchProps) => {
  return (
    <div className="relative w-full max-w-sm md:flex hidden">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="w-full border border-slate-200 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white text-sm"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default AdminSearch;
