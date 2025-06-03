// ui/src/api.js

// Helper to get JWT token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Auth
export async function login(username, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function register(username, password) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function getCurrentUser() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

// Collection
export async function fetchCollection() {
  const token = getToken();
  const res = await fetch("/api/collection", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function addCardToCollection(card_id) {
  const token = getToken();
  const res = await fetch("/api/collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ card_id })
  });
  return res.json();
}

export async function removeCardFromCollection(card_id) {
  const token = getToken();
  const res = await fetch(`/api/collection/${card_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

// Decks
export async function fetchDecks() {
  const token = getToken();
  const res = await fetch("/api/decks", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function createDeck(name) {
  const token = getToken();
  const res = await fetch("/api/decks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  return res.json();
}

export async function deleteDeck(deckId) {
  const token = getToken();
  const res = await fetch(`/api/decks/${deckId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

// Example: search GATCG API for cards
export async function searchCards(term) {
  const res = await fetch(
    `https://api.gatcg.com/cards/autocomplete?name=${encodeURIComponent(term)}`
  );
  return res.json();
}
