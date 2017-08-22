import React, { Component } from 'react';
import logo from './logo.svg';
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
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NewUser from './components/NewUser';


class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      cardData: null,
      cardDataLoaded: false,
      user: null,
      currentPage: 'home',
      fireRedirect: false,
      isNewUser: false,
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.setPage = this.setPage.bind(this);    
    this.logOut = this.logOut.bind(this);    
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.jumpToUserHome = this.jumpToUserHome.bind(this);
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
  }

  setPage(page){
    console.log('click');
    this.setState({
      currentPage: page,
    })
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
        fireRedirect: true,
      });
    }).catch(err => console.log(err));
  }

  jumpToUserHome(){
    this.setState({
      fireRedirect:true,
    })
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
        isNewUser: true,
      });
    })
    .catch(err => console.log(err));
  }

  logOut() {
    axios.get('/auth/logout')
    .then(res => {
      console.log(res);
      this.setState({
        auth:false,
      });
    }).catch(err => console.log(err));
  }


  render() {
    return (
      <Router>
      <div className="App">
        <Header setPage={this.setPage} auth={this.state.auth} logOut={this.logOut} />
        <main>
          <Route exact path='/' render={() => <Home handleLoginSubmit={this.handleLoginSubmit} />} />
          {/* <Route exact path='/register' render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit} />} /> */}
          <Route exact path='/user' render={() => <Dashboard cards={this.state.cardData}/>} />
          {/* <Route exact path='/user/new' render={()=><NewUser />} /> */}
          {this.state.fireRedirect ? <Redirect push to={'/user'} /> : '' }
          <Route exact path='/register' render={()=>(this.state.isNewUser ? <NewUser jumpToUserHome={this.jumpToUserHome}/> : <Register handleRegisterSubmit={this.handleRegisterSubmit} />) }/>
          {/* {this.state.isNewUser ? <Redirect push to={'/user/new'} /> : ''} */}
        </main>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
