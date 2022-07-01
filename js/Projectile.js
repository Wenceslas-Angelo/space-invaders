class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 3;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  update(context) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

export default Projectile;
