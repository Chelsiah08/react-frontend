import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@mui/material";

function AddUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "SUPERADMIN") {
      navigate("/");
    }
  }, [navigate]);

  const handleAddUser = async () => {
    try {
      await axios.post(
        "http://localhost:8080/admin/add-user-to-group",
        null,
        {
          params: {
            username: username,
            group: "USER" // or SUPERADMIN
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );

      alert("User added to group successfully");
      setEmail("");
      setUsername("");

    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: "20px",
            boxShadow: "0 20px 45px rgba(0,0,0,0.1)"
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              gutterBottom
            >
              ➕ Add New User
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Assign a user to the system with proper access
            </Typography>

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Button
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                borderRadius: "14px",
                fontWeight: 600,
                background: "linear-gradient(90deg, #89f7fe, #66a6ff)",
                color: "#fff",
                textTransform: "none",
                boxShadow: "0 10px 25px rgba(102,166,255,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #66a6ff, #89f7fe)"
                }
              }}
              onClick={handleAddUser}
            >
              Add User
            </Button>

            <Button
              fullWidth
              variant="text"
              sx={{ mt: 2, textTransform: "none" }}
              onClick={() => navigate("/superadmin")}
            >
              ← Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AddUser;
