import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Basic styles for layout and UI design
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f7f9fc",
  fontFamily: "'Roboto', sans-serif", // Updated font
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  padding: "40px",
  maxWidth: "700px",
  width: "100%",
  margin: "20px",
};

const headerStyle = {
  textAlign: "center",
  fontSize: "36px",
  marginBottom: "25px",
  color: "#2e3a59",
  fontWeight: "600",
};

const buttonStyle = {
  padding: "14px 30px",
  fontSize: "16px",
  color: "#fff",
  backgroundColor: "#6C63FF", // Vibrant purple-blue color
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "20px",
  transition: "all 0.3s ease",
  width: "100%",
  boxSizing: "border-box",
};

const backButtonStyle = {
  backgroundColor: "#B0BEC5",
};

const inputStyle = {
  padding: "12px 20px",
  width: "100%",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box",
  transition: "border-color 0.3s ease",
};

const inputFocusStyle = {
  borderColor: "#6C63FF",
};

const successMessageStyle = {
  color: "#388E3C",
  textAlign: "center",
  marginTop: "20px",
};

const permissionsContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "20px",
};

const permissionsStyle = {
  display: "flex",
  alignItems: "center",
};

const roleContainerStyle = {
  marginTop: "30px",
  textAlign: "center",
  fontWeight: "500",
};

const roleListStyle = {
  listStyleType: "none",
  paddingLeft: "0",
  marginTop: "10px",
  color: "#2e3a59",
};

const roleListItemStyle = {
  marginBottom: "10px",
  backgroundColor: "#EDEBFF",
  padding: "12px",
  borderRadius: "8px",
  transition: "transform 0.3s ease-in-out",
};

const roleListItemHoverStyle = {
  transform: "scale(1.05)",
  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
};

const RoleManagement = () => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]); // Permissions selected for the role
  const [roles, setRoles] = useState([
    { id: 1, name: "Backend Developer", permissions: ["Read", "Write"] },
    { id: 2, name: "ML Engineer", permissions: ["Read", "Write", "Delete"] },
    { id: 3, name: "HR", permissions: ["Read"] }
  ]); // List of existing roles with some dummy data
  const [availablePermissions, setAvailablePermissions] = useState(["Read", "Write", "Delete"]);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  
  const navigate = useNavigate();  // Initialize the useNavigate hook
  
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
    const value = event.target.value;
    setPermissions(prevPermissions => 
      prevPermissions.includes(value) 
        ? prevPermissions.filter(permission => permission !== value) 
        : [...prevPermissions, value]
    );
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Role Management</h2>

        <div>
          <label>Role Name:</label>
          <input 
            type="text" 
            style={inputStyle}
            value={roleName} 
            onChange={(e) => setRoleName(e.target.value)} 
            placeholder="Enter role name" 
            onFocus={(e) => e.target.style.borderColor = "#6C63FF"}
            onBlur={(e) => e.target.style.borderColor = "#ddd"}
          />
        </div>

        <div style={permissionsContainerStyle}>
          <h3>Select Permissions</h3>
          {availablePermissions.map((permission) => (
            <div key={permission} style={permissionsStyle}>
              <input 
                type="checkbox" 
                value={permission} 
                checked={permissions.includes(permission)} 
                onChange={handlePermissionChange} 
              />
              <span style={{ marginLeft: "8px" }}>{permission}</span>
            </div>
          ))}
        </div>

        <button style={buttonStyle} onClick={handleAddRole}>Add Role</button>

        <button 
          style={{...buttonStyle, ...backButtonStyle}} 
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>

        {successMessage && (
          <div style={successMessageStyle}>
            {successMessage}
          </div>
        )}

        <div style={roleContainerStyle}>
          <h3>Existing Roles</h3>
          <ul style={roleListStyle}>
            {roles.map((role) => (
              <li 
                key={role.id} 
                style={{...roleListItemStyle, "&:hover": roleListItemHoverStyle}}
                className="role-list-item"
              >
                {role.name} - {role.permissions.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
