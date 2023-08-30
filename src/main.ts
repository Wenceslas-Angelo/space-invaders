import Game from "./modules/Game";

const canvas = document.querySelector("canvas");

if (canvas) {
  const context = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const game = new Game(canvas.width, canvas.height);
  if (context) {
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      game.update();
      game.draw(context);
      requestAnimationFrame(animate);
    };

    animate();
  }
}
