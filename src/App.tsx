import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardLayout from "./layouts/DashboardLayout";
import SaleDashboardPage from "./pages/SaleDashboardPage";
import TaskPage from "./pages/TaskPage";
import SettingPage from "./pages/SettingPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { me } from "./api/users"
import { useAuthStore } from "./store/authStore";
import React from 'react'
import { getAccessToken, setAccessToken } from "./api/http";

function App() {
  const setUser = useAuthStore((s) => s.setAuth)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const [booting, setBooting] = React.useState(true)

  React.useEffect(() => {
    (async () => {
      try {
        const token = getAccessToken()
        // No token => not logged in
        if (!token) {
          clearAuth();
          setBooting(false)
          return;
        }

        // Make sure http.ts uses it for /auth/me
        setAccessToken(token);

        // Now verify token and fetch user
        const data = await me();

        // Store in zustand (setAuth also sets token in http.ts)
        setUser({ user: data.user, accessToken: token });
      } catch {
        setAccessToken(null);
        clearAuth();
      } finally {
        setBooting(false);
      }
    })();
  }, [setUser, clearAuth]);

  if (booting) return <div>Loading...</div>

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/sales" element={<SaleDashboardPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>
      </Route>
      <Route path="*" element={<div>Not Found 404</div>} />
    </Routes>
  )
}

export default App;
