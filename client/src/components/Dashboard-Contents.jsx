import React from "react";

// import { UserCards } from "./UserCards";
import NewCard from "./NewCard";
import { Leaderboard } from "./Leaderboard";
import CardCollection from "./CardCollection";
import UserProfile from "./UserProfile"; 

// the container for all of the pages in the user dashboard
// changes based on the currentContent state in App.js
export const DashboardContents = props => (
  <div className="dashboard-contents">
    {props.currentContent === "user-cards" ? (
      <CardCollection classname={'user-cards'} collection={props.userCards} {...props} />
    ) : props.currentContent === "card-collection" ? (
      <CardCollection classname={'card-collection'} collection={props.cards} {...props} />
    ) : props.currentContent === "get-new-card" ? (
      <NewCard {...props} />
    ) : props.currentContent === "user-profile" ? (
      <UserProfile {...props} />
    ) : props.currentContent === "leaderboard" ? (
      <Leaderboard {...props} />
    ) : null}
  </div>
);
