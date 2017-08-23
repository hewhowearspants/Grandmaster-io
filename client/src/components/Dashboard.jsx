import React, { Component } from 'react';

import DashboardNav from './Dashboard-Nav';
import DashboardContents from './Dashboard-Contents';

class Dashboard extends Component {  
  constructor() {
    super();

    this.state = {
      currentContent: 'user-cards',
    };

    this.setContent = this.setContent.bind(this);
  }

  setContent(page) {
    this.setState({
      currentContent: page,
    });
  }
  
  render() {
    return (
      <div className='dashboard'>
        <DashboardNav setContent={this.setContent} currentContent={this.state.currentContent} />
        <DashboardContents 
          cards={this.props.cards} 
          userCards={this.props.userCards} 
          newCard={this.props.newCard} 
          currentContent={this.state.currentContent} 
          getNewUserCard={this.props.getNewUserCard} 
          deleteUserCard={this.props.deleteUserCard}
          userSubmitEdit={this.props.userSubmitEdit} 
          userSelectedCardToEdit={this.props.userSelectedCardToEdit} 
          currentCardId={this.props.currentCardId}
        />
      </div>
    )
  }
}

export default Dashboard;