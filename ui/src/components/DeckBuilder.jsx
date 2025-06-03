import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { createDeck as apiCreateDeck, fetchDecks as apiFetchDecks, deleteDeck as apiDeleteDeck } from "../api";

export default function DeckBuilder() {
  const { user } = useContext(AuthContext);
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [loading, setLoading] = useState(false);

  // Use API helper for fetching decks
  async function loadDecks() {
    setLoading(true);
    const data = await apiFetchDecks();
    setDecks(data.decks || []);
    setLoading(false);
  }

  // Use API helper for creating deck
  async function handleCreateDeck(e) {
    e.preventDefault();
    if (!deckName.trim()) return;
    await apiCreateDeck(deckName);
    setDeckName("");
    loadDecks();
  }

  // Use API helper for deleting deck
  async function handleDeleteDeck(deckId) {
    await apiDeleteDeck(deckId);
    setSelectedDeck(null);
    loadDecks();
  }

  function selectDeck(deck) {
    setSelectedDeck(deck);
  }

  useEffect(() => {
    loadDecks();
    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <h2>Deck Builder</h2>
      <form onSubmit={handleCreateDeck} style={{ marginBottom: 12 }}>
        <input
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Deck Name"
        />
        <button type="submit">Create Deck</button>
      </form>
      {loading ? (
        <div>Loading decks...</div>
      ) : (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {decks.map((deck) => (
            <div
              key={deck.id}
              style={{
                border: "1px solid #444",
                background: selectedDeck?.id === deck.id ? "#2a273f" : "#292860",
                borderRadius: 8,
                padding: 10,
                minWidth: 160,
                cursor: "pointer",
              }}
              onClick={() => selectDeck(deck)}
            >
              <div style={{ fontWeight: "bold", color: "#fff" }}>{deck.name}</div>
              <button
                style={{ marginTop: 8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDeck(deck.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedDeck && (
        <div style={{ marginTop: 20 }}>
          <h3>Deck: {selectedDeck.name}</h3>
          {/* Expand this to fetch/show cards in the selected deck */}
          <div>TODO: Show cards in this deck here.</div>
        </div>
      )}
    </section>
  );
}
