import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  constructor() {
    super();
    this.state ={
      auth: false,
      user: null
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

  handleRegisterSubmit(e, username, password, email, display_name) {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email,
      display_name,
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
