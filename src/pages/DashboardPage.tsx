// src/pages/DashboardPage.tsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { KpiCard } from "../components/KpiCard";
import { SalesChart } from "../components/SalesChart";
import { OrdersTable } from "../components/OrdersTable";
import type { Kpi, DailySale, Order } from "../types/dashboard";

const kpis: Kpi[] = [
  { id: "rev", label: "Revenue", value: "€12,340", change: 18 },
  { id: "orders", label: "Orders", value: 128, change: 5 },
  { id: "users", label: "Active Users", value: 342, change: -3 },
  { id: "conv", label: "Conversion Rate", value: "3.2%", change: 1.2 },
];

const salesData: DailySale[] = [
  { date: "Mon", total: 1200 },
  { date: "Tue", total: 900 },
  { date: "Wed", total: 1600 },
  { date: "Thu", total: 1400 },
  { date: "Fri", total: 1800 },
  { date: "Sat", total: 1100 },
  { date: "Sun", total: 1300 },
];

const recentOrders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Alice Rossi",
    total: 120.5,
    status: "completed",
    createdAt: "2025-12-10",
  },
  {
    id: "ORD-1002",
    customer: "Marco Bianchi",
    total: 75.2,
    status: "pending",
    createdAt: "2025-12-10",
  },
  {
    id: "ORD-1003",
    customer: "John Doe",
    total: 210.0,
    status: "cancelled",
    createdAt: "2025-12-09",
  },
];

export function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      {/* KPI cards: 4 columns on large, wrap on small */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 2,
        }}
      >
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
          />
        ))}
      </Box>

      {/* Chart + table layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 1fr",
          },
          gap: 2,
        }}
      >
        {/* Chart */}
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Sales (Last 7 Days)
          </Typography>
          <SalesChart data={salesData} />
        </Paper>

        {/* Table */}
        <Paper sx={{ p: 2, height: "100%", overflowX: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Recent Orders
          </Typography>
          <OrdersTable orders={recentOrders} />
        </Paper>
      </Box>
    </>
  );
}
