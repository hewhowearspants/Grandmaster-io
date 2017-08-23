import React, { Component } from 'react';

class BattleField extends Component {
    constructor(){
        super();
        this.state = {
            userHp: 30,
            oppoHp: 30,
            round: 1,
            winner: null,
        }
        this.getBattleLog = this.getBattleLog.bind(this);
    }

    getBattleLog(){
        if(this.props.userSelection && this.props.oppoSelection){
            this.setState({
                round: this.state.round + 1,
            })
            if(this.props.userSelection.defense < this.props.oppoSelection.attack
                 && this.props.userSelection.attack > this.props.oppoSelection.defense){
                this.setState({
                    userHp: this.state.userHp + this.props.userSelection.defense - this.props.oppoSelection.attack,
                    oppoHp: this.state.oppoHp + this.props.oppoSelection.defense - this.props.userSelection.attack,
                })
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
            }else if(this.props.userSelection.defense < this.props.oppoSelection.attack
                && this.props.userSelection.attack <= this.props.oppoSelection.defense){
                this.setState({
                    userHp: this.state.userHp + this.props.userSelection.defense - this.props.oppoSelection.attack,
                })
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
            }else if(this.props.userSelection.defense >= this.props.oppoSelection.attack
                && this.props.userSelection.attack > this.props.oppoSelection.defense){
                this.setState({
                    oppoHp: this.state.oppoHp + this.props.oppoSelection.defense - this.props.userSelection.attack,
                })
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
        // }else if(this.state.round === 6){
        //     if(this.state.userHp > this.state.oppoHp){
        //         this.setState({
        //             winner: 'User'
        //         })
        //     }else if(this.state.userHp < this.state.oppoHp){
        //         this.setState({
        //             winner: 'Opponent'
        //         })
        //     }else if(this.state.userHp === this.state.oppoHp){
        //         this.setState({
        //             winner: 'Game Tied! Both Players'
        //         })
        //     }
        }
    }

    render() {
        return (
            <div className = 'battlefield'>
                {this.props.userSelection ? 
                    <div className = 'card user'>
                        <p>{this.props.userSelection.name}</p>
                        <p>{this.props.userSelection.class}</p>
                        <img src = {this.props.userSelection.image_url} alt = '' />
                        <p>{this.props.userSelection.attack}</p>
                        <p>{this.props.userSelection.defense}</p>
                    </div>
                : ''}
                {this.props.oppoSelection ?
                    <div className = 'card oppo'>
                        <p>{this.props.oppoSelection.name}</p>
                        <p>{this.props.oppoSelection.class}</p>
                        <img src = {this.props.oppoSelection.image_url} alt = '' />
                        <p>{this.props.oppoSelection.attack}</p>
                        <p>{this.props.oppoSelection.defense}</p>
                    </div>
                : ''}
                <button onClick = {() => this.getBattleLog() & this.props.resetBattleField()} disabled={(this.props.cardsInField === 2) ? false : true}>Get Log</button>
                <div className = 'battle-log'>
                    <div className = 'hp'><b>User HP: {this.state.userHp}</b></div>
                    <div className = 'hp'><b>Opponent HP: {this.state.oppoHp}</b></div>
                    <div className = 'round-count'><h3>{(this.state.round < 6) ? `Round: ${this.state.round}` : `${this.state.winner} Won!`}</h3></div>
                </div>
            </div>
        )
    }
}

export default BattleField;