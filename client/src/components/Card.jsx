import React, { Component } from 'react';

import UserCards from './UserCards';

class Card extends Component {
  render() {
    return (
      <div className='Card'>
      <div className={`card ${this.props.card.class}`}>
        <div className='card-top'>
          <div className='edit-button'>
            <i className="fa fa-pencil"></i>
          </div>
          <div className='card-name'>
              <b>{this.props.card.name}</b>
              <p>{this.props.card.class}</p>
          </div>
          <div className='delete-button'>
            <i className="fa fa-times"></i>
          </div>
        </div>
        <div className='card-numbers'><p>ATT  {this.props.card.attack}</p>
          <p>DEF  {this.props.card.defense}</p>
        </div>
        <button className='DeleteCard' onClick={()=> {this.props.deleteCard(this.props.card.id)}}>Delete!</button>
      </div>
      </div>
    )
  }
}

export default Card;
