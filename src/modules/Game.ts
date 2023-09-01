import InputHandler from "./InputHandler";
import InvaderGrid from "./InvaderGrid";
import Player from "./Player";
import Particle from "./Particle";
import Bombe from "./Bombe";
import checkCollision, { twoCircleIsCollide } from "../utils/checkCollision";
import backgroundMusic from "../assets/audio/backgroundMusic.wav";
import gameOverAudio from "../assets/audio/gameOver.mp3";

class Game {
  width: number;
  height: number;
  player: Player;
  keys: string[];
  inputHandler: InputHandler;
  gridOfInvaderGrid: InvaderGrid[];
  randomInterval: number;
  gameDone: boolean;
  particles: Particle[];
  HtmlElScore: HTMLElement | null;
  score: number;
  bombes: Bombe[];
  elapsedGridTime: number;
  lastSpawnGridTime: number;
  bgMusic: HTMLAudioElement;
  gameOverMusic: HTMLAudioElement;
  start: boolean;
  gameScreen: HTMLElement | null;

  constructor(width: number, height: number) {
    this.start = false;
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.keys = [];
    this.inputHandler = new InputHandler(this);
    this.gridOfInvaderGrid = [new InvaderGrid(this)];
    this.elapsedGridTime = 0;
    this.lastSpawnGridTime = 0;
    this.randomInterval = Math.floor(
      Math.random() * (20000 - 10000 + 1) + 10000
    );
    this.gameDone = false;
    this.particles = [];
    this.createBgStar();
    this.HtmlElScore = document.querySelector("h1 span");
    this.gameScreen = document.querySelector(".screen");
    this.score = 0;
    this.bombes = [];
    this.bgMusic = new Audio(backgroundMusic);
    this.bgMusic.loop = true;
    this.bgMusic.play();
    this.gameOverMusic = new Audio(gameOverAudio);
  }

  createBgStar() {
    for (let i = 0; i < 50; i++) {
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
    for (let i = 0; i < 20; i++) {
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
    setTimeout(() => {
      this.gameDone = true;
      this.start = false;
      this.gameScreen?.classList.remove("hidden");
    }, 2000);
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
    this.gameOverMusic.play();
  }

  updateParticles() {
    this.particles.forEach((particle, index) => {
      if (particle.y - particle.radius >= this.height && !particle.fades) {
        particle.x = Math.random() * this.width;
        particle.y = 0;
      }
      if (particle.opacity <= 0) {
        this.particles.splice(index, 1);
      } else {
        particle.update();
      }
    });
  }

  createBombe() {
    this.bombes.push(
      new Bombe(
        this,
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height),
        Math.floor(Math.random() * (30 - 20 + 1) + 20),
        Math.floor(Math.random() * (5 - 2 + 1) + 2)
      )
    );
  }

  updateBombes() {
    this.bombes.forEach((bombe, index) => {
      bombe.update();
      if (checkCollision(bombe, this.player)) {
        bombe.explosion(index);
        this.gameOver();
      }
      this.player.getProjectiles().forEach((projectile, projectileIndex) => {
        if (twoCircleIsCollide(projectile, bombe)) {
          bombe.explosion(index);
          this.player.getProjectiles().splice(projectileIndex, 1);
          this.score += 1;
        }
      });
    });
  }

  update(deltaTime: number) {
    this.updateParticles();
    if (this.gameDone || !this.start) return;

    this.HtmlElScore
      ? (this.HtmlElScore.innerHTML = `Score: ${this.score}`)
      : null;
    this.player.update();
    this.gridOfInvaderGrid.forEach((invaderGrid) => {
      invaderGrid.update(deltaTime);
    });

    this.updateBombes();

    if (this.elapsedGridTime >= this.randomInterval) {
      this.gridOfInvaderGrid.push(new InvaderGrid(this));
      this.randomInterval =
        Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
      this.createBombe();
      this.elapsedGridTime = 0;
    }
    this.elapsedGridTime += deltaTime;
  }

  draw(context: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => particle.draw(context));
    if (this.gameDone || !this.start) return;
    this.player.draw(context);
    this.gridOfInvaderGrid.forEach((invaderGrid) => invaderGrid.draw(context));
    this.bombes.forEach((bombe) => bombe.draw(context));
  }
}

export default Game;
