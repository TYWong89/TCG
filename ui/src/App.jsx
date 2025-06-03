import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import CardSearch from "./components/CardSearch";
import Collection from "./components/Collection";
import DeckBuilder from "./components/DeckBuilder";
import Header from "./components/Header";
import { CardProvider } from "./components/CardContext";

function App() {
  const { user, page, setPage, logout } = useContext(AuthContext);

  return (
    <div>
      <Header />
      {!user && page === "login" && <Login />}
      {!user && page === "register" && <Register />}
      {user && (
        <>
          <nav>
            <button onClick={() => setPage("cards")}>Card Search</button>
            <button onClick={() => setPage("collection")}>Collection</button>
            <button onClick={() => setPage("deck")}>Deck Builder</button>
            <button onClick={logout}>Logout</button>
          </nav>
          <main>
            {page === "cards" && <CardSearch />}
            {page === "collection" && <Collection />}
            {page === "deck" && <DeckBuilder />}
          </main>
        </>
      )}
    </div>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <CardProvider>
        <CardSearch />
        <App />
      </CardProvider>
    </AuthProvider>
  );
}