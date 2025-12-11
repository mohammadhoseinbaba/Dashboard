import { Card, CardContent, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface KpiCardProps {
  label: string;
  value: string | number;
  change: number;
}

export function KpiCard({ label, value, change }: KpiCardProps) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          {value}
        </Typography>
        <Typography
          variant="body2"
          color={isPositive ? "success.main" : "error.main"}
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}
        >
          {isPositive ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
          {Math.abs(change)}%
          <span style={{ color: "gray", marginLeft: 4 }}>vs last week</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
