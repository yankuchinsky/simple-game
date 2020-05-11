import { Enemy } from "../components/enemy";

export class EnemyController {
  protected enemies: Enemy[] = [];
  protected field: CanvasRenderingContext2D;
  protected createInterval = 0;

  constructor(field: CanvasRenderingContext2D) {
    this.field = field;
  }

  protected update = () => {
    window.setTimeout(() => {
      const { enemies } = this;

      this.createEnemy();

      enemies.forEach((enemy) => {
        enemy.move({ x: 0, y: 10 });
      });

      this.enemies = enemies
        .filter((enemy) => !enemy.outOfBounceCheck())
        .filter((enemy) => !enemy.carCollisionDetected());

      this.update();
    }, 100);
  };

  draw() {
    return this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }

  protected createEnemy() {
    this.createInterval += 1;

    if (this.createInterval !== 14) {
      return;
    }

    this.createInterval = 0;

    const { field } = this;

    const enemy = new Enemy(field);

    const rand = (max: number) => Math.floor(Math.random() * Math.floor(max));

    const randXPos = rand(800);

    enemy.setPosition({ x: randXPos, y: 0 });

    this.enemies.push(enemy);
  }

  start() {
    this.update();
  }
}
