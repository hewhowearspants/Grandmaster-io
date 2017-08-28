import React, { Component } from 'react';
import BattleField from './BattleField';
import UsersHands from './UsersHands';
import io from 'socket.io-client';

// initializes socket, but does not connect yet
var socket;

// THE GAME ROOM, where all the game magic happens
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
            userHp: 20,
            oppoHp: 20,
            round: 1,
            winner: null,
            confirmed: false,
        }
        
    }

    // CONTAINS ALL socket.on LISTENERS
    componentDidMount() {
        // ok, now connect to server
        socket = io.connect();

        // lets the server know what room they are in and who they are
        socket.emit('join room', {
            room: this.props.id,
            username: this.props.user.username,
            displayName: this.props.user.display_name,
        });
        // when receiving a new message, adds to messages stored in state
        socket.on('receive message', (data) => {
            console.log(data.message);
            const updatedMessages = [...this.state.messages];
            updatedMessages.push(data.message);
            this.setState({
                messages: updatedMessages,
            })
        });
        // when user joins room, loads message log from server so they can get
        // caught up, stores in state
        socket.on('load messages', (messages) => {
            console.log('got messages');
            this.setState({
                messages: messages,
            })
        })
        // when user joins room, loads user list from server, stores in state
        socket.on('load users', (users) => {
            console.log(`got ${users.length} users ` + JSON.stringify(users));
            this.setState({
                users: users,
            })
        })
        // gets current players from server. used for both when user joins room
        // and when there are changes to players (new cards, etc)
        // this card data is scrubbed on the server so they are not sending actual
        // card information (opponent could just check the console to see it)
        socket.on('load players', (playerData) => {
            console.log('got players' + JSON.stringify(playerData));
            // if nobody is playing, clear player information
            if(playerData.length === 0) {
                this.setState({
                    oppoCardData: null,
                    oppoNameData: null,
                    userCardData: null,
                    userNameData: null,
                    playersFull: false,
                })
            // if somebody is playing, checks if one of them is the player
            // if so, only applies opponent card data so player can still see
            // their own card data
            } else if(playerData.length === 1) {
                this.setState({
                    playersFull: false,
                })
                if(playerData[0].username !== this.props.user.username) {
                    this.setState({
                        oppoCardData: playerData[0].userCards,
                        oppoNameData: playerData[0].username,
                    })
                    if (this.state.userNameData) {
                        this.setState({
                            userCardData: null,
                            userNameData: null,
                        })
                    }
                } else {
                    this.setState({
                        oppoCardData: null,
                        oppoNameData: null,
                    })
                }
            // if two people are playing, checks if one of them is the player.
            // only applies scrubbed data to opponent if so, otherwise, applies
            // scrubbed data to both so spectators can't see either players'
            // cards
            } else if(playerData.length === 2) {
                if(playerData[0].username !== this.props.user.username && playerData[1].username !== this.props.user.username) {
                    this.setState({
                        oppoCardData: playerData[0].userCards,
                        oppoNameData: playerData[0].username,
                        userCardData: playerData[1].userCards,
                        userNameData: playerData[1].username,
                    });
                    console.log('this user is'+this.props.user.username)
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
        // gets selected card data for when someone selects a card
        socket.on('load cards', data => {
            if(this.state.oppoNameData === data.username){
                this.setState({
                    oppoSelection: data.userSelection,
                })
            }
        })
        // if server says there are already two players, sets playersFull to true
        // so nobody else can Join Game
        socket.on('players full', () => {
            this.setState({
                playersFull: true,
            })
        });
        // when server says both players have clicked Continue, resets battlefield
        socket.on('next round', () => {
            this.resetBattleField();
        });
        // gets the result of the card fight from server, reflects new HP for players
        socket.on('fight', (data) => {
            console.log(data)
            if(data[0].username === this.state.userNameData && data[1].username !== this.props.user.username){
                this.setState({
                    userHp: data[0].userHp,
                    oppoHp: data[1].userHp,
                    userSelection: data[0].userSelection,
                    oppoSelection: data[1].userSelection,
                });
            }else if(data[1].username === this.state.userNameData && data[0].username !== this.props.user.username){
                this.setState({
                    userHp: data[1].userHp,
                    oppoHp: data[0].userHp,
                    userSelection: data[1].userSelection,
                    oppoSelection: data[0].userSelection,
                });
            }else if(data[0].username !== this.props.user.username && data[1].username !== this.props.user.username){
                this.setState({
                    oppoHp: data[0].userHp,
                    userHp: data[1].userHp,
                    oppoSelection: data[0].userSelection,
                    userSelection: data[1].userSelection,
                });
            };
            // if it's the last round, see who ended up winning!
            if (this.state.round === 5) {
                this.getWinner();
                this.updateWins();
            };
        });
    }

    // sends message to server when submitting, resets
    handleMessageSubmit = (event) => {
        event.preventDefault();
        socket.emit('message', {
            message: {displayName: this.props.user.display_name,
                message: this.state.text},
                room: this.props.id,
        })
        event.target.reset();
    }

    // sets current contents of chat box input field to state
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            text: event.target.value,
        })
    }

    // lets server know when they are leaving the room
    componentWillUnmount = () => {
        this.setState({
            userNameData: null,
            userCardData: null,
        })
        socket.emit('leave room', {
            room: this.props.id,
            username: this.props.user.username,
            opponame: this.state.oppoNameData,
        })
        if (this.state.joined) {
            this.setState({
                joined: false,
            })
        }
        // disconnect from server
        socket.io.disconnect();
    }

    // sets the selected card to state, remove from users playing cards
    // (previously did not do, so user could keep playing that Queen they have!)
    makeUserSelection = (selectedCard) => {
        if(this.state.userNameData === this.props.user.username){
            if(this.state.confirmed === false){
                let updatedCards = [...this.state.userCardData];
                let deleteIndex;
                updatedCards.forEach((card, index) => {
                    if (card.id === selectedCard.id) {
                        deleteIndex = index;
                    }
                })
                updatedCards.splice(deleteIndex, 1);
                this.setState({
                    userSelection: selectedCard,
                    userCardDrawn: true,
                    userCardData: updatedCards,
                    cardsInField: this.state.cardsInField + 1,
                })
            }
        }
    }

    // WE STOPPED USING THIS WHEN WE IMPLEMENTED SOCKET.IO
    // USED SO WE COULD SELECT OPPONENT CARD TO TEST GAME LOGIC
    // makeOppoSelection = (data) => {
    //     if(this.state.oppoSelection === null){
    //         this.setState({
    //             oppoSelection: data,
    //             oppoCardDrawn: true,
    //             cardsInField: this.state.cardsInField + 1,
    //         })
    //     }
    // }

    // confirms card selection, lets server know what you selected
    confirmSelection = () => {
        this.setState({
            confirmed: true,
        })
        socket.emit('confirm selection', {
            username: this.state.userNameData,
            selection: this.state.userSelection,
            room: this.props.id,
        })
    }

    // after fight, resets your selection, lets server know you're ready for the next round
    readyToContinue = () => {
        this.setState({
            userSelection: null,
            userCardDrawn: false,
            confirmed: false,
        })
        socket.emit('next round', {
            username: this.state.userNameData,
            room: this.props.id,
        })
    }

    // clears everything from the center part of the game table
    resetBattleField = () => {
        this.setState({
            userSelection: null,
            oppoSelection: null,
            userCardDrawn: false,
            oppoCardDrawn: false,
            confirmed: false,
            cardsInField: 0,
            round: this.state.round + 1,
        })
    }

    // puts user in as a player
    joinGame = () => {
        // picks 5 random playing cards from the users cards
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
        // lets the server know they have joined as a player, and what cards
        // they have
        socket.emit('join game', {
            userCards: userChoice,
            username: this.props.user.username,
            room: this.props.id,
            opponame: this.state.oppoNameData
        })
    }

    // determine who ended up winning based on who has the higher HP
    getWinner = () => {
        if(this.state.userHp > this.state.oppoHp) {
            this.setState({
                winner: this.state.userNameData,
            })
        } else if (this.state.userHp < this.state.oppoHp) {
            this.setState({
                winner: this.state.oppoNameData,
            })
        } else if (this.state.userHp === this.state.oppoHp) {
            this.setState({
                winner: 'Game Tied! Both Players',
            })
        }
    }

    // checks if the winner is the user, and updates their wins and currency (in App.js)
    updateWins = () => {
        if(this.state.userHp <= 0 || this.state.oppoHp <= 0 || this.state.round >= 5){
            if(this.state.winner === this.props.user.username){
                this.props.updateWinsNCurrency();
                console.log('updating in GameRoom'+this.props.user.username)
            }
        }
    }

    render() {
        return(
            <div className = 'game-table'>
                {/* background spinny logo thing */}
                <img className='logo' src="../images/compass.png" alt='' />
                {/* player one */}
                <div className="users-hand">
                    <h3>{this.state.userNameData ? `${this.state.userNameData}` : 'Waiting Player'}</h3>
                    {this.state.userCardData ? <UsersHands className = 'user-hand' 
                                                            playersFull = {this.state.playersFull} 
                                                            joinGame = {this.joinGame} 
                                                            joined = {this.state.joined} 
                                                            select = {this.makeUserSelection} 
                                                            cardData = {this.state.userCardData} 
                                                            cardDrawn = {this.state.userCardDrawn} 
                                                            opponent = {this.state.oppoNameData} /> : ''}
                </div>
                {/* battlefield, contains player info, selected card, chat box */}
                <div className = 'mid-section'>
                    <BattleField userSelection = {this.state.userSelection}
                                 oppoSelection = {this.state.oppoSelection}
                                 resetBattleField = {this.resetBattleField}
                                 cardsInField = {this.state.cardsInField} 
                                 confirmSelection={this.confirmSelection}
                                 userHp = {this.state.userHp}
                                 oppoHp = {this.state.oppoHp}
                                 getBattleLog = {this.getBattleLog}
                                 getWinner = {this.getWinner}
                                 round = {this.state.round}
                                 winner = {this.state.winner}
                                 oppoNameData = {this.state.oppoNameData}
                                 userNameData = {this.state.userNameData}
                                 confirmed = {this.state.confirmed}
                                 joined = {this.state.joined}
                                 updateWins = {this.updateWins}
                                 readyToContinue = {this.readyToContinue} />
                    {!this.state.joined && !this.state.playersFull ? <button onClick = {this.joinGame} disabled = {this.state.playersFull ? true : false }>Join Game!</button> : ''}
                    {/* the chat box! */}
                    <div className='message-box'>
                        <div className='message-display-wrapper'>
                        <div className='message-display'>
                            {this.state.messages ? this.state.messages.map((message)=>{
                                return <p className={!message.displayName ? 'notification' : ''} key={this.state.messages.indexOf(message)}><span>{message.displayName}</span>: {message.message}</p>
                                }) : '' }
                        </div>
                        </div>
                        <div className = 'message-input'>
                            <form onSubmit = {this.handleMessageSubmit}>
                                <input type='text' onChange={this.handleInputChange} />
                                <button type='submit'>SEND</button>
                            </form>
                        </div>
                    </div>
                
                </div>
                {/* player two */}
                 <div className = 'oppo-hand'>
                    <h3>{this.state.oppoNameData ? `${this.state.oppoNameData}` : 'Waiting Player'}</h3>
                    {/* UNUSED, originally used for testing game logic */}
                    {/* <UsersHands className = 'oppo-hand' select = {this.makeOppoSelection} data = {this.state.oppoCardData} cardDrawn = {this.state.oppoCardDrawn} /> */}
                    {this.state.oppoCardData ?
                        this.state.oppoCardData.map(card => {
                            return (
                                <div className = 'card' style={{background: `url(${card.image_url}`, backgroundSize: 'cover'}}>
                                </div>
                            )
                        }) : ''
                    }
                </div>
                
            </div>
        )
    }
}

export default GameRoom;