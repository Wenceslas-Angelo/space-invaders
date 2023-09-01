import invaderImage from "../assets/invader.png";
import { INVADER_SCALE } from "../constants";
import createImage from "../utils/createImage";
import checkCollision from "../utils/checkCollision";
import Game from "./Game";
import Projectile from "./Projectile";
import audio from "../assets/audio/enemyShoot.wav";

class Invader {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private image: HTMLImageElement;
  private projectiles: Projectile[];
  private game: Game;
  private shootAudio: HTMLAudioElement;

  constructor(x: number, y: number, game: Game) {
    this.image = createImage(invaderImage);
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.image.onload = () => {
      this.width = this.image.width * INVADER_SCALE;
      this.height = this.image.height * INVADER_SCALE;
    };
    this.projectiles = [];
    this.game = game;
    this.shootAudio = new Audio(audio);
  }

  dead(invader: this, projectileIndex: number) {
    this.game.score += 10;
    this.game.createParticles(
      invader.x,
      invader.y,
      invader.width,
      invader.height,
      "white"
    );
    this.game.player.getProjectiles().splice(projectileIndex, 1);
  }

  update(speedX: number, speedY: number) {
    this.x += speedX;
    this.y += speedY;

    this.projectiles.forEach((projectile, index) => {
      if (checkCollision(projectile, this.game.player)) {
        this.game.gameOver();
      }
      if (projectile.markedDeletion()) {
        this.projectiles.splice(index, 1);
      } else {
        projectile.update();
      }
    });
  }

  shoot() {
    this.projectiles.push(
      new Projectile(
        this.x + this.width / 2,
        this.y + this.height,
        "invader",
        this.game
      )
    );
    this.shootAudio.play();
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }
}

export default Invader;
