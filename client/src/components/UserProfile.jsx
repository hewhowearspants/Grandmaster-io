import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: this.props.user.display_name,
      email: this.props.user.email,
      id: this.props.user.id,
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(this.state.id);
    console.log(e.target.value);
    this.setState({
        [name]: value,
    });
}

  render() {
    return (
      <div className = 'user-profile'>
        <div className = 'user'>
          {this.props.currentUserId ?
            <form onSubmit = {this.props.userSubmitNewName}>
              <input type = 'text' name = 'display_name' placeholder = 'username' value = {this.state.display_name} onChange = {this.handleInputChange} />
              <input type = 'text' name = 'email' placeholder = 'email' value = {this.state.email} onChange = {this.handleInputChange} />
              <button type = 'submit'>Submit</button>
            </form> 
            : <h2>{this.props.user.display_name} {this.props.user.email}</h2> }
        </div>
        <div className = 'delete-button'>
          <i className = 'fa fa-times fa-2x' onClick = {() => {this.props.deleteUser(this.props.user.id) }}>Delete Profile?</i>
        </div>
        <div className = 'edit-button'>
          <i className = 'fa fa-pencil fa-2x' onClick = {() => {this.props.userSelectedNameToEdit(this.props.user.id)}}>Edit Profile?</i>
        </div>

      </div>
    )
  }
}

export default UserProfile;