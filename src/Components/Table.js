import React from "react";
import Tr from "./Tr";

class Table extends React.Component {
  state = {
    Trs: [],
  };

  componentDidMount() {
    for (let i = 0; i < 10; i++) {
      let element = <Tr row={i} key={i} />;
      this.setState((prev) => ({
        Trs: [...prev.Trs, element],
      }));
    }
  }

  render() {
    return (
      <table>
        <tbody>{this.state.Trs}</tbody>
      </table>
    );
  }
}

export default Table;
