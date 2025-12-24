//transaction.ts
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  customer_name: string;
  status: 'completed' | 'pending' | 'failed'; // ตัดตัวพิมพ์ใหญ่ที่ซ้ำซ้อนออก
  type: string;
  description: string;
}