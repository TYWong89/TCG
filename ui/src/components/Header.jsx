// ui/src/components/Header.jsx
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header style={{ background: "#12111f", color: "#eee", padding: 20, textAlign: "center" }}>
      <img
        src="https://www.gatcg.com/_nuxt/img/logo_navbar_stacked.63a3a6a.png"
        alt="Grand Archive Logo"
        style={{ height: 80 }}
      />
      <h1 style={{ margin: 0, fontSize: 28 }}>Card Database & Deck Builder</h1>
      {user && <div style={{ marginTop: 8 }}>Logged in as: <b>{user.username}</b></div>}
    </header>
  );
}
