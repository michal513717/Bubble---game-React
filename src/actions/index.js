export const addItem = (item) => {
  return {
    type: "ADD_ITEM",
    payload: {
      item,
    },
  };
};

export const updateGrid = (grid) => {
  return {
    type: "UPDATE_GRID",
    payload: {
      grid,
    },
  };
};

export const pickCurrentBall = (currentBall) => {
  return {
    type: "PICK_CURRENT_BALL",
    payload: {
      currentBall,
    },
  };
};

export const changeBallPosition = (newBallPositions) => {
  return {
    type: "CHANGE_BALL_POSITION",
    payload: {
      newBallPositions,
    },
  };
};

export const deleteBalls = (ballsToDelete) => {
  return { 
    type: "DELETE_BALLS",
    payload: {
      ballsToDelete
    }
  }
} 

export const updatePoints = (points) => {
  return {
    type: "UPDATE_POINTS",
    payload: {
      points
    }
  }
}

export const previousBalls = (prevBalls) => {
  return {
    type: "UPDATE_POINTS",
    payload: {
      prevBalls,
    },
  };
};