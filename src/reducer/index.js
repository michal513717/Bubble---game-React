const initialState = {
  ballPositions: [],
  currentBall: {
    row: null,
    column: null,
  },
  points: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        ballPositions: [...state.ballPositions, ...action.payload.item],
      };
    case "UPDATE_GRID":
      return {
        ...state,
        grid: [...action.payload.grid],
      };
    case "PICK_CURRENT_BALL":
      return {
        ...state,
        currentBall: action.payload.currentBall,
      };
    case "CHANGE_BALL_POSITION":
      return {
        ...state,
        currentBall: {
          row: null,
          column: null,
        },
        ballPositions: action.payload.newBallPositions,
      };
    case "UPDATE_POINTS":
      return {
        ...state,
        points: state.points + action.payload.points,
      };
    case "DELETE_BALLS":
      let newBallPosition = JSON.parse(JSON.stringify(state.ballPositions));
      action.payload.ballsToDelete.forEach((item) => {
        newBallPosition = newBallPosition.filter((checkingValue) => {
          const conditionOfNewArray = !(
            checkingValue.row === parseInt(item.row) &&
            checkingValue.column === parseInt(item.column)
          );
          return conditionOfNewArray;
        });
      });
      return {
        ...state,
        ballPositions: newBallPosition,
      };

    default:
      return state;
  }
};

export default rootReducer;
