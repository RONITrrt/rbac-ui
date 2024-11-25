import React, { useState } from "react";
import { Box, Typography, Button, TextField, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const RoleManagement = () => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]); // Permissions selected for the role
  const [roles, setRoles] = useState([
    { id: 1, name: "Backend Developer", permissions: ["Read", "Write"] },
    { id: 2, name: "ML Engineer", permissions: ["Read", "Write", "Delete"] },
    { id: 3, name: "HR", permissions: ["Read"] }
  ]); // List of existing roles with some dummy data
  const [availablePermissions, setAvailablePermissions] = useState(["Read", "Write", "Delete"]); // Example permissions
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleAddRole = async () => {
    if (!roleName) {
      // Ensure role name is provided
      alert("Please provide a role name.");
      return;
    }

    // Create a new role with permissions
    const newRole = {
      id: roles.length + 1, // Simple way to generate a new ID for now
      name: roleName,
      permissions: permissions
    };

    // Update the roles array with the new role
    setRoles((prevRoles) => [...prevRoles, newRole]);

    // Clear form fields
    setRoleName("");
    setPermissions([]);

    // Show success message
    setSuccessMessage("Role added successfully!");

    // Close the success message after 2 seconds
    setTimeout(() => {
      setSuccessMessage(""); // Clear the success message after 2 seconds
    }, 2000);
  };

  // Handle permission change for role
  const handlePermissionChange = (event) => {
    setPermissions(event.target.value);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f9", borderRadius: 2 }}>
      <Typography variant="h4" mb={3} sx={{ color: "#1976d2" }}>Role Management</Typography>

      {/* Add Role Form */}
      <TextField
        label="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#fff", borderRadius: 1 }}
      />

      {/* Permissions Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Permissions</InputLabel>
        <Select
          multiple
          value={permissions}
          onChange={handlePermissionChange}
          renderValue={(selected) => selected.join(", ")}
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 250, // Adds a max height for the dropdown
                width: "300px", // Adjust the width of the dropdown
              },
            },
          }}
        >
          {availablePermissions.map((permission, idx) => (
            <MenuItem key={idx} value={permission} sx={{ padding: "8px 16px" }}> {/* Added padding to prevent overlap */}
              <Checkbox checked={permissions.indexOf(permission) > -1} />
              <ListItemText primary={permission} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Add Role Button */}
      <Button
        onClick={handleAddRole}
        variant="contained"
        sx={{ marginTop: 2, backgroundColor: "#1976d2", '&:hover': { backgroundColor: "#1565c0" } }}
      >
        Add Role
      </Button>

      {/* Success Message */}
      {successMessage && (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}

      {/* Roles List */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>Roles List</Typography>
        {roles.length === 0 ? (
          <Typography>No roles added yet.</Typography>
        ) : (
          roles.map((role) => (
            <Box
              key={role.id}
              sx={{
                marginBottom: 2,
                border: '1px solid #ddd',
                padding: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
                boxShadow: 2
              }}
            >
              <Typography variant="h6" sx={{ color: "#333" }}>{role.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Permissions: {role.permissions.join(", ")}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default RoleManagement;
