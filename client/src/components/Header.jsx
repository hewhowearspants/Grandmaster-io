import React from "react";
import { Link } from "react-router-dom";

// header component, contains nav between game lobby and user dashboard.
// also logout button if logged in
export const Header = ({ user, auth, currentPage, logOut, setCurrentPage }) => (
  <header className="header">
    Grandmaster
    {auth && (
      <ul>
        <li className="username">{user.display_name}</li>
        <li className="username">Wins: {user.wins}</li>
        <li className="username">Currency: {user.currency}</li>
        {currentPage !== "game" && (
          <li onClick={() => setCurrentPage("game")}>
            <Link to="/joingame">Join Game</Link>
          </li>
        )}
        {currentPage !== "dashboard" && (
          <li onClick={() => setCurrentPage("dashboard")}>
            <Link to="/user">User Dashboard</Link>
          </li>
        )}
        <li onClick={logOut}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    )}
  </header>
);
