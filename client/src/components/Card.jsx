import React, { Component } from 'react';

import UserCards from './UserCards';

class Card extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className='Card'>
      <div className={`card ${this.props.card.class}`}>
        <div className='card-name'><b>{this.props.card.name}</b>
            <p>{this.props.card.class}</p>
        </div>
        <div className='card-numbers'><p>Attack {this.props.card.attack}</p>
          <p>Defense {this.props.card.defense}</p>
        </div>
      </div>
=======
      <div className='card' deleteCard={this.props.deleteCard} style={{backgroundImage: `url(${this.props.card.image_url})`}}>
        <p>{this.props.card.name}</p>
        <p>{this.props.card.class}</p>
        <p>{this.props.card.attack}</p>
        <p>{this.props.card.defense}</p>
>>>>>>> delete card to card
      </div>
    )
  }
}

export default Card;
