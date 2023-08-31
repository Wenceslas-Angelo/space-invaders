class Particle {
  public x: number;
  public y: number;
  private speedX: number;
  private speedY: number;
  public radius: number;
  private color: string;
  public opacity: number;
  private fades: boolean;

  constructor(
    x: number,
    y: number,
    speedX: number,
    speedY: number,
    radius: number,
    color: string,
    fades: boolean
  ) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.fades) this.opacity -= 0.01;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.globalAlpha = this.opacity;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
    context.restore();
  }
}

export default Particle;
