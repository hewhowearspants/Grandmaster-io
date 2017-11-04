import React, { Component } from "react";

import UserCards from "./UserCards";
import { n } from "./CardCollection";
import NewCard from "./NewCard";
import Leaderboard from "./Leaderboard";
import { CardCollection } from "./CardCollection";
import UserProfile from "./UserProfile";

// the container for all of the pages in the user dashboard
// changes based on the currentContent state in App.js
const DashboardContents = ({
  deleteUserCard,
  userSubmitEdit,
  userSelectedCardToEdit,
  currentCardId,
  currentContent,
  newCard,
  getNewUserCard,
  getNewUserCardPremium,
  userCards,
  userSubmitNewName,
  userSelectedNameToEdit,
  currentUserId,
  cards,
  user,
  email,
  display_name,
  deleteUser,
  leaderInfo
}) => (
  <div className="dashboard-contents">
    {currentContent === "user-cards" ? (
      <UserCards
        userCards={userCards}
        deleteUserCard={deleteUserCard}
        userSubmitEdit={userSubmitEdit}
        userSelectedCardToEdit={userSelectedCardToEdit}
        currentCardId={currentCardId}
      />
    ) : currentContent === "card-collection" ? (
      <CardCollection cards={cards} />
    ) : currentContent === "get-new-card" ? (
      <NewCard
        newCard={newCard}
        getNewUserCard={getNewUserCard}
        getNewUserCardPremium={getNewUserCardPremium}
        userCards={userCards}
      />
    ) : currentContent === "user-profile" ? (
      <UserProfile
        userSubmitNewName={userSubmitNewName}
        userSelectedNameToEdit={userSelectedNameToEdit}
        currentUserId={currentUserId}
        user={user}
        email={email}
        display_name={display_name}
        deleteUser={deleteUser}
      />
    ) : currentContent === "leaderboard" ? (
      <Leaderboard leaderInfo={leaderInfo} />
    ) : null}
  </div>
);

export default DashboardContents;
