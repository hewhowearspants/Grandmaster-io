import React, { Component } from 'react';

class BattleField extends Component {

    render() {
        return (
            <div className = 'battlefield'>
                <div className = 'battle-log'>
                    {/* the round count */}
                    <div className = 'round-count'><h2>{!this.props.winner ? (this.props.round ? `Round: ${this.props.round}` : '') : `${this.props.winner} Won!`}</h2></div>
                    <div className = 'hp'><b>{this.props.userNameData ? `${this.props.userNameData} HP: ${this.props.userHp}` : ''}</b>
                        <b>{this.props.oppoNameData ? `${this.props.oppoNameData} HP: ${this.props.oppoHp}` : ''}</b>
                    </div>
                    <div className = 'battlefield-buttons'>
                    {this.props.userSelection && this.props.oppoSelection && this.props.confirmed && !this.props.gameOver ? 
                        <button onClick = {() => this.props.readyToContinue()} 
                                style={{visibility: this.props.userSelection 
                                && this.props.oppoSelection
                                && this.props.confirmed ? 'visible' : 'hidden'}}>Continue!</button> : ''}
                    {this.props.gameOver && this.props.joined ? 
                        <div className = 'game-over-buttons'>
                            <button onClick = {this.props.rematch}>Rematch?</button>
                            <button onClick = {this.props.leaveGame}>Bow Out</button>
                        </div> 
                        : ''}
                    </div>
                </div>
                {/* the selected cards in the center */}
                <div className = 'card-selected'>
                <div className = 'user-selection'>
                {this.props.userSelection ? 
                    <div className = {`card ${this.props.userSelection.class} battlefield_select`}>
                        <div className = 'card-top'>
                            <div className = 'card-name'>
                                <b>{this.props.userSelection.name}</b>
                                <p>{this.props.userSelection.class}</p>
                            </div>
                        </div>
                        {(this.props.joined) ? (this.props.confirmed) ? 
                            '' : <button onClick = {this.props.confirmSelection}>Confirm</button> : ''
                        }
                        <div className='card-numbers'>
                            <p>ATT: <span>{this.props.userSelection.attack}</span></p>
                            <p>DEF: <span>{this.props.userSelection.defense}</span></p>
                        </div>
                    </div>
                : ''}
                </div>
                <div className = 'oppo-selection'>
                {this.props.oppoSelection ?
                    <div className = {`card ${this.props.oppoSelection.class} battlefield_select`}>
                    <div className = 'card-top'>
                        <div className = 'card-name'>
                            <b>{this.props.oppoSelection.name}</b>
                            <p>{this.props.oppoSelection.class}</p>
                        </div>
                    </div>
                    <div className = 'card-numbers'>
                        <p>{this.props.oppoSelection.attack}</p>
                        <p>{this.props.oppoSelection.defense}</p>
                    </div>
                    </div>
                : ''}
                </div>
            </div>
            </div>
        )
    }
}

export default BattleField;