import InputHandler from "./InputHandler";
import Player from "./Player";

class Game {
  width: number;
  height: number;
  player: Player;
  keys: string[];
  inputHandler: InputHandler;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.keys = [];
    this.inputHandler = new InputHandler(this);
  }

  update() {
    this.player.update();
  }

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
  }
}

export default Game;
