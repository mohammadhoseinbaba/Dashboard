import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import type { Order } from "../types/dashboard";

interface OrdersTableProps {
  orders: Order[];
}

const statusColor: Record<Order["status"], "default" | "success" | "warning" | "error"> = {
  pending: "warning",
  completed: "success",
  cancelled: "error",
};

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Total (€)</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.total.toFixed(2)}</TableCell>
            <TableCell>
              <Chip
                label={order.status}
                color={statusColor[order.status]}
                size="small"
              />
            </TableCell>
            <TableCell>{order.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

