import { PositionArguments } from "./gameObject";
import { ICollision } from "./interfaces";
import { RectGameObject } from "./rectGameObject";

export class Car extends RectGameObject implements ICollision {
  protected x = 0;
  protected y = 0;

  width = 50;
  height = 120;

  detectCollision() {
    return false;
  }
}
