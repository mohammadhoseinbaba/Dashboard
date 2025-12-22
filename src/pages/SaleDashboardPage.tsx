import { Box } from "@mui/material";
import { KpiCard } from "../components/KpiCard";
import { SalesChart } from "../components/SalesChart";

const Kpis = [
    { id: "revenue", title: "Revenue", value: "$12,430" },
    { id: "orders", title: "Orders", value: 324 },
    { id: "users", title: "Users", value: 1245 },
    { id: "gold", title: "Gold", value: "$9,900" },
]


export default function SaleDashboardPage() {
    return (
        <>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {Kpis.map((kpi) => (
                    <Box key={kpi.id} sx={{ flex: "1 1 280px", minWidth: 280 }}>
                        <KpiCard title={kpi.title} value={kpi.value} />
                    </Box>
                ))}
            </Box>

            <Box sx={{ mt: 3 }}>
                <SalesChart />
            </Box>
        </>
    )
}