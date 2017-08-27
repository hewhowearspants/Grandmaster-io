import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameLobby extends Component {
    render() {
        return (
            <div className = 'game-lobby'>
                <h1>Pick A Room!</h1>
                <div className='game-room'>
                    <Link to='/joingame/1'>Room 1</Link>
                    <p>Users: {this.props.users[1]}</p>
                </div>
                <div className='game-room'>
                    <Link to='/joingame/2'>Room 2</Link>
                    <p>Users: {this.props.users[2]}</p>
                </div>
                <div className='game-room'>
                    <Link to='/joingame/3'>Room 3</Link>
                    <p>Users: {this.props.users[3]}</p>
                </div>
            </div>
        )
    }
}

export default GameLobby;