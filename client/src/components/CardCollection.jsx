import React, { Component } from 'react';

class CardCollection extends Component {
  renderCardCollection() {
    if (this.props.cards) {
      return (this.props.cards.map((card) => {
          return (
            <div className='card' key={card.id}>
              <p>{card.name}</p>
              <p>{card.class}</p>
            </div>
          )
      }))
    } else return <h2>Loading</h2>
  }
  
  render() {
    return (
      <div className='card-collection'>
        {this.renderCardCollection()};
      </div>
    )
  }
}

export default CardCollection;