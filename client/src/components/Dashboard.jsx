import React, { Component } from 'react';
import axios from 'axios';

import DashboardNav from './Dashboard-Nav';
import DashboardContents from './Dashboard-Contents';

class Dashboard extends Component {  
  constructor() {
    super();

    this.state = {
      leaderInfo: null,
    };
  }

  componentDidMount() {
    axios.get('/user/leaderboard')
    .then(res => {
        console.log(res.data.data)
        this.setState({
            leaderInfo: res.data.data,
        })
    })
    .catch(err => 
      console.log(err));
  }
  
  render() {
    return (
      <div className = 'dashboard'>
        <DashboardNav setContent = {this.props.setContent} currentContent = {this.props.currentContent} />
        <DashboardContents 
          cards = {this.props.cards} 
          userCards = {this.props.userCards} 
          newCard = {this.props.newCard} 
          currentContent = {this.props.currentContent} 
          getNewUserCard = {this.props.getNewUserCard} 
          deleteUserCard = {this.props.deleteUserCard}
          userSubmitEdit = {this.props.userSubmitEdit} 
          userSelectedCardToEdit = {this.props.userSelectedCardToEdit} 
          currentCardId = {this.props.currentCardId}
          userSubmitNewName = {this.props.userSubmitNewName}
          userSelectedNameToEdit = {this.props.userSelectedNameToEdit}
          currentUserId = {this.props.currentUserId}
          user = {this.props.user}
          email = {this.props.email}
          display_name = {this.props.display_name}
          deleteUser = {this.props.deleteUser}
          leaderInfo = {this.state.leaderInfo}
        />
      </div>
    )
  }
}

export default Dashboard;