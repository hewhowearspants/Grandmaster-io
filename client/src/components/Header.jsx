import React from 'react';
 import { Link } from 'react-router-dom';

const Header = (props) => {
  return(
    <header>
      <div className="header">Grandmaster
      <ul>
        {props.auth ? <li><Link to = '/joingame'>Join Game</Link></li> : ''}
        {props.auth ? <li onClick={props.logOut}>Logout</li> : '' }
      </ul>
      </div>
      </header>
    )
  }

export default Header;
