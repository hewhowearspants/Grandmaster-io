import React from "react";
import { Link } from "react-router-dom";

// header component, contains nav between game lobby and user dashboard.
// also logout button if logged in
const Header = props => {
  const { auth, user, currentPage, setCurrentPage, logOut } = props;

  return (
    <header className="header">
      <h2>Grandmaster</h2>
      {auth ? (
        <ul>
          <li className="username">{user.display_name}</li>
          <li className="username">Wins: {user.wins}</li>
          <li className="username">Currency: {user.currency}</li>
          {currentPage === "game" || !auth ? null : (
            <li onClick={() => setCurrentPage("game")}>
              <Link to="/joingame">Join Game</Link>
            </li>
          )}
          {currentPage === "dashboard" || !auth ? null : (
            <li onClick={() => setCurrentPage("dashboard")}>
              <Link to="/user">User Dashboard</Link>
            </li>
          )}
          <li onClick={logOut}>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      ) :
        <ul>
          {window.location.pathname !== '/register' ? <li><Link to="/register">Register</Link></li> : <li><Link to="/">Login</Link></li>}
        </ul>
      }
    </header>
  )
};

export default Header;
