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


class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
      currentPage: 'home',
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
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
        user: res.data.user
      });
    }).catch(err => console.log(err));
  }

  handleRegisterSubmit(e, username, password, email, displayName) {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
      displayName,
    }).then(res => {
      this.setState({
        auth: res.data.auth,
        user:res.data.user,
      });
    }).catch(err => console.log(err));
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
        <Header />
        <main>
          <Route exact path='/' component={ Home } />
          <Route exact path='/login' render={() => <Login handleLoginSubmit={this.handleLoginSubmit} />} />
          <Route exact path='/register' render={() => <Register handleRegisterSubmit={this.handleRegisterSubmit} />} />
        </main>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
