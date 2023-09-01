import Invader from "./Invader";
import Game from "./Game";
import checkCollision from "../utils/checkCollision";

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
    this.createInvaders(columns, rows, space);
  }

  createInvaders(columns: number, rows: number, space: number) {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(new Invader(x * space, y * space, this.game));
      }
    }
  }

  invaderIsDead(
    invader: Invader,
    invaderIndex: number,
    projectileIndex: number
  ) {
    this.invaders.splice(invaderIndex, 1);
    invader.dead(invader, projectileIndex);

    // Update gride invaders width
    if (this.invaders.length > 0) {
      const firstInvader = this.invaders[0];
      const lastInvader = this.invaders[this.invaders.length - 1];
      this.width = lastInvader.x - firstInvader.x + lastInvader.width;
      this.x = firstInvader.x;
    } else {
      this.game.gridOfInvaderGrid.splice(invaderIndex, 1);
    }
  }

  update(frames: number) {
    // Move grid invaders
    this.speedY = 0;
    if (this.x + this.width >= this.game.width || this.x <= 0) {
      this.speedX = -this.speedX;
      this.speedY = 10;
    }
    this.x += this.speedX;
    this.y += this.speedY;

    // invader shoot
    if (frames % 100 === 0 && this.invaders.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.invaders.length);
      this.invaders[randomIndex].shoot();
    }

    // Update or delete invader
    this.invaders.forEach((invader, invaderIndex) => {
      this.game.player
        .getProjectiles()
        .forEach((projectile, projectileIndex) => {
          if (checkCollision(projectile, invader)) {
            this.invaderIsDead(invader, invaderIndex, projectileIndex);
          } else {
            invader.update(this.speedX, this.speedY);
          }
        });
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.invaders.forEach((invader) => {
      invader.draw(context);
    });
  }
}

export default InvaderGrid;
