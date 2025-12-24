import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardLayout from "./layouts/DashboardLayout";
import SaleDashboardPage from "./pages/SaleDashboardPage";
import TaskPage from "./pages/TaskPage";
import SettingPage from "./pages/SettingPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/sales" element={<SaleDashboardPage />} />
          <Route path="/Tasks" element={<TaskPage />} />
          <Route path="/Settings" element={<SettingPage />} />
        </Route>
      </Route>
      <Route path="*" element={<div>Not Found 404</div>} />
    </Routes>
  )
}

export default App;
