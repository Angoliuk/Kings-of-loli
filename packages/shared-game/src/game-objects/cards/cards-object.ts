import { GAME_FIELD } from '../../constants';
import { CardType, GameObjectType, Coordinates, ActionType, UnitType } from '../../interfaces';
import { isCrossingObstacleCoordinates } from '../../utils';
import { Action } from '../actions';
import { BaseGameObject, BaseGameObjectProps } from '../base/base-object';
import { Unit } from '../units/unit-object';

type CardProperties = {
  damage: number;
  // TODO: For what this variable???
  unitSource: string;
  energy: number;
  possibleMoves: number;
  price: number;
  cardType: CardType;
} & Omit<BaseGameObjectProps, 'objectType'>;

export class Card extends BaseGameObject {
  #damage;
  #unitSource;
  #cardType;
  #price;
  #energy;
  #possibleMoves;

  constructor({ damage, hp, source, team, unitSource, price, energy, possibleMoves, cardType }: CardProperties) {
    super({
      objectType: GameObjectType.CARD,
      hp: hp,
      source: source,
      team: team,
    });
    // its like a count of moves per turn
    this.#possibleMoves = possibleMoves;
    this.#unitSource = unitSource;
    this.#damage = damage;
    this.#price = price;
    this.#energy = energy;
    this.#cardType = cardType;
  }

  get price() {
    return this.#price;
  }
  get energy() {
    return this.#energy;
  }
  get damage() {
    return this.#damage;
  }

  getPossibleCardActions<T extends BaseGameObject & ({ coords: Coordinates } | { coords: Coordinates[] })>(
    obstacles: T[],
  ) {
    const possibleMoves: Action[] = [];
    for (let y = 0; y < GAME_FIELD.y; y++) {
      for (let x = 0; x < Math.floor(GAME_FIELD.x / 2); x++) {
        const action = new Action({
          actionType: ActionType.MOVE,
          source: 'resources/img/map/tiles/point.png',
          coords: { x, y },
        });
        // TODO: do we really want have coords as array or single object
        obstacles.some((obstacle) => !isCrossingObstacleCoordinates(action, obstacle)) && possibleMoves.push(action);
      }
    }

    return possibleMoves;
  }

  move<T extends any[]>(coords: Coordinates, objectsList: T) {
    // TODO: card can create not only unit
    objectsList.push(
      new Unit({
        coords,
        damage: this.#damage,
        hp: this.hp,
        source: this.#unitSource,
        team: this.team,
        energy: this.#energy,
        possibleMoves: this.#possibleMoves,
        unitType: UnitType.WARRIOR,
      }),
    );
  }
}
