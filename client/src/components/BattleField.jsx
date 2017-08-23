import React, { Component } from 'react';

class BattleField extends Component {
    constructor(){
        super();
        this.state = {
            userHp: 30,
            oppoHp: 30,
        }
        this.getBattleLog = this.getBattleLog.bind(this);
    }

    getBattleLog(){
        if(this.props.userSelection && this.props.oppoSelection){
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
                <button onClick = {() => this.getBattleLog() & this.props.resetBattleField()}>Get Log</button>
                <div className = 'battle-log'>
                    <div className = 'user-hp'><b>{this.state.userHp}</b></div>
                    <div className = 'oppo-hp'><b>{this.state.oppoHp}</b></div>
                </div>
            </div>
        )
    }
}

export default BattleField;