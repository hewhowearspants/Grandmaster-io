import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';

class UserCards extends Component {  
  constructor(){
    super();
    this.state={
      userCardData: null,
    }
    this.deleteCard = this.deleteCard.bind(this);
  }

  componentDidMount(){
    axios.get('/usercard')
    .then(res=>{
      console.log(res.data)
      this.setState({
        userCardData:res.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

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
        {this.state.userCardData ? 
          this.state.userCardData.map(data=>{
            return <Card card={data} />
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