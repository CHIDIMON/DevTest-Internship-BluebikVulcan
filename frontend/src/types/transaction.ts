//transaction.ts
//define Transaction type for frontend
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  customer_name: string;
  status: 'completed' | 'pending' | 'failed';
  type: string;
  description: string;
}