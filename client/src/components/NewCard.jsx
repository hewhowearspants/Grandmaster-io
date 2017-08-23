import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';

class NewCard extends Component {
    constructor() {
        super();
        this.state = {
            gotNewCard: false,
        }
        this.getNewCard = this.getNewCard.bind(this);
    }

    componentWillUnmount() {
        this.setState({
            gotNewCard: false,
        })
    }

    getNewCard() {
        this.props.getNewUserCard();
        this.setState({
            gotNewCard: true,
        })
    }

  render() {
    return (
      <div className='new-card'>
          <button className="newCardButton" type="button" onClick={this.getNewCard}>Get new Card!</button>
        {this.state.gotNewCard && this.props.newCard ? <Card card={this.props.newCard[0]} /> : ''}
      </div>
    )
  }
}

export default NewCard;
