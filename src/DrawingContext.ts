export default class DrawingContext {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  private static instance: DrawingContext;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  public static getInstance(
    canvas: HTMLCanvasElement | null = null,
  ): DrawingContext {
    if (!this.instance && canvas) {
      this.createInstance(canvas);
    }

    return this.instance;
  }

  public static createInstance(canvas: HTMLCanvasElement) {
    this.instance = new DrawingContext(canvas);
  }
}
