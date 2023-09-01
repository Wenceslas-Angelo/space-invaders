import Game from "./modules/Game";

const canvas = document.querySelector("canvas");

if (canvas) {
  const context = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const game = new Game(canvas.width, canvas.height);
  if (context) {
    let lastTime = 0;
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      context.clearRect(0, 0, canvas.width, canvas.height);
      game.update(deltaTime);
      game.draw(context);
      requestAnimationFrame(animate);
    };

    animate(0);
  }
}
