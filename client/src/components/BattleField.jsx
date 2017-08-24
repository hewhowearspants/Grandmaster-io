import React, { Component } from 'react';

class BattleField extends Component {
    constructor(){
        super();
        this.state = {
            userHp: 20,
            oppoHp: 20,
            round: 1,
            winner: null,
        }
        this.getBattleLog = this.getBattleLog.bind(this);
        this.getWinner = this.getWinner.bind(this);
    }

    getBattleLog(){
        this.setState({
            round: this.state.round + 1,
        })
        if(this.props.userSelection.defense < this.props.oppoSelection.attack
                && this.props.userSelection.attack > this.props.oppoSelection.defense){
            this.setState({
                userHp: this.state.userHp + this.props.userSelection.defense - this.props.oppoSelection.attack,
                oppoHp: this.state.oppoHp + this.props.oppoSelection.defense - this.props.userSelection.attack,
            })
        }else if(this.props.userSelection.defense < this.props.oppoSelection.attack
            && this.props.userSelection.attack <= this.props.oppoSelection.defense){
            this.setState({
                userHp: this.state.userHp + this.props.userSelection.defense - this.props.oppoSelection.attack,
            })
        }else if(this.props.userSelection.defense >= this.props.oppoSelection.attack
            && this.props.userSelection.attack > this.props.oppoSelection.defense){
            this.setState({
                oppoHp: this.state.oppoHp + this.props.oppoSelection.defense - this.props.userSelection.attack,
            })
        }
    }

    getWinner(){
        if(this.state.userHp > this.state.oppoHp){
            this.setState({
                winner: 'User'
            })
        }else if(this.state.userHp < this.state.oppoHp){
            this.setState({
                winner: 'Opponent'
            })
        }else if(this.state.userHp === this.state.oppoHp){
            this.setState({
                winner: 'Game Tied! Both Players'
            })
        }
    }

    render() {
        return (
            <div className = 'battlefield'>
                {this.props.userSelection ? 
                    <div className = {`card ${this.props.userSelection.class} battlefield_select`}>
                        <div className='card-top'>
                            <div className='card-name'>
                                <b>{this.props.userSelection.name}</b>
                                <p>{this.props.userSelection.class}</p>
                            </div>
                        </div>
                        <div className='card-numbers'>
                            <p>{this.props.userSelection.attack}</p>
                            <p>{this.props.userSelection.defense}</p>
                        </div>
                    </div>
                : ''}
                {this.props.oppoSelection ?
                    <div className = {`card ${this.props.oppoSelection.class} battlefield_select`}>
                    <div className='card-top'>
                        <div className='card-name'>
                            <b>{this.props.oppoSelection.name}</b>
                            <p>{this.props.oppoSelection.class}</p>
                        </div>
                    </div>
                    <div className='card-numbers'>
                        <p>{this.props.oppoSelection.attack}</p>
                        <p>{this.props.oppoSelection.defense}</p>
                    </div>
                </div>
                : ''}
                <div className = 'battle-log'>
                    <div className = 'round-count'><h2>{(this.state.round <= 5) ? `Round: ${this.state.round}` : `${this.state.winner} Won!`}</h2></div>
                    <div className = 'hp'><b>User HP: {this.state.userHp}</b></div>
                    <div className = 'hp'><b>Opponent HP: {this.state.oppoHp}</b></div>
                    <button onClick = {() => this.getBattleLog() & this.props.resetBattleField() & setTimeout(this.getWinner,1)} disabled={(this.props.cardsInField === 2) ? false : true}>Get Log</button>
                </div>
            </div>
        )
    }
}

export default BattleField;