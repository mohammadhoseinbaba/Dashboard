import { Outlet, Link } from "react-router-dom"

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@mui/material";

export default function DashboardLayout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography>Dashboard</Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>

      <main>
        <Outlet />
      </main>
    </>
  )
}