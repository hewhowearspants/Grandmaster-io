import React, { Component } from 'react';
import HandCardSingle from './HandCardSingle';

class UsersHands extends Component {
    constructor() {
        super();
        this.state = {
            joined: false,
        }
        this.joinGame = this.joinGame.bind(this);
    }

    joinGame() {
        this.setState({
            joined: true,
        })
    }

    render() {
        return (
            <div>
                {this.state.joined ?
                    this.props.data.map(data => {
                        return <HandCardSingle select = {() => this.props.select(data)} key = {this.props.data.indexOf(data)} card = {data} makeSelection = {this.makeSelection} cardDrawn = {this.props.cardDrawn} />
                    }) : <button onClick = {this.joinGame}>Join Game!</button>
                }
            </div>
        )
    }
}

export default UsersHands;