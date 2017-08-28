import React, { Component } from 'react';
import HandCardSingle from './HandCardSingle';

class UsersHands extends Component {
    render() {
        return (
            <div>
                {this.props.cardData ?
                    this.props.cardData.map(card => {
                        return <HandCardSingle 
                                select = {() => this.props.select(card)} 
                                key = {this.props.cardData.indexOf(card)} 
                                card = {card} makeSelection = {this.makeSelection} 
                                cardDrawn = {this.props.cardDrawn} 
                                opponent = {this.props.opponent} />
                    }) : ''
                }
            </div>
        )
    }
}

export default UsersHands;