import React, { Component } from "react";
import axios from "axios";
import * as firebase from "firebase";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
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
      editingCardId: null,
      editingUser: false,
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
    axios.get("/cards")
      .then(res => {
        // console.log(res.data);
        return { cards: res.data }
      }).then((cardData) => {
        axios.get('/cards/counter')
          .then(res => {
            cardData.counters = res.data
            this.setState({
              cardData,
              cardDataLoaded: true
            })
          }).catch((err) => {
            console.log(err);
          })
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

  // get ALL user's cards from database
  getUserCards = async () => {
    try {
      const res = await axios.get('/usercard/all');
      this.setState({
        userCardData: res.data,
        userCardDataLoaded: true
      });
    } catch (err) {
      console.log(err);
    }
  };

  // when user first logs in, gives them their initial 10 random cards
  getInitialUserCards = async () => {
    try {
      const res = await axios.get('/user/new');
      await res.data.forEach(data =>
        axios.post("/usercard/new", {
          cardId: data.id,
          name: data.name,
          class: data.class,
          attack: data.attack,
          defense: data.defense,
          imageUrl: data.image_url
        })
      );
      this.setState({
        userCardData: {
          cards: res.data,
          counters: []
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // gets a random card when users requests a new card, adds it to their cards
  getNewUserCard = async (cost, type) => {
    if (this.state.user.currency >= cost) {
      let res, url, newCardData;
      if (type === 'cards') {
        if (cost === 20) {
          res = await axios.get("/cards/new");
        } else if (cost > 20) {
          res = await axios.get(`/cards/new/${cost}`);
        }
        url = '/usercard/'
        newCardData = res.data[0];
      } else if (type === 'counters') {
        res = await axios.get("/cards/counter/new");
        url = '/usercard/counter';
        newCardData = res.data[0];
      }
      try {
        await axios.post(url, newCardData);
        this.setState({ newCardData });
        this.getUserCards();
      } catch (err) {
        console.log(err);
      }
      const user = {...this.state.user};
      user.currency -= cost;
      this.updateUser(user);
    } else if (this.state.user.currency < cost) {
      alert("Not enough currency.");
    }
  };

  // deletes a user's card after they confirm it
  deleteUserCard = async (id, type) => {
    let confirm = window.confirm(
      `${this.state.user.username}, are you sure you want to delete this card?`
    );
    if (confirm === true) {
      let url;
      if (type === 'cards') {
        url = `/usercard/${id}`;
      } else if (type === 'counters') {
        url = `/usercard/counter/${id}`;
      }
      try {
        await axios.delete(url);
        let userCardData = {...this.state.userCardData};
        userCardData[type] = userCardData[type].filter(card => {
          return card.id !== id;
        })
        this.setState({
          userCardData
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
  setCardToEdit = id => {
    this.setState({
      editingCardId: id
    });
  };

  // edits the user's card, then reloads the users cards to reflect the changes
  submitCardEdit = async name => {    
    try {
      await axios.put(`/usercard/${this.state.editingCardId}`, { name });
      this.getUserCards();
      this.setState({
        editingCardId: null
      });
    } catch (err) {
      console.log(err);
    }
  };

  // sets that the user is currently being edited so it can be edited without going
  // to another page
  editUser = () => {
    this.setState(prevState => {
      return { editingUser: !prevState.editingUser }
    });
  };

  // edits the users display name and email, resets them in state
  userSubmitNewName = async e => {
    e.preventDefault();
    let user = {...this.state.user};
    user.display_name = e.target.display_name.value;
    user.email = e.target.email.value;
    console.log(user);
    try {
      await this.updateUser(user);
      this.setState({
        editingUser: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  // updates users wins and currency when they win a game
  updateWinsNCurrency = async () => {
    const user = {...this.state.user};
    user.currency += 10;
    user.wins += 1;
    this.updateUser(user);
  };

  updateUser = async (user) => {
    try {
      await axios.put(`/user/${user.id}`, user);
      this.setState({ user });
    } catch (err) {
      console.log(err);
    }
  }

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
                    submitCardEdit={this.submitCardEdit}
                    setCardToEdit={this.setCardToEdit}
                    editingCardId={this.state.editingCardId}
                    getNewUserCard={this.getNewUserCard}
                    deleteUserCard={this.deleteUserCard}
                    user={this.state.user}
                    userSubmitNewName={this.userSubmitNewName}
                    editUser={this.editUser}
                    editingUser={this.state.editingUser}
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
