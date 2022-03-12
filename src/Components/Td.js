import React from "react";
import style from "./Td.module.scss";
import { connect } from "react-redux";
import Ball from "./Ball";
import {
  changeBallPosition,
  updateGrid,
  deleteBalls,
  updatePoints,
} from "../actions";
import PathFinder from "../PathFinder";
import createBalls from "./../HOC/createBalls";

class Td extends React.Component {

  clickTd = async (e) => {
    const {
      currentBall,
      grid,
      actionUpdateGrid,
      actionChangeBallPosition,
      createThreeBalls,
    } = this.props;

    const { row, column } = e.target.dataset;
    const { length } = e.target.children;

    if (currentBall.row !== null) {
      if (length < 1) {
        let gridToPF = await JSON.parse(JSON.stringify(grid)); // deep copy of array
        gridToPF[row][column] = "Goal";

        let wayToPosition = await PathFinder(
          [currentBall.row, currentBall.column],
          gridToPF
        );

        if (wayToPosition) {
          let newGrid = await this.updateGrid(row, column, currentBall);
          let newBallPosition = await this.updateArrayBallPositions(
            parseInt(row),
            parseInt(column)
          );
          let newBalls = await createThreeBalls(newGrid);
          await actionUpdateGrid(newBalls.grid);
          await actionChangeBallPosition([
            ...newBallPosition,
            ...newBalls.ballPositions,
          ]);
          this.segregateColor(
            [...newBallPosition, ...newBalls.ballPositions],
            newGrid
          );
        }
      }
    }
  };

  segregateColor = async (ballpositions, grid) => {
    const groupBy = (array, condition) => {
      return array.reduce((prev, curr) => {
        prev[curr[condition]] = [...(prev[curr[condition]] || []), curr];
        return prev;
      }, {});
    };

    let segregatedColors = groupBy(ballpositions, "color");

    for (const key in segregatedColors) {
      if (segregatedColors[key].length > 4) {
        await this.prepareToCheckingLines(segregatedColors[key]);
      }
    }
  };

  prepareToCheckingLines = async (checkingColor) => {
    const { grid, actionDeleteBalls, actionUpdateGrid, actionUpdatePoints } =
      this.props;
    let newGrid = await JSON.parse(JSON.stringify(grid)); // deep copy of array
    checkingColor.sort((a, b) => {
      return a.row > b.row ? 1 : -1;
    });

    checkingColor.sort((a, b) => {
      return a.column < b.column && a.row === a.column ? 1 : -1;
    });

    let scoreRow = await this.checkStraightLines(
      checkingColor,
      "row",
      "column"
    );

    checkingColor.sort((a, b) => {
      return a.column > b.column ? 1 : -1;
    });

    let scoreColumn = await this.checkStraightLines(
      checkingColor,
      "column",
      "row"
    );

    if (scoreRow) {
      await actionWithUpdateStore(scoreRow);
    }
    if (scoreColumn) {
      await actionWithUpdateStore(scoreColumn);
    }

    function actionWithUpdateStore(data) {
      actionUpdatePoints(data.points);
      data.tableWithLines.forEach((item) => {
        newGrid[item.row][item.column] = "0";
      });
      actionUpdateGrid(newGrid);
      actionDeleteBalls(data.tableWithLines);
    }
  };

  checkStraightLines = (checkingRow, parametrFirst, parametrSecound) => {
    //create a array of object with key 'row or column'
    let segregate = checkingRow.reduce((prev, curr) => {
      prev[curr[parametrFirst]] = [...(prev[curr[parametrFirst]] || []), curr];
      return prev;
    }, {});

    //iterate throw this array
    for (const key in segregate) {
      //checking length of each key in array
      if (segregate[key].length > 4) {
        //putting in turn
        segregate[key].sort((c, b) => {
          return c[parametrSecound] > b[parametrSecound] ? 1 : -1;
        });

        //prepare to counting
        let prevItem = segregate[key][0][parametrSecound];
        let tableWithLines = [];
        let iterator = 1;

        //counting nearby object
        segregate[key].forEach((item) => {
          if (Math.abs(item[parametrSecound] - prevItem) === 1 || 0) {
            iterator += 1;
            tableWithLines.push(item);
          } else {
            if (iterator < 4) {
              iterator = 1;
              tableWithLines = [item];
            }
          }
          prevItem = item[parametrSecound];
        });

        //if they close return
        if (iterator >= 5) {
          return {
            points: iterator,
            tableWithLines,
          };
        }
      }
    }
  };

  updateGrid = async (newRow, newColumn, oldPositions) => {
    const { grid, actionUpdateGrid } = this.props;

    let newGrid = JSON.parse(JSON.stringify(grid)); // two diffrent arrays !
    newGrid[newRow][newColumn] = "x";
    newGrid[oldPositions.row][oldPositions.column] = "0";

    await actionUpdateGrid(newGrid);

    return newGrid;
  };

  updateArrayBallPositions = (newRow, newColumn) => {
    const { ballPositions, currentBall, actionChangeBallPosition } = this.props;

    let newPositions = ballPositions.filter((checkingValue) => {
      const conditionOfNewArray = !(
        checkingValue.row === parseInt(currentBall.row) &&
        checkingValue.column === parseInt(currentBall.column)
      );

      return conditionOfNewArray;
    });

    newPositions.push({
      row: newRow,
      column: newColumn,
      color: currentBall.color,
    });

    actionChangeBallPosition(newPositions);
    return newPositions;
  };

  render() {
    const { row, column, ballPositions } = this.props;
    return (
      <td
        onClick={(e) => this.clickTd(e)}
        className={style.styledTd}
        data-row={row}
        data-column={column}
      >
        {ballPositions.map((item, id) => {
          if (item.row === row && item.column === column) {
            return (
              <Ball color={item.color} row={row} column={column} key={id} />
            );
          } else {
            return null;
          }
        })}
      </td>
    );
  }
}

const mapStateToProps = (state) => ({
  ballPositions: state.ballPositions,
  grid: state.grid,
  currentBall: state.currentBall,
});

const mapDispatchToProps = (dispatch) => ({
  actionChangeBallPosition: (newBallPositions) =>
    dispatch(changeBallPosition(newBallPositions)),
  actionUpdateGrid: (newGrid) => dispatch(updateGrid(newGrid)),
  actionUpdatePoints: (points) => dispatch(updatePoints(points)),
  actionDeleteBalls: (ballsToDelete, newGrid) =>
    dispatch(deleteBalls(ballsToDelete, newGrid)),
});

export default createBalls(connect(mapStateToProps, mapDispatchToProps)(Td));
