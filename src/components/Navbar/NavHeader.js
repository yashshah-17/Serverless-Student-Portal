// Navbar code goes here
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

class NavHeader extends Component {
  

  render() {

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu">

            </IconButton>
            <Typography variant="h6" >
              Serverless Application
            </Typography>
   
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default NavHeader;
