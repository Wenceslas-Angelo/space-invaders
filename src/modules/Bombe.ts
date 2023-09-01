import Game from "./Game";

class Bombe {
  private game: Game;
  public x: number;
  public y: number;
  public radius: number;
  private speedX: number;
  private speedY: number;

  constructor(game: Game, x: number, y: number, radius: number, speed: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = -speed;
    this.speedY = -speed;
  }

  update() {
    if (this.x <= 0 || this.x + this.radius >= this.game.width) {
      this.speedX = -this.speedX;
    }
    if (this.y <= 0 || this.y + this.radius >= this.game.height) {
      this.speedY = -this.speedY;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
  }
}

export default Bombe;
