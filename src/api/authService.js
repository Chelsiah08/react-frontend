import axios from "axios";

const API_BASE = "http://localhost:8080/auth";

export const login = async (username, password) => {
  return axios.post(
    `${API_BASE}/login`,
    {
      username: username,
      password: password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const logout = async (accessToken) => {
  return axios.post(
    `${API_BASE}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
};
