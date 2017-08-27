import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.card.name,
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      name: value,
    });
  }
  
  render() {
    return (
      <div className = 'card-wrapper'>
        <div className = 'delete-button'>
            <i className = "fa fa-times fa-2x" onClick = {() => {this.props.deleteUserCard(this.props.card.id)}}></i>
          </div>
          <div className = 'edit-button'>
            <i className = "fa fa-pencil fa-2x" onClick = {() => {this.props.userSelectedCardToEdit(this.props.card.id)}}></i>
          </div>
      <div className = {`card ${this.props.card.class}`}>
        <div className = 'card-top'>
          <div className = 'card-name'>
              {this.props.currentCardId === this.props.card.id ?
                <form onSubmit = {this.props.userSubmitEdit}>
                  <input type = 'text' name = 'name' placeholder = 'name' value = {this.state.name} onChange = {this.handleInputChange} />
                </form>
                : <b>{this.props.card.name}</b> }
              <p>{this.props.card.class}</p>
          </div>
        </div>
        <div className = 'card-numbers'><p>ATT  {this.props.card.attack}</p>
          <p>DEF  {this.props.card.defense}</p>
        </div>
      </div>
      </div>
    )
  }
}

export default Card;