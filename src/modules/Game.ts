import InputHandler from "./InputHandler";
import InvaderGrid from "./InvaderGrid";
import Player from "./Player";
import Particle from "./Particle";
import Bombe from "./Bombe";
import checkCollision from "../utils/checkCollision";

class Game {
  width: number;
  height: number;
  player: Player;
  keys: string[];
  inputHandler: InputHandler;
  gridOfInvaderGrid: InvaderGrid[];
  frames: number;
  randomInterval: number;
  gameDone: boolean;
  particles: Particle[];
  HtmlElScore: HTMLElement | null;
  score: number;
  bombes: Bombe[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.keys = [];
    this.inputHandler = new InputHandler(this);
    this.gridOfInvaderGrid = [];
    this.frames = 0;
    this.randomInterval = Math.floor(Math.random() * 500) + 500;
    this.gameDone = false;
    this.particles = [];
    this.createBgStar();
    this.HtmlElScore = document.querySelector("h1 span");
    this.score = 0;
    this.bombes = [];
  }

  createBgStar() {
    for (let i = 0; i < 100; i++) {
      this.particles.push(
        new Particle(
          Math.random() * this.width,
          Math.random() * this.height,
          0,
          0.5,
          Math.random() * 2,
          "white",
          false
        )
      );
    }
  }

  createParticles(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    for (let i = 0; i < 50; i++) {
      this.particles.push(
        new Particle(
          x + width / 2,
          y + height / 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          Math.random() * 3,
          color,
          true
        )
      );
    }
  }

  gameOver() {
    this.createParticles(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height,
      "white"
    );
    this.player.opacity = 0;
    setTimeout(() => (this.gameDone = true), 5000);
  }

  update() {
    this.particles.forEach((particle, index) => {
      if (particle.opacity <= 0) {
        this.particles.splice(index, 1);
      } else {
        particle.update();
      }
    });
    this.particles.forEach((particle) => {
      if (particle.y - particle.radius >= this.height && !particle.fades) {
        particle.x = Math.random() * this.width;
        particle.y = 0;
      }
    });
    if (this.gameDone) return;
    this.HtmlElScore ? (this.HtmlElScore.innerHTML = `${this.score}`) : null;
    this.player.update();
    this.gridOfInvaderGrid.forEach((invaderGrid) => {
      invaderGrid.update(this.frames);
    });

    this.bombes.forEach((bombe, index) => {
      if (checkCollision(bombe, this.player)) {
        this.createParticles(
          bombe.x,
          bombe.y,
          bombe.radius,
          bombe.radius,
          "yellow"
        );
        this.bombes.splice(index, 1);
        this.gameOver();
      } else {
        bombe.update();
      }
    });

    if (this.frames % this.randomInterval === 0) {
      this.gridOfInvaderGrid.push(new InvaderGrid(this));
      this.randomInterval = Math.floor(Math.random() * 500) + 500;
      this.bombes.push(
        new Bombe(
          this,
          Math.floor(Math.random() * this.width),
          Math.floor(Math.random() * this.height),
          Math.floor(Math.random() * (30 - 20 + 1) + 20),
          Math.floor(Math.random() * (5 - 2 + 1) + 2)
        )
      );
      this.frames = 0;
    }
    this.frames++;
  }

  draw(context: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => particle.draw(context));
    if (this.gameDone) return;
    this.player.draw(context);
    this.gridOfInvaderGrid.forEach((invaderGrid) => invaderGrid.draw(context));
    this.bombes.forEach((bombe) => bombe.draw(context));
  }
}

export default Game;
