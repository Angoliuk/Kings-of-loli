import { GAME_FIELD } from '../../constants';
import { CardType, GameObjectType, Coordinates } from '../../interfaces';
import { BaseGameObject, BaseGameObjectProps } from '../base/base-object';
import { Unit } from '../units/unit-object';

type CardProperties = {
  damage: number;
  radius: number;
  // TODO: For what this variable???
  unitSource: string;
  energy: number;
  possibleMoves: number;
  price: number;
  cardType: CardType;
} & Omit<BaseGameObjectProps, 'objectType'>;

export class Card extends BaseGameObject {
  #radius;
  #damage;
  #unitSource;
  #cardType;
  #price;
  #energy;
  #possibleMoves;

  constructor({
    damage,
    hp,
    source,
    radius,
    team,
    unitSource,
    price,
    energy,
    possibleMoves,
    cardType,
  }: CardProperties) {
    super({
      objectType: GameObjectType.CARD,
      hp: hp,
      source: source,
      team: team,
    });
    this.#possibleMoves = possibleMoves;
    this.#unitSource = unitSource;
    this.#damage = damage;
    this.#radius = radius;
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
    const possibleMoves: UnitAction[] = [];
    for (let y = 0; y < GAME_FIELD.y; y++) {
      for (let x = 0; x < Math.floor(GAME_FIELD.x / 2); x++) {
        possibleMoves.push({
          x: x,
          y: y,
          type: UnitActionsTypes.MOVE,
          src: 'resources/img/map/tiles/point.png',
        });
      }
    }

    // TODO: do we really want have coords as array or single object
    return possibleMoves.filter((move) => obstacles.some((obstacle) => obstacleCoordinatesCheck(mpve, obstacle)));
  }

  move<T extends any[]>(coords: Coordinates, objectsList: T) {
    // TODO: card can create not only unit
    objectsList.push(
      new Unit({
        coords,
        damage: this.#damage,
        hp: this.hp,
        radius: this.#radius,
        source: this.#unitSource,
        team: this.team,
        energy: this.#energy,
        possibleMoves: this.#possibleMoves,
      }),
    );
  }
}
