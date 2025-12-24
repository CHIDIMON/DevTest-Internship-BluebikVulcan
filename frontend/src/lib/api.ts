import { Transaction } from '@/types/transaction';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTransactions(params: {
  page: number; limit: number; search?: string; status?: string; sort_by?: string; order?: string;
}): Promise<Transaction[]> {
  
  const queryObj: any = { 
    ...params, 
    sort_by: params.sort_by || 'date', 
    order: params.order || 'desc' 
  };
  
  const filteredParams = Object.fromEntries(
    Object.entries(queryObj).filter(([_, v]) => v && v !== 'all')
  );

  const res = await fetch(`${BASE_URL}/transactions?${new URLSearchParams(filteredParams as any)}`, {
    next: { revalidate: 0 }
  });

  if (!res.ok) throw new Error('Failed to fetch');
  
  return res.json();
}