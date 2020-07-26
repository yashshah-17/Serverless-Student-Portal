// Navbar code goes here
import React, { Component } from "react";
import "./NavHeader.css";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
class NavHeader extends Component {

  logout = () => {
    let body = {
        "email": localStorage.getItem("email")      
    }
    axios.post(`https://pjy23k2623.execute-api.us-east-1.amazonaws.com/default/serverless-logout`, body)
        .then(res => {
            console.log(res);
            console.log(res.data);
            let resData = res.data;
            localStorage.clear();
            this.props.history.push("/login");
        })
}

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">
          Learning Management System
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/StudentChat">
                Chat
              </a>
            </li>

            <li class="nav-item active">
              <a class="nav-link" href="/machinelearning">
                Machine Learning
              </a>
            </li>

            <li class="nav-item active">
              <a class="nav-link" href="/dataprocessing">
                Data Processing
              </a>
            </li>

            <li class="nav-item active">
              <a class="nav-link" href="/systemchat">
                Talk to our chatbot
              </a>
            </li>

            <li class="nav-item active">
            <Button color="secondary" onClick={this.logout} >Log Out</Button>
            </li>
            
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavHeader;
