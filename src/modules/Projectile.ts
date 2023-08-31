import Game from "./Game";

class Projectile {
  public x: number;
  public y: number;
  private speed: number;
  public radius: number;
  private author: "invader" | "player";
  private game: Game;

  constructor(x: number, y: number, author: "invader" | "player", game: Game) {
    this.author = author;
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = 3;
  }

  markedDeletion() {
    return this.author === "player"
      ? this.y + this.radius <= 0
      : this.y + this.radius >= this.game.height;
  }

  update() {
    if (this.author === "player") {
      this.y -= this.speed;
    } else {
      this.y += this.speed;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.author === "invader" ? "purple" : "red";
    context.fill();
    context.closePath();
  }
}

export default Projectile;
