import React, { Component } from 'react';

import DashboardNav from './Dashboard-Nav';
import DashboardContents from './Dashboard-Contents';

class Dashboard extends Component {  
  render() {
    return (
      <div className='dashboard'>
        <h3>Dashboard</h3>
        <DashboardNav />
        <DashboardContents cards={this.props.cards}/>
      </div>
    )
  }
}

export default Dashboard;