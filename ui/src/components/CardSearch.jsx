import React, { useState, useContext } from "react";
import { AuthContext } from "../../src/AuthContext";
import { useCardContext } from "./CardContext";

// Helper to build correct image URL (matches api.js logic)
function getCardImageUrl(card) {
  let imageFilename =
    card.result_editions?.[0]?.image ||
    card.editions?.[0]?.image ||
    card.image ||
    card.image_name ||
    null;

  if (!imageFilename) return null;
  if (imageFilename.startsWith('http')) return imageFilename;
  if (imageFilename.startsWith('/')) return `https://api.gatcg.com${imageFilename}`;
  return `https://api.gatcg.com/cards/images/${imageFilename}`;
}

// Preprocess card to standardize structure (like processCardData)
function processCardData(card) {
  return {
    id: card.id || card.uuid || card.cardId || "",
    name: card.name || card.title || "",
    description: card.description || card.text || card.effect || "",
    type: card.type || card.cardType || (card.types ? card.types.join(', ') : ""),
    rarity: card.rarity || card.editions?.[0]?.rarity || "",
    imageUrl: getCardImageUrl(card),
    attack: card.attack || card.atk || null,
    defense: card.defense || card.def || null,
    cost: card.cost || card.cost_memory || card.mana || null,
    originalData: card
  };
}

export default function CardSearch() {
  const { user } = useContext(AuthContext);
  const { addCardToCollection } = useCardContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchCards(term) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.gatcg.com/cards/autocomplete?name=${encodeURIComponent(term)}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      // Pick the most likely result array (handle various shapes)
      const cardsArr =
        (Array.isArray(data) && data) ||
        data.cards ||
        data.results ||
        data.data ||
        [];
      // Preprocess each card using the helper
      const processed = cardsArr.map(processCardData);
      setCards(processed);
    } catch (err) {
      setError("Error fetching cards");
      setCards([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    fetchCards(searchTerm.trim());
  }

  function addCardToCollection(card) {
    const token = localStorage.getItem("token");
    fetch("/api/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ card_id: card.id }),
    })
      .then((res) => res.json())
      .then(() => alert("Added to collection!"))
      .catch(() => alert("Failed to add to collection"));
  }

  return (
    <section>
      <h2>Card Search</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for cards..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 180px)",
          gap: 12
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              background: "#2a273f",
              border: "1px solid #444",
              borderRadius: 8,
              padding: 8,
              textAlign: "center"
            }}
          >
         <img
  src={
    card.imageUrl ||
    (card.result_editions?.[0]?.image
      ? `https://api.gatcg.com/cards/images/${card.result_editions[0].image}`
      : card.editions?.[0]?.image
        ? `https://api.gatcg.com/cards/images/${card.editions[0].image}`
        : card.image
          ? card.image
          : card.image_name
            ? card.image_name
            : "/card-back.png"
    )
  }
  alt={card.name}
  style={{ width: "100%", height: 200, objectFit: "contain", borderRadius: 4 }}
  onError={(e) => { e.target.onerror = null; e.target.src = "/card-back.png"; }}
/>
            <div style={{ fontWeight: "bold", color: "#fff" }}>{card.name}</div>
            <div style={{ fontSize: 14, color: "#ffe600" }}>
              {card.type || "Unknown"}
            </div>
            <div>
              <button
                style={{ marginTop: 8 }}
                onClick={() => addCardToCollection(card)}
                disabled={!user}
              >
                Add to Collection
              </button>
            </div>
          </div>
        ))}
      </div>
      {cards.length === 0 && !loading && (
        <div style={{ marginTop: "2rem" }}>No results found.</div>
      )}
    </section>
  );
}
