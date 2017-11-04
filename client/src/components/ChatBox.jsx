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
    return (
      <div className="message-box">
        <div className="message-display">
          {messages.map(message => {
            return <p>{message.message}</p>;
          })}
        </div>
        <div className="message-input">
          <form onSubmit={() => handleMessageSubmit(this.state.text)}>
            <input type="text" onChange={this.handleInputChange} />
            <button type="submit">Send!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatBox;
