import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return(
    <header>
      <div className="header">DAA DREAAAM TEAAMMMM</div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Log In</Link></li>
          <li><Link to ='/register'>Register</Link></li>
        </ul>
        </nav>
      </header>
    )
  }

export default Header;
