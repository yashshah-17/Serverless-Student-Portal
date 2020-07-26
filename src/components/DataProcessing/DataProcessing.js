import React, { Component } from "react";
import WordCloud from "react-d3-cloud";
import NavHeader2 from "../Navbar/NavHeader2";

class DataProcessing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newdata: {},
    };
  }

  componentDidMount() {
    const that = this;
    fetch("https://helloworld-ex2gcdwlnq-uc.a.run.app/")
      .then((response) => response.text())
      .then(function (jsonStr) {
        that.setState({ newdata: JSON.parse(jsonStr) });
        console.log(that.state.newdata);
      });
  }

  render() {
    const data = [];
    for (const [key, frequency] of Object.entries(this.state.newdata)) {
      console.log(key, frequency);
      var entry = { text: key, value: frequency };
      data.push(entry);
    }

    const fontSizeMapper = (word) => Math.log2(word.value) * 30;

    return (
      <React.Fragment>
        <NavHeader2 history={this.props.history} />
        <div className="container">
          <br />
          <h1 align="center">Welcome to Visualize the Word Cloud</h1>
          <br />
          <hr />
          <br />
          <WordCloud
            data={data}
            width={1200}
            height={500}
            fontSizeMapper={fontSizeMapper}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DataProcessing;
