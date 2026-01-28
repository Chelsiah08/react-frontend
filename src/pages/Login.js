import React, { useState } from "react";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert
} from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await login(username, password);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("idToken", res.data.idToken);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "SUPERADMIN") {
        navigate("/superadmin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdfbfb 0%, #b8daeb 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.75)",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              🔐 Welcome Back
            </Typography>

            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Sign in to continue
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: "12px",
                background: "linear-gradient(90deg, #89f7fe, #66a6ff)",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(102,166,255,0.4)",
                "&:hover": {
                  background: "linear-gradient(90deg, #66a6ff, #89f7fe)"
                }
              }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
