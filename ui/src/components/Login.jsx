import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const { setUser, setPage } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          setError(null);
        } else {
          setError(data.error || "Login failed");
        }
      })
      .catch(() => setError("Login failed"));
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        /><br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        /><br />
        <button type="submit">Login</button>
        <button type="button" onClick={() => setPage("register")}>
          Register
        </button>
      </form>
    </div>
  );
}
