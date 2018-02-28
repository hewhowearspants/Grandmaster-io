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
      setCardToEdit,
      submitCardEdit,
      editingCardId
    } = this.props;
    const { name } = this.state;
    const editing = editingCardId === card.id;

    return (
      // card edit/delete buttons overlaid on card
      <div className="card-wrapper">
        <div className="delete-button">
          {!editing ? 
          <i className="fa fa-times fa-2x"
            onClick={() => {
              deleteUserCard(id, 'cards');
            }}/>
          :
          <i className="fa fa-undo fa-2x" 
            onClick={() => {
              setCardToEdit(null)
            }}/>
          }
        </div>
        <div className="edit-button">
          {!editing ?
          <i className="fa fa-pencil fa-2x"
            onClick={() => {
              setCardToEdit(card.id);
            }}/>
          :
          <i className="fa fa-check fa-2x" onClick={(e) => {
            e.preventDefault() 
            submitCardEdit(name)
          }}/>
          }
        </div>
        {/* card class determines background image in CSS */}
        <div className={`card ${card.class}`}>
          <div className="card-top">
            <div className="card-name">
              {editing ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  submitCardEdit(name)
                }}>
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
