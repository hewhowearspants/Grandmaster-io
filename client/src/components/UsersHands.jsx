import React from "react";
import { HandCardSingle } from "./HandCardSingle";

// the playing card container for the game board
export const UsersHands = ({ cardData, cardDrawn, opponent, select, className }) => (
  <div className={`${className}`}>
    {cardData
      ? cardData.map(card => (
          <HandCardSingle
            select={() => select(card)}
            key={cardData.indexOf(card)}
            card={card}
            makeSelection={this.makeSelection}
            cardDrawn={cardDrawn}
            opponent={opponent}
          />
        ))
      : null}
  </div>
);
