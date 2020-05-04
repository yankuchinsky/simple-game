export type PositionArguments = {
  x: number;
  y: number;
};

export abstract class GameObject {
  protected x: number;
  protected y: number;

  protected field: CanvasRenderingContext2D;

  constructor(field: CanvasRenderingContext2D) {
    this.field = field;
  }

  setPosition({ x, y }: PositionArguments) {
    this.x = x;
    this.y = y;
  }

  move({ x, y }: PositionArguments) {
    this.x += x;
    this.y += y;
  }

  public abstract draw(): void;
}
