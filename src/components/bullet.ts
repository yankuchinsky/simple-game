import { RectGameObject } from "./rectGameObject";
import { PositionArguments } from "../components/gameObject";

export class Bullet extends RectGameObject {
  width = 5;
  height = 5;

  protected _move: Function;
  protected _draw: Function;

  constructor(context: CanvasRenderingContext2D) {
    super(context);

    this._move = super.move;
    this._draw = super.draw;
  }

  move({ x, y }: PositionArguments) {
    this._move({ x, y });

    window.setTimeout(() => {
      this.move({ x, y });
    }, 10);
  }

  draw() {
    const { field, x, y, width, height } = this;
    field.fillStyle = "#ffffff";

    field.fillRect(x, y, width, height);
  }
}
