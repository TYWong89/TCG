// ui/src/components/Collection.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useCardContext } from "./CardContext";

export default function Collection() {
  const { collection, removeFromCollection } = useCardContext();

  return (
    <div>
      {collection.map((card) => (
        <div key={card.card_id}>
          <span>{card.card_id} (x{card.count})</span>
          <button onClick={() => removeFromCollection(card.card_id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
