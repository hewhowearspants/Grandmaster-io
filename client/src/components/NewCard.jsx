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
        newCardDataLoaded: true,
      })
    })
    .then(() => {
        console.log(this.state);
        axios.post('/usercard/new', {           
            cardId: this.state.newCardData[0].id,
            name: this.state.newCardData[0].name,
            class: this.state.newCardData[0].class,
            attack: this.state.newCardData[0].attack,
            defense: this.state.newCardData[0].defense,
            imageUrl: this.state.newCardData[0].image_url
            })
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        })
    .catch(err=>{
        console.log(err);
    })
}

  render() {
    return (
      <div className='new-card'>
          <button className="newCardButton" type="button" onClick={this.getNewCard}>Get new Card!</button>
        {this.state.newCardDataLoaded ? <Card card={this.state.newCardData[0]} /> : ''}
      </div>
    )
  }
}

export default NewCard;
