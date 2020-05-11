import { RectGameObject } from "./rectGameObject";
import { PlayerController } from "../helpers/playerController";
import { PlayerCarContainer } from "../helpers/dependencyContainer";
import CarImage from "../assets/car.png";

export class Enemy extends RectGameObject {
  protected x = 0;
  protected y = 0;

  width = 46;
  height = 100;

  carCollisionDetected() {
    const { x, y, width, height } = this;

    const playerCar = <RectGameObject>PlayerCarContainer.getContainer();

    const playerBoundaries = playerCar.getBoundaries();

    const isHeightIntersection = playerBoundaries.y <= y + height;
    let result = false;

    if (
      x + width > playerBoundaries.x &&
      x + width < playerBoundaries.x + playerBoundaries.width &&
      isHeightIntersection
    ) {
      result = true;
    }

    if (
      x < playerBoundaries.x + playerBoundaries.width &&
      x > playerBoundaries.x &&
      isHeightIntersection
    ) {
      result = true;
    }

    if (result) {
      PlayerController.informAboutCollision();
    }

    return result;
  }

  draw() {
    const { field, x, y, width, height } = this;

    const image = new Image();
    image.src = CarImage;

    field.drawImage(image, x, y, width, height);
  }
}
