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

    componentDidMount(){
        // axios.get('/usercard/start')
        // .then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         userCardData: res.data.userCard,
        //         oppoCardData: res.data.opponentCard,
        //     })
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        const userCardsCopy = [...this.props.userCards];
        const userChoice = [];
        for(var i=0; i<5; i++){
            const randomIndex = Math.floor(Math.random()*(userCardsCopy.length));
            userChoice.push(userCardsCopy.splice(randomIndex, 1)[0]);
        };
        this.setState({
            userCardData: userChoice,
        });
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
        socket.on('load messages', (messages) => {
            console.log('got messages'+ JSON.stringify(messages));
            this.setState({
                messages: messages,
            })
        })
    }

    handleMessageSubmit(event) {
        event.preventDefault();
        console.log(this.state.text);
        socket.emit('message', {
            message: {displayName: this.props.user.display_name,
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
                <img className='logo' src="../images/compass.png" alt='' />
                <div className="users-hand">
                    <h3>User's Card</h3>
                    <UsersHands className = 'user-hand' select = {this.makeUserSelection} data = {this.state.userCardData} cardDrawn = {this.state.userCardDrawn} />
                </div>
                <BattleField userSelection = {this.state.userSelection} oppoSelection = {this.state.oppoSelection} resetBattleField = {this.resetBattleField} cardsInField={this.state.cardsInField}/>

                 <div className="oppo-hand">
                    <h3>Opponent's Card</h3>
                    <UsersHands className = 'oppo-hand' select = {this.makeOppoSelection} data = {this.state.oppoCardData} cardDrawn = {this.state.oppoCardDrawn} />
                </div>
                
                {/* <ChatBox messages = {this.state.messages} /> */}
                <div className='message-box'>
                <div className='message-display'>
<<<<<<< HEAD
                    {this.state.messages.map((message)=>{
                        return <p key={this.state.messages.indexOf(message)}>{message.displayName}: {message.message}</p>
                        })}
=======
                    {this.state.messages ? this.state.messages.map((message)=>{
                        return <p key={this.state.messages.indexOf(message)}>{message.displayName}: {message.message}</p>
                        }) : '' }
>>>>>>> 9e069ec1d5c1321725e974aa6d12c28bb3950427
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