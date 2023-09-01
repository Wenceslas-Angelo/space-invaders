import Game from "./modules/Game";
import startMusic from "./assets/audio/start.mp3";

const canvas = document.querySelector("canvas");

if (canvas) {
  const context = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  if (context) {
    let lastTime = 0;
    let game = new Game(canvas.width, canvas.height);
    const startAudio = new Audio(startMusic);
    const startBtn = document.querySelector(".screen .btn");
    startBtn?.addEventListener("click", function () {
      game = new Game(canvas.width, canvas.height);
      game.start = true;
      game.gameScreen?.classList.add("hidden");
      startAudio.play();
    });
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
