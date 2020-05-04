import { GameObject } from "../components/gameObject";

export class DependencyContainer {
  protected obj: GameObject;

  setInstance(instance: GameObject) {
    this.obj = instance;

    return this;
  }

  getInstance() {
    return this.obj;
  }
}

export class PlayerCarContainer extends DependencyContainer {
  static container: DependencyContainer;

  static getContainer() {
    return this.container.getInstance();
  }

  static setContainer(container: DependencyContainer) {
    this.container = container;
  }
}
