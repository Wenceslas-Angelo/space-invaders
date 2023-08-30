class Projectile {
  private x: number;
  private y: number;
  private speed: number;
  private radius: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.speed = 3;
  }

  getY() {
    return this.y;
  }

  getRadius() {
    return this.radius;
  }

  update() {
    this.y -= this.speed;
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
  }
}

export default Projectile;