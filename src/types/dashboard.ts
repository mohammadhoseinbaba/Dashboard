export interface Kpi {
  id: string;
  label: string;
  value: number | string;
  change: number; // percentage
}

export interface DailySale {
  date: string; // ISO date
  total: number;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
