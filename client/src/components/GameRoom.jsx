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
            cardsInField: 0,
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
                cardsInField: this.state.cardsInField + 1,
            })
        }
    }

    makeOppoSelection(data){
        if(this.state.oppoSelection === null){
            this.setState({
                oppoSelection: data,
                oppoCardDrawn: true,
                cardsInField: this.state.cardsInField + 1,
            })
        }
    }

    resetBattleField(){
        this.setState({
            userSelection: null,
            oppoSelection: null,
            userCardDrawn: false,
            oppoCardDrawn: false,
            cardsInField: 0,
        })
    }

    render(){
        return(
            <div className = 'game-room'>
                <h3>User's Card</h3>
                <UsersHands className = 'user-hand' select = {this.makeUserSelection} data = {this.state.userCardData} cardDrawn = {this.state.userCardDrawn} />
                <BattleField userSelection = {this.state.userSelection} oppoSelection = {this.state.oppoSelection} resetBattleField = {this.resetBattleField} cardsInField={this.state.cardsInField}/>
                <h3>Opponent's Card</h3>
                <UsersHands className = 'oppo-hand' select = {this.makeOppoSelection} data = {this.state.oppoCardData} cardDrawn = {this.state.oppoCardDrawn} />
            </div>
        )
    }
}

export default GameRoom;