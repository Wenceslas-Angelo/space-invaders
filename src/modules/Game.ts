import InputHandler from "./InputHandler";
import InvaderGrid from "./InvaderGrid";
import Player from "./Player";
import Particle from "./Particle";

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
  particles: Particle[];

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
    this.particles = [];
    this.createBgStar();
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

      this.particles.forEach((particle, index) => {
        if (particle.opacity <= 0) {
          this.particles.splice(index, 1);
        } else {
          particle.update();
        }
      });
      this.frames++;
    }

    this.particles.forEach((particle) => {
      if (particle.y - particle.radius >= this.height) {
        particle.x = Math.random() * this.width;
        particle.y = 0;
      }
    });
  }

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
    this.gridOfInvaderGrid.forEach((invaderGrid) => {
      invaderGrid.draw(context);
    });
    this.particles.forEach((particle) => {
      particle.draw(context);
    });
  }
}

export default Game;
