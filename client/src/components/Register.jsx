import React, { Component } from "react";
// the new user registration component

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    displayName: ""
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password, email, displayName } = this.state;
    return (
      <div className="register">
        <form
          onSubmit={e =>
            this.props.handleRegisterSubmit(
              e,
              username,
              password,
              email,
              displayName
            )}
        >
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={this.handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Name"
            onChange={this.handleInputChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
