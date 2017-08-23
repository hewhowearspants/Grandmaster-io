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

/* 
 <div className='card-name'><b>{data.name}</b>
                                                      <p>{data.class}</p></div>
                              <div className='card-numbers'><p>Attack {data.attack}</p>
                                                            <p>Defense {data.defense}</p></div>
*/