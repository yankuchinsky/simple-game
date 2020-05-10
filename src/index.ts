import { Car } from "./components/car";
import { KeyDetectionHelper } from "./helpers/keyDetection";
import { EnemyController } from "./helpers/enemyController";
import { GameFieldController } from "./helpers/gameFieldController";
import {
  PlayerCarContainer,
  DependencyContainer,
} from "./helpers/dependencyContainer";
import { ScoreController } from "./helpers/scoreController";

enum keyCodes {
  up = 38,
  down = 40,
  left = 37,
  right = 39,
}

const WIDTH = GameFieldController.getBoundaries().width;
const HEIGHT = GameFieldController.getBoundaries().height;

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

  const scoreController = new ScoreController(context);

  scoreController.setPosition({ x: WIDTH - 200, y: 40 });

  const car = new Car(context);

  PlayerCarContainer.setContainer(new DependencyContainer().setInstance(car));

  car.setPosition({ x: WIDTH / 2, y: HEIGHT / 1.5 });

  KeyDetectionHelper.registerKey(keyCodes.up, car, "move", {
    x: 0,
    y: -5,
  });

  KeyDetectionHelper.registerKey(keyCodes.down, car, "move", {
    x: 0,
    y: 5,
  });

  KeyDetectionHelper.registerKey(keyCodes.right, car, "move", {
    x: 5,
    y: 0,
  });

  KeyDetectionHelper.registerKey(keyCodes.left, car, "move", {
    x: -5,
    y: 0,
  });

  enemyController.start();

  const draw = () => {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    car.draw();

    enemyController.draw();
    scoreController.draw();

    requestAnimationFrame(draw);
  };

  draw();
};

Bootstrap();
