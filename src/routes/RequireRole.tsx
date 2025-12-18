import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "../api/types";
import { useAuthStore } from "../store/authStore";

export function RequireRole({ role }: { role: Role }) {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;

  return <Outlet />;
}
