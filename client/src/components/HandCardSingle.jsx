import React, { Component } from 'react';

class HandCardSingle extends Component {
    render(){
        return (
        <div className = {`card ${this.props.card.class}`} onClick = {this.props.opponent ? () => this.props.select(this.props.card) : ''} >
            <div className = 'card-top'>
                <div className = 'card-name'>
                    <b>{this.props.card.name}</b>
                    <p>{this.props.card.class}</p>
                </div>
            </div>
            <div className = 'card-numbers'>
                <p>{this.props.card.attack ? `ATT ${this.props.card.attack}` : ''}</p>
                <p>{this.props.card.defense ? `DEF ${this.props.card.defense}` : ''}</p>
            </div>
        </div>
        )
    }
}

export default HandCardSingle;