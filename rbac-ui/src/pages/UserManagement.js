import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, username: "JohnDoe", role: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, username: "JaneSmith", role: "Editor", permissions: ["Read", "Write"] },
  ]); // Predefined users
  const [roles] = useState(["Admin", "Editor", "Viewer"]); // Predefined roles
  const [availablePermissions] = useState(["Read", "Write", "Delete"]); // Predefined permissions
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const navigate = useNavigate(); // For navigation

  const handleAddUser = async () => {
    if (!username || !role) {
      alert("Please provide a username and select a role.");
      return;
    }

    if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      alert("Username already exists. Please use a unique username.");
      return;
    }

    setLoading(true); // Show loading spinner

    // Simulate an API call with a delay
    setTimeout(() => {
      // Create a new user
      const newUser = {
        id: users.length + 1,
        username: username,
        role: role,
        permissions: permissions,
      };

      // Update the users array state with the new user
      setUsers((prevUsers) => [...prevUsers, newUser]);

      // Clear form fields
      setUsername("");
      setRole("");
      setPermissions([]);

      // Show success message
      setSuccessMessage("User added successfully!");
      setLoading(false); // Hide loading spinner

      // Close the success message after 2 seconds
      setTimeout(() => setSuccessMessage(""), 2000);
    }, 1500);
  };

  // Handle permission change for user
  const handlePermissionChange = (event) => {
    setPermissions(event.target.value);
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "30px auto",
        backgroundColor: "#f9fafc",
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" mb={4} sx={{ color: "#1565c0", fontWeight: 600 }}>
        User Management
      </Typography>

      {/* Add User Form */}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#fff", borderRadius: 1 }}
      />

      {/* Role Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        >
          {roles.map((role, idx) => (
            <MenuItem key={idx} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Permissions Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Permissions</InputLabel>
        <Select
          multiple
          value={permissions}
          onChange={handlePermissionChange}
          renderValue={(selected) => selected.join(", ")}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        >
          {availablePermissions.map((permission, idx) => (
            <MenuItem key={idx} value={permission}>
              <Checkbox checked={permissions.indexOf(permission) > -1} />
              <ListItemText primary={permission} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Add User Button */}
      <Button
        onClick={handleAddUser}
        variant="contained"
        sx={{
          marginTop: 3,
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#1565c0" },
          width: "100%",
        }}
        disabled={loading} // Disable button while loading
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Add User"}
      </Button>

      {/* Success Message */}
      {successMessage && (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}

      {/* User List */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: "#1565c0", fontWeight: 500 }}>
          Users List
        </Typography>
        {users.length === 0 ? (
          <Typography>No users added yet.</Typography>
        ) : (
          users.map((user) => (
            <Box
              key={user.id}
              sx={{
                marginBottom: 2,
                border: "1px solid #ddd",
                padding: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ color: "#333" }}>
                {user.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role: {user.role}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Permissions: {user.permissions.length > 0 ? user.permissions.join(", ") : "None"}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Back to Dashboard Button */}
      <Button
        variant="outlined"
        onClick={() => navigate("/dashboard")}
        sx={{
          marginTop: 3,
          borderColor: "#1976d2",
          color: "#1976d2",
          "&:hover": { backgroundColor: "#f0f4fc", borderColor: "#1565c0" },
          width: "100%",
        }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
};

export default UserManagement;
