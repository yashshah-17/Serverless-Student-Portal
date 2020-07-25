// Navbar code goes here
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Navbar } from 'react-bootstrap';
import './Navbar.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
class NavHeader2 extends Component {

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
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            
            </IconButton>
            <Typography variant="h6" className="title">
              Serverless Application
            </Typography>
            <Button color="secondary" onClick={this.logout} >Log Out</Button>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default NavHeader2;