import React, { Component } from "react";
import Card from "./Card";
const alert = `Too many cards! You can't have more than 20 cards.`;

// gets a new card when the user clicks a button
const NewCard = ({
  newCard,
  userCards,
  getNewUserCard,
  getNewUserCardPremium
}) => {
  const getNewCard = () => getNewUserCard();

  const getNewCardLv1 = () => getNewUserCardPremium(15);

  const getNewCardLv2 = () => getNewUserCardPremium(25);

  const getNewCardLv3 = () => getNewUserCardPremium(35);

  const getNewCardLv4 = () => getNewUserCardPremium(45);

  const buttons = [
    {
      onClick: getNewCard,
      text: "Get new Card! Cost:",
      cost: 20
    },
    {
      onClick: getNewCardLv1,
      text: "Get better Card! Cost:",
      cost: 30
    },
    {
      onClick: getNewCardLv2,
      text: "Get even better Card! Cost:",
      cost: 50
    },
    {
      onClick: getNewCardLv3,
      text: "Get almost the best Card! Cost:",
      cost: 70
    },
    {
      onClick: getNewCardLv4,
      text: "Get the BEST Card! Cost:",
      cost: 90
    }
  ];
  return (
    <div className="new-card">
      {buttons.map(button => (
        <button
          className="newCardButton"
          type="button"
          onClick={() => button.onClick()}
        >
          {button.text}
          <strong style={{ color: "red" }}>{button.cost}</strong>
        </button>
      ))}
      {newCard ? <Card card={newCard[0]} /> : null}
    </div>
  );
};

export default NewCard;
