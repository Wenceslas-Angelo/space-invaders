import Player from "./Player";

class Game {
  width: number;
  height: number;
  player: Player;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
  }

  update() {}

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
  }
}

export default Game;
