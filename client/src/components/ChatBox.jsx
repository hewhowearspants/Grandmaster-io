import React, { Component } from "react";

// UNUSED, may be re-implemented in the future
class ChatBox extends Component {
  state = { text: "" };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      text: event.target.value
    });
  };

  render() {
    const { messages, handleMessageSubmit } = this.props;
    const { text } = this.state;
    return (
      <div className="message-box">
        <div className="message-display">
          {messages.map(message => <p>{message.message}</p>)}
        </div>
        <div className="message-input">
          <form onSubmit={() => handleMessageSubmit(text)}>
            <input type="text" onChange={this.handleInputChange} />
            <button type="submit">Send!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatBox;
