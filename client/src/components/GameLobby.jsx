import React from "react";
import { Link } from "react-router-dom";

// the component containing the 3 game rooms.
// each room displays the current player/user count pulled from firebase
export const GameLobby = ({ players, users }) => (
  <div className="game-lobby">
    <h1>Pick A Room!</h1>
    <div className="game-room-wrapper">
      <Link to="/joingame/1">
        <div className="game-room">
          <h2>1</h2>
          <p>Players: {players[1]} / 2</p>
          <p>Users: {users[1]}</p>
        </div>
      </Link>
      <Link to="/joingame/2">
        <div className="game-room">
          <h2>2</h2>
          <p>Players: {players[2]} / 2</p>
          <p>Users: {users[2]}</p>
        </div>
      </Link>
      <Link to="/joingame/3">
        <div className="game-room">
          <h2>3</h2>
          <p>Players: {players[3]} / 2</p>
          <p>Users: {users[3]}</p>
        </div>
      </Link>
    </div>
  </div>
);
