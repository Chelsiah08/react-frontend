import React from "react";
import { logout } from "../api/authService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      await logout(token);
      localStorage.clear();
      alert("Logged out");
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
