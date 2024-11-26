import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    const { username, email, password, confirmPassword } = formData;

    // Basic validations
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Example: Simulate API call (Replace with actual backend integration)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      // Simulating successful signup
      setSuccess("Sign-up successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError("An error occurred during sign-up. Please try again.");
    } finally {
      setLoading(false);
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
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#333" }}>
        Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ marginBottom: 2, backgroundColor: "#f9f9f9" }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ marginBottom: 2, backgroundColor: "#f9f9f9" }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ marginBottom: 2, backgroundColor: "#f9f9f9" }}
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        sx={{ marginBottom: 2, backgroundColor: "#f9f9f9" }}
      />

      <Button
        onClick={handleSignUp}
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          marginTop: 2,
          padding: "12px 15px",
          backgroundColor: "#3498db",
          "&:hover": {
            backgroundColor: "#2980b9",
          },
          fontSize: "1rem",
        }}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>

      <Typography
        variant="body2"
        sx={{
          marginTop: 2,
          color: "#555",
          fontSize: "0.9rem",
        }}
      >
        Already have an account? <a href="/">Login</a>
      </Typography>
    </Box>
  );
};

export default SignUp;
