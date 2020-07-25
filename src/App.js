import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Importing the required components
import NavHeader from "./components/Navbar/NavHeader";
import NavHeader2 from "./components/Navbar/NavHeader2";
import Home from "./components/Home/Home";
import DataProcessing from "./components/DataProcessing/DataProcessing";
import MachineLearning from "./components/MachineLearning/MachineLearning";
import ChatWithLex from "./components/Chat/ChatWithLex";
import StudentChat from "./components/Chat/StudentChat";
import Login from "./components/ProfileManagement/Login/Login";
import LoginSecond from "./components/ProfileManagement/Login/LoginSecond";
import Signup from "./components/ProfileManagement/Signup/Signup";

// Importing CSS
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style/main.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {text: "Initial Text"}
    this.updateText1 = this.updateText1
}
updateText1 = (text) => {this.setState({ text })}
  
  render() {
    return (
      <Router>
        {/* This will load the Navbar to all the Components */}

        {/* Route to Components */}
        <Route exact path="/" component={Home} />
        <Route path="/dataprocessing" component={DataProcessing} />
        <Route path="/machinelearning" component={MachineLearning} />
        <Route path="/systemchat" component={ChatWithLex} />
        <Route path="/studentchat" component={StudentChat} />
        <Route path="/login" component={Login} />
        <Route path="/loginSecond"  component={LoginSecond} />
        <Route path="/signup" component={Signup} />
      </Router>
    );
  }
}

export default App;
