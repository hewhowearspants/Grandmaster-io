import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';

class NewCard extends Component {
    constructor() {
        super();
        this.state = {
            newCardData: null,
            newCardDataLoaded: false,
        }
        this.getNewCard = this.getNewCard.bind(this);
    }

  getNewCard(){
    axios.get('/cards/new')
    .then(res=>{
      console.log(res.data)
      this.setState({
        newCardData: res.data,
      })
    })
    .then(() => {
        this.state.cardData.map((data) => {
            axios.post('/cards/new', {
                cardId: data.id,
                name: data.name,
                class: data.class,
                attack: data.attack,
                defense: data.defense
            })
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

  render() {
    return (
      <div className='new-card'>
          <button onClick={this.getNewCard} />
        {this.state.newCardDataLoaded ? <Card card={this.state.newCardData} /> : ''}
      </div>
    )
  }
}

export default NewCard;
