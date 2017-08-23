import React, { Component } from 'react';
import axios from 'axios';
import BattleField from './BattleField';
import UsersHands from './UsersHands';

class GameRoom extends Component{
    constructor(){
        super();
        this.state={
            userCardData: null,
            oppoCardData: null,
            userSelection: null,
            oppoSelection: null,
            userCardDrawn: false,
            oppoCardDrawn: false,
        }
        this.makeUserSelection = this.makeUserSelection.bind(this);
        this.makeOppoSelection = this.makeOppoSelection.bind(this);
        this.resetBattleField = this.resetBattleField.bind(this);
    }

    componentWillMount(){
        axios.get('/usercard/start')
        .then(res => {
            console.log(res.data);
            this.setState({
                userCardData: res.data.userCard,
                oppoCardData: res.data.opponentCard,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    makeUserSelection(data){
        if(this.state.userSelection === null){
            this.setState({
                userSelection: data,
                userCardDrawn: true,
            })
        }
    }

    makeOppoSelection(data){
        if(this.state.oppoSelection === null){
            this.setState({
                oppoSelection: data,
                oppoCardDrawn: true,
            })
        }
    }

    resetBattleField(){
        this.setState({
            userSelection: null,
            oppoSelection: null,
            userCardDrawn: false,
            oppoCardDrawn: false,
        })
    }

    render(){
        return(
            <div className = 'game-room'>
                <BattleField userSelection = {this.state.userSelection} oppoSelection = {this.state.oppoSelection} resetBattleField = {this.resetBattleField} />
                <h3>User's Card</h3>
                <UsersHands className = 'user-hand' select = {this.makeUserSelection} data = {this.state.userCardData} cardDrawn = {this.state.userCardDrawn} />
                <h3>Opponent's Card</h3>
                <UsersHands className = 'oppo-hand' select = {this.makeOppoSelection} data = {this.state.oppoCardData} cardDrawn = {this.state.oppoCardDrawn} />
            </div>
        )
    }
}

export default GameRoom;