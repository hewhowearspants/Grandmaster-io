import React from 'react';
 import { Link } from 'react-router-dom';

const Header = (props) => {
  return(
    <header>
      <div className="header">Grandmaster
      <ul>
        {(props.currentPage === 'game' || !props.auth) ? '' : <li onClick={()=>props.setCurrentPage('game')}><Link to = '/joingame'>Join Game</Link></li>}
        {(props.currentPage === 'dashboard' || !props.auth) ? '' : <li onClick={()=>props.setCurrentPage('dashboard')}><Link to='/user'>User Dashboard</Link></li>}
        {props.auth ? <li onClick={props.logOut}><Link to='/'>Logout</Link></li> : '' }
      </ul>
      </div>
      </header>
    )
  }

export default Header;
