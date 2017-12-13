import React, { Component } from "react";

// displays the users profile info in the dashboard
// allows the user to edit or delete their profile info
class UserProfile extends Component {
  state = {
    display_name: this.props.user.display_name,
    email: this.props.user.email,
    id: this.props.user.id
  };

  // handles input change for the profile info edit form
  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(this.state.id);
    console.log(e.target.value);
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      user,
      currentUserId,
      userSelectedNameToEdit,
      deleteUser,
      userSubmitNewName
    } = this.props;
    const { email, display_name } = this.state;
    return (
      <div className="user-profile">
        <div className="user">
          {currentUserId === user.id ? (
            <form onSubmit={userSubmitNewName}>
              <input
                type="text"
                name="display_name"
                placeholder="username"
                value={display_name}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="email"
                placeholder="email"
                value={email}
                onChange={this.handleInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <h2>
              <span>username</span>
              {user.display_name} <span>email</span>
              {user.email}
            </h2>
          )}
        </div>
        <div className="user-buttons">
          <div className="edit-button">
            <i
              className="fa fa-pencil fa-2x"
              onClick={() => {
                userSelectedNameToEdit(user.id);
              }}
            >
              <p>Edit Profile?</p>
            </i>
          </div>
          <div className="delete-button">
            <i
              className="fa fa-times fa-2x"
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              <p>Delete Profile?</p>
            </i>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
