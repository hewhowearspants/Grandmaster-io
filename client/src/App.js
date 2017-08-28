import React, { Component } from 'react';
import axios from 'axios';
import * as firebase from 'firebase';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import GameLobby from './components/GameLobby';
import GameRoom from './components/GameRoom';


class App extends Component {
  constructor() {
    super();

    this.state = {
      auth: false,
      cardData: null,
      cardDataLoaded: false,
      userCardData: null,
      newCardData: false,
      user: null,
      currentPage: 'dashboard',
      currentCardId: null,
      currentUserId: null,
      redirect: '/',
      currentContent: 'user-cards', 
      users: {1: 0, 2: 0, 3: 0},
      players: {1: 0, 2: 0, 3: 0},      
    }

    const config = {
      apiKey: "AIzaSyBeWljzW5mON5qnOPJ5_BEnuj79_kSG4mA",
      authDomain: "grandmaster-71126.firebaseapp.com",
      databaseURL: "https://grandmaster-71126.firebaseio.com",
      projectId: "grandmaster-71126",
      storageBucket: "",
      messagingSenderId: "760258177615"
    };

    firebase.initializeApp(config);

    this.rootRef = firebase.database().ref();
    this.lobbyRef = this.rootRef.child('lobby');

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this); 
    this.logOut = this.logOut.bind(this);    
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.getUserCards = this.getUserCards.bind(this);
    this.getInitialUserCards = this.getInitialUserCards.bind(this);
    this.getNewUserCard = this.getNewUserCard.bind(this);
    this.deleteUserCard = this.deleteUserCard.bind(this);
    this.requireLogin = this.requireLogin.bind(this);
    this.userSelectedCardToEdit = this.userSelectedCardToEdit.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.userSubmitEdit = this.userSubmitEdit.bind(this);
    this.userSelectedNameToEdit = this.userSelectedNameToEdit.bind(this);
    this.userSubmitNewName = this.userSubmitNewName.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.setContent = this.setContent.bind(this);    
    this.updateWinsNCurrency = this.updateWinsNCurrency.bind(this);  
  }

  componentDidMount() {
    axios.get('/cards')
      .then(res => {
        console.log(res.data)
        this.setState({
          cardData: res.data,
          cardDataLoaded: true,
        });
      }).catch(err => 
        console.log(err));

    this.requireLogin();
    this.lobbyRef.on('child_added', type => {
      let updatedInfo = {};

      this.lobbyRef.child(type.key).on('child_added', room => {
        updatedInfo[room.key] = room.node_.value_;
      });

      this.setState({
        [type.key]: updatedInfo,
      });
    })
    this.lobbyRef.on('child_changed', type => {
      let updatedInfo = {};

      this.lobbyRef.child(type.key).on('child_added', room => {
        updatedInfo[room.key] = room.node_.value_;
      });
      
      this.setState({
        [type.key]: updatedInfo,
      });
    })
  }

  requireLogin = () => {
    if(!this.state.auth) {
      this.setState({
        redirect: '/login',
      });
    } else {
      this.setState({
        redirect: '/user',
      })
    }
  };

  //AUTH
  handleLoginSubmit = (e, username, password) => {
    e.preventDefault();
    axios.post('/auth/login', {
      username,
      password,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
      });
    }).then(() => {
      if(this.state.user) {
        this.getUserCards();
        this.setState({
          redirect: '/user',
        })
      }
    }).catch(err => 
      console.log(err));
  }

  getUserCards = () => {
    axios.get('/usercard')
    .then(res => {
      // console.log(res.data)
      this.setState({
        userCardData: res.data,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  getInitialUserCards = () => {
    axios.get('/user/new')
    .then(res => {
      // console.log(res.data)
      this.setState({
        userCardData: res.data,
      })
    })
    .then(() => {
      this.state.userCardData.forEach(data => {
        axios.post('/usercard/new', {
          cardId: data.id,
          name: data.name,
          class: data.class,
          attack: data.attack,
          defense: data.defense,
          imageUrl: data.image_url,
        })
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      })
    })
    .catch(err => {
        console.log(err);
    })
  }

  getNewUserCard = () => {
    axios.get('/cards/new')
    .then(res => {
      // console.log(res.data)
      this.setState({
        newCardData: res.data,
      })
    })
    .then(() => {
      axios.post('/usercard/new', {           
        cardId: this.state.newCardData[0].id,
        name: this.state.newCardData[0].name,
        class: this.state.newCardData[0].class,
        attack: this.state.newCardData[0].attack,
        defense: this.state.newCardData[0].defense,
        imageUrl: this.state.newCardData[0].image_url
        })
        .then(res => {
          this.getUserCards();
        })
        .catch(err => {
          console.log(err)
        })
      })
    .catch(err => {
        console.log(err);
    })
  }

  deleteUserCard = (id) => {
    let confirm = window.confirm(`${this.state.user.username}, are you sure you want to delete this card?`);
    if(confirm === true) {
      axios.delete(`/usercard/${id}`)
      .then((res) => {
        const updatedCards = [...this.state.userCardData];
        let deletedIndex;

        updatedCards.forEach((card, index) => {
          if (card.id === id) {
            deletedIndex = index;
          };
        });

        updatedCards.splice(deletedIndex, 1);

        this.setState({
          userCardData: updatedCards,
        });

      }).catch(err => {
        console.log(err);
      });
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: null,
    })
  }

  setCurrentPage = (page) => {
    this.setState({
      currentPage: page,
    });
  }

  setContent = (page) => {
    this.setState({
      currentContent: page,
    });
  }

  deleteUser = (id) => {
    let confirm = window.confirm(`Are you sure you want to delete your profile ${this.state.user.username}?`);
    if(confirm === false) {
      this.setState({
        redirect: null,
      });
    } else { 
      axios.delete(`/user/${id}`)
      .then(res => {
        this.setState({
          user: null,
          redirect: '/',
          auth: false,
          });
      }).catch(err => {
          console.log(err);
      });
    }
  }

  handleRegisterSubmit = (e, username, password, email, displayName) => {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
      displayName,
    })
    .then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
      });
    })
    .then(
      this.getInitialUserCards,
      this.setState({
        redirect: '/user',
      })
    )
    .catch(err => 
      console.log(err));
  }

  logOut = () => {
    axios.get('/auth/logout')
    .then(res => {
      console.log(res);
      this.setState({
        auth: false,
        redirect: '/',
      });
    }).catch(err => 
      console.log(err));
  }

  userSelectedCardToEdit = (id) => {
    console.log(id);
    this.setState({
      currentCardId: id,
    });
  }

  userSubmitEdit = (event) => {
    event.preventDefault();
    console.log(this.state.currentCardId)
    axios.put(`/usercard/${this.state.currentCardId}`, {
      name: event.target.name.value,
    }).then(res => {
      this.getUserCards();
    }).then(() => {
      this.setState({
        currentCardId: null,
      })
    }).catch(err => 
    {console.log(err) });
  }

  userSelectedNameToEdit = (id) => {
    console.log(id);
    this.setState({
      currentUserId: id,
    })
  }
  
  userSubmitNewName = (event) => {
    event.preventDefault();
    let display_name = event.target.display_name.value;
    let email = event.target.email.value;
    axios.put(`/user/${this.state.currentUserId}`, {
      displayName: event.target.display_name.value,
      email: event.target.email.value,
    }).then(res => {
      let newUserData = this.state.user;
      newUserData.display_name = display_name;
      newUserData.email = email;
        this.setState({
          user: newUserData,
          currentContent: 'user-cards',
          redirect: '/user',  
          currentUserId: null,
        })
    }).catch(err => 
    {console.log(err) });
  };

  updateWinsNCurrency = () =>{
    let updatedCurrency = this.state.user.currency;
    updatedCurrency += 10;
    let updatedWins = this.state.user.wins;
    updatedWins += 1;
    this.setState({
      user: {
        currency: updatedCurrency,
        display_name: this.state.user.display_name,
        email: this.state.user.email,
        id: this.state.user.id,
        password_digest: this.state.user.password_digest,
        username: this.state.user.username,
        wins: updatedWins,
      }
    })
    axios.put(`/user/win`, {
      username: this.state.user.username,
      wins: this.state.user.wins,
      currency: this.state.user.currency,
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.redirect !== null) {
      let redir = this.state.redirect;
      this.setState({
        redirect: null,
      });
      return ( 
        <Router>
          <Redirect push to = {redir} />
        </Router>
      )
    } else {
    return (
      <Router>
      <div className = 'App'>
        <Header setPage = {this.setPage} user = {this.state.user} display_name = {this.props.display_name} auth = {this.state.auth} logOut = {this.logOut} setCurrentPage = {this.setCurrentPage} currentPage = {this.state.currentPage}/>
        <main>
          <Route exact path = '/' render = {() => <Home handleLoginSubmit = {this.handleLoginSubmit} />} />
          <Route exact path = '/register' render = {() => <Register handleRegisterSubmit = {this.handleRegisterSubmit} />} />
          <Route exact path = '/user' render = {() => <Dashboard 
                                                    setContent = {this.setContent} 
                                                    currentContent = {this.state.currentContent}
                                                    cards = {this.state.cardData} 
                                                    userCards = {this.state.userCardData} 
                                                    newCard = {this.state.newCardData}
                                                    userSubmitEdit = {this.userSubmitEdit} 
                                                    userSelectedCardToEdit = {this.userSelectedCardToEdit} 
                                                    currentCardId = {this.state.currentCardId}
                                                    getNewUserCard = {this.getNewUserCard} 
                                                    deleteUserCard = {this.deleteUserCard}
                                                    user = {this.state.user}
                                                    email = {this.state.email}
                                                    display_name = {this.state.display_name}
                                                    userSubmitNewName = {this.userSubmitNewName}
                                                    userSelectedNameToEdit = {this.userSelectedNameToEdit}
                                                    currentUserId = {this.state.currentUserId}
                                                    deleteUser = {this.deleteUser} />} />
          <Route exact path = '/joingame' render = {() => <GameLobby players = {this.state.players} users = {this.state.users} />} />
          <Route exact path = '/joingame/:id' render = {(props) => <GameRoom 
                                                                  user = {this.state.user} 
                                                                  id = {props.match.params.id} 
                                                                  userCards = {this.state.userCardData} 
                                                                  updateLobbyPlayersAndUsers = {this.updateLobbyPlayersAndUsers}
                                                                  updateWinsNCurrency = {this.updateWinsNCurrency}/>}/>} 
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
