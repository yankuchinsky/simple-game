import {
  PlayerCarContainer,
  DependencyContainer,
} from "../helpers/dependencyContainer";
import { KeyDetectionHelper } from "../helpers/keyDetection";
import { Car } from "../components/car";
import { GameObject } from "../components/gameObject";
import { WIDTH, HEIGHT } from "../index";
import { Bullet } from "../components/bullet";

enum keyCodes {
  up = 38,
  down = 40,
  left = 37,
  right = 39,
  space = 32,
}

export class PlayerController {
  protected static score = 0;
  protected static isCrashed = false;
  protected static context: CanvasRenderingContext2D;
  protected static gameObject: GameObject;
  protected static bullets: Bullet[] = [];

  static init(context: CanvasRenderingContext2D) {
    PlayerController.context = context;

    const car = new Car(context);
    PlayerController.gameObject = car;

    PlayerCarContainer.setContainer(new DependencyContainer().setInstance(car));

    car.setPosition({ x: WIDTH / 2, y: HEIGHT / 1.5 });
  }

  static draw() {
    PlayerController.gameObject.draw();

    PlayerController.checkBulletOutOfBound();

    PlayerController.bullets.forEach((bullet) => bullet.draw());
  }

  static get playerScore() {
    return PlayerController.score;
  }

  static getPlayerCar() {
    return PlayerCarContainer.getContainer();
  }

  static informAboutCollision() {
    PlayerController.isCrashed = true;
  }

  static registerKeys() {
    const car = PlayerController.getPlayerCar();

    KeyDetectionHelper.registerKey(keyCodes.right, car, "move", {
      x: 5,
      y: 0,
    });

    KeyDetectionHelper.registerKey(keyCodes.left, car, "move", {
      x: -5,
      y: 0,
    });

    KeyDetectionHelper.registerKey(keyCodes.space, PlayerController, "shoot", {
      x: -5,
      y: 0,
    });
  }

  static shoot() {
    const car = <Car>PlayerController.getPlayerCar();
    const bullet = new Bullet(PlayerController.context);

    const boundaries = car.getBoundaries();
    bullet.setPosition({
      x: boundaries.x + boundaries.width / 2,
      y: boundaries.y,
    });

    bullet.move({ x: 0, y: -5 });

    PlayerController.bullets.push(bullet);
  }

  static checkBulletOutOfBound() {
    PlayerController.bullets = PlayerController.bullets.filter(
      (bullet) => !bullet.outOfBounceCheck()
    );
  }

  static get isGameEnd() {
    return PlayerController.isCrashed;
  }
}
