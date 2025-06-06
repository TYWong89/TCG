import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Register() {
  const { setUser, setPage, setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleRegister(e) {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          setToken(data.token);
          setError(null);
        } else {
          setError(data.error || "Registration failed");
        }
      })
      .catch(() => setError("Registration failed"));
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleRegister}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="username"
        /><br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        /><br />
        <button type="submit">Register</button>
        <button type="button" onClick={() => setPage("login")}>
          Login
        </button>
      </form>
    </div>
  );
}
