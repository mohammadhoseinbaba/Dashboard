import { Box } from "@mui/material";
import { KpiCard } from "../components/KpiCard";
import { SalesChart } from "../components/SalesChart";

export default function SaleDashboardPage() {
    return (
        <>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 280px", minWidth: 280 }}>
                    <KpiCard title="Revenue" value="$12,430" />
                </Box>

                <Box sx={{ flex: "1 1 280px", minWidth: 280 }}>
                    <KpiCard title="Orders" value={324} />
                </Box>

                <Box sx={{ flex: "1 1 280px", minWidth: 280 }}>
                    <KpiCard title="Users" value={1245} />
                </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
                <SalesChart />
            </Box>
        </>
    )
}