import React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { ColorModeContext } from "../main";
import { useAuthStore } from "../store/authStore";

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
  path: string;
}

const listMenuLeft: MenuItem[] = [
  { id: 0, title: "Menu", path: "/" },
  { id: 1, title: "Sale dashboard", path: "/sales" },
  { id: 2, title: "Tasks", path: "/Tasks" },
  { id: 3, title: "Setting", path: "/settings" },
  { id: 4, title: "Logout", path: "/logout" },
];

export default function DashboardLayout() {
  const drawerWidth = 240;

  const user = useAuthStore((s) => s.user)

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
            <ListItemButton key={item.id} component={RouterLink} to={item.path}>
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

            {user ?
              <Typography color="inherit">
                {user.name}
              </Typography>
              :
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            }

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
