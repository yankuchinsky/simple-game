import { WIDTH, HEIGHT } from "../index";

export class NotificationController {
  protected context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  getNotification() {
    const { context } = this;
    context.fillStyle = "#ffffff";

    context.fillText("Game over", WIDTH / 2 - 50, HEIGHT / 2);
  }
}
