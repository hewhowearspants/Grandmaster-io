import React, { Component } from 'react';

import UserCards from './UserCards';
import CardCollection from './CardCollection';
import NewCard from './NewCard';
import Leaderboard from './Leaderboard';

class DashboardContents extends Component {  
  
  render() {
    return (
      <div className='dashboard-contents'>
        {this.props.currentContent === 'user-cards' ? <UserCards userCards={this.props.userCards} /> : ''}
        {this.props.currentContent === 'card-collection' ? <CardCollection cards={this.props.cards} /> : ''}
        {this.props.currentContent === 'get-new-card' ? <NewCard /> : ''}
        {this.props.currentcontent === 'leaderboard' ? <Leaderboard /> : ''}
      </div>
    )
  }
}

export default DashboardContents;