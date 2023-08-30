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

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.keys = [];
    this.inputHandler = new InputHandler(this);
    this.gridOfInvaderGrid = [new InvaderGrid(this)];
  }

  update() {
    this.player.update();
    this.gridOfInvaderGrid.forEach((invaderGrid) => {
      invaderGrid.update();
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.gridOfInvaderGrid.forEach((invaderGrid) => {
      invaderGrid.draw(context);
    });
  }
}

export default Game;
