import { GameObject } from "./gameObject";
import { IRect } from "./interfaces";
import { GameFieldController } from "../helpers/gameFieldController";

const WIDTH = GameFieldController.getBoundaries().width;
const HEIGHT = GameFieldController.getBoundaries().height;

export abstract class RectGameObject extends GameObject implements IRect {
  height = 0;
  width = 0;

  draw() {
    const { x, y, width, height, field } = this;

    field.beginPath();
    field.lineWidth = 0.9;
    field.moveTo(x, y);
    field.lineTo(x + width, y);

    field.moveTo(x + width, y + height);
    field.lineTo(x + width, y);

    field.moveTo(x, y);
    field.lineTo(x, y + height);

    field.moveTo(x, y + height);
    field.lineTo(x + width, y + height);

    field.stroke();
  }

  outOfBounceCheck() {
    const { x, y, width } = this;

    if (x < 0 || y < 0 || x + width >= WIDTH || y + 30 >= HEIGHT) {
      return true;
    }

    return false;
  }

  getBoundaries() {
    const { x, y, width, height } = this;

    return {
      x,
      y,
      width,
      height,
    };
  }
}
