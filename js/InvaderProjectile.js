class InvaderProjectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 3;
    this.width = 5;
    this.height = 10;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.fillStyle = '#BA49FF';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
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

export default InvaderProjectile;
