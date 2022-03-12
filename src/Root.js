import React from "react";
import Table from "./Components/Table";
import { connect } from "react-redux";
import { addItem, updateGrid } from "./actions";
import createBalls from "./HOC/createBalls";

class Root extends React.Component {
  state = {
    grid: [
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ],
  };

  async componentDidMount() {
    await this.createThreeBalls();
  }

  async createThreeBalls() {
    const { grid } = this.state;
    const { addNewBall, updateGrid, createThreeBalls } = this.props;
    let newThreeBalls = await createThreeBalls(grid);
    await addNewBall(newThreeBalls.ballPositions);
    await updateGrid(newThreeBalls.grid);
  }

  render() {
    return (
      <>
        <p>points: {this.props.points}</p>
        <Table />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addNewBall: (item) => dispatch(addItem(item)),
  updateGrid: (grid) => dispatch(updateGrid(grid)),
});

const mapStateToProps = (state) => ({
  ballPositions: state.ballPositions,
  points: state.points
});

export default createBalls(connect(mapStateToProps, mapDispatchToProps)(Root));
