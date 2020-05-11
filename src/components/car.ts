import { PositionArguments } from "./gameObject";
import { ICollision } from "./interfaces";
import { RectGameObject } from "./rectGameObject";
import CarImage from "../assets/car.png";

const INITIAL_SHIFT_LEFT = 105;

export class Car extends RectGameObject implements ICollision {
  protected x = 0;
  protected y = 0;
  protected _move: Function;

  protected shiftLeft = INITIAL_SHIFT_LEFT;

  width = 50;
  height = 120;

  constructor(field: CanvasRenderingContext2D) {
    super(field);

    this._move = super.move;
  }

  detectCollision() {
    return false;
  }

  draw() {
    const { field, x, y, width, height } = this;

    const image = new Image();
    image.src = CarImage;

    field.drawImage(image, x, y, width, height);
  }

  move({ x, y }: PositionArguments) {
    this.shiftLeft -= Math.round(this.shiftLeft / 2);
    if (this.shiftLeft < 0) {
      this.shiftLeft = 0;
    }

    this._move({ x, y });

    const shift = x > 0 ? this.shiftLeft : -1 * this.shiftLeft;

    if (shift !== 0) {
      setTimeout(() => {
        this.move({ x: shift, y });
      }, 20);
    } else {
      this.shiftLeft = INITIAL_SHIFT_LEFT;
    }
  }
}
