import React, { Component } from 'react';

class DashboardNav extends Component {
  render() {
    return (
      <div className='dashboard-nav'>
        <ul>
          <li onClick={() => this.props.setContent('user-cards')}>Your Cards</li>
          <li onClick={() => this.props.setContent('card-collection')}>Collection</li>
          <li onClick={() => this.props.setContent('get-new-card')}>Get New Card</li>
          <li onClick={() => this.props.setContent('leaderboard')}>Leaderboard</li>
        </ul>
      </div>
    )
  }
}

export default DashboardNav;
