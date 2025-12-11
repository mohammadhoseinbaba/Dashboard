import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";

function Placeholder({ title }: { title: string }) {
  return <h2>{title}</h2>;
}

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<Placeholder title="Orders Page" />} />
        <Route path="/settings" element={<Placeholder title="Settings Page" />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;
