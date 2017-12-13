import React from "react";
import Card from "./Card";

// displays the users cards in the dashboard
export const UserCards = ({
  userCards,
  deleteUserCard,
  userSelectedCardToEdit,
  userSubmitEdit,
  currentCardId
}) => (
  <div className="UserCards">
    {userCards &&
      userCards.map(card => <Card key={card.id} card={card} {...props} />)}
  </div>
);
