import React, { Component } from 'react';

class HandCardSingle extends Component {

    constructor(){
        super();
        this.state = {
            displayNone: false,
        }
        this.setDisplay = this.setDisplay.bind(this);
    }

    setDisplay(){
        if(this.props.cardDrawn === false){
            this.setState({
                displayNone: true,
            })
        }
    }

    render(){
        return (
        <div className = {`card ${this.props.card.class} ${this.state.displayNone ? 'hidden' : ''}`} onClick = {() => this.props.select(this.props.card) & this.setDisplay()}>
            <div className='card-top'>
                <div className='card-name'>
                    <b>{this.props.card.name}</b>
                    <p>{this.props.card.class}</p>
                </div>
            </div>
            <div className='card-numbers'>
                <p>ATT {this.props.card.attack}</p>
                <p>DEF {this.props.card.defense}</p>
            </div>
        </div>
        )
    }
}

export default HandCardSingle;