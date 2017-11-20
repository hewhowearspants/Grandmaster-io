import React from "react";

// special card component for the user playing cards,
// contains click listener for user to select card ONLY IF THERE IS AN OPPONENT
export const HandCardSingle = ({ card, opponent, select }) => (
  <div
    className={`card ${card.class}`}
    onClick={opponent ? () => select(card) : null}
  >
    <div className="card-top">
      <div className="card-name">
        <b>{card.name}</b>
        <p>{card.class}</p>
      </div>
    </div>
    <div className="card-numbers">
      <p>{card.attack && `ATT ${card.attack}`}</p>
      <p>{card.defense && `DEF ${card.defense}`}</p>
    </div>
  </div>
);
