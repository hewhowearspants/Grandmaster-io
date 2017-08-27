import React, { Component } from 'react';

class BattleField extends Component {

    // getBattleLog(){
    //     this.setState({
    //         round: this.props.round + 1,
    //     })
    //     if(this.props.userSelection.defense < this.props.oppoSelection.attack
    //             && this.props.userSelection.attack > this.props.oppoSelection.defense) {
    //         this.setState({
    //             userHp: this.props.userHp + this.props.userSelection.defense - this.props.oppoSelection.attack,
    //             oppoHp: this.props.oppoHp + this.props.oppoSelection.defense - this.props.userSelection.attack,
    //         })
    //     } else if(this.props.userSelection.defense < this.props.oppoSelection.attack
    //         && this.props.userSelection.attack <= this.props.oppoSelection.defense){
    //         this.setState({
    //             userHp: this.props.userHp + this.props.userSelection.defense - this.props.oppoSelection.attack,
    //         })
    //     } else if(this.props.userSelection.defense >= this.props.oppoSelection.attack
    //         && this.props.userSelection.attack > this.props.oppoSelection.defense) {
    //         this.setState({
    //             oppoHp: this.props.oppoHp + this.props.oppoSelection.defense - this.props.userSelection.attack,
    //         })
    //     }
    // }

    // getWinner(){
    //     if(this.props.userHp > this.props.oppoHp) {
    //         this.setState({
    //             winner: 'User'
    //         })
    //     } else if (this.props.userHp < this.props.oppoHp) {
    //         this.setState({
    //             winner: 'Opponent'
    //         })
    //     } else if (this.props.userHp === this.props.oppoHp) {
    //         this.setState({
    //             winner: 'Game Tied! Both Players'
    //         })
    //     }
    // }

    render() {
        return (
            <div className = 'battlefield'>
                <div className = 'battle-log'>
                    <div className = 'round-count'><h2>{(this.props.round <= 5) ? `Round: ${this.props.round}` : `${this.props.winner} Won!`}</h2></div>
                    <div className = 'hp'><b>{this.props.userNameData ? `${this.props.userNameData} HP: ${this.props.userHp}` : ''}</b>
                        <b>{this.props.oppoNameData ? `${this.props.oppoNameData} HP: ${this.props.oppoHp}` : ''}</b>
                    </div>
                    <button onClick = {() => this.props.resetBattleField() & setTimeout(this.props.getWinner,1)} style = {{visibility: this.props.userSelection && this.props.oppoSelection ? 'visible' : 'hidden'}}>Next Round!</button>
                </div>
                <div className = "card-selected">
                {this.props.userSelection ? 
                <div className = 'user-selection'>
                    <div className = {`card ${this.props.userSelection.class} battlefield_select`}>
                        <div className = 'card-top'>
                            <div className = 'card-name'>
                                <b>{this.props.userSelection.name}</b>
                                <p>{this.props.userSelection.class}</p>
                            </div>
                        </div>
                        <div className = 'card-numbers'>
                            <p>{this.props.userSelection.attack}</p>
                            <p>{this.props.userSelection.defense}</p>
                        </div>
                    </div>
                    {this.props.confirmed ? 
                        '' : <button onClick = {this.props.confirmSelection}>Confirm</button>
                    }
                </div>
                : ''}
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
        )
    }
}

export default BattleField;