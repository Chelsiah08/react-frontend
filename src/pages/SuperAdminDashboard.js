import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardContent
} from "@mui/material";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "SUPERADMIN") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      await logout(token);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <>
      {/* 🔝 TOP NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #6ec5cb, #66a6ff)"
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Super Admin Panel
          </Typography>

          <Button
            onClick={handleLogout}
            sx={{
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              backgroundColor: "rgba(255,255,255,0.2)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)"
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* 🧱 PAGE CONTENT */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
          pt: 12
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 20px 45px rgba(0,0,0,0.1)"
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Welcome, Super Admin 👋
              </Typography>

              <Typography color="text.secondary" mb={3}>
                Manage users and system access from here
              </Typography>

              <Button
                onClick={() => navigate("/add-user")}
                sx={{
                  py: 1.2,
                  px: 4,
                  borderRadius: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg, #6a8fca, #86b9d1)",
                  color: "#000",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #8eb9cc, #7ea5e2)"
                  }
                }}
              >
                ➕ Add User
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default SuperAdminDashboard;
