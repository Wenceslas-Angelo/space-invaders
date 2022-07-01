import playerImage from './../images/spaceship.png';

class Player {
  /**
   *
   * @param {object} canvasSize
   * @param {number} canvasSize.width
   * @param {number} canvasSize.height
   */
  constructor(canvasSize) {
    this.velocity = { x: 0, y: 0 };
    this.rotation = 0;
    this.opacity = 1;
    const image = new Image();
    image.src = playerImage;
    image.onload = () => {
      const scale = 0.2;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.position = {
        x: canvasSize.width / 2 - this.width,
        y: canvasSize.height - this.height - scale * 100,
      };
    };
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.save();
    context.globalAlpha = this.opacity;
    context.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    context.rotate(this.rotation);
    context.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    context.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  update(context) {
    if (this.image) {
      this.draw(context);
      this.position.x += this.velocity.x;
    }
  }
}

export default Player;
