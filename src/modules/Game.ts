import InputHandler from "./InputHandler";
import InvaderGrid from "./InvaderGrid";
import Player from "./Player";

class Game {
  width: number;
  height: number;
  player: Player;
  keys: string[];
  inputHandler: InputHandler;
  gridOfInvaderGrid: InvaderGrid[];
  frames: number;
  randomInterval: number;
  gameOver: boolean;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.keys = [];
    this.inputHandler = new InputHandler(this);
    this.gridOfInvaderGrid = [];
    this.frames = 0;
    this.randomInterval = Math.floor(Math.random() * 500) + 500;
    this.gameOver = false;
  }

  update() {
    if (!this.gameOver) {
      this.player.update();
      this.gridOfInvaderGrid.forEach((invaderGrid) => {
        invaderGrid.update(this.frames);
      });

      if (this.frames % this.randomInterval === 0) {
        this.gridOfInvaderGrid.push(new InvaderGrid(this));
        this.randomInterval = Math.floor(Math.random() * 500) + 500;
        this.frames = 0;
      }

      this.frames++;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.gridOfInvaderGrid.forEach((invaderGrid) => {
      invaderGrid.draw(context);
    });
  }
}

export default Game;
