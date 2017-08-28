import React, { Component } from 'react';

import UserCards from './UserCards';
import CardCollection from './CardCollection';
import NewCard from './NewCard';
import Leaderboard from './Leaderboard';
import UserProfile from './UserProfile';

// the container for all of the pages in the user dashboard
// changes based on the currentContent state in App.js
class DashboardContents extends Component {  
  
  render() {
    return (
      <div className='dashboard-contents'>
        {this.props.currentContent === 'user-cards' ? <UserCards userCards = {this.props.userCards} 
                                                        deleteUserCard = {this.props.deleteUserCard}
                                                        userSubmitEdit = {this.props.userSubmitEdit}
                                                        userSelectedCardToEdit = {this.props.userSelectedCardToEdit}
                                                        currentCardId = {this.props.currentCardId}/> : ''}
        {this.props.currentContent === 'card-collection' ? <CardCollection cards = {this.props.cards} /> : ''}
        {this.props.currentContent === 'get-new-card' ? <NewCard newCard = {this.props.newCard} getNewUserCard = {this.props.getNewUserCard} userCards={this.props.userCards} /> : ''}
        {this.props.currentContent === 'user-profile' ? <UserProfile userSubmitNewName = {this.props.userSubmitNewName}
                                                                    userSelectedNameToEdit = {this.props.userSelectedNameToEdit} 
                                                                    currentUserId = {this.props.currentUserId}
                                                                    user = {this.props.user}
                                                                    email = {this.props.email}
                                                                    display_name = {this.props.display_name}
                                                                    deleteUser = {this.props.deleteUser} /> : ''}
        {this.props.currentContent === 'leaderboard' ? <Leaderboard leaderInfo = {this.props.leaderInfo} /> : ''}
      </div>
    )
  }
}

export default DashboardContents;