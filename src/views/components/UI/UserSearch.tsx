import { FiSearch } from "react-icons/fi";


interface UserSearchProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserSearch = ({ value, onChange }: UserSearchProps) => {
  return (
    <div className="relative w-full max-w-sm min-w-sm md:flex hidden">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="w-full border border-none rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)]"
      />
      <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default UserSearch;
