import React from "react";

import Card from "./Card";

// the component displaying all of the cards in the API in the dashboard
export const CardCollection = ({ cards }) => (
  <div className="card-collection">
    {cards ? (
      cards.map(card => <Card key={card.id} card={card} />)
    ) : (
      <h2>Loading</h2>
    )}
  </div>
);
