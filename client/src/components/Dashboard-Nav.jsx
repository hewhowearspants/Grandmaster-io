import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardNav extends Component {
  render() {
    return (
      <div className='dashboard-nav'>
        <ul>
          <li className={this.props.currentContent === 'user-cards' ? 'selected' : ''} onClick={() => this.props.setContent('user-cards')}>Your Cards</li>
          <li className={this.props.currentContent === 'card-collection' ? 'selected' : ''}onClick={() => this.props.setContent('card-collection')}>Collection</li>
          <li className={this.props.currentContent === 'get-new-card' ? 'selected' : ''}onClick={() => this.props.setContent('get-new-card')}>Get New Card</li>
          <li className={this.props.currentContent === 'leaderboard' ? 'selected' : ''}onClick={() => this.props.setContent('leaderboard')}>Leaderboard</li>
          <li><Link to = '/joingame'>Join Game</Link></li>
        </ul>
      </div>
    )
  }
}

export default DashboardNav;
