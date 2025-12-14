import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: number; // positive or negative %
}

export  function KpiCard({ title, value, trend }: KpiCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4" sx={{ my: 1 }}>
          {value}
        </Typography>

        {trend !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {isPositive ? (
              <ArrowUpwardIcon fontSize="small" color="success" />
            ) : (
              <ArrowDownwardIcon fontSize="small" color="error" />
            )}
            <Typography
              variant="caption"
              color={isPositive ? "success.main" : "error.main"}
            >
              {Math.abs(trend)}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
