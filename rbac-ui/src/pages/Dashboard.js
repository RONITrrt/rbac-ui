import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Menu,
  MenuItem,
  Divider,
  CssBaseline,
  LinearProgress,
} from "@mui/material";
import {
  Menu as MenuIcon,
  PersonAdd,
  ManageAccounts,
  ExitToApp,
  NotificationsActive,
  Brightness4,
  Brightness7,
  GroupWork,
} from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  ChartTooltip,
  Legend
);

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState([
    { id: 1, message: "New user registered: John Doe", time: "2 hours ago" },
    { id: 2, message: "System update completed successfully", time: "5 hours ago" },
    { id: 3, message: "New role 'Editor' added to the system", time: "1 day ago" },
    { id: 4, message: "Password change request for admin", time: "1 day ago" },
  ]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [200, 400, 600, 800, 1000, 1200],
        borderColor: darkMode ? "#80d6ff" : "#1b5e20",
        backgroundColor: darkMode ? "rgba(128, 214, 255, 0.3)" : "rgba(27, 94, 32, 0.3)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const capacityUsed = 60; // Example: 60% of capacity is used

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f4f6f8",
        color: darkMode ? "#ffffff" : "#000000",
        transition: "all 0.3s ease",
      }}
    >
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: darkMode ? "#2c387e" : "#bbdefb",
            color: darkMode ? "#ffffff" : "#000000",
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Admin Panel
          </Typography>
          <List>
            {[
              { text: "Dashboard", icon: <PersonAdd /> },
              { text: "User Management", icon: <ManageAccounts /> },
              { text: "Role Management", icon: <GroupWork /> },
            ].map(({ text, icon }, index) => (
              <ListItem
                button
                key={index}
                onClick={() => navigate(`/${text.toLowerCase().replace(" ", "-")}`)}
                sx={{
                  "&:hover": {
                    backgroundColor: darkMode ? "#37474f" : "#e3f2fd",
                    borderRadius: 2,
                  },
                }}
              >
                <ListItemIcon>
                  {React.cloneElement(icon, { sx: { color: darkMode ? "#ffffff" : "#000000" } })}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ backgroundColor: darkMode ? "#1a237e" : "#1976d2" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Tooltip title="Toggle Dark Mode">
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleNotificationClick}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsActive />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleNotificationClose}>
              {notifications.map((notification) => (
                <MenuItem key={notification.id}>
                  <Typography variant="body2">{notification.message}</Typography>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleNotificationClose}>
                <Typography textAlign="center">Close Notifications</Typography>
              </MenuItem>
            </Menu>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
            {greeting}, Welcome to the Admin Dashboard
          </Typography>
        </Box>

        {/* App Stats Section */}
        <Box sx={{ padding: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: darkMode ? "#2e7d32" : "#c8e6c9" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    App Performance
                  </Typography>
                  <Typography variant="body2">Uptime: 99.9%</Typography>
                  <Typography variant="body2">Avg. Response Time: 120ms</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: darkMode ? "#bf360c" : "#ffccbc" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Capacity Usage
                  </Typography>
                  <LinearProgress variant="determinate" value={capacityUsed} />
                  <Typography variant="body2" mt={1}>
                    {capacityUsed}% used
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: darkMode ? "#1565c0" : "#bbdefb" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Active Sessions
                  </Typography>
                  <Typography variant="h4">350</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Graph Section */}
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            User Growth Over Time
          </Typography>
          <Line data={userGrowthData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
