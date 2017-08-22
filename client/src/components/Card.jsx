import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div className='Card'>
      <div className={`card ${this.props.card.class}`}>
        <div className='card-name'><b>{this.props.card.name}</b>
            <p>{this.props.card.class}</p>
        </div>
        <div className='card-numbers'><p>Attack {this.props.card.attack}</p>
          <p>Defense {this.props.card.defense}</p>
        </div>
      </div>
      </div>
    )
  }
}

export default Card;
