// src/pages/Login.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import Link

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const [loading, setLoading] = useState(false); // To indicate loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset errors
    setLoading(true); // Show loading indicator

    // Basic validation
    if (!username || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Example logic for backend authentication
    try {
      // Simulate API call (Replace with real API integration)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      if (username === "admin" && password === "securePassword123") {
        // Navigate to dashboard upon success
        navigate("/dashboard");
      } else {
        // Set error for invalid credentials
        setError("Invalid username or password.");
      }
    } catch (err) {
      // Catch any unexpected errors
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Remove loading indicator
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 3,
        backgroundColor: "#fff",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        borderRadius: 2,
        textAlign: "center",
        minHeight: "70vh", // Make the box taller, especially on laptops
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#333" }}>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{
          marginBottom: 2,
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{
          marginBottom: 2,
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
        }}
      />

      <Button
        onClick={handleLogin}
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          marginTop: 2,
          padding: "12px 15px",
          backgroundColor: "#1abc9c",
          "&:hover": {
            backgroundColor: "#16a085",
          },
          fontSize: "1rem",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Typography
        variant="body2"
        sx={{
          marginTop: 2,
          color: "#555",
          fontSize: "0.9rem",
        }}
      >
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default Login;
