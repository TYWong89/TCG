import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";

const CardContext = createContext();
export function useCardContext() { return useContext(CardContext); }

export function CardProvider({ children }) {
  const { user, token } = useContext(AuthContext);

  const [collection, setCollection] = useState([]);
  // (Add deck state as needed)

  // Load from backend when user logs in/changes
  useEffect(() => {
    if (!user || !token) {
      setCollection([]);
      return;
    }
    fetch("/api/collection", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCollection(data.collection || []))
      .catch(() => setCollection([]));
  }, [user, token]);

  // Add to collection
  async function addCardToCollection(card) {
    console.log("user", user, "token", token);
    if (!token) {
    console.log("No token, aborting");  
    return;
    }
    console.log("Fetching to /api/collection");    
    await fetch("/api/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ card_id: card.id })
    });
    // Refresh
    fetch("/api/collection", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCollection(data.collection || []));
  }

  // Remove from collection
  async function removeFromCollection(cardId) {
    if (!token) return;
    await fetch(`/api/collection/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetch("/api/collection", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCollection(data.collection || []));
  }

  return (
    <CardContext.Provider value={{
      collection,
      addCardToCollection,
      removeFromCollection
    }}>
      {children}
    </CardContext.Provider>
  );
}
