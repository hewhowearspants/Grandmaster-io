import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// the component containing the 3 game rooms. 
// each room displays the current player/user count pulled from firebase
class GameLobby extends Component {
    render() {
        return (
            <div className = 'game-lobby'>
                <h1>Pick A Room!</h1>
                <div className='game-room-wrapper'>
                <Link to='/joingame/1'>
                    <div className='game-room'>
                        <h2>1</h2>
                        <p>Players: {this.props.players[1]} / 2</p>
                        <p>Users: {this.props.users[1]}</p>
                    </div>
                </Link>
                <Link to='/joingame/2'>
                    <div className='game-room'>
                        <h2>2</h2>
                        <p>Players: {this.props.players[2]} / 2</p>
                        <p>Users: {this.props.users[2]}</p>
                    </div>
                </Link>
                <Link to='/joingame/3'>
                    <div className='game-room'>
                        <h2>3</h2>
                        <p>Players: {this.props.players[3]} / 2</p>
                        <p>Users: {this.props.users[3]}</p>
                    </div>
                </Link>
                </div>
            </div>
        )
    }
}

export default GameLobby;