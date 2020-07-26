import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Login/Login.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NavHeader2 from "../../Navbar/NavHeader2";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class Signup extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    secondName: '',
    organization: '',
    question: '1',
    answer: '',
    nameError: null,
    emailError: null,
    passwordError: null,
    firstNameError: null,
    secondNameError: null,
    answerError: null,
    organizationError: null,
    disabled: true,
    credError: null

  }

  isSubmitDisabled = () => {

    let validEmail = false;
    let passwordIsValid = false;
    let validFirstName = false;
    let validSecondName = false;
    let validAnswer = false;

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

    if (this.state.firstName === "" || !this.state.firstName) {
      this.setState({
        firstNameError: null
      });
    } else {
      if (this.state.firstName.length >= 1) {
        validFirstName = true;
        this.setState({
          firstNameError: null
        });
      } else {
        this.setState({
          firstNameError: "Enter your first name"
        });
      }
    }

    if (this.state.firstName === "" || !this.state.firstName) {
      this.setState({
        firstNameError: null
      });
    } else {
      if (this.state.firstName.length >= 1) {
        validFirstName = true;
        this.setState({
          firstNameError: null
        });
      } else {
        this.setState({
          firstNameError: "Enter your first name"
        });
      }
    }

    if (this.state.secondName === "" || !this.state.secondName) {
      this.setState({
        secondNameError: null
      });
    } else {
      if (this.state.secondName.length >= 1) {
        validSecondName = true;
        this.setState({
          secondNameError: null
        });
      } else {
        this.setState({
          secondNameError: "Enter your second name"
        });
      }
    }

    if (this.state.answer === "" || !this.state.answer) {
      this.setState({
        answerError: null
      });
    } else {
      if (this.state.answer.length >= 1) {
        validAnswer = true;
        this.setState({
          answerError: null
        });
      } else {
        this.setState({
          answerError: "Enter your answer"
        });
      }
    }



    if (validEmail && passwordIsValid && validFirstName && validSecondName) {
      this.setState({
        disabled: false
      });
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

  login = () => {
    console.log(this.state.email)
    // const history = useHistory();
    let body = {
      "email": this.state.email,
      "password": this.state.password,
      "firstName": this.state.firstName,
      "secondName": this.state.secondName,
      "organization": this.state.organization,
      "questionID": this.state.question,
      "answer": this.state.answer,
      "timestamp":Date.now()
    }

    axios.post(`https://cors-anywhere.herokuapp.com//https://us-central1-serverless-proj-284222.cloudfunctions.net/serverless-signup`, body)
      .then(res => {
        console.log(res);
        console.log(res.data);
        let resData = res.data;
        if (resData) {
          this.props.history.push("/login");
          
        } else {
          this.setState({
            credError: true
          })
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <NavHeader2 />
        <div className="App-content" >
          <div style={{ fontSize: "30px", paddingLeft: "475px", paddingTop: "30px", margin: "auto", width: "50%" }}>
            Sign up Form
          </div>

          <div style={{ paddingLeft: "475px", paddingTop: "10px", margin: "auto", width: "50%" }} >
            <div>
              <div style={this.state.credError ? {} : { display: 'none' }} >
                <p>User Already exists</p>
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
            <div className="space">
              <TextField className="input-class"
                floatinglabeltext="First Name"
                type="text"
                error={this.state.firstNameError !== null}
                helperText={this.state.firstNameError}
                onChange={e => this.onValueChange(e, 'firstName')}
                id="standard-basic" required label="First Name"
                variant="outlined"
                onBlur={this.isSubmitDisabled} /></div>

            <div className="space">
              <TextField className="input-class"
                floatinglabeltext="Second Name"
                type="text"
                error={this.state.secondNameError !== null}
                helperText={this.state.secondNameError}
                onChange={e => this.onValueChange(e, 'secondName')}
                id="standard-basic" required label="Second Name"
                variant="outlined"
                onBlur={this.isSubmitDisabled} /></div>
            <div className="space">
              <TextField className="input-class"
                floatinglabeltext="Organization"
                type="text"
                error={this.state.organizationError !== null}
                helperText={this.state.organizationError}
                onChange={e => this.onValueChange(e, 'organization')}
                id="standard-basic" required label="Organization"
                variant="outlined"
                onBlur={this.isSubmitDisabled} /></div>
            <div>
              <FormControl >
                <InputLabel id="demo-simple-select-label">Question</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.question}
                  onChange={e => this.onValueChange(e, 'question')}
                >
                  <MenuItem value={1}>What is your favorite dish?</MenuItem>
                  <MenuItem value={2}>What is your favorite game?</MenuItem>
                  <MenuItem value={3}>What is your crush name? </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="space">
              <TextField className="input-class"
                floatinglabeltext="Answer"
                type="text"
                error={this.state.answerError !== null}
                helperText={this.state.answerError}
                onChange={e => this.onValueChange(e, 'answer')}
                id="standard-basic" required label="Answer"
                variant="outlined"
                onBlur={this.isSubmitDisabled} /></div>
            <div></div>
            <div className="button-class">
              <Button disabled={this.state.disabled} onClick={this.login} variant="contained" color="secondary">
                Sign up
              </Button>
            </div>
            <a href="/login">Old user? Login</a>
          </div>

        </div>

      </React.Fragment>
    );
  }
}
export default Signup;
