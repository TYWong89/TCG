import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useCardContext } from "./CardContext";

function getCardImageUrl(cardData) {
  let image =
    cardData.result_editions?.[0]?.image ||
    cardData.editions?.[0]?.image ||
    cardData.image ||
    cardData.image_name ||
    null;
  if (image && !image.startsWith("http")) {
    if (image.startsWith("/")) return `https://api.gatcg.com${image}`;
    else return `https://api.gatcg.com/cards/images/${image}`;
  }
  return image || null;
}

function processCardData(cardData) {
  return {
    id: cardData.slug || cardData.id || cardData.uuid || cardData.cardId || "",
    name: cardData.name || cardData.title || "",
    description: cardData.description || cardData.text || cardData.effect || "",
    type: cardData.type || cardData.cardType || (cardData.types ? cardData.types.join(", ") : ""),
    rarity: cardData.rarity || cardData.editions?.[0]?.rarity || "",
    imageUrl: getCardImageUrl(cardData),
    attack: cardData.attack || cardData.atk || null,
    defense: cardData.defense || cardData.def || null,
    cost: cardData.cost || cardData.cost_memory || cardData.mana || null,
    originalData: cardData,
  };
}

export default function CardSearch() {
  const { user } = useContext(AuthContext);
  const { addCardToCollection } = useCardContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");


  async function fetchCards(term) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.gatcg.com/cards/autocomplete?name=${encodeURIComponent(term)}`
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      const cardsArr =
        (Array.isArray(data) && data) ||
        data.cards ||
        data.results ||
        data.data ||
        [];

      const detailedPromises = cardsArr.map(async (card) => {
        const cardId = card.slug || card.uuid || card.id || card.cardId;
        if (!cardId) return null;
        const detailRes = await fetch(`https://api.gatcg.com/cards/${cardId}`);
        if (!detailRes.ok) return null;
        const detailData = await detailRes.json();
        return processCardData(detailData);
      });

      const processed = (await Promise.all(detailedPromises)).filter(Boolean);
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
   function handleAddToCollection(card) {
    addCardToCollection(card);
    setNotification(`${card.name} added to your collection!`);
    setTimeout(() => setNotification(""), 1800);
  }

  return (
    <section>
      <h2>Card Search</h2>
      {notification && (
      <div
        style={{
          background: "#333",
          color: "#ffe600",
          padding: "0.75em",
          borderRadius: 8,
          marginBottom: 12,
          textAlign: "center",
          fontWeight: "bold",
          boxShadow: "0 4px 16px #0007"
        }}
      >
        {notification}
      </div>
      )}
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
          gap: 12,
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
              textAlign: "center",
            }}
          >
            <img
              src={card.imageUrl || "/card-back.png"}
              alt={card.name}
              style={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                borderRadius: 4,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/card-back.png";
              }}
            />
            <div style={{ fontWeight: "bold", color: "#fff" }}>{card.name}</div>
            <div style={{ fontSize: 14, color: "#ffe600" }}>
              {card.type || "Unknown"}
            </div>
            <div>
              <button
                style={{ marginTop: 4 }}
                onClick={() => handleAddToCollection(card)}
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
