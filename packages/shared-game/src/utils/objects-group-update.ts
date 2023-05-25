import { BaseObject } from '../game-objects';
import { BaseGameObject } from '../game-objects/base';
import { GameObjectType, GameObjects, GameObjectsLists, TurnFromServer, TurnToServer } from '../interfaces';

export const updateGameObjectsGroup = <T extends GameObjectsLists[keyof GameObjects]>(
  initialObjects: T,
  turn: TurnToServer | TurnFromServer,
) => {
  const objectsType = initialObjects[0].objectType;
  return ([...initialObjects, ...(turn.newObjects?.[objectsType] ?? [])] as T)
    .map(
      (object) =>
        // @ts-expect-error
        turn.updatedObjects[objectsType].find((updatedObject: typeof object) => updatedObject.id === object.id) ??
        object,
    )
    .filter((object: T[0]) => !turn.removedObjects?.[objectsType]?.includes(object.id)) as T;
};
