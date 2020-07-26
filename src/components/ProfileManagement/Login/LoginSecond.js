import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './Login.css'
import NavHeader2 from "../../Navbar/NavHeader2";
import axios from 'axios';

class LoginSecond extends Component {
    state = {
        question: '',
        answer: '',
        credError: null

    }

    componentDidMount() {
        this.setState({
            question: localStorage.getItem("question")
        })
    }

    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }

    loginSecond = () => {
        let body = {
            "email": localStorage.getItem("email"),
            "answer": this.state.answer
        }
        axios.post(` https://knat64zukj.execute-api.us-east-1.amazonaws.com/default/ServerlessSignInSecond`, body)
            .then(res => {
                console.log(res);
                console.log(res.data);
                let resData = res.data;
                if (resData) {
                    this.props.history.push("/");
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
                <div  className="App-content">
                <div style={{ fontSize: "30px",paddingLeft:"475px", paddingTop: "30px",margin:"auto",width:"50%" }}>
                    Login Form
                </div>
                <div style={{paddingLeft:"475px", paddingTop: "10px",margin:"auto",width:"50%"}}>
                    <div>
                        <div style={this.state.credError ? {} : { display: 'none' }} >
                            <p>Wrong answer</p>
                        </div>
                        <div className="space">
                            <p>Question: {this.state.question}</p>
                        </div>
                        <div className="space">
                            <TextField className="input-class"
                                floatinglabeltext="Answer"
                                type="text"
                                onChange={e => this.onValueChange(e, 'answer')}
                                id="standard-basic" required label="Answer"
                                variant="outlined"
                            /></div>
                    </div>
                    <div className="button-class">
                    <Button  onClick={this.loginSecond} variant="contained" color="secondary">
                    Login
                    </Button>
                    </div>

                </div>
                </div>
            </React.Fragment>
        );
    }
}
export default LoginSecond;
