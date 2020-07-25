import React from "react";
import { ChatFeed, Message } from 'react-chat-ui'

class StudentChat extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: [
        new Message({
          id: 1,
          message: "I'm the recipient! (The person you're talking to)",
        }), // Gray bubble
        new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
      ],
    };
    this.university = localStorage.getItem("universityName") || "dalhousie";
    this.username = localStorage.getItem("username") || "annonymous";
    this.intervalVar = null;
  }
  
  componentDidMount() {
    this.intervalVar = setInterval(this.receive, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalVar)
  }

  sendMessage = event => {
    const requestOptionsPost = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            type: "publish",
            topicName: "university-group-chat",
            messageContent: {
                username: this.state.username,
                text: "difffferent",
                timeStamp: Date.now(),
                groupName: this.university
            }
         })
    };

    fetch('https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve', requestOptionsPost)
        .then(response => response.json())
        .then(data => console.log(data));

};
receive = event => {
    fetch('https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve?type=allMessages')
        .then(response => response.json())
        .then(data => {
          let messages = data.map(i => {
            return new Message({
              id: i.username === this.state.username? 0: 1,
              message: i.text,
              senderName: i.username
            })
          })
          console.log("messages", messages)
          this.setState({messages})
        });

};

  render() {
    return ( <React.Fragment>
      <ChatFeed
        messages={this.state.messages} // Boolean: list of message objects
        hasInputField={false} // Boolean: use our input, or use your own
        showSenderName // show the name of the user who sent the message
        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
        // JSON: Custom bubble styles
        bubbleStyles={
          {
            text: {
              fontSize: 14
            },
            chatbubble: {
              borderRadius: 70,
              padding: 10
            }
          }
        }
      />
      <input type="text"></input>
      <button onClick={this.sendMessage}>Send</button>
      </React.Fragment>
    )
      }  
}

export default StudentChat;
