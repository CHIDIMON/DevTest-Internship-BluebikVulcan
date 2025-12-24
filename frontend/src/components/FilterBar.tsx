//FilterBar.tsx
interface Props {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}
//define FilterBar component
export default function FilterBar({ search, setSearch, status, setStatus }: Props) {
//base styles for inputs
  const baseStyle = "w-full bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400";
//render filter bar with search input and status select
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      
      {/* Search Input */}
      <div className="relative flex-1 max-w-md group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer..."
          className={`${baseStyle} pl-9 pr-3 py-2`}
        />
      </div>

      {/* Status Select */}
      <div className="relative w-40">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`${baseStyle} pl-3 pr-9 py-2 appearance-none font-semibold text-slate-700 cursor-pointer`}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

    </div>
  );
}