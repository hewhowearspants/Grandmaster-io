import React, { Component } from 'react';
import axios from 'axios';

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
      fireRedirectToDashboard: false,
      fireRedirectToLogin: false,
      currentCardId: null,
      currentUserId: null,
    }
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
  }

  componentDidMount() {
    axios.get('/cards')
      .then((res) => {
        console.log(res.data)
        this.setState({
          cardData: res.data,
          cardDataLoaded: true,
        });
      }).catch(err => console.log(err));

    this.requireLogin();
  }

  requireLogin() {
    if(!this.state.auth) {
      this.setState({
        fireRedirectToLogin: true,
      });
    };
  }

  //AUTH
  handleLoginSubmit(e, username, password) {
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
      this.getUserCards();
      this.setState({
        fireRedirectToDashboard: true
      })
    })
    .catch(err => console.log(err));
  }

  getUserCards() {
    axios.get('/usercard')
    .then(res=>{
      console.log(res.data)
      this.setState({
        userCardData: res.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  getInitialUserCards(){
    axios.get('/user/new')
    .then(res => {
      console.log(res.data)
      this.setState({
        userCardData: res.data
      })
    })
    .then(()=>{
      this.state.userCardData.forEach((data)=>{
        axios.post('/usercard/new',{
          cardId: data.id,
          name: data.name,
          class: data.class,
          attack: data.attack,
          defense: data.defense,
          imageUrl: data.image_url
        })
        .then(res=>{
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
      })
    })
    .catch(err=>{
        console.log(err);
    })
  }

  getNewUserCard(){
    axios.get('/cards/new')
    .then(res => {
      console.log(res.data)
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
        .then(res=>{
          this.getUserCards();
        })
        .catch(err=>{
          console.log(err)
        })
      })
    .catch(err=>{
        console.log(err);
    })
  }

  deleteUserCard(id) {
    axios.delete(`/usercard/${id}`)
    .then((res) => {
        console.log('deleted them damn cards!');
        const updatedCards = [...this.state.userCardData];
        let deletedIndex;
        updatedCards.forEach((card, index) => {
          if (card.id === id) {
            deletedIndex = index;
          };
        });
        updatedCards.splice(deletedIndex, 1);
        console.log(updatedCards);
        this.setState({
          userCardData: updatedCards,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  deleteUser(id) {
    axios.delete(`/user/${id}`)
    .then((res) => {
      console.log('deleted yuuuu bish');
      this.setState({
        user: null,
        fireRedirectToLogin: true,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  handleRegisterSubmit(e, username, password, email, displayName) {
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
        fireRedirectToDashboard: true,
      })
    )
    .catch(err => console.log(err));
  }

  logOut() {
    axios.get('/auth/logout')
    .then(res => {
      console.log(res);
      this.setState({
        auth:false,
        fireRedirectToDashboard: false,
      });
    }).catch(err => console.log(err));
  }

  userSelectedCardToEdit(id) {
    console.log(id);
    this.setState({
      currentCardId: id,
    })
  }

  userSubmitEdit(event)  {
    event.preventDefault();
    console.log(this.state.currentCardId)
    axios.put(`/usercard/${this.state.currentCardId}`, {
      name: event.target.name.value,
    }).then((res) => {
      this.getUserCards();
    }).then(() => {
      this.setState({
        currentCardId: null,
      })
    }).catch((err) => {console.log(err) });
  }

  userSelectedNameToEdit(id) {
    console.log(id);
    this.setState({
      currentUserId: id,
    })
  }

  setCurrentPage(page){
    this.setState({
      currentPage: page
    })
  }
  
    userSubmitNewName(event, display_name, email, id)  {
    event.preventDefault();
    console.log(display_name);
    axios.put(`/user/${id}`, {
      displayName: display_name,
      email: email,
    }).then((res) => {
      axios.post('/auth/login', {
        username: res.data.username,
        password: res.data.password_digest,
      }).then(res => {
        this.setState({
          auth: res.data.auth,
          user: res.data.user,
        })
      })
    }).then(() => {
      this.setState({
        fireRedirectToDashboard: false,
        fireRedirectToLogin: false,
        currentUserId: null,
      })
    }).catch((err) => {console.log(err) });
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header setPage={this.setPage} auth={this.state.auth} logOut={this.logOut} setCurrentPage={this.setCurrentPage} currentPage={this.state.currentPage}/>
        <main>
          <Route exact path='/' render={() => <Home handleLoginSubmit={this.handleLoginSubmit} />} />
          <Route exact path='/register' render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit} />} />
          <Route exact path='/user' render={() => <Dashboard 
                                                    cards={this.state.cardData} 
                                                    userCards={this.state.userCardData} 
                                                    newCard={this.state.newCardData}
                                                    userSubmitEdit={this.userSubmitEdit} 
                                                    userSelectedCardToEdit={this.userSelectedCardToEdit} 
                                                    currentCardId={this.state.currentCardId}
                                                    getNewUserCard={this.getNewUserCard} 
                                                    deleteUserCard={this.deleteUserCard}
                                                    user={this.state.user}
                                                    email={this.state.email}
                                                    display_name={this.state.display_name}
                                                    userSubmitNewName={this.userSubmitNewName}
                                                    userSelectedNameToEdit={this.userSelectedNameToEdit}
                                                    currentUserId={this.state.currentUserId}
                                                    deleteUser={this.deleteUser} />} />
          {this.state.fireRedirectToDashboard ? <Redirect push to={'/user'} /> : '' }
          {this.state.fireRedirectToLogin ? <Redirect push to={'/'} /> : '' }
          <Route exact path='/joingame' render={() => <GameRoom />} />
        </main>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
