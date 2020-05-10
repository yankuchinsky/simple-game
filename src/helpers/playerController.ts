import { PlayerCarContainer } from "../helpers/dependencyContainer";

export class PlayerController {
  protected static score = 0;

  static get playerScore() {
    return PlayerController.score;
  }

  getPlayerCar() {
    return PlayerCarContainer.getContainer();
  }

  static informAboutCollision() {
    PlayerController.score += 1;
  }
}
