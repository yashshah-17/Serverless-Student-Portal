import React from "react";
import { ChatFeed, Message } from 'react-chat-ui'
import "./StudentChat.css"
import { InputGroup, FormControl, Button } from "react-bootstrap";

class StudentChat extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: [],
      inputText: ""
    };
    this.university = localStorage.getItem("universityName") || "dalhousie";
    this.username =  localStorage.getItem("username") || "annonymous";
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
          username: this.username,
          text: this.state.inputText,
          timeStamp: Date.now(),
          groupName: this.university
        }
      })
    };

    fetch('https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve', requestOptionsPost)
      .then(response => response.json())
      .then(data => console.log(data));
      this.setState({inputText: ""})
    };

  receive = event => {
    fetch('https://us-central1-avid-garage-282122.cloudfunctions.net/pubsub_message_post_and_retrieve?type=allMessages&university='
     + this.university)
      .then(response => response.json())
      .then(data => {
        let messages = data.map(i => {
          return new Message({
            id: i.username === this.username ? 0 : 1,
            message: i.text,
            senderName: i.username
          })
        })
        this.setState({ messages })
      });
  };

  textChange = (event) => {
    this.setState({inputText: event.target.value})
  }

  render() {
    return (<React.Fragment>
      <ChatFeed
        messages={this.state.messages}
        hasInputField={false}
        showSenderName
        bubblesCentered={false}
        bubbleStyles={
          {
            text: {
              fontSize: 16
            },
            chatbubble: {
              borderRadius: 70,
              padding: 10,
              backgroundColor: "#5BC236"
            }
          }
        }
      />
      <br/>
      <br/>
      <br/>
      <div className="footer">
        <InputGroup size="lg">
          <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" onChange={this.textChange} value={this.state.inputText}/>
          <InputGroup.Append>
          <Button variant="primary" onClick={this.sendMessage}>Send</Button>
           </InputGroup.Append>
        </InputGroup>
      </div>

    </React.Fragment>
    )
  }
}

export default StudentChat;
