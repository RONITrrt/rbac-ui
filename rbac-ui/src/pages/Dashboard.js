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
} from "@mui/material";
import {
  Menu,
  PersonAdd,
  ManageAccounts,
  ExitToApp,
  NotificationsActive,
  Brightness4,
  Brightness7,
  GroupWork,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [greeting, setGreeting] = useState("");

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const systemAnalyticsData = {
    activeUsers: 1200,
    totalUsers: 5000,
    activeSessions: 320,
    roleDistribution: { admin: 5, user: 1195 },
  };

  const recentNotifications = [
    { id: 1, message: "New user registered: John Doe", time: "2 hours ago" },
    { id: 2, message: "System update completed successfully", time: "5 hours ago" },
    { id: 3, message: "New role 'Editor' added to the system", time: "1 day ago" },
    { id: 4, message: "Password change request for admin", time: "1 day ago" },
  ];

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [200, 400, 600, 800, 1000, 1200],
        borderColor: darkMode ? "#80d6ff" : "#1565c0", // Line color
        backgroundColor: darkMode ? "rgba(128, 214, 255, 0.3)" : "rgba(21, 101, 192, 0.3)", // Shaded area
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: darkMode ? "#0d47a1" : "#e3f2fd", // Background gradient
        color: darkMode ? "#ffffff" : "#000000",
        backgroundImage: darkMode
          ? "radial-gradient(circle, #1565c0, #0d47a1)"
          : "radial-gradient(circle, #ffffff, #e3f2fd)",
        transition: "all 0.3s ease",
      }}
    >
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
            <ListItem button onClick={() => navigate("/dashboard")}>
              <ListItemIcon>
                <PersonAdd sx={{ color: darkMode ? "#ffffff" : "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate("/user-management")}>
              <ListItemIcon>
                <ManageAccounts sx={{ color: darkMode ? "#ffffff" : "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
            <ListItem button onClick={() => navigate("/role-management")}>
              <ListItemIcon>
                <GroupWork sx={{ color: darkMode ? "#ffffff" : "#000000" }} />
              </ListItemIcon>
              <ListItemText primary="Role Management" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Header */}
        <AppBar position="sticky" sx={{ backgroundColor: darkMode ? "#1a237e" : "#1976d2", boxShadow: 3 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setSidebarOpen(true)}
              sx={{ display: { sm: "block" } }}
            >
              <Menu />
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
              <IconButton color="inherit" onClick={() => setShowNotifications(!showNotifications)}>
                <Badge badgeContent={recentNotifications.length} color="error">
                  <NotificationsActive />
                </Badge>
              </IconButton>
            </Tooltip>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Welcome Section */}
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              color: darkMode ? "#bbdefb" : "#1565c0",
            }}
          >
            {greeting}, Welcome to the Admin Dashboard
          </Typography>

          {/* Cards Section */}
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  backgroundColor: darkMode ? "#1e88e5" : "#bbdefb",
                  color: darkMode ? "#ffffff" : "#000000",
                  boxShadow: 3,
                  "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    Active Users
                  </Typography>
                  <Typography variant="h4">{systemAnalyticsData.activeUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Line Chart Section */}
        <Box sx={{ padding: 4, textAlign: "center" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              marginBottom: 2,
              color: darkMode ? "#80d6ff" : "#1565c0",
            }}
          >
            User Growth Analytics
          </Typography>
          <Box sx={{ height: 300, width: "100%", maxWidth: 600, margin: "0 auto" }}>
            <Line data={userGrowthData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
