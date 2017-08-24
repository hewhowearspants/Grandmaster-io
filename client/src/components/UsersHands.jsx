import React, { Component } from 'react';
import HandCardSingle from './HandCardSingle';

class UsersHands extends Component {
    render() {
        return (
            <div className="card-hands">
                {this.props.data ?
                    this.props.data.map(data => {
                        return <HandCardSingle select = {() => this.props.select(data)} key = {this.props.data.indexOf(data)} card = {data} makeSelection = {this.makeSelection} cardDrawn = {this.props.cardDrawn} />
                    }) : ''
                }
            </div>
        )
    }
}

export default UsersHands;