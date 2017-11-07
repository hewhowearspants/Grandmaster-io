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
    {userCards
      ? userCards.map(card => {
          return (
            <Card
              key={card.id}
              deleteUserCard={deleteUserCard}
              userSubmitEdit={userSubmitEdit}
              userSelectedCardToEdit={userSelectedCardToEdit}
              currentCardId={currentCardId}
              card={card}
            />
          );
        })
      : ""}
  </div>
);
