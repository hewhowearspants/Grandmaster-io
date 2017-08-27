import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            displayName:'',
        }
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value,
        });
    }

    render() {
        return (
            <div className = 'register'>
                <form onSubmit = {(e) => this.props.handleRegisterSubmit(e, this.state.username, this.state.password, this.state.email, this.state.displayName)}>
                    <input type = 'text' name = 'username' value = {this.state.username} placeholder = 'Username' onChange = {this.handleInputChange} />
                    <input type = 'password' name = 'password' value = {this.state.password} placeholder = 'Password' onChange = {this.handleInputChange} />
                    <input type = 'email' name = 'email' value = {this.state.email} placeholder = 'email' onChange = {this.handleInputChange} />
                    <input type = 'text' name = 'displayName' value = {this.state.displayName} placeholder = 'Name' onChange = {this.handleInputChange} />
                    <button type = 'submit'>Register</button>
                </form>
            </div>
        )
    }
}

export default Register;
