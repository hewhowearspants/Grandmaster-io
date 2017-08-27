import React, { Component } from 'react';
import Card from './Card';

class UserCards extends Component { 
  render() {
    return (
      <div className = 'UserCards'>
        {this.props.userCards ? 
          this.props.userCards.map(card => {
            return <Card key = {card.id} 
                     deleteUserCard = {this.props.deleteUserCard}
                     userSubmitEdit = {this.props.userSubmitEdit} 
                     userSelectedCardToEdit = {this.props.userSelectedCardToEdit} 
                     currentCardId = {this.props.currentCardId}
                     card = {card} />
          }) : ''
        }
      </div>
    )
  }
}

export default UserCards;