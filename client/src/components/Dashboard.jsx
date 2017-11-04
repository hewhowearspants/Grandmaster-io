import React, { Component } from "react";
import axios from "axios";

import { DashboardNav } from "./Dashboard-Nav";
import { DashboardContents } from "./Dashboard-Contents";

class Dashboard extends Component {
  state = { leaderInfo: null };

  // state stored for leaderboard component
  async componentDidMount() {
    try {
      const res = await axios.get("/user/leaderboard");
      console.log(res.data.data);
      this.setState({
        leaderInfo: res.data.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  // the container component for the user dashboard. lots and lots of props from App.js
  render() {
    const {
      setContent,
      currentContent,
      cards,
      newCard,
      userCards,
      getNewUserCard,
      getNewUserCardPremium,
      deleteUser,
      deleteUserCard,
      currentCardId,
      userCardData,
      userSubmitEdit,
      userSelectedNameToEdit,
      email,
      user,
      userSubmitNewName,
      currentUserId,
      display_name,
      userSelectedCardToEdit
    } = this.props;
    return (
      <div className="dashboard">
        <DashboardNav setContent={setContent} currentContent={currentContent} />
        <DashboardContents
          cards={cards}
          userCards={userCards}
          newCard={newCard}
          currentContent={currentContent}
          getNewUserCard={getNewUserCard}
          getNewUserCardPremium={getNewUserCardPremium}
          deleteUserCard={deleteUserCard}
          userSubmitEdit={userSubmitEdit}
          userSelectedCardToEdit={userSelectedCardToEdit}
          currentCardId={currentCardId}
          userSubmitNewName={userSubmitNewName}
          userSelectedNameToEdit={userSelectedNameToEdit}
          currentUserId={currentUserId}
          user={user}
          email={email}
          display_name={display_name}
          deleteUser={deleteUser}
          leaderInfo={this.state.leaderInfo}
          userCardData={userCardData}
        />
      </div>
    );
  }
}

export default Dashboard;
