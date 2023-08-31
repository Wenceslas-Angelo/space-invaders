import Invader from "./Invader";
import Game from "./Game";
import invaderIsDead from "../utils/invaderIsDead";

class InvaderGrid {
  private game: Game;
  private invaders: Invader[];
  private speedX: number;
  private speedY: number;
  private x: number;
  private y: number;
  private width: number;

  constructor(game: Game) {
    this.game = game;
    this.invaders = [];
    this.speedX = -1;
    this.speedY = 0;
    this.x = 0;
    this.y = 0;
    const space = 30;
    const rows = Math.floor(Math.random() * 5 + 2);
    const columns = Math.floor(Math.random() * 10 + 5);
    this.width = columns * space;
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(new Invader(x * space, y * space));
      }
    }
  }

  update() {
    if (this.x + this.width >= this.game.width || this.x <= 0) {
      this.speedX = -this.speedX;
      this.speedY = 10;
    }
    this.x += this.speedX;
    this.y += this.speedY;

    this.invaders.forEach((invader, index) => {
      invader.update(this.speedX, this.speedY);
      this.game.player
        .getProjectiles()
        .forEach((projectile, indexProjectile) => {
          if (invaderIsDead(projectile, invader)) {
            this.invaders.splice(index, 1);
            this.game.player.getProjectiles().splice(indexProjectile, 1);

            if (this.invaders.length > 0) {
              const firstInvader = this.invaders[0];
              const lastInvader = this.invaders[this.invaders.length - 1];
              this.width = lastInvader.x - firstInvader.x + lastInvader.width;
              this.x = firstInvader.x;
            } else {
              this.game.gridOfInvaderGrid.splice(index, 1);
            }
          }
        });
    });
    this.speedY = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    this.invaders.forEach((invader) => {
      invader.draw(context);
    });
  }
}

export default InvaderGrid;
