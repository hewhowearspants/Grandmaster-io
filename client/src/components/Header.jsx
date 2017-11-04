import React from "react";
import { Link } from "react-router-dom";

// header component, contains nav between game lobby and user dashboard.
// also logout button if logged in
export const Header = props => (
  <header className="header">
    Grandmaster
    {props.auth ? (
      <ul>
        <li className="username">{props.user.display_name}</li>
        <li className="username">Wins: {props.user.wins}</li>
        <li className="username">Currency: {props.user.currency}</li>
        <li onClick={props.logOut}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    ) : null}
    {props.currentPage === "game" || !props.auth ? null : (
      <li onClick={() => props.setCurrentPage("game")}>
        <Link to="/joingame">Join Game</Link>
      </li>
    )}
    {props.currentPage === "dashboard" || !props.auth ? null : (
      <li onClick={() => props.setCurrentPage("dashboard")}>
        <Link to="/user">User Dashboard</Link>
      </li>
    )}
  </header>
);
