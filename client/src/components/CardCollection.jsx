import React, { Component } from "react";

import Card from "./Card";
import Counter from './Counter';

// the component displaying all of the cards in a collection (either API or user) in the dashboard
class CardCollection extends Component {
  state = {
    cardType: 'cards'
  }

  componentWillUnmount() {
    this.props.setCardToEdit(null);
    this.setState({
      cardType: 'cards',
    })
  }

  setCardType = (cardType) => {
    this.props.setCardToEdit(null);
    this.setState({
      cardType,
    })
  }

  render() {
    let { classname, collection } = this.props;
    let { cardType } = this.state;
    
    return (
      <div className='collection'>
        <div className='selector-buttons'>
          <button className={cardType === 'cards' ? 'selected' : null} onClick={() => this.setCardType('cards')}>Cards</button>
          <button className={cardType === 'counters' ? 'selected' : null} onClick={() => this.setCardType('counters')}>Counters</button>
        </div>
        <div className={`${classname}`}>
        {collection ? (
          collection[cardType].map((card, index) => {
            if (cardType === 'cards') {
              return <Card key={index} card={card} {...this.props} />
            } else {
              return <Counter key={index} card={card} {...this.props} />
            }
          })
        ) : (
          <h2>Loading</h2>
        )}
        </div>
      </div>
    )
  }
};

export default CardCollection;
