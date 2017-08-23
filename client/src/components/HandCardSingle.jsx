import React, { Component } from 'react';

class HandCardSingle extends Component {

    constructor(){
        super();
        this.state = {
            display: 'block',
        }
        this.setDisplay = this.setDisplay.bind(this);
    }

    setDisplay(){
        if(this.props.cardDrawn === false){
            this.setState({
                display: 'none',
            })
        }
    }

    render(){
        return (
        <div className = 'card' onClick = {() => this.props.select(this.props.card) & this.setDisplay()} style = {{display: this.state.display}}>
            <p>{this.props.card.name}</p>
            <p>{this.props.card.class}</p>
            <img src = {this.props.card.image_url} alt = '' />
            <p>{this.props.card.attack}</p>
            <p>{this.props.card.defense}</p>
        </div>
        )
    }
}

export default HandCardSingle;