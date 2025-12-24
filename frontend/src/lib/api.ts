//api.ts
import { Transaction } from '@/types/transaction';
//define BASE_URL from environment variable
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
//function to get transactions with pagination, search, filter, and sorting
export async function getTransactions(params: {
  page: number; limit: number; search?: string; status?: string; sort_by?: string; order?: string;
}): Promise<Transaction[]> {
  //define queryObj to set default sort_by and order
  const queryObj: any = { 
    ...params, 
    sort_by: params.sort_by || 'date', 
    order: params.order || 'desc' 
  };
//filter out undefined or 'all' parameters
  const filteredParams = Object.fromEntries(
    Object.entries(queryObj).filter(([_, v]) => v && v !== 'all')
  );
//fetch data from API with query parameters
  const res = await fetch(`${BASE_URL}/transactions?${new URLSearchParams(filteredParams as any)}`, {
    next: { revalidate: 0 }
  });
//throw error if response not ok
  if (!res.ok) throw new Error('Failed to fetch');
  
  return res.json();
}