import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RoleManagement from "./pages/RoleManagement";
import UserManagement from "./pages/UserManagement";
import SignUp from "./pages/SignUp"; // Import the SignUp component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add the SignUp route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
