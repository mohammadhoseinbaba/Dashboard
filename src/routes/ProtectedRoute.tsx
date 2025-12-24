import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { Role } from "../api/types";

type Props = {
  roles?: Role[]; // optional: restrict by role
};

export default function ProtectedRoute({ roles }: Props) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but role not allowed → go home (or a 403 page)
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Allowed → render nested routes
  return <Outlet />;
}
