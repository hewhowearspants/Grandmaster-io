import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameLobby extends Component {
    render() {
        return (
            <div className='game-lobby'>
                <div className='game-room'><Link to='/joingame/1'>Room 1</Link></div>
                <div className='game-room'><Link to='/joingame/2'>Room 2</Link></div>
                <div className='game-room'><Link to='/joingame/3'>Room 3</Link></div>
            </div>
        )
    }
}

export default GameLobby;