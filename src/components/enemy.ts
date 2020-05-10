import { RectGameObject } from "./rectGameObject";
import { PlayerController } from "../helpers/playerController";
import { PlayerCarContainer } from "../helpers/dependencyContainer";

export class Enemy extends RectGameObject {
  protected x = 0;
  protected y = 0;

  width = 30;
  height = 70;

  carCollisionDetected() {
    const { x, y, width, height } = this;

    const playerCar = <RectGameObject>PlayerCarContainer.getContainer();

    const playerBoundaries = playerCar.getBoundaries();

    const isHeightIntersection = playerBoundaries.y <= y + height;
    let result = false;

    if (
      x + width > playerBoundaries.x - 5 &&
      x + width < playerBoundaries.x + playerBoundaries.width &&
      isHeightIntersection
    ) {
      result = true;
    }

    if (
      x < playerBoundaries.x + playerBoundaries.width + 5 &&
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
}
