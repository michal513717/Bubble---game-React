import React from "react";

function checkPoints(WrappedComponent) {
  return class extends React.Component {
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

export default checkPoints;
// to delete !