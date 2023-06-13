import { TurnFromServer, TurnToServer, GameObjectsList } from '../interfaces';

export const updateGameObjectsGroup = <K extends keyof GameObjectsList, T extends GameObjectsList[K]['object'][]>(
  initialObjects: T,
  turn: TurnToServer | TurnFromServer,
) => {
  const objectsType = initialObjects[0].objectType;
  return (
    (
      [...new Set([...initialObjects, ...(turn.newObjects?.[objectsType] ?? [])].map((object) => object.id))].map(
        (id) => [...initialObjects, ...(turn.newObjects?.[objectsType] ?? [])].find((object) => object.id === id),
      ) as T
    ).map(
      (object) =>
        // @ts-expect-error
        turn.updatedObjects[objectsType].find((updatedObject: typeof object) => updatedObject.id === object.id) ??
        object,
    ) as T
  ).filter((object: T[0]) => !turn.removedObjects?.[objectsType]?.includes(object.id)) as T;
};
