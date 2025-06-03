import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.username) setUser(data);
        })
        .catch(() => setUser(null));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setPage("login");
  }

  return (
    <AuthContext.Provider value={{ user, setUser, page, setPage, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
