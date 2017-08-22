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
        <DashboardNav setContent={this.setContent} />
        <DashboardContents cards={this.props.cards} userCards={this.props.userCards} currentContent={this.state.currentContent}/>
      </div>
    )
  }
}

export default Dashboard;