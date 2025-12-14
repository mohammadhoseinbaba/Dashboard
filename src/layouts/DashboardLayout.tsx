import { Outlet, Link } from "react-router-dom"

interface MenuItem {
  id: number;
  title: string;
}

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

const listMenuLeft: MenuItem[] = [
  { id: 0, title: "menu" },
  { id: 1, title: "sale dashboard" },
  { id: 2, title: "setting" },
  { id: 3, title: "logout" }
]

export default function DashboardLayout() {
  const drawerWidth = 240;
  return (
    <>
      <Box sx={{ display: 'flex' }}>
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
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography>Dashboard</Typography>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </Toolbar>
        </AppBar>


        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  )
}