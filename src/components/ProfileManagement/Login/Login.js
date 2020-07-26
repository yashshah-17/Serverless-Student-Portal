import React, { Component } from 'react';
import NavHeader2 from "../../Navbar/NavHeader2";
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './Login.css'

import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
    nameError: null,
    emailError: null,
    passwordError: null,
    disabled: true,
    credError: null

  }

   componentDidMount() {
    if (localStorage.getItem("organization") === null) {
      
    } else{
      this.props.history.push("/");
    }
  }

  isSubmitDisabled = () => {

    let validEmail = false;
    let passwordIsValid = false;

    if (this.state.email === "") {
      this.setState({
        emailError: null
      });
    } else {
      if (this.emailValidation(this.state.email)) {
        validEmail = true
        this.setState({
          emailError: null
        });
      } else {
        this.setState({
          emailError: "Please enter valid email!"
        });
      }
    }

    if (this.state.password === "" || !this.state.password) {
      this.setState({
        passwordError: null
      });
    } else {
      if (this.state.password.length >= 6) {
        passwordIsValid = true;
        this.setState({
          passwordError: null
        });
      } else {
        this.setState({
          passwordError: "Your password must be at least 6 characters"
        });
      }
    }

    if (validEmail && passwordIsValid) {
      if (this.state.name === '') {
        this.setState({
          nameError: "Please enter name"
        });
      } else if (validEmail && passwordIsValid) {
        this.setState({
          disabled: false
        });
      }

    }
  }

  emailValidation = (email) => {
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
  }

  onValueChange = (e, label) => {
    const nextState = {};
    nextState[label] = e.target.value;;
    this.setState(nextState);
  }

  updateText = (text) =>{
    this.setState({text})
  }

  login = () => {
    console.log(this.state.email)
    // const history = useHistory();
    let body = {
      "email": this.state.email,
      "password": this.state.password,
      "timestamp":Date.now()
    }

    axios.post(`https://cors-anywhere.herokuapp.com//https://us-central1-serverless-proj-284222.cloudfunctions.net/serverless-signin-first`, body)
      .then(res => {
        console.log(res);
        console.log(res.data);
        let resData = res.data;
        if (resData.error) {
          this.setState({
            credError: true
          })

        } else {
          localStorage.setItem("idToken", resData.idToken)
          localStorage.setItem("refreshToken", resData.refreshToken)
          localStorage.setItem("question", resData.question)
          localStorage.setItem("questionID", resData.questionID)
          localStorage.setItem("email", resData.email)
          localStorage.setItem("firstName", resData.firstName)
          localStorage.setItem("secondName", resData.secondName)
          localStorage.setItem("organization", resData.organization)
          this.props.history.push("/loginSecond");
        }
      })
  }

  
  render() {
    
    return (
      
      <React.Fragment>
        <NavHeader2 />
        <div className="App-content" >
          <div style={{ fontSize: "30px",paddingLeft:"475px", paddingTop: "30px",margin:"auto",width:"50%" }}>
            Login Form
          </div>
          
          <div style={{paddingLeft:"475px", paddingTop: "10px",margin:"auto",width:"50%"}} >
            <div>
              <div style={this.state.credError ? {} : { display: 'none' }} >
                <p>Check your cred</p>
              </div>
              <div className="space">
                <TextField className="input-class"
                  floatinglabeltext="Email"
                  type="email"
                  error={this.state.emailError !== null}
                  helperText={this.state.emailError}
                  onChange={e => this.onValueChange(e, 'email')}
                  id="standard-basic" required label="Email"
                  variant="outlined"
                  onBlur={this.isSubmitDisabled} />
              </div>
              <div className="space">
                <TextField className="input-class"
                  floatinglabeltext="Password"
                  type="password"
                  error={this.state.passwordError !== null}
                  helperText={this.state.passwordError}
                  onChange={e => this.onValueChange(e, 'password')}
                  id="standard-basic" required label="Password"
                  variant="outlined"
                  onBlur={this.isSubmitDisabled} /></div>
            </div>
            <div className="button-class">
              <Button disabled={this.state.disabled} onClick={this.login}  variant="contained" color="secondary">
                Login
              </Button>
            </div>
            <a href="/signup">New user? Register?</a>
          </div>

        </div>

      </React.Fragment>
    );
  }
}
export default Login;
