import React from 'react';
import { Link } from 'react-router-dom';

// header component, contains nav between game lobby and user dashboard.
// also logout button if logged in
const Header = (props) => {
  return (
    <header>
      <div className = 'header'>Grandmaster
      <ul>
        {props.auth ? <li className = 'username'>{props.user.display_name}</li> : '' }
        {props.auth ? <li className = 'username'>Wins: {props.user.wins}</li> : '' }
        {props.auth ? <li className = 'username'>Currency: {props.user.currency}</li> : '' }
        {(props.currentPage === 'game' || !props.auth) ? '' : <li onClick = {() => props.setCurrentPage('game')}><Link to = '/joingame'>Join Game</Link></li>}
        {(props.currentPage === 'dashboard' || !props.auth) ? '' : <li onClick = {() => props.setCurrentPage('dashboard')}><Link to = '/user'>User Dashboard</Link></li>}
        {props.auth ? <li onClick = {props.logOut}><Link to = '/'>Logout</Link></li> : '' }
      </ul>
      </div>
      </header>
    )
  }

export default Header;
