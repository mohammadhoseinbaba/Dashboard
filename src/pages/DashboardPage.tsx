import { KpiCard } from "../components/KpiCard"
import { SaleChart } from "../components/SalesChart"
export default function DashboardPage() {

  return (
    <>
      <div>
        <KpiCard title="Revenue" value="$12,430" trend={+12.5} />
        <KpiCard title="Churn" value="2.3%" trend={-1.2} />
        <SaleChart />
      </div>
    </>
  )
} 