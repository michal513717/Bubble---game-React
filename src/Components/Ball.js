import React from "react";
import { connect } from "react-redux";
import { pickCurrentBall } from "./../actions";
import styled from 'styled-components'
import style from './Ball.module.scss'

const StyledBall = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  position: absolute;
  inset: 0;
  margin: auto;
  overflow: hidden;
`;

class Ball extends React.Component {
  clickBall = (e) => {
    const { currentBall, pickNewCurrentBall } = this.props;

    if (
      currentBall.row === e.target.dataset.row &&
      currentBall.column === e.target.dataset.column
    ) {
      pickNewCurrentBall({
        row: null,
        column: null,
      });
    } else {
      pickNewCurrentBall(e.target.dataset);
    }
  };

  render() {
    const { color, row, column,currentBall } = this.props;
    return (
      <StyledBall className={ (parseInt(currentBall.row) === row && parseInt(currentBall.column) === column) ? style.active : style.notActive }
        data-column={column}
        data-row={row}
        data-color={color}
        onClick={this.clickBall}
        color={color}
      >
        <div></div>
      </StyledBall>
    );
  }
}

const mapStateToProps = (state) => ({
  ballPositions: state.ballPositions,
  currentBall: state.currentBall,
  grid: state.grid,
});

const mapDispatchToProps = (dispatch) => ({
  pickNewCurrentBall: (currentBall) => dispatch(pickCurrentBall(currentBall)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ball);
