import React, { Component } from 'react';

import Card from './Card';

// the component displaying all of the cards in the API in the dashboard
class CardCollection extends Component {
  renderCardCollection = () => {
    if (this.props.cards) {
      return (this.props.cards.map(card => {
          return (
            <Card key = {card.id} card = {card} />
          )
      }))
    } else return <h2>Loading</h2>
  }
  
  render() {
    return (
      <div className = 'card-collection'>
        {this.renderCardCollection()}
      </div>
    )
  }
}

export default CardCollection;