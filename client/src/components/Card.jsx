import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.card.name,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      name: value,
    });
  }
  
  render() {
    return (
      <div className='Card'>
      <div className={`card ${this.props.card.class}`}>
        <div className='card-top'>
          <div className='edit-button'>
            <i className="fa fa-pencil" onClick={()=> {this.props.userSelectedCardToEdit(this.props.card.id)}}></i>
          </div>
          <div className='card-name'>
              {this.props.currentCardId === this.props.card.id ?
              <form onSubmit={this.props.userSubmitEdit}> 
                <input type='text' name='name' placeholder='name' value={this.state.name} onChange={this.handleInputChange} /> 
              </form>
              : <b>{this.props.card.name}</b> }
              <p>{this.props.card.class}</p>
          </div>
          <div className='delete-button'>
            <i className="fa fa-times" onClick={()=> {this.props.deleteUserCard(this.props.card.id)}}></i>
          </div>
        </div>
        <div className='card-numbers'><p>ATT  {this.props.card.attack}</p>
          <p>DEF  {this.props.card.defense}</p>
        </div>
      </div>
      </div>
    )
  }
}

export default Card;
