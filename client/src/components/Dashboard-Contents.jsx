import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import UserCards from './UserCards';

class DashboardContents extends Component {  
  // renderCardCollection() {
  //   if (this.props.cards) {
  //     return (this.props.cards.map((card) => {
  //         return (
  //           <div className='card'>
  //             <p>{card.name}</p>
  //             <p>{card.class}</p>
  //           </div>
  //         )
  //     }))
  //   } else return <h2>Loading</h2>
  // }
  
  render() {
    return (
      <Router>
        <div className='dashboard-contents'>
          {/* {this.renderCardCollection()} */}
          {/* <Route path='/user/card' render={() => <UserCards />} /> */}
          <UserCards />
        </div>
      </Router>
    )
  }
}

export default DashboardContents;