const PathFinder = (start,grid) => {
  const findShortestPath =(startCoordinates, grid)=> {
    let distanceFromTop = parseInt(startCoordinates[0]);
    let distanceFromLeft = parseInt(startCoordinates[1]);

    let location = {
      distanceFromTop: distanceFromTop,
      distanceFromLeft: distanceFromLeft,
      path: [],
      status: "Start",
    };

    let queue = [location];

    while (queue.length > 0) {
      let currentLocation = queue.shift();
      let newLocation = exploreInDirection(currentLocation, "up", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }

      newLocation = exploreInDirection(currentLocation, "right", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }

      newLocation = exploreInDirection(currentLocation, "down", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }

      newLocation = exploreInDirection(currentLocation, "left", grid);
      if (newLocation.status === "Goal") {
        return newLocation.path;
      } else if (newLocation.status === "Valid") {
        queue.push(newLocation);
      }
    }

    return false;
  }

  const exploreInDirection =(currentLocation, direction, grid) =>{
    let newPath = currentLocation.path.slice();
    newPath.push(direction);

    let dft = currentLocation.distanceFromTop;
    let dfl = currentLocation.distanceFromLeft;

    if (direction === "up") {
      dft -= 1;
    } else if (direction === "right") {
      dfl += 1;
    } else if (direction === "down") {
      dft += 1;
    } else if (direction === "left") {
      dfl -= 1;
    }

    let newLocation = {
      distanceFromTop: dft,
      distanceFromLeft: dfl,
      path: newPath,
      status: "Unknown",
    };
    newLocation.status = locationStatus(newLocation, grid);

    if (newLocation.status === "Valid") {
      grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] =
        "Visited";
    }

    return newLocation;
  }
  const locationStatus=(location, grid)=> {
    let gridSize = grid.length;
    let dft = location.distanceFromTop;
    let dfl = location.distanceFromLeft;

    if (
      location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize
    ) {
      return "Invalid";
    } else if (grid[dft][dfl] === "Goal") {
      return "Goal";
    } else if (grid[dft][dfl] !== "0") {
      return "Blocked";
    } else {
      return "Valid";
    }
  }

  let result = findShortestPath(start, grid);
  return result
}

export default PathFinder