import React, { Component } from "react";
import axios from "axios";
import NavHeader2 from "../Navbar/NavHeader2";
class Home extends Component {
  state = {
    onlineUsers: [],
  };
  async componentDidMount() {
    if (localStorage.getItem("organization") === null) {
      this.props.history.push("/login");
    } else {
      let body = {
        organization: localStorage.getItem("organization"),
      };
      axios
        .post(
          `https://ph3t9297m6.execute-api.us-east-1.amazonaws.com/default/serverless-onlineUsers`,
          body
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          let resData = res.data;
          this.setState({
            onlineUsers: resData,
          });
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavHeader2 history={this.props.history} />
        <header className="App-header">
          <p>Online users.</p>
          <div>
            {this.state.onlineUsers.map((user, index) => (
              <p key={user.email}>
                {" "}
                {user.firstName} {user.secondName}{" "}
              </p>
            ))}
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Home;
