import React from "react";
import Card from "./Card";

// displays the users cards in the dashboard
export const UserCards = props => (
  <div className="UserCards">
    {props.userCards &&
      props.userCards.map(card => (
        <Card key={card.id} card={card} {...props} />
      ))}
  </div>
);
