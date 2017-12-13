import React from "react";
import Card from "./Card";
// gets a new card when the user clicks a button
const NewCard = ({
  newCard,
  userCards,
  getNewUserCard,
  getNewUserCardPremium
}) => {
  const message = `Too many cards! You can't have more than 20 cards.`;
  const buttons = [
    {
      onClick: () => getNewUserCard(),
      text: "Get new Card! Cost:",
      cost: 20
    },
    {
      onClick: () => getNewUserCardPremium(15),
      text: "Get better Card! Cost:",
      cost: 30
    },
    {
      onClick: () => getNewUserCardPremium(25),
      text: "Get even better Card! Cost:",
      cost: 50
    },
    {
      onClick: () => getNewUserCardPremium(35),
      text: "Get almost the best Card! Cost:",
      cost: 70
    },
    {
      onClick: () => getNewUserCardPremium(45),
      text: "Get the BEST Card! Cost:",
      cost: 90
    }
  ];
  return (
    <div className="new-card">
      {buttons.map(button => (
        <button
          key={button.cost}
          className="newCardButton"
          type="button"
          onClick={
            userCards.length < 20 ? button.onClick : () => alert(`${message}`)
          }
        >
          {button.text}
          <strong style={{ color: "red" }}>{button.cost}</strong>
        </button>
      ))}
      {newCard && <Card card={newCard[0]} />}
    </div>
  );
};

export default NewCard;
