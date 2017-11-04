import React, { Component } from "react";

// the login component in the Home component
class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password } = this.state;
    const { handleLoginSubmit } = this.props;
    return (
      <div className="login">
        <form onSubmit={e => handleLoginSubmit(e, username, password)}>
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
          <button type="submit">Log in!</button>
        </form>
      </div>
    );
  }
}

export default Login;
