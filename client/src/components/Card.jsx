import React, { Component } from "react";

// the component for almost every card
class Card extends Component {
  state = { name: this.props.card.name };

  componentWillReceiveProps(nextProps) {
    if (this.state.name !== nextProps.card.name) {
      this.setState({
        name: nextProps.card.name
      })
    }
  }

  // input change for the card name edit form
  handleInputChange = event => {
    const value = event.target.value;
    this.setState({
      name: value
    });
  };

  render() {
    const {
      deleteUserCard,
      card,
      card: { id, attack, defense },
      userSelectedCardToEdit,
      userSubmitEdit,
      currentCardId
    } = this.props;
    const { name } = this.state;
    return (
      // card edit/delete buttons overlaid on card
      <div className="card-wrapper">
        <div className="delete-button">
          <i
            className="fa fa-times fa-2x"
            onClick={() => {
              deleteUserCard(id);
            }}
          />
        </div>
        <div className="edit-button">
          <i
            className="fa fa-pencil fa-2x"
            onClick={() => {
              userSelectedCardToEdit(id);
            }}
          />
        </div>
        {/* card class determines background image in CSS */}
        <div className={`card ${card.class}`}>
          <div className="card-top">
            <div className="card-name">
              {currentCardId === id ? (
                <form onSubmit={userSubmitEdit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={this.handleInputChange}
                  />
                </form>
              ) : (
                <b>{name}</b>
              )}
              <p>{card.class}</p>
            </div>
          </div>
          <div className="card-numbers">
            <p>
              ATT <span>{attack}</span>
            </p>
            <p>
              DEF <span>{defense}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
