import React from "react";

// the nav component of the dashboard, sets the currentContent in App.js,
// which sets which content component to display
export const DashboardNav = ({ currentContent, setContent }) => (
  <div className="dashboard-nav">
    <ul>
      <h1>Dashboard</h1>
      <li
        className={currentContent === "user-cards" ? "selected" : null}
        onClick={() => setContent("user-cards")}
      >
        Your Cards
      </li>
      <li
        className={currentContent === "card-collection" ? "selected" : null}
        onClick={() => setContent("card-collection")}
      >
        Collection
      </li>
      <li
        className={currentContent === "get-new-card" ? "selected" : null}
        onClick={() => setContent("get-new-card")}
      >
        Get New Card
      </li>
      <li
        className={currentContent === "leaderboard" ? "selected" : null}
        onClick={() => setContent("leaderboard")}
      >
        Leaderboard
      </li>
      <li
        className={currentContent === "user-profile" ? "selected" : null}
        onClick={() => setContent("user-profile")}
      >
        Your Profile
      </li>
    </ul>
  </div>
);
