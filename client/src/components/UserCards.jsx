import React, { Component } from 'react';

import Card from './Card';

class UserCards extends Component {  

  render() {
    return (
      <div className='UserCards'>
        {this.props.userCards ? 
          this.props.userCards.map(card=>{
            return <Card key={card.id} card={card} />
          }) : ''
        }
      </div>
    )
  }
}

export default UserCards;