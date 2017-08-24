import React, { Component } from 'react';
import axios from 'axios';
import BattleField from './BattleField';
import UsersHands from './UsersHands';
import ChatBox from './ChatBox';
import io from 'socket.io-client';

const socket = io('http://localhost:3001')

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
            messages: [],
            text: '',
        }
        this.makeUserSelection = this.makeUserSelection.bind(this);
        this.makeOppoSelection = this.makeOppoSelection.bind(this);
        this.resetBattleField = this.resetBattleField.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
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
        socket.emit('join room', {
            room: this.props.id,
        });
        socket.on('receive message', (data) => {
            console.log(data.message);
            const updatedMessages = [...this.state.messages];
            updatedMessages.push(data.message);
            this.setState({
                messages: updatedMessages,
            })
        });
    }

    handleMessageSubmit(event) {
        event.preventDefault();
        console.log(this.state.text);
        socket.emit('message', {
            message: {displayName: 'some douchebag', 
                        message: this.state.text},
            room: this.props.id,
        })
        event.target.reset();
    }

    handleInputChange(event) {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
            text: event.target.value,
        })
    }

    componentWillUnmount() {
        socket.emit('leave room', {
            room: this.props.id,
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
                {/* <ChatBox messages = {this.state.messages} /> */}
                <div className='message-box'>
                <div className='message-display'>
                    {this.state.messages.map((message)=>{
                        return <p>{message.displayName}: {message.message}</p>
                        })}
                </div>
                <div className='message-input'>
                    <form onSubmit={this.handleMessageSubmit}>
                        <input type='text' onChange={this.handleInputChange} />
                        <button type='submit'>Send!</button>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default GameRoom;