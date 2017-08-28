import React, { Component } from 'react';

import Card from './Card';

class NewCard extends Component {
    constructor() {
        super();
        this.state = {
            gotNewCard: false,
        }
    }

    componentWillUnmount() {
        this.setState({
            gotNewCard: false,
        })
    }

    getNewCard = () => {
        if(this.props.userCards.length < 20){
            this.props.getNewUserCard();
            this.setState({
                gotNewCard: true,
            })
        }else{
            alert('Too many cards! You can\'t have more than 20 cards.')
        }
    }

  render() {
    return (
      <div className = 'new-card'>
          <button className = 'newCardButton' type='button' onClick = {this.getNewCard}>Get new Card!</button>
        {this.state.gotNewCard && this.props.newCard ? <Card card = {this.props.newCard[0]} /> : ''}
      </div>
    )
  }
}

export default NewCard;
