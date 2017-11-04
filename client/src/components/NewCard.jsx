import React, { Component } from "react";

import Card from "./Card";

const alert = `Too many cards! You can't have more than 20 cards.`;

// gets a new card when the user clicks a button
class NewCard extends Component {
  state = { gotNewCard: false };

  componentWillUnmount() {
    this.setState({
      gotNewCard: false
    });
  }

  getNewCard = () => {
    this.props.userCards.length > 20
      ? alert(`${alert}`)
      : this.props.getNewUserCard();
    this.setState({
      gotNewCard: true
    });
  };

  getNewCardLv1 = () => {
    this.props.userCards.length > 20
      ? alert(`${alert}`)
      : this.props.getNewUserCardPremium(15);
    this.setState({
      gotNewCard: true
    });
  };

  getNewCardLv2 = () => {
    this.props.userCards.length > 20
      ? alert(`${alert}`)
      : this.props.getNewUserCardPremium(25);
    this.setState({
      gotNewCard: true
    });
  };

  getNewCardLv3 = () => {
    this.props.userCards.length > 20
      ? alert(`${alert}`)
      : this.props.getNewUserCardPremium(35);
    this.setState({
      gotNewCard: true
    });
  };

  getNewCardLv4 = () => {
    this.props.userCards.length > 20
      ? alert(`${alert}`)
      : this.props.getNewUserCardPremium(45);
    this.setState({
      gotNewCard: true
    });
  };

  render() {
    return (
      <div className="new-card">
        <button
          className="newCardButton"
          type="button"
          onClick={this.getNewCard}
        >
          Get new Card! Cost: <strong style={{ color: "red" }}>20</strong>
        </button>
        <button
          className="newCardButton"
          type="button"
          onClick={this.getNewCardLv1}
        >
          Get better Card! Cost: <strong style={{ color: "red" }}>30</strong>
        </button>
        <button
          className="newCardButton"
          type="button"
          onClick={this.getNewCardLv2}
        >
          Get even better Card! Cost:
          <strong style={{ color: "red" }}>50</strong>
        </button>
        <button
          className="newCardButton"
          type="button"
          onClick={this.getNewCardLv3}
        >
          Get almost the best Card! Cost:
          <strong style={{ color: "red" }}>70</strong>
        </button>
        <button
          className="newCardButton"
          type="button"
          onClick={this.getNewCardLv4}
        >
          Get the BEST Card! Cost: <strong style={{ color: "red" }}>90</strong>
        </button>
        {this.state.gotNewCard && this.props.newCard ? (
          <Card card={this.props.newCard[0]} />
        ) : null}
      </div>
    );
  }
}

export default NewCard;
