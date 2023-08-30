class Game {
  private width: number;
  private height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  update() {}

  draw(context: CanvasRenderingContext2D) {}
}

export default Game;
