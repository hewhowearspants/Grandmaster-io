import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className='card'>
        <p>{this.props.card.name}</p>
        <p>{this.props.card.class}</p>
        <p>{this.props.card.attack}</p>
        <p>{this.props.card.defense}</p>
      </div>
    )
  }
}

export default Card;