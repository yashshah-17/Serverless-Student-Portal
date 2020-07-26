import React, { Component } from "react";
import WordCloud from "react-d3-cloud";
import NavHeader2 from "../Navbar/NavHeader2";

class DataProcessing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch("https://helloworld-ex2gcdwlnq-uc.a.run.app/")
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  render() {
    const data = [
      { text: "Microsoft", value: 16 },
      { text: "Mr", value: 10 },
      { text: "Chineese", value: 7 },
      { text: "China", value: 6 },
      { text: "Windows", value: 6 },
      { text: "Negroponte", value: 5 },
      { text: "Peru", value: 5 },
      { text: "Saldarriaga", value: 5 },
      { text: "Kyrgyz", value: 4 },
      { text: "Huaral", value: 4 },
      { text: "Stone", value: 4 },
      { text: "Cepes", value: 4 },
      { text: "Valley", value: 4 },
      { text: "Republic", value: 4 },
      { text: "Soviet", value: 2 },
      { text: "Huaral", value: 2 },
      { text: "Serbia", value: 2 },
      { text: "News", value: 2 },
      { text: "Net", value: 2 },
      { text: "Stephen", value: 2 },
      { text: "Toulouse", value: 2 },
      { text: "Software", value: 2 },
      { text: "Sybari", value: 2 },
      { text: "Media", value: 2 },
      { text: "World", value: 2 },
      { text: "Nokia", value: 2 },
      { text: "Technology", value: 2 },
      { text: "Century", value: 2 },
      { text: "Brussels", value: 2 },
    ];

    const fontSizeMapper = (word) => Math.log2(word.value) * 30;

    return (
      <React.Fragment>
        <NavHeader2 history={this.props.history} />
        <WordCloud data={data} width={1500} fontSizeMapper={fontSizeMapper} />
      </React.Fragment>
    );
  }
}

export default DataProcessing;
