import React from "react";
import Card from "./Card";

// gets a new card when the user clicks a button
const NewCard = ({ newCard, userCards, getNewUserCard }) => {
  const message = `Too many cards! Delete one first.`;
  const buttons = [
    {
      text: "Get new Card! Cost: ",
      cost: 20,
      type: 'cards'
    },
    {
      text: "Get better Card! Cost: ",
      cost: 30,
      type: 'cards'
    },
    {
      text: "Get even better Card! Cost: ",
      cost: 50,
      type: 'cards'
    },
    {
      text: "Get almost the best Card! Cost: ",
      cost: 70,
      type: 'cards'
    },
    {
      text: "Get the BEST Card! Cost: ",
      cost: 90,
      type: 'cards'
    },
    {
      text: 'Buy Counter Card! Cost: ',
      cost: 0,
      type: 'counters'
    }
  ];

  return (
    <div className="new-card">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="newCardButton"
          type="button"
          onClick={
            userCards[button.type].length < 20 ? () => getNewUserCard(button.cost, button.type) : () => alert(`${message}`)
          }
        >
          {button.text}
          <strong style={{ color: "red" }}>{button.cost}</strong>
        </button>
      ))}
      {newCard ? <Card card={newCard} /> : null}
    </div>
  );
};

export default NewCard;
