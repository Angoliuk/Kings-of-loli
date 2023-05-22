import { BaseGameObject } from '../game-objects/base/base-object';
import { Coordinates } from '../interfaces';

export type IsCrossingObstacleCoordinatesObject = BaseGameObject &
  ({ coords: Coordinates } | { coords: Coordinates[] });

export const isCrossingObstacleCoordinates = <
  T extends IsCrossingObstacleCoordinatesObject,
  K extends IsCrossingObstacleCoordinatesObject,
>(
  object: T,
  obstacle: K,
) => {
  if (Array.isArray(obstacle.coords) && !Array.isArray(object.coords)) {
    return obstacle.coords.some(
      (obstacleCoords) => obstacleCoords.x === object.coords.x && obstacleCoords.y === object.coords.y,
    );
  }

  if (!Array.isArray(obstacle.coords) && !Array.isArray(object.coords)) {
    return object.coords.x === obstacle.coords.x && object.coords.y === obstacle.coords.y;
  }

  if (!Array.isArray(obstacle.coords) && Array.isArray(object.coords)) {
    return object.coords.some(
      (objectCoords) => objectCoords.x === obstacle.coords.x && objectCoords.y === obstacle.coords.y,
    );
  }

  if (Array.isArray(obstacle.coords) && Array.isArray(object.coords)) {
    return obstacle.coords.some((obstacleCoords) =>
      object.coords.some(
        (objectCoords) => objectCoords.x === obstacleCoords.coords.x && objectCoords.y === obstacleCoords.coords.y,
      ),
    );
  }
};
