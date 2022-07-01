import Invader from './Invader';

class GridInvader {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 3, y: 0 };
    this.invaders = [];

    const columns = Math.floor(Math.random() * 10 + 5);
    const rows = Math.floor(Math.random() * 5 + 2);
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 30,
              y: y * 30,
            },
          })
        );
      }
    }

    this.width = columns * 30;
  }

  /**
   *
   * @param {object} canvasSize
   * @param {number} canvasSize.width
   * @param {number} canvasSize.height
   */
  update(canvasSize) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y = 0;

    const isOutCanvas =
      this.position.x + this.width >= canvasSize.width || this.position.x <= 0;

    if (isOutCanvas) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 30;
    }
  }
}

export default GridInvader;
