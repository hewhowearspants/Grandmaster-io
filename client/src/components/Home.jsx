import React from "react";

import Login from "./Login";

// the login screen! user redirects to here if not logged in
export const Home = ({ handleLoginSubmit }) => (
  <div className="home">
    <h1>Welcome, Grandmaster</h1>
    <ul>
      <li>
        <Login handleLoginSubmit={handleLoginSubmit} />
      </li>
    </ul>
  </div>
);
