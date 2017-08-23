import React, { Component } from 'react';

import UserCards from './UserCards';
import CardCollection from './CardCollection';
import NewCard from './NewCard';
import Leaderboard from './Leaderboard';
import UserProfile from './UserProfile';

class DashboardContents extends Component {  
  
  render() {
    return (
      <div className='dashboard-contents'>
        {this.props.currentContent === 'user-cards' ? <UserCards userCards={this.props.userCards} 
                                                        deleteUserCard={this.props.deleteUserCard}
                                                        userSubmitEdit={this.props.userSubmitEdit}
                                                        userSelectedCardToEdit={this.props.userSelectedCardToEdit}
                                                        currentCardId={this.props.currentCardId}/> : ''}
        {this.props.currentContent === 'card-collection' ? <CardCollection cards={this.props.cards} /> : ''}
        {this.props.currentContent === 'get-new-card' ? <NewCard newCard={this.props.newCard} getNewUserCard={this.props.getNewUserCard} /> : ''}
        {this.props.currentContent === 'leaderboard' ? <Leaderboard /> : ''}
        {this.props.currentContent === 'user-profile' ? <UserProfile userSubmitNewName={this.props.userSubmitNewName}
                                                                    userSelectedNameToEdit={this.props.userSelectedNameToEdit} 
                                                                    currentUserId={this.props.currentUserId}
                                                                    user={this.props.user}
                                                                    email={this.props.email}
                                                                    display_name={this.props.display_name} /> : ''}
      </div>
    )
  }
}

export default DashboardContents;