//TransactionTable.tsx
import { Transaction } from '@/types/transaction';

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};
//define Props interface for TransactionTable component
interface Props {
  data: Transaction[];
  loading: boolean;
  onSort: (field: string) => void;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}
//define TransactionTable component
export default function TransactionTable({ data, loading, onSort, sortField, sortOrder }: Props) { // 👈 เพิ่ม loading ตรงนี้

  const SortIcon = ({ field }: { field: string }) => {
    const active = sortField === field;
    const getColor = (isMatch: boolean) => isMatch ? 'text-blue-600' : 'text-slate-400';
    
    return (
      <span className="inline-flex flex-col ml-1 align-middle opacity-60 group-hover:opacity-100 transition-opacity">
        <svg className={`w-2.5 h-2.5 ${getColor(active && sortOrder === 'asc')}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 5l-8 8h16l-8-8z" /></svg>
        <svg className={`w-2.5 h-2.5 -mt-1 ${getColor(active && sortOrder === 'desc')}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 19l8-8H4l8 8z" /></svg>
      </span>
    );
  };
//define Th component for sortable table headers
  const Th = ({ label, field }: { label: string, field: string }) => (
    <th className="p-4 font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 group" onClick={() => onSort(field)}>
      <div className="flex items-center">{label} <SortIcon field={field} /></div>
    </th>
  );
//render table with sortable columns
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b-2 border-slate-100">
            <th className="p-4 font-semibold text-slate-700">ID</th>
            <Th label="Customer" field="customer_name" />
            <Th label="Date" field="date" />
            <Th label="Amount" field="amount" />
            <th className="p-4 font-semibold text-slate-700">Status</th>
          </tr>
        </thead>
        {/* เพิ่ม className เพื่อปรับความจางตอนโหลด */}
        <tbody className={loading ? 'opacity-50 pointer-events-none' : ''}>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="p-4 text-sm text-slate-600">#{item.id.slice(0, 8)}</td>
              <td className="p-4 font-medium text-slate-800">{item.customer_name}</td>
              <td className="p-4 text-sm text-slate-600">{new Date(item.date).toLocaleDateString()}</td>
              <td className="p-4 font-semibold text-slate-900">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[item.status.toLowerCase()]}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*add loading state handling */}
      {!loading && data.length === 0 && <div className="p-10 text-center text-slate-400">No transactions found.</div>}
    </div>
  );
}