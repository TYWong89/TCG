import React, { useEffect, useState } from "react";
import { useCardContext } from "./CardContext";

export default function Collection() {
  const { collection, addCardToCollection, removeFromCollection } = useCardContext();

  
  const [detailedCards, setDetailedCards] = useState({});

  useEffect(() => {
    
    if (!collection || !collection.length) {
      setDetailedCards({});
      return;
    }

    
    const fetchCardDetails = async () => {
      const promises = collection.map(async ({ card_id, count }) => {
        
        const res = await fetch(`https://api.gatcg.com/cards/${card_id}`);
        if (!res.ok) {
          return [
            card_id,
            {
              id: card_id,
              name: "Unknown Card",
              imageUrl: "/card-back.png",
              count,
            },
          ];
        }
        const cardData = await res.json();
        
        let image =
          cardData.result_editions?.[0]?.image ||
          cardData.editions?.[0]?.image ||
          cardData.image ||
          cardData.image_name ||
          null;
        if (image && !image.startsWith("http")) {
          if (image.startsWith("/")) image = `https://api.gatcg.com${image}`;
          else image = `https://api.gatcg.com/cards/images/${image}`;
        }
        return [
          card_id,
          {
            id: card_id,
            name: cardData.name || cardData.title || "Unknown",
            imageUrl: image,
            count: count,
          },
        ];
      });

      const entries = await Promise.all(promises);
      setDetailedCards(Object.fromEntries(entries));
    };

    fetchCardDetails();
  }, [collection]);

  const handleAdd = (card_id) => {
    const card = { id: card_id };
    addCardToCollection(card);
  };
  const handleRemove = (card_id) => {
    removeFromCollection(card_id);
  };
  const handleDecrease = (card_id) => {
  
    removeFromCollection(card_id);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {Object.values(detailedCards).map((card) => (
        <div key={card.id} style={{ background: "#222", padding: 12, borderRadius: 12, width: 180 }}>
          <img
            src={card.imageUrl || "/card-back.png"}
            alt={card.name}
            style={{
              width: "100%",
              height: 140,
              objectFit: "contain",
              borderRadius: 8,
              marginBottom: 8,
              background: "#333",
            }}
            onError={e => { e.target.onerror = null; e.target.src = "/card-back.png"; }}
          />
          <div style={{ fontWeight: "bold", color: "#fff", marginBottom: 8 }}>
            {card.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => handleDecrease(card.id)} style={{ fontSize: 18, width: 28 }}>-</button>
            <span style={{ color: "#ffe600", fontSize: 18 }}>{card.count}</span>
            <button onClick={() => handleAdd(card.id)} style={{ fontSize: 18, width: 28 }}>+</button>
          </div>
          <button
            onClick={() => handleRemove(card.id)}
            style={{ marginTop: 10, width: "100%", background: "#e74c3c", color: "#fff", border: "none", borderRadius: 6, padding: "6px 0" }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
