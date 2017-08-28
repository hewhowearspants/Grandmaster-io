import React, { Component } from 'react';
import axios from 'axios';

class NewUser extends Component {
    constructor() {
        super();
        this.state = {
            cardData: null,
        }
    }

    componentDidMount(){
        axios.get('/user/new')
        .then(res => {
            console.log(res.data)
            this.setState({
                cardData: res.data
            })
        })
        .then(() => {
            this.state.cardData.forEach(data=>{
                axios.post('/user/new',{
                    cardId:data.id,
                    name:data.name,
                    class:data.class,
                    attack:data.attack,
                    defense:data.defense,
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className = 'card-list'>
                {this.state.cardData ?
                    this.state.cardData.map(data => {
                    return <div key = {data.id} className = 'single-card'>
                              <div className = 'card-name'><b>{data.name}</b></div>
                              <div className = 'card-class'><p>class: {data.class}</p></div>
                              <div className = 'card-attack'><p>attack: {data.attack}</p></div>
                              <div className = 'card-defense'><p>defense: {data.defense}</p></div>
                            </div>
                }) : ''
                }
                <button className = 'userBtn' onClick = {this.props.jumpToUserHome}>Accept!</button>
             </div>
        )
    }
}

export default NewUser;