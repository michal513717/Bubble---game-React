import React from "react";
import Td from "./Td";

class Tr extends React.Component {
  state = {
    Tds: [],
  };

  componentDidMount() {
    for (let i = 0; i < 10; i++) {
      let element = <Td row={this.props.row} column={i} key={i} />;
      this.setState((prev) => ({
        Tds: [...prev.Tds, element],
      }));
    }
  }

  render() {
    return <tr>{this.state.Tds}</tr>;
  }
}

export default Tr;
