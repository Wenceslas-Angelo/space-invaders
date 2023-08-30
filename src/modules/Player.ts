import Game from "./Game";
import playerImage from "../assets/spaceship.png";
import createImage from "../utils/createImage";
import { PLAYER_SCALE } from "../constants";

class Player {
  private game: Game;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private speed: number;
  private image: HTMLImageElement;

  constructor(game: Game) {
    this.game = game;
    this.image = createImage(playerImage);
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.width = 0;
    this.height = 0;
    this.image.onload = () => {
      this.width = this.image.width * PLAYER_SCALE;
      this.height = this.image.height * PLAYER_SCALE;
      this.x = this.game.width / 2 - this.width / 2;
      this.y = this.game.height - this.height - 20;
    };
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.image)
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Player;
