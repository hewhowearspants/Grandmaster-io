import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: this.props.user.display_name,
      email: this.props.user.email,
      id: this.props.user.id
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
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
      <div className='user-profile'>
        <div className='delete-button'>
          <i className="fa fa-times fa-2x" onClick={()=> {this.props.deleteUser(this.props.user.id) }}>Delete Profile?</i>
        </div>
        <div className='edit-button'>
          <button className='edit-name' onClick={()=> {this.props.userSelectedNameToEdit(this.props.user.id)}}></button>
        </div>
        <div className='user'>
          {/* {this.props.currentUserId === this.props.user.id ? */}
            <form onSubmit={()=>this.props.userSubmitNewName(this.state.display_name, this.state.email, this.state.id)}>
              <input type='text' name='display_name' placeholder='username' value={this.state.display_name} onChange={this.handleInputChange} />
              <input type='text' name='email' placeholder='email' value={this.state.email} onChange={this.handleInputChange} />
              <button type='submit'>Submit</button>
            </form> 
            {/* : <b>{this.props.user.display_name} {this.props.user.email}</b> } */}
        </div>
          {/* <p>{this.props.user.display_name}</p> */}
      </div>
    )
  }
}

export default UserProfile;