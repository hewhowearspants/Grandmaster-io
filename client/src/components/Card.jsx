import React, { Component } from 'react';

import UserCards from './UserCards';

class Card extends Component {
  render() {
    return (
      <div className='card-wrapper'>
        <div className='delete-button'>
            <i className="fa fa-times fa-2x" onClick={()=> {this.props.userSelectedCardToEdit(this.props.card.id)}}></i>
          </div>
          <div className='edit-button'>
            <i className="fa fa-pencil fa-2x"></i>
          </div>
      <div className={`card ${this.props.card.class}`}>
        <div className='card-top'>
          <div className='card-name'>
              <b>{this.props.card.name}</b>
              <p>{this.props.card.class}</p>
          </div>
        </div>
        <div className='card-numbers'><p>ATT  {this.props.card.attack}</p>
          <p>DEF  {this.props.card.defense}</p>
        </div>
      </div>
      </div>
    )
  }
}

export default Card;