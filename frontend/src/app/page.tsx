//page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getTransactions } from '@/lib/api';
import { Transaction } from '@/types/transaction';
import TransactionTable from '@/components/TransactionTable';
import FilterBar from '@/components/FilterBar';
//define Home component
export default function Home() {
//state variables for data, loading, and parameters
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    page: 1, search: '', status: 'all', sortField: 'date', sortOrder: 'desc' as 'asc' | 'desc'
  });
//fetch data whenever params change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getTransactions({ 
          page: params.page, limit: 10, search: params.search, 
          status: params.status, sort_by: params.sortField, order: params.sortOrder 
        });
        setData(res);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, [params]);

//function to update parameters
  const updateParams = (key: string, value: any, resetPage = false) => {
    setParams(prev => ({ ...prev, [key]: value, ...(resetPage && { page: 1 }) }));
  };
//function to handle sorting
  const handleSort = (field: string) => {
    const isAsc = params.sortField === field && params.sortOrder === 'asc';
    updateParams('sortOrder', isAsc ? 'desc' : 'asc');
    updateParams('sortField', field, true);
  };

//define NavButton component for pagination
  const NavButton = ({ next, onClick, disabled }: { next?: boolean, onClick: () => void, disabled: boolean }) => (
    <button onClick={onClick} disabled={disabled}
      className={`px-${next ? 6 : 4} py-2 text-[12px] font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm
      ${next ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400' 
             : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-30'}`}
    >
      {!next && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>}
      {next ? 'NEXT' : 'PREVIOUS'}
      {next && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>}
    </button>
  );
//render main layout
  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8 text-[14px] text-slate-700 font-sans">
      <div className="max-w-5xl mx-auto space-y-4 flex flex-col h-full">
        
        {/* Header */}
        <div className="flex-shrink-0 border-b-2 border-slate-200 pb-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Transaction History</h1>
        </div>

        {/* Filter Bar */}
        <div className="flex-shrink-0">
          <FilterBar 
            search={params.search} setSearch={(v) => updateParams('search', v, true)}
            status={params.status} setStatus={(v) => updateParams('status', v, true)}
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md border border-slate-300 flex flex-col h-[600px] overflow-hidden relative">
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-30 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Table Content */}
          <div className="flex-grow overflow-y-auto bg-white">
            <TransactionTable 
              data={data} loading={loading}
              onSort={handleSort} sortField={params.sortField} sortOrder={params.sortOrder}
            />
            {!loading && data.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <p className="text-[12px] font-bold tracking-widest uppercase">No Results Found</p>
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200 flex-shrink-0 z-10">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Page</span>
              <span className="bg-slate-900 text-white px-3 py-1 rounded-md text-[12px] font-bold shadow-sm">{params.page}</span>
            </div>
            <div className="flex items-center gap-3">
              <NavButton onClick={() => updateParams('page', params.page - 1)} disabled={params.page === 1 || loading} />
              <NavButton next onClick={() => updateParams('page', params.page + 1)} disabled={data.length < 10 || loading} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}