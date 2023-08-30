import Game from "./Game";

class InputHandler {
  private game: Game;
  constructor(game: Game) {
    this.game = game;

    document.addEventListener("keydown", (event) => {
      const keysPressedIsValide =
        event.key === "ArrowRight" || event.key === "ArrowLeft";
      const keysArrayIsEmpty = this.game.keys.indexOf(event.key) === -1;
      if (keysPressedIsValide && keysArrayIsEmpty) {
        this.game.keys.push(event.key);
      }
      if (event.key === " ") {
        this.game.player.shoot();
      }
    });

    document.addEventListener("keyup", (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1);
      }
    });
  }
}

export default InputHandler;
