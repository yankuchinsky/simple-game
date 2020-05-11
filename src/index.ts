import { KeyDetectionHelper } from "./helpers/keyDetection";
import { EnemyController } from "./helpers/enemyController";
import { GameFieldController } from "./helpers/gameFieldController";
import { ScoreController } from "./helpers/scoreController";
import { PlayerController } from "./helpers/playerController";
import { NotificationController } from "./helpers/notificationController";
import RoadImage from "./assets/road.png";

export const WIDTH = GameFieldController.getBoundaries().width;
export const HEIGHT = GameFieldController.getBoundaries().height;

const Bootstrap = () => {
  const field: HTMLCanvasElement | null = document.querySelector(
    "#canvas-field"
  );

  if (!field || !field.getContext) {
    return;
  }

  field.width = WIDTH;
  field.height = HEIGHT;

  const context = field.getContext("2d");

  if (!context) {
    return;
  }

  KeyDetectionHelper.init(window);

  const enemyController = new EnemyController(context);
  enemyController.start();

  const scoreController = new ScoreController(context);
  scoreController.setPosition({ x: WIDTH - 200, y: 40 });

  PlayerController.init(context);
  PlayerController.registerKeys();

  const gameOverNotification = new NotificationController(context);

  const drawBackground = () => {
    const image = new Image();
    image.src = RoadImage;
    const road = context.createPattern(image, "repeat");

    if (road) {
      context.fillStyle = road;
      context.fillRect(0, 0, WIDTH, HEIGHT);
    }
  };

  const draw = () => {
    context.clearRect(0, 0, WIDTH, HEIGHT);

    drawBackground();

    PlayerController.draw();

    enemyController.draw();
    scoreController.draw();

    if (PlayerController.isGameEnd) {
      gameOverNotification.getNotification();

      return;
    }

    requestAnimationFrame(draw);
  };

  draw();
};

Bootstrap();
