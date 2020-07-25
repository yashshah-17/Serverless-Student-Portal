import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
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
    credError:null

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

login = () =>{
  console.log(this.state.email)
 // const history = useHistory();
  let body ={
    "email":this.state.email,
    "password":this.state.password
  }

  axios.post(`https://us-central1-serverless-proj-284222.cloudfunctions.net/serverless-signin-first`,  body )
      .then(res => {
        console.log(res);
        console.log(res.data);
        let resData = res.data;
        if(resData.error){
          this.setState({
            credError:true
          })
          
        }else{
          localStorage.setItem("idToken",resData.idToken)
          localStorage.setItem("refreshToken",resData.refreshToken)
          localStorage.setItem("question",resData.question)
          localStorage.setItem("questionID",resData.questionID)
          localStorage.setItem("email",resData.email)
          this.props.history.push("/loginSecond");
        }
      })
}

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
            <div style={{margin:"auto",width:"50%"}}>
              Login Form
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div style={{margin:"auto",width:"50%"}}>
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
                <Button disabled={this.state.disabled} onClick={this.login} variant="primary" size="lg" active>
                  Login
                </Button>
              </div>
              <a href="/register">New user? Register?</a>
              </div>
            </Col>
          </Row>
        </Container>

      </React.Fragment>
    );
  }
}
export default Login;
