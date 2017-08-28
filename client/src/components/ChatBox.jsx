import React, { Component } from 'react';

class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            text: event.target.value,
        })
    }

    render(){
        return(
            <div className = 'message-box'>
                <div className = 'message-display'>
                    {this.props.messages.map(message => {
                        return <p>{message.message}</p>
                        })}
                </div>
                <div className = 'message-input'>
                    <form onSubmit = {() => this.props.handleMessageSubmit(this.state.text)}>
                        <input type = 'text' onChange = {this.handleInputChange} />
                        <button type = 'submit'>Send!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChatBox;