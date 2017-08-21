import React, { Component } from 'react';

class DashboardNav extends Component {  
  render() {
    return (
      <div className='dashboard-nav'>
        <ul>
          <li>User Cards</li>
          <li>Card Collection</li>
          <li>Get New Card</li>
          <li>Leaderboard</li>
        </ul>
      </div>
    )
  }
}

export default DashboardNav;