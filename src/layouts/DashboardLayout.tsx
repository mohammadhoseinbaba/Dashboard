import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ColorModeContext } from "../main"; // ✅ adjust path if needed

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface MenuItem {
  id: number;
  title: string;
}

const listMenuLeft: MenuItem[] = [
  { id: 0, title: "menu" },
  { id: 1, title: "sale dashboard" },
  { id: 2, title: "setting" },
  { id: 3, title: "logout" },
];

export default function DashboardLayout() {
  const drawerWidth = 240;

  const { mode, toggle } = React.useContext(ColorModeContext);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {listMenuLeft.map((item) => (
            <ListItemButton key={item.id}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography>Dashboard</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
