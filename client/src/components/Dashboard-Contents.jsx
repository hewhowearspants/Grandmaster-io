import React, { Component } from 'react';

class DashboardContents extends Component {  
  renderCardCollection() {
    if (this.props.cards) {
      return (this.props.cards.map((card) => {
          return (
            <div className='card'>
              <p>{card.name}</p>
              <p>{card.class}</p>
            </div>
          )
      }))
    } else return <h2>Loading</h2>
  }
  
  render() {
    return (
      <div className='dashboard-contents'>
        {this.renderCardCollection()}
      </div>
    )
  }
}

export default DashboardContents;