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


class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: null,
      currentPage: 'home',
    }
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
