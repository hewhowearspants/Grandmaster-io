import React, { Component } from 'react';
import axios from 'axios';
import BattleField from './BattleField';
import UsersHands from './UsersHands';
import ChatBox from './ChatBox';
import io from 'socket.io-client';

const socket = io('http://localhost:3001')

class GameRoom extends Component {
    constructor() {
        super();
        this.state = {
            userCardData: null,
            oppoNameData: null,
            userNameData: null,
            oppoCardData: null,
            userSelection: null,
            oppoSelection: null,
            userCardDrawn: false,
            oppoCardDrawn: false,
            cardsInField: 0,
            messages: [],
            text: '',
            users: [],
            joined: false,
            playersFull: false,
            playerData: null,
        }
        this.makeUserSelection = this.makeUserSelection.bind(this);
        this.makeOppoSelection = this.makeOppoSelection.bind(this);
        this.resetBattleField = this.resetBattleField.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    componentDidMount() {
        socket.emit('join room', {
            room: this.props.id,
            username: this.props.user.username,
            displayName: this.props.user.display_name,
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
        socket.on('load users', (users) => {
            console.log('got users'+ JSON.stringify(users));
            this.setState({
                users: users,
            })
        })
        socket.on('load players', (playerData) => {
            console.log('got players' + JSON.stringify(playerData));
            if(playerData.length === 1) {
                if(playerData[0].username !== this.props.user.username) {
                    this.setState({
                        oppoCardData: playerData[0].userCards,
                        oppoNameData: playerData[0].username,
                    })
                }
            } else if(playerData.length === 2) {
                if(playerData[0].username !== this.props.user.username && playerData[1].username !== this.props.user.username) {
                    this.setState({
                        oppoCardData: playerData[0].userCards,
                        oppoNameData: playerData[0].username,
                        userCardData: playerData[1].userCards,
                        userNameData: playerData[1].username,
                    });
                } else if(playerData[0].username === this.props.user.username) {
                    this.setState({
                        oppoCardData: playerData[1].userCards,
                        oppoNameData: playerData[1].username,
                    })
                } else if(playerData[1].username === this.props.user.username) {
                    this.setState({
                        oppoCardData: playerData[0].userCards,
                        oppoNameData: playerData[0].username,
                    })
                }
            }
        })
        socket.on('players full', () => {
            this.setState({
                playersFull: true,
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
        this.setState({
            userNameData: null,
            userCardData: null,
        })
        socket.emit('leave room', {
            room: this.props.id,
            username: this.props.user.username,
            opponame: this.state.oppoNameData,
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

    joinGame() {
        const userCardsCopy = [...this.props.userCards];
        const userChoice = [];
        for(var i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random()*(userCardsCopy.length));
            userChoice.push(userCardsCopy.splice(randomIndex, 1)[0]);
        };
        this.setState({
            joined: true,
            userNameData: this.props.user.username,
            userCardData: userChoice,
        })
        socket.emit('join game', {
            userCards: userChoice,
            username: this.props.user.username,
            room: this.props.id,
            opponame: this.state.oppoNameData
        })
        
    }

    render(){
        return(
            <div className = 'game-room'>
                <img className='logo' src="../images/compass.png" alt='' />
                <div className="users-hand">
                    <h3>{this.state.userNameData ? `${this.state.userNameData}'s Card` : 'Waiting Player'}</h3>
                    {this.state.userCardData ? <UsersHands className = 'user-hand' 
                                                            playersFull = {this.state.playersFull} 
                                                            joinGame = {this.joinGame} 
                                                            joined = {this.state.joined} 
                                                            select = {this.makeUserSelection} 
                                                            cardData = {this.state.userCardData} 
                                                            cardDrawn = {this.state.userCardDrawn} /> : ''}
                </div>

                <div className="mid-section">
                    <BattleField userSelection = {this.state.userSelection} oppoSelection = {this.state.oppoSelection} resetBattleField = {this.resetBattleField} cardsInField={this.state.cardsInField}/>
                    {!this.state.joined && !this.state.playersFull ? <button onClick={this.joinGame} disabled={this.state.playersFull ? true : false }>Join Game!</button> : ''}
                    <div className='message-box'>
                        <div className='message-display'>
                            {this.state.messages ? this.state.messages.map((message)=>{
                                return <p key={this.state.messages.indexOf(message)}>{message.displayName}: {message.message}</p>
                                }) : '' }
                        </div>
                        <div className='message-input'>
                            <form onSubmit={this.handleMessageSubmit}>
                                <input type='text' onChange={this.handleInputChange} />
                                <button type='submit'>Send!</button>
                            </form>
                        </div>
                    </div>
                
                </div>

                 <div className="oppo-hand">
                    <h3>{this.state.oppoNameData ? `${this.state.oppoNameData}'s Card` : 'Waiting Player'}</h3>
                    <UsersHands className = 'oppo-hand' select = {this.makeOppoSelection} data = {this.state.oppoCardData} cardDrawn = {this.state.oppoCardDrawn} />
                </div>
                
                {/* <ChatBox messages = {this.state.messages} /> */}
                
            </div>
        )
    }
}

export default GameRoom;