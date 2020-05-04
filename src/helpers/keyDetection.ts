export class KeyDetectionHelper {
  static window: Window;

  static init(window: Window) {
    this.window = window;
  }

  static registerKey(
    keyCode: number,
    obj: any,
    functionSignature: string,
    arg: any
  ) {
    this.window.addEventListener("keydown", (event) => {
      if (event.isComposing || event.keyCode === keyCode) {
        obj[functionSignature](arg);

        return;
      }
    });
  }
}
