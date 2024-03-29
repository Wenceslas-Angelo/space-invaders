import Game from "./Game";
import playerImage from "../assets/spaceship.png";
import createImage from "../utils/createImage";
import { PLAYER_ROTATION, PLAYER_SCALE } from "../constants";
import Projectile from "./Projectile";
import shootAudio from "../assets/audio/shoot.wav";

class Player {
  private game: Game;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private speed: number;
  private rotation: number;
  private image: HTMLImageElement;
  private projectiles: Projectile[];
  public opacity: number;
  private shootMusic: HTMLAudioElement;

  constructor(game: Game) {
    this.game = game;
    this.image = createImage(playerImage);
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.rotation = 0;
    this.opacity = 1;
    this.width = 0;
    this.height = 0;
    this.projectiles = [];
    this.image.onload = () => {
      this.width = this.image.width * PLAYER_SCALE;
      this.height = this.image.height * PLAYER_SCALE;
      this.x = this.game.width / 2 - this.width / 2;
      this.y = this.game.height - this.height - 20;
    };
    this.shootMusic = new Audio(shootAudio);
  }

  getProjectiles() {
    return this.projectiles;
  }

  update() {
    if (
      this.game.keys.includes("ArrowRight") &&
      this.x < this.game.width - this.width
    ) {
      this.x += this.speed;
      this.rotation = PLAYER_ROTATION;
    } else if (this.game.keys.includes("ArrowLeft") && this.x >= 0) {
      this.x -= this.speed;
      this.rotation = -PLAYER_ROTATION;
    } else {
      this.rotation = 0;
    }

    this.projectiles.forEach((projectile, index) => {
      if (projectile.markedDeletion()) {
        this.projectiles.splice(index, 1);
      } else {
        projectile.update();
      }
    });
  }

  shoot() {
    this.shootMusic.play();
    this.projectiles.push(
      new Projectile(this.x + this.width / 2, this.y, "player", this.game)
    );
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.globalAlpha = this.opacity;
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate(this.rotation);
    context.translate(-this.x - this.width / 2, -this.y - this.height / 2);
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.restore();

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }
}

export default Player;
