import React, { Component } from "react";
import axios from "axios";
import * as firebase from "firebase";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { GameLobby } from "./components/GameLobby";
import GameRoom from "./components/GameRoom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      auth: false,
      cardData: null,
      cardDataLoaded: false,
      userCardData: null,
      userCounterData: null,
      newCardData: false,
      user: null,
      currentPage: "dashboard",
      currentCardId: null,
      currentUserId: null,
      redirect: "/",
      currentContent: "user-cards",
      users: { 1: 0, 2: 0, 3: 0 },
      players: { 1: 0, 2: 0, 3: 0 }
    };

    // configure firebase
    const config = {
      apiKey: "AIzaSyBeWljzW5mON5qnOPJ5_BEnuj79_kSG4mA",
      authDomain: "grandmaster-71126.firebaseapp.com",
      databaseURL: "https://grandmaster-71126.firebaseio.com",
      projectId: "grandmaster-71126",
      storageBucket: "",
      messagingSenderId: "760258177615"
    };

    // initialize firebase
    firebase.initializeApp(config);

    // set firebase references
    this.rootRef = firebase.database().ref();
    this.lobbyRef = this.rootRef.child("lobby");
  }

  componentDidMount() {
    // gets all of the cards in the api to display in Card Collection
    axios
      .get("/cards")
      .then(res => {
        // console.log(res.data);
        this.setState({
          cardData: res.data,
          cardDataLoaded: true
        });
      })
      .catch(err => console.log(err));

    // redirect if not logged in
    this.requireLogin();

    // set up listeners for firebase to get current players/users in game rooms
    this.lobbyRef.on("child_added", type => {
      let updatedInfo = {};

      this.lobbyRef.child(type.key).on("child_added", room => {
        updatedInfo[room.key] = room.node_.value_;
      });

      this.setState({
        [type.key]: updatedInfo
      });
    });

    // set up listener for firebase for when players/users enter leave game rooms
    this.lobbyRef.on("child_changed", type => {
      let updatedInfo = {};

      this.lobbyRef.child(type.key).on("child_added", room => {
        updatedInfo[room.key] = room.node_.value_;
      });

      this.setState({
        [type.key]: updatedInfo
      });
    });
  }

  // redirects user to login screen if not logged in
  requireLogin = () => {
    !this.state.auth
      ? this.setState({
          redirect: "/"
        })
      : this.setState({
          redirect: "/user"
        });
  };

  // logs user in, gets users cards, redirects to their dashboard
  handleLoginSubmit = async (e, username, password) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { username, password });
      this.setState({
        auth: res.data.auth,
        user: res.data.user
      });
      if (this.state.user) {
        this.getUserCards();
        this.setState({ redirect: "/user" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // get user's cards from database
  getUserCards = async () => {
    try {
      const res = await axios.get("/usercard");
      this.setState({
        userCardData: res.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  // when user first logs in, gives them their initial 10 random cards
  getInitialUserCards = async () => {
    try {
      const res = await axios.get("/user/new");
      this.setState({
        userCardData: res.data
      });
    } catch (err) {
      console.log(err);
    }
    try {
      const data = await this.state.userCardData.forEach(data =>
        axios.post("/usercard/new", {
          cardId: data.id,
          name: data.name,
          class: data.class,
          attack: data.attack,
          defense: data.defense,
          imageUrl: data.image_url
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // gets a random card when users requests a new card, adds it to their cards
  getNewUserCard = async () => {
    if (this.state.user.currency >= 20) {
      const res = await axios.get("/cards/new");
      this.setState({
        newCardData: res.data
      });
      const { newCardData } = this.state;
      try {
        await axios.post("/usercard/new", {
          cardId: newCardData[0].id,
          name: newCardData[0].name,
          class: newCardData[0].class,
          attack: newCardData[0].attack,
          defense: newCardData[0].defense,
          imageUrl: newCardData[0].image_url
        });
        this.getUserCards();
      } catch (err) {
        console.log(err);
      }
      let updatedCurrency = this.state.user.currency;
      updatedCurrency -= 20;
      const { user } = this.state;
      try {
        this.setState({
          user: {
            currency: updatedCurrency,
            display_name: user.display_name,
            email: user.email,
            id: user.id,
            password_digest: user.password_digest,
            username: user.username,
            wins: user.wins
          }
        });
        const res = await axios.put(`/user/win`, {
          username: this.state.user.username,
          wins: this.state.user.wins,
          currency: this.state.user.currency
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else if (this.state.user.currency < 20) {
      alert("Oops, not enough money. Win a few battles and come back!");
    }
  };

  getNewUserCardPremium = async num => {
    if (this.state.user.currency >= num * 2) {
      try {
        const res = await axios.get(`/cards/new/${num}`);
        this.setState({
          newCardData: res.data
        });
        const { newCardData } = this.state;
        try {
          await axios.post("/usercard/new", {
            cardId: newCardData[0].id,
            name: newCardData[0].name,
            class: newCardData[0].class,
            attack: newCardData[0].attack,
            defense: newCardData[0].defense,
            imageUrl: newCardData[0].image_url
          });
          this.getUserCards();
        } catch (err) {
          console.log(err);
        }
        let updatedCurrency = this.state.user.currency;
        updatedCurrency -= num * 2;
        const { user } = this.state;
        this.setState({
          user: {
            currency: updatedCurrency,
            display_name: user.display_name,
            email: user.email,
            id: user.id,
            password_digest: user.password_digest,
            username: user.username,
            wins: user.wins
          }
        });
        try {
          const res = await axios.put(`/user/win`, {
            username: user.username,
            wins: user.wins,
            currency: user.currency
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (this.state.user.currency < num * 2) {
      alert("Oops, not enough money. Win a few battles and come back!");
    }
  };

  // deletes a user's card after they confirm it
  deleteUserCard = async id => {
    let confirm = window.confirm(
      `${this.state.user.username}, are you sure you want to delete this card?`
    );
    if (confirm === true) {
      try {
        await axios.delete(`/usercard/${id}`);
        const updatedCards = [...this.state.userCardData];
        let deletedIndex;
        updatedCards.forEach((card, index) => {
          if (card.id === id) {
            deletedIndex = index;
          }
        });
        updatedCards.splice(deletedIndex, 1);
        this.setState({
          userCardData: updatedCards
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // sets the redirect page when called
  setRedirect = () => {
    this.setState({
      redirect: null
    });
  };

  // sets the current page for the 'Join Game/User Dashboard' display
  setCurrentPage = page => {
    this.setState({
      currentPage: page
    });
  };

  // sets the dashboard content to display
  setContent = page => {
    this.setState({
      currentContent: page
    });
  };

  // deletes a user's account after getting confirmation
  deleteUser = async id => {
    let confirm = window.confirm(
      `Are you sure you want to delete your profile ${this.state.user
        .username}?`
    );
    try {
      !confirm
        ? this.setState({
            redirect: null
          })
        : await axios.delete(`/user/${id}`);
      this.setState({
        user: null,
        redirect: "/",
        auth: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  // creates a new user account, gets the new user's initial 10 random cards,
  // redirects them to their dashboard
  handleRegisterSubmit = (e, username, password, email, displayName) => {
    e.preventDefault();
    axios
      .post("/auth/register", {
        username,
        password,
        email,
        displayName
      })
      .then(res => {
        this.setState({
          auth: res.data.auth,
          user: res.data.user
        });
      })
      .then(
        this.getInitialUserCards,
        this.setState({
          redirect: "/user"
        })
      )
      .catch(err => console.log(err));
  };

  // logs user out
  logOut = async () => {
    try {
      const res = await axios.get("/auth/logout");
      console.log(res);
      this.setState({
        auth: false,
        redirect: "/"
      });
    } catch (err) {
      console.log(err);
    }
  };

  // sets which card is currently being edited so it can be edited without going
  // to another page
  userSelectedCardToEdit = id => {
    console.log(id);
    this.setState({
      currentCardId: id
    });
  };

  // edits the user's card, then reloads the users cards to reflect the changes
  userSubmitEdit = async e => {
    e.preventDefault();
    console.log(this.state.currentCardId);
    try {
      await axios.put(`/usercard/${this.state.currentCardId}`, {
        name: e.target.name.value
      });
      this.getUserCards();
      this.setState({
        currentCardId: null
      });
    } catch (err) {
      console.log(err);
    }
  };

  // sets that the user is currently being edited so it can be edited without going
  // to another page
  userSelectedNameToEdit = id => {
    console.log(id);
    this.setState({
      currentUserId: id
    });
  };

  // edits the users display name and email, resets them in state
  userSubmitNewName = async e => {
    e.preventDefault();
    let display_name = e.target.display_name.value;
    let email = e.target.email.value;
    try {
      await axios.put(`/user/${this.state.currentUserId}`, {
        displayName: e.target.display_name.value,
        email: e.target.email.value
      });
      let newUserData = this.state.user;
      newUserData.display_name = display_name;
      newUserData.email = email;
      this.setState({
        user: newUserData,
        currentContent: "user-cards",
        redirect: "/user",
        currentUserId: null
      });
    } catch (err) {
      console.log(err);
    }
  };

  // updates users wins and currency when they win a game
  updateWinsNCurrency = async () => {
    const { user } = this.state;
    let updatedCurrency = user.currency;
    updatedCurrency += 10;
    let updatedWins = user.wins;
    updatedWins += 1;
    this.setState({
      user: {
        currency: updatedCurrency,
        display_name: user.display_name,
        email: user.email,
        id: user.id,
        password_digest: user.password_digest,
        username: user.username,
        wins: updatedWins
      }
    });
    try {
      const { user } = this.state;
      const res = await axios.put(`/user/win`, {
        username: user.username,
        wins: user.wins,
        currency: user.currency
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    // redirects the page if there's a redirect set, otherwise displays as normal
    if (this.state.redirect !== null) {
      let redir = this.state.redirect;
      this.setState({
        redirect: null
      });
      return (
        <Router>
          <Redirect push to={redir} />
        </Router>
      );
    } else {
      return (
        <Router>
          <div className="App">
            <Header
              setPage={this.setPage}
              user={this.state.user}
              display_name={this.props.display_name}
              auth={this.state.auth}
              logOut={this.logOut}
              setCurrentPage={this.setCurrentPage}
              currentPage={this.state.currentPage}
            />
            <main>
              {/* all of the routes */}
              <Route
                exact
                path="/"
                render={() => (
                  <Home handleLoginSubmit={this.handleLoginSubmit} />
                )}
              />
              <Route
                exact
                path="/register"
                render={() => (
                  <Register handleRegisterSubmit={this.handleRegisterSubmit} />
                )}
              />
              <Route
                exact
                path="/user"
                render={() => (
                  <Dashboard
                    setContent={this.setContent}
                    currentContent={this.state.currentContent}
                    cards={this.state.cardData}
                    userCards={this.state.userCardData}
                    newCard={this.state.newCardData}
                    userSubmitEdit={this.userSubmitEdit}
                    userSelectedCardToEdit={this.userSelectedCardToEdit}
                    currentCardId={this.state.currentCardId}
                    getNewUserCard={this.getNewUserCard}
                    getNewUserCardPremium={this.getNewUserCardPremium}
                    deleteUserCard={this.deleteUserCard}
                    user={this.state.user}
                    email={this.state.email}
                    display_name={this.state.display_name}
                    userSubmitNewName={this.userSubmitNewName}
                    userSelectedNameToEdit={this.userSelectedNameToEdit}
                    currentUserId={this.state.currentUserId}
                    deleteUser={this.deleteUser}
                  />
                )}
              />
              <Route
                exact
                path="/joingame"
                render={() => (
                  <GameLobby
                    players={this.state.players}
                    users={this.state.users}
                  />
                )}
              />
              <Route
                exact
                path="/joingame/:id"
                render={props => (
                  <GameRoom
                    user={this.state.user}
                    id={props.match.params.id}
                    userCards={this.state.userCardData}
                    updateLobbyPlayersAndUsers={this.updateLobbyPlayersAndUsers}
                    updateWinsNCurrency={this.updateWinsNCurrency}
                  />
                )}
              />
            </main>
            <Footer />
          </div>
        </Router>
      );
    }
  }
}

export default App;
