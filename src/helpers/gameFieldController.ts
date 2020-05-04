type Boundaries = {
  width: number;
  height: number;
};

export class GameFieldController {
  public static width = 800;
  private static height = 600;

  static setWidth(width: number) {
    this.width = width;
  }

  static setHeight(height: number) {
    this.height = height;
  }

  static getBoundaries(): Boundaries {
    return {
      width: this.width,
      height: this.height,
    };
  }
}
