import { RectGameObject } from "../components/rectGameObject";
import { PlayerController } from "./playerController";

export class ScoreController extends RectGameObject {
  protected field: CanvasRenderingContext2D;
  protected get score() {
    return PlayerController.playerScore;
  }

  width = 120;
  height = 50;
  protected _draw: Function;

  constructor(context: CanvasRenderingContext2D) {
    super(context);

    this.field = context;
    this._draw = super.draw;
  }

  draw() {
    const { field, height, x, y, score } = this;
    field.fillStyle = "#ffffff";

    field.font = "20px sans-serif";

    field.fillText(`score: ${score}`, x + 4, y + height - 18);
  }
}
