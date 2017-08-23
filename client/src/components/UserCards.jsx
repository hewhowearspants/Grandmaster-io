import React, { Component } from 'react';

import Card from './Card';

class UserCards extends Component { 

  deleteCard(id) {
    axios.delete(`/usercard/${id}`)
      .then(res => {
        const updatedCards = [...this.state.userCardData];
        console.log(updatedCards);
        let deletedIndex;
        updatedCards.forEach((card, index) => {
          // console.log(card, id);
          if (card.id === id) {
            deletedIndex = index;
          };
        });
        updatedCards.splice(deletedIndex, 1)
        this.setState({
          userCardData: updatedCards,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='UserCards'>
        {this.props.userCards ? 
          this.props.userCards.map(card=>{
            return <Card key={card.id} deleteCard={this.deleteCard} card={card} />
          }) : ''
        }
      </div>
    )
  }
}

export default UserCards;