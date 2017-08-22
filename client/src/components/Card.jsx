import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className='card' style={{backgroundImage: `url(${this.props.card.image_url})`}}>
        <p>{this.props.card.name}</p>
        <p>{this.props.card.class}</p>
        <p>{this.props.card.attack}</p>
        <p>{this.props.card.defense}</p>
      </div>
    )
  }
}

export default Card;