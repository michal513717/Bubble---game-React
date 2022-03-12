import React from "react";

function createBalls(WrappedComponent) {
  return class extends React.Component {
    state = {
      color: ["royalblue", "pink", "green", "tomato", "yellow"],
    };

    createThreeBalls = (grid) => {
      let ballPositions = [];
      for (let i = 0; i < 3; i++) {
        let isPlaceFree = true,
          row,
          column;
          
        const { color } = this.state;

        while (isPlaceFree) {
          row = Math.floor(Math.random() * 10);
          column = Math.floor(Math.random() * 10);
          if (grid[row][column] === "0") {
            isPlaceFree = false;
          }
        }

        let newBall = {
          row,
          column,
          color: color[Math.floor(Math.random() * 5)],
        };

        grid[row][column] = "x";
        ballPositions.push(newBall);
      }
      return { grid, ballPositions };
    };

    render() {
      return (
        <WrappedComponent
          createThreeBalls={(grid) => this.createThreeBalls(grid)}
          {...this.props}
        />
      );
    }
  };
}

export default createBalls;
